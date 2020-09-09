<template>
  <div justify="center">
    <vs-prompt :active.sync="showDialog" title="Update Campaign" @accept="submit">
      <div class="con-exemple-prompt">
        <vue-simple-suggest
          v-model="campaign_id"
          :list="campaigns"
          :filter-by-query="true"
          display-attribute="name"
          value-attribute="id"
          class="mt-4"
          placeholder="Campaign"
          :min-length="0"
          mode="select"
        ></vue-simple-suggest>
      </div>
    </vs-prompt>
  </div>
</template>

<script>
import formMixin from "@/mixins/form";
import VueSimpleSuggest from "vue-simple-suggest";
import "vue-simple-suggest/dist/styles.css";

export default {
  props: ["item", "merchantPageId"],
  components: {
    VueSimpleSuggest,
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
      console.log(this.campaign_id);
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
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/extraComponents/autocomplete.scss";
</style>