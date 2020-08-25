<template>
  <!-- <v-card class="components__campaigns-form-search mb-5">
    <v-card-text class="pt-0"> -->
      <v-row class="components__campaigns-form-search mb-5">
        <v-col cols="auto">
          <v-select
            class="my-2 border-radius-button"
            dense
            solo
            :items="statusEnums"
            :label="$t('label.category')"
            item-text="description"
            item-value="value"
            hide-details
            v-model="formModel.category"
          ></v-select>
        </v-col>
        <v-col cols="auto">
          <v-select
            class="my-2 border-radius-button"
            dense
            solo
            :items="statusEnums"
            :label="$t('label.status')"
            item-text="description"
            item-value="value"
            hide-details
            v-model="formModel.status"
          ></v-select>
        </v-col>
        <v-col cols="auto">
          <v-text-field
            hide-details
            class="my-2 border-radius-button"
            dense
            solo
            type="text"
            :label="$t('label.keyword')"
            v-model="formModel.keyword"
          ></v-text-field>
        </v-col>
        <v-col class="my-auto">
          <v-btn color="primary" class="border-radius-button text-capitalize w-30 large-button" @click="search">
            {{ $t("label.search") }}
          </v-btn>
          <!-- <search-form-action v-on:search="search()" v-on:reset="reset()" ></search-form-action> -->
        </v-col>
      </v-row>
    <!-- </v-card-text>
  </v-card> -->
</template>

<script>
import SearchFormAction from "@/components/widgets/forms/SearchFormAction";

export default {
  name: "FormSearch",
  props: ["moduleName"],
  components: {
    SearchFormAction
  },
  data() {
    return {
      formModel: {
        category: null,
        status: null,
        keyword: null
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
    //   routeName: "productStatus",
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

<style scoped></style>
