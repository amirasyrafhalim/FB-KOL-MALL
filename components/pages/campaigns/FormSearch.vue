<template>
      <v-row>
        <v-col sm="6" md="6">
          <v-text-field
            :label="$t('label.campaignName')"
            v-model="formModel.name"
            hide-details
            elevation="20"
            solo
            dense
            class="mb-5 border-radius-button"
          >
          </v-text-field>
        </v-col>
         <search-form-action v-on:search="search()" v-on:reset="reset()" />
      </v-row>
</template>

<script>
import SearchFormAction from "@/components/widgets/forms/SearchFormAction";

export default {
  props: ["moduleName"],
  components: {
    SearchFormAction
  },
  data() {
    return {
      status:[ 1,2],
      formModel: {
        name: "",
        // stream_id: null,
        // status: null
      }
    };
  },
  computed: {
    statusEnums() {
      return this.$store.state[this.moduleName].statusEnums;
    }
  },
  created() {
    // this.$store.dispatch(`${this.moduleName}/fetchEnums`, {
    //   routeName: "campaignStatus",
    //   stateKey: "statusEnums"
    // });
  },
  methods: {
    async search() {
      await this.$store.dispatch(this.moduleName + "/fetchItems", {
        ...this.formModel
      });
      await this.$store.dispatch(this.moduleName + "/resetPagination");
    },
    reset() {
      this.$helper.clearSearchForm(this.formModel);
      this.$store.dispatch(this.moduleName + "/fetchItems", {
        ...this.formModel
      });
      this.$store.dispatch(this.moduleName + "/resetPagination");
    }
  }
};
</script>
