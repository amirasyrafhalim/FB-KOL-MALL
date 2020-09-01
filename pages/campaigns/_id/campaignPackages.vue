<template>
  <div>
    <h1 class="text-center">{{ record.name }}</h1>
    <v-row>
      <v-card id="pages__liveConsole" class="mt-10">
        <v-toolbar color="primary" dark flat dense>
          <v-toolbar-title class="subheading">
            {{ $t("label.listpackage") }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col>
              <CampaignPackageList :products="products" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-row>
        <v-col>
          <form-package />
        </v-col>
      </v-row>
    </v-row>
  </div>
</template>
<script>
import getOneMixin from "@/mixins/getOne";
import FormPackage from "@/components/pages/campaigns/FormPackage";
import CampaignPackageList from "@/components/pages/campaigns/CampaignPackageList";
export default {
  name: "campaignPackages",
  mixins: [getOneMixin],
  components: {
    FormPackage,
    CampaignPackageList
  },
  asyncData() {
    return {
      moduleName: "campaigns"
    };
  },
  computed: {
    products() {
      return this.$store.state.products.records;
    }
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      this.$store.dispatch("products/fetchItems");
    }
  }
};
</script>

<style scoped>
.radius {
  border-radius: 25px !important;
}
.button {
  float: right !important;
}
</style>
