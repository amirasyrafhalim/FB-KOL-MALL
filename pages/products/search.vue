<template>
  <vx-card
    ref="filterCard"
    title="Filters"
    class="user-list-filters mb-8"
    actionButtons
    @refresh="resetItem"
    @remove="resetItem"
  >
    <div class="vx-row">
      <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
        <label class="text-sm opacity-75">Name</label>
        <vs-input class="w-full mb-4 md:mb-0" v-model="dataName" />
      </div>
      <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
        <label class="text-sm opacity-75">Category</label>
        <v-select
          :options="category"
          label="description"
          :clearable="false"
          v-model="dataCategory"
          class="mb-4 md:mb-0"
        />
      </div>
      <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
        <label class="text-sm opacity-75">Status</label>
        <v-select
          :options="activeStatus"
          label="description"
          :clearable="false"
          v-model="dataStatus"
          class="mb-4 md:mb-0"
        />
      </div>
      <div class="vx-col md:w-1/4 sm:w-1/2 w-full" style="padding-top: 19px">
        <vs-button color="primary" @click="searchItem()">Search</vs-button>
      </div>
    </div>
  </vx-card>
</template>

<script>
export default {
  name: "FormSearch",
  data() {
    return {
      moduleName: "products",
      dataName: "",
      dataStatus: null,
      dataCategory: null,
    };
  },
  created() {
    this.initialize();
  },
  computed: {
    activeStatus() {
      return this.$store.state[this.moduleName].activeStatus;
    },
    category() {
      return this.$store.state.categories.records;
    },
  },
  methods: {
    initialize() {
      this.$store.dispatch(`${this.moduleName}/fetchEnums`, {
        routeName: "activeStatus",
        stateKey: "activeStatus",
      });
    },
    async searchItem() {
      var item = {};

      item.name = this.dataName;

      if (this.dataStatus) {
        item.status = this.dataStatus.value;
      }
      if (this.dataCategory) {
        item.category = this.dataCategory.name;
      }
      
      await this.$store.dispatch(this.moduleName + "/fetchItems", item);
      await this.$store.dispatch(this.moduleName + "/resetPagination");
    },
    async resetItem() {
      this.dataName = "";
      this.dataStatus = null;
      this.dataCategory = null;

      this.$refs.filterCard.removeRefreshAnimation();
      await this.$store.dispatch(this.moduleName + "/fetchItems");
    },
  },
};
</script>

<style>
.feather-x {
  display: none !important;
}
</style>

