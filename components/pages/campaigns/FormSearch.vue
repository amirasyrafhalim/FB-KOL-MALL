<template>
  <v-card class="components__merchants-form-search mb-5">
    <v-card-text class="pt-0">
      <v-row>
        <v-col sm="2" md="2">
          <v-text-field
            :label="$t('label.streamId')"
            v-model="formModel.stream_id"
            hide-details
            elevation="20"
            solo
            dense
          ></v-text-field>
        </v-col>
        <!-- <v-col sm="2" md="2">
          <v-select
            :label="$t('label.status')"
            hide-details
            :items="status"
            v-model="formModel.status"
            clearable
            elevation="20"
            solo
            dense
          ></v-select>
        </v-col> -->
        <v-col sm="2" md="2">
          <v-text-field
            :label="$t('label.name')"
            v-model="formModel.name"
            hide-details
            elevation="20"
            solo
            dense
          >
          </v-text-field>
        </v-col>
         <search-form-action v-on:search="search()" v-on:reset="reset()" />
      </v-row>
    </v-card-text>
  </v-card>
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
        name: null,
        stream_id: null,
        status: null
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
