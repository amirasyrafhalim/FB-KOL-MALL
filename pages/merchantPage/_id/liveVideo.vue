<template>
  <div>
    <h1>Live Videos</h1>
    <v-row dense v-if="liveVideos.length > 0" class="mt-2">
      <v-col v-for="(item, index) in liveVideos" v-bind:key="index" class="col-4 mt-2">
        <v-card max-width="500" class="mx-auto">
          <v-list-item>
            <v-list-item-avatar color="grey"></v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">{{ item.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.broadcast_start_time }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <div v-html="item.embed_html" class="facebook-responsive"></div>
          <v-card-text v-if="item.recorded && item.recorded.campaign">
            <strong>Campaign Name</strong>

            <br />
            {{item.recorded.campaign.name}}.
            <a
              href="javascript:;"
              v-on:click="openUpdateCampaignDialog(item)"
            >Change</a>
          </v-card-text>
          <v-card-text v-else>
            This video is not linked to any campaign yet.
            <a
              href="javascript:;"
              v-on:click="openUpdateCampaignDialog(item)"
            >Add campaign now</a>.
          </v-card-text>

          <v-card-actions>
            <v-btn class="bg-gradient white--text" @click="goToConsole(item || null)">Console</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <div v-else>
      <p>There is no live video at the moment. Please check again in a moment.</p>
      <v-btn
        :disabled="loading"
        :to="localePath('facebookPage')"
        class="mt-5"
      >{{ $t("label.back") }}</v-btn>
    </div>

    <update-campaign-dialog
      :merchantPageId="merchantPageId"
      :item="currentItem"
      @closedialog="closeUpdateCampaignDialog"
    ></update-campaign-dialog>
  </div>
</template>
<script>
import AlertConfirmation from "@/components/widgets/alerts/AlertConfirmation";
import CrudFormAction from "@/components/widgets/forms/CrudFormAction";
import UpdateCampaignDialog from "@/components/pages/facebookPage/UpdateCampaignDialog";

import formMixin from "@/mixins/form";

export default {
  name: "index",
  components: {
    AlertConfirmation,
    CrudFormAction,
    UpdateCampaignDialog
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
      disabled: false,
      currentItem: null,
    };
  },
  computed: {
    merchantPage() {
      return this.$store.state[this.moduleName].records;
    },
    liveVideos() {
      var video = this.$store.state[this.moduleName].liveVideos;
      //   console.log(video)
      if (video.length == 0) {
        this.disabled = false
      }
      return this.$store.state[this.moduleName].liveVideos;
    },
    merchantPageId() {
      return this.$route.params.id;
    }
  },
  created() {
    this.initialize();
    this.fetchMerchantPage();
  },
  methods: {
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

    openUpdateCampaignDialog(item) {
      this.currentItem = item;
      $nuxt.$emit('open-dialog-form')

      this.formModel.merchant_page_id = this.$route.params.id;
      this.formModel.stream_id = item.id;

    },
    closeUpdateCampaignDialog() {
      this.currentItem = null;
      this.showUpdateCampaignDialog = false;
      this.formModel = {
        stream_id: '',
        merchant_page_id: null
      };
      this.initialize();
    },
    goToConsole(item) {
      if (!(item.recorded && item.recorded.campaign)) {
        this.$store.dispatch("showSnackbar", {
          text: 'Please add campaign first.',
          color: "error",
        });
        return;
      }

      this.$router.push({
        path: `/videos/${item.recorded.id}`
      })
    }
  }
};
</script>

<style scoped>
div >>> iframe {
  width: 100% !important;
  /* height: 220px !important; */
  max-height: 500px;
}

.facebook-responsive {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

@media only screen and (min-width: 1401px) {
  div >>> iframe {
    height: 245px !important;
  }
}

@media only screen and (max-width: 1400px) {
  div >>> iframe {
    height: 190px !important;
  }
}

@media only screen and (max-width: 1300px) {
  div >>> iframe {
    height: 170px !important;
  }
}

@media only screen and (max-width: 980px) {
  div >>> iframe {
    height: 150px !important;
  }
}

@media only screen and (max-width: 768px) {
  div >>> iframe {
    height: 120px !important;
  }
}
</style>
