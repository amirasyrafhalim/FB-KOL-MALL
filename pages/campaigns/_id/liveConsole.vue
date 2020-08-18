<template>
   <v-card id="pages__liveConsole">
      <v-toolbar color="primary" dark flat dense>
         <v-toolbar-title class="subheading">
            {{ record.name }}
         </v-toolbar-title>
         <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
         <v-row>
            <v-col>
               <CampaignPackageList :products="products"/>
            </v-col>
         </v-row>
      </v-card-text>
   </v-card>
</template>

<script>
  import getOneMixin from "@/mixins/getOne";
  import CampaignHeader from "../../../components/pages/campaigns/CampaignHeader";
  import CampaignPackageList from "../../../components/pages/campaigns/CampaignPackageList";

  export default {
    mixins: [getOneMixin],
    components: {
      CampaignPackageList,
      CampaignHeader
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
