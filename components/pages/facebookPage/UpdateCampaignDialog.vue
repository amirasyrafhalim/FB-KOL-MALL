<template>
  <v-row justify="center">
    <v-dialog v-model="showDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Update campaign</span>
        </v-card-title>
        <v-card-text>
          <v-autocomplete
            dense
            :items="campaigns"
            :label="$t('menuTitle.campaign')"
            item-text="name"
            item-value="id"
            v-model="campaign_id"
            @input.native="fetchCampaign($event.target.value)"
            class="mt-4"
          ></v-autocomplete>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="submit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import formMixin from "@/mixins/form";

export default {
  props: ['item', 'merchantPageId'],
  mixins: [formMixin],
  data: () => ({
    campaign_id: null,
    showDialog: false,
  }),
  computed: {
    campaigns() {
      return this.$store.state.campaigns.records;
    }
  },
  created() {
    this.$nuxt.$on('open-dialog-form', () => {
      this.showDialog = true
    })
    this.fetchCampaign();
    console.log(this.item, this.merchantPageId);
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

      this.$store.commit("campaigns/setUpdateLiveVideo", res)

      this.handleApiSuccess(res)
      this.showDialog = false;

      this.$emit('closedialog')
    },
    async fetchCampaign() {
      try {
        await this.$store.dispatch("campaigns/fetchItems");
      } catch (err) {
        console.log(err);
      }
    },
  }

}
</script>