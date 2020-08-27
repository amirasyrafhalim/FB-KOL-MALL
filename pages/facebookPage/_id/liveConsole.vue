<template>
  <div>
    <v-row>
      <v-col v-if="liveVideos.length > 0" class="mx-auto my-auto">
            <div class="overline mb-4">Video List</div>
        <v-card class="d-flex flex-row mb-6">
         <v-radio-group v-model="formModel.stream_id" row>
          <span
            v-for="(liveVideo, i) in liveVideos"
            :key="i"
           
            class="mr-5"
          >
           <v-radio :label="liveVideo.title" :value="liveVideo.id"></v-radio>
            <p class="heading">Status: {{ liveVideo.status }}</p>
            <span v-html="liveVideo.embed_html"></span>
          </span>
         </v-radio-group>
        </v-card>
      </v-col>
      <v-col v-else>
        <v-card class="mx-auto">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="heading mb-4">Video List</div>
              <v-list-item-title class="headline mb-1 text-uppercase text-center text-grey">
                {{ "no video available" }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-autocomplete
          dense
          solo
          :items="campaigns"
          :label="$t('menuTitle.campaign')"
          item-text="name"
          item-value="id"
          v-model="campaign_id"
          @input.native="fetchCampaign($event.target.value)"
        ></v-autocomplete>
      </v-col>
    </v-row>
      <crud-form-action
        class="mx-2"
        backPath="facebookPage"
        :loading="loading"
        @submit="submit"
      />
  

    <!-- <v-btn @click="selectData()" :disabled="disabled" class="primary">
        submit
    </v-btn>
    <v-btn class="light">
        back
    </v-btn> -->
  </div>
</template>
<script>
import AlertConfirmation from "@/components/widgets/alerts/AlertConfirmation";
import CrudFormAction from "@/components/widgets/forms/CrudFormAction";

import formMixin from "@/mixins/form";

export default {
  name: "index",
  components: {
    AlertConfirmation,
    CrudFormAction
  },
  mixins: [formMixin],
  asyncData({ app, store }) {
    return {
      moduleName: "merchantPages",
      formModel: {
        stream_id: '',
        merchant_page_id: null
      },
      campaign_id: null,
      disabled: false
    };
  },
  computed: {
    merchantPage() {
      return this.$store.state[this.moduleName].records;
    },
    liveVideos() {
        var video = this.$store.state[this.moduleName].liveVideos;
        console.log(video)
        if(video.length == 0){
            this.disabled = false
        }
      return this.$store.state[this.moduleName].liveVideos;
    },
    campaigns() {
      return this.$store.state.campaigns.records;
    }
  },
  created() {
    this.initialize();
    this.fetchMerchantPage();
    this.fetchCampaign();
  },
  methods: {
    async submit(i) {
      this.formModel.merchant_page_id = this.$route.params.id;
       var res = await this.$api.campaigns.updateLiveVideo(  this.campaign_id, this.formModel);
    
       this.$store.commit("campaigns/setUpdateLiveVideo", res)
       this.handleApiSuccess(res, 'controlPanel')
    },
    initialize() {
      this.user = this.$store.state.auth.user;
      this.$store.dispatch(
        this.moduleName + "/liveVideos",
        this.$route.params.id
      );
    },
    async fetchMerchantPage() {
      try {
        await this.$store.dispatch(this.moduleName + "/fetchItems");
      } catch (err) {
        console.log(err);
      }
    },
    async fetchCampaign() {
      try {
        await this.$store.dispatch("campaigns/fetchItems");
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
div >>> iframe {
  width: auto !important;
  height: auto !important;
}
</style>
