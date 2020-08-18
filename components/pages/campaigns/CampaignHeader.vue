<template>
   <v-card :outlined=true color="transparent">
      <v-row class="px-3" v-if="!endComment">
         <v-col cols="6" class="my-auto">
            <h3 class="headline">Facebook Live Comment</h3>
         </v-col>
         <v-col class="text-right my-auto">
            <v-text-field v-if="!videoValid || !!pauseComment" label="Facebook Live ID" v-model="facebook_live_id"
                          class="width-50"></v-text-field>
            <div v-else>
               <span class="body-1">Facebook Live Id: </span>
               <span class="text-primary subtitle-1 font-weight-bold">{{this.facebook_live_id}}</span>
            </div>
         </v-col>
         <v-col cols="auto" class="my-auto">
            <v-btn v-if="!videoValid" tile color="primary" :loading="loading" @click="videoStatus">Add</v-btn>
            <v-btn v-if="!!videoValid && !startComment" tile color="success" :loading="loading"
                   @click="fetchStreamStart">Start
            </v-btn>
            <v-btn v-if="!!videoValid && !!startComment && !endComment && !pauseComment" tile class="text-white"
                   color="info"
                   :loading="loading"
                   @click="pauseStream()">Pause
            </v-btn>
            <v-btn v-if="!!videoValid && !!startComment && !endComment && !!pauseComment" tile class="text-white"
                   color="warning"
                   :loading="loading"
                   @click="pauseStream()">{{$t('label.continue')}}
            </v-btn>
            <v-btn v-if="!!videoValid && !!startComment && !endComment" tile class="text-white" color="red"
                   :loading="loading"
                   @click="fetchStreamEnd()">End
            </v-btn>
         </v-col>
      </v-row>

      <v-row class="px-3" v-else>
         <v-col class="text-right my-auto">
            <span class="subtitle-1 font-weight-bold">Campaign Ended at : {{this.streamEndAt}}</span>
         </v-col>
      </v-row>
   </v-card>
</template>

<script>
  import formMixin from "@/mixins/form";
  import CampaignOrderLog from "./CampaignOrderLog";
  import BasicLog from "./BasicLog";

  export default {
    name: "CampaignHeader",
    components: {BasicLog, CampaignOrderLog},
    mixins: [formMixin],
    props: ['packages', 'arrayKeywords', 'packageMax', 'packageQuantity', 'comments', 'totalOrder', 'disabled'],
    data() {
      return {
        loading: false,
        facebook_live_id: "",
        access_token: "",
        videoValid: false,
        startComment: false,
        endComment: false,
        pauseComment: false,
        buyer: null,
        range: 0,
        value: [],
        streamEndAt: null,
        balance_order: 0
      }
    },
    computed: {
      record() {
        return this.$store.state.campaigns.record;
      }
    },
    created() {
      this.fetchCampaign();
    },
    methods: {
      initialize() {
        this.access_token = this.$store.state.campaigns.record.page_token ?? '';
      },
      async fetchCampaign() {
        await this.$store.dispatch("campaigns/fetchItem",
          this.$route.params.id
        );
        await this.initialize();
        await this.checkStreamStart();
      },
     
      async videoStatus() {
        await this.fetchVideo(this.facebook_live_id, this.$route.params.id);
      },
      updateTotalOrder: function () {
        this.fetchCounter();
      },
      fetchVideo: function () {
        var params = ({campaign_id: this.$route.params.id, video_id: this.facebook_live_id});
        if (!this.facebook_live_id || !this.$route.params.id) {
          this.$store.dispatch("showSnackbar", {
            text: this.$t("message.invalidInput"),
            color: "error",
          });
        } else {
          this.$api.facebook.addVideo(params).then(res => {
            if (res.data != null){
              this.videoValid = true;
              this.range += 1;
              this.value.push(res.data);
              this.$emit('fetchVideo', {totalRange: this.range, value: this.value});
            }
          }).catch(err => {
            let response = err.response;
          });
        }
      },
      async fetchStreamStart() {
        try {
          let res = await this.$api.campaigns.streamStart(this.$route.params.id);
          if (res.data) {
            this.startComment = true;
            this.captureComment(this.facebook_live_id, this.access_token);
            this.range += 1;
            this.value.push(res.data);
            this.$emit('fetchStreamStart', {totalRange: this.range, value: this.value});
          }
          this.handleApiSuccess(res);
        } catch (err) {
          this.handleApiErrors(err);
        }
      },
      async streamRefresh() {
        try {
          let res = await this.$api.campaigns.streamRefresh(this.$route.params.id);
          if (res.data) {
            this.value = res.data.log;
            this.range = res.data.log.length;
            this.$emit('streamRefresh', {totalRange: this.range, value: this.value});
          }
          this.handleApiSuccess(res);
        } catch (err) {
          this.handleApiErrors(err);
        }
      },
      async pauseStream() {
        let res = await this.$api.campaigns.streamPause(this.$route.params.id);
        if (this.pauseComment === false) {
          this.source.close();
          this.source = null;
          this.pauseComment = true;
          this.range += 1;
          this.value.push(res.data);
          this.$emit('pauseStream', {totalRange: this.range, value: this.value});
        } else {
          await this.fetchVideo(this.facebook_live_id, this.$route.params.id);
          this.captureComment();
          this.pauseComment = false;
          this.range += 1;
          this.value.push(res.data);
          this.$emit('pauseStream', {totalRange: this.range, value: this.value});
        }
      },
      async fetchStreamEnd() {
        try {
          let res = await this.$api.campaigns.streamEnd(this.$route.params.id);
          if (res.data) {
            let disabledStatus = true;
            this.streamEndAt = res.data.log.created_at;
            this.endComment = true;
            this.startComment = false;
            this.videoValid = false;
            this.range += 1;
            this.value.push(res.data);
            this.$emit('fetchStreamEnd', disabledStatus);
            this.campaignData = res.data;
          }

          this.campaignData.status = 2;
          await this.$api.campaigns.update(this.campaignData, this.$route.params.id);
          this.handleApiSuccess(res);
        } catch (err) {
          console.log(err)
        }
        if (!!this.endComment) {
          if (this.source != null) {
            this.source.close();
            this.source = null;
          }
        }
      },
      captureComment() {
        if (this.source != null) {
          this.source.close();
          this.source = null;
        }
        const vm = this;
        const url = `https://streaming-graph.facebook.com/${this.facebook_live_id}/live_comments?access_token=${this.access_token}&comment_rate=one_per_two_seconds&fields=from{id,name,email,picture},message,created_time`;
        this.source = new EventSource(url);

        var campaign_id = this.$route.params.id;
        var productId = [];
        var packagesList = this.packages;

        packagesList.forEach(data => {
          productId.push(data.product)
        });
        //callback message
        this.source.onmessage = function (event) {
          const data = JSON.parse(event.data);
          var comment = data.message.toUpperCase();
          var facebook_id = data.from.id;
          var avatar = data.from.picture.data.url;
          var name = data.from.name;
          var email = data.from.email ? data.from.email : '';
          var buyer = {
            "facebook_id": facebook_id,
            "avatar": avatar,
            "name": name,
            "email": email,
          };
          for (var i = 0; i < vm.arrayKeywords.length; i++) {
            if (comment.includes(vm.arrayKeywords[i])) {
              var packageData = {
                "campaign_package_id": vm.packages[i].id,
                "campaign_package_product_details": vm.packages[i].product_ids,
                "quantity": 1,
              };
              let order = parseInt(comment.match(/\+\d+/g));
              
               this.balance_order = this.balance_order == 0 ? vm.packageQuantity[i] : vm.packageQuantity[i] - vm.totalOrder[i] ;
               if(vm.packageMax[i]  > this.balance_order) {
                 vm.packageMax[i] = this.balance_order;
               }
              
               if ((order <= vm.packageMax[i] && order <= vm.packageQuantity[i]) ) {
                 if ( order <= this.balance_order ) {
                   packageData.quantity = order;

                var params = ({campaign_id: campaign_id, buyer: buyer, package: packageData});
                vm.buyerOrder(params, i)
                 } else {
                    vm.updateStatus(i);
                 }
               }
      

            //   if (order > vm.packageMax[i]) {
            //   order = vm.packageMax[i];
            // }
            // if (order <= vm.packageQuantity[i]) {
            //   order = vm.packageQuantity[i];
            // }
            // // if (order < balance_order) {
            //       packageData.quantity = order;

            //       var params = {
            //         campaign_id: campaign_id,
            //         buyer: buyer,
            //         package: packageData
            //       };
            //       vm.buyerOrder(params, i);
                
            //   // vm.updateStatus(i);

            }
          }
        };
        this.source.onerror = function (err) {
          console.log(err);
        };
      },
      buyerOrder: function (params, key) {
        this.$api.buyerOrders.addBuyerOrder(params).then(res => {
          if (res.data != null) {
            this.value.push(res.data);
            this.$emit('buyerOrder');
          }
        }).catch(err => {
          console.log(err);
        });
      },
      updateStatus(id) {
      this.$emit("updateStatus", {statusInactive: 0, id: id, value: true});
    },
      async checkStreamStart() {
        if (this.record.stream_id) {
          await this.streamRefresh();
          this.facebook_live_id = this.record.stream_id;
          if (this.record.stream_start_at == null && this.record.stream_end_at == null) {
            this.videoValid = true;
          } else if (this.record.stream_start_at && this.record.stream_end_at == null) {
            this.videoValid = true;
            this.startComment = true;
            this.captureComment(this.facebook_live_id, this.access_token);
          } else if (this.record.stream_start_at && this.record.stream_end_at) {
            let disabledStatus = true;
            this.endComment = true;
            this.videoValid = false;
            this.startComment = false;
            this.streamEndAt = this.record.stream_end_at;
            this.$emit('checkStreamStart', disabledStatus);
          } else {
            this.videoValid = true;
          }
        } else {
          this.videoValid = false;
        }
      },
    }
  }
</script>

<style scoped>

</style>
