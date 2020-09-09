<template>
  <div>
    <div v-if="liveVideos.length > 0">
      <div class="vx-row">
        <div
          class="vx-col w-full sm:w-1/2 lg:w-1/3 mb-base"
          v-for="(item, index) in liveVideos"
          v-bind:key="index"
        >
          <vx-card>
            <div slot="no-body">
              <div v-html="item.embed_html" class="responsive card-img-top"></div>
            </div>
            <h5 class="mb-2">{{ item.title }}</h5>
            <p class="text-grey">{{ item.broadcast_start_time }}</p>
            <vs-divider></vs-divider>
            <p class="text-grey" v-if="item.recorded && item.recorded.campaign">
              <strong>Campaign Name:</strong>
              {{item.recorded.campaign.name}}.
              <a
                href="javascript:;"
                v-on:click="openUpdateCampaignDialog(item)"
              >Change</a>
            </p>
            <p class="text-grey" v-else>
              This video is not linked to any campaign yet.
              <a
                href="javascript:;"
                v-on:click="openUpdateCampaignDialog(item)"
              >Add campaign now</a>.
            </p>
            <div class="flex justify-between flex-wrap">
              <vs-button
                class="w-full mt-4 mr-2 shadow-lg"
                type="gradient"
                color="#7367F0"
                gradient-color-secondary="#CE9FFC"
                @click="goToConsole(item || null)"
              >Console</vs-button>
            </div>
          </vx-card>
        </div>
      </div>
    </div>
    <div v-else>
      <p>There is no live video at the moment. Please check again in a moment.</p>

      <vs-button
        color="dark"
        type="border"
        :disabled="loading"
        :to="localePath('merchantPage')"
        class="mt-5"
      >{{ $t("label.back") }}</vs-button>
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
import UpdateCampaignDialog from "@/components/pages/merchantPage/UpdateCampaignDialog";

import formMixin from "@/mixins/form";

export default {
  layout: "main",
  name: "index",
  components: {
    AlertConfirmation,
    CrudFormAction,
    UpdateCampaignDialog,
  },
  mixins: [formMixin],
  asyncData({ app, store }) {
    return {
      moduleName: "merchantPages",
      formModel: {
        stream_id: "",
        merchant_page_id: null,
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
        this.disabled = false;
      }
      return this.$store.state[this.moduleName].liveVideos;
    },
    merchantPageId() {
      return this.$route.params.id;
    },
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
      $nuxt.$emit("open-dialog-form");

      this.formModel.merchant_page_id = this.$route.params.id;
      this.formModel.stream_id = item.id;
    },
    closeUpdateCampaignDialog() {
      this.currentItem = null;
      this.showUpdateCampaignDialog = false;
      this.formModel = {
        stream_id: "",
        merchant_page_id: null,
      };
      this.initialize();
    },
    goToConsole(item) {
      if (!(item.recorded && item.recorded.campaign)) {
        /*   this.$store.dispatch("showSnackbar", {
          text: "Please add campaign first.",
          color: "error",
        }); */
        this.$vs.notify({
          color: "warning",
          title: "Warning",
          text: "Please add campaign first.",
        });
        return;
      }

      this.$router.push({
        path: `/videos/${item.recorded.id}`,
      });
    },
  },
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
