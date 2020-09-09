<template>
  <div justify="center">
    <vs-prompt :active.sync="showDialog" title="Update Campaign" @accept="submit">
      <div class="con-exemple-prompt">
        <autocomplete
          :source="campaigns"
          input-class="vs-inputx vs-input--input normal"
          @selected="onSelectCampaign"
        ></autocomplete>

        <!--vue-simple-suggest
          v-model="campaign_id"
          :list="campaigns"
          :filter-by-query="true"
          display-attribute="name"
          value-attribute="id"
          class="mt-4"
          placeholder="Campaign"
          :min-length="0"
          mode="select"
        ></vue-simple-suggest-->
      </div>
    </vs-prompt>
  </div>
</template>

<script>
import formMixin from "@/mixins/form";
import Autocomplete from "vuejs-auto-complete";

export default {
  props: ["item", "merchantPageId"],
  components: {
    Autocomplete,
  },
  mixins: [formMixin],
  data: () => ({
    campaign_id: null,
    showDialog: false,
  }),
  computed: {
    campaigns() {
      return this.$store.state.campaigns.records;
    },
  },
  created() {
    this.$nuxt.$on("open-dialog-form", () => {
      this.showDialog = true;
    });
    this.fetchCampaign();
  },
  methods: {
    openCloseDialog(value) {
      this.showDialog = value;
    },
    async submit() {
      var res = await this.$api.campaigns.updateLiveVideo(this.campaign_id, {
        stream_id: this.item.id,
        merchant_page_id: this.merchantPageId,
      });

      this.handleApiSuccess(res);

      this.$store.commit("campaigns/setUpdateLiveVideo", res);
      this.showDialog = false;

      this.$emit("closedialog");
    },
    async fetchCampaign() {
      try {
        await this.$store.dispatch("campaigns/fetchItems");
      } catch (err) {
        console.log(err);
      }
    },
    onSelectCampaign(item) {
      console.log(item);
      this.campaign_id = item.value;
      // console.log(this.campaign_id);
    },
  },
};
</script>
