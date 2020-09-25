<template>
  <vx-card ref="filterCard" title="Filters" class="user-list-filters mb-8" actionButtons >
      <div class="vx-row">
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Name</label>
          <vs-input class="w-full" v-model="dataName" />
        </div>
         <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Category</label>
          <v-select :options="categoryOptions" label="name" v-model="dataCategory" class="mb-4 sm:mb-0" @input="searchItem($event, 'category')"/>
        </div>
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Status</label>
          <v-select :options="statusEnums" label="description" v-model="dataStatus" class="mb-4 md:mb-0" @input="searchItem($event, 'status')"/>
        </div>
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Price</label>
           <vs-input class="w-full" v-model="dataPrice" />
        </div>
      </div>
    </vx-card>
</template>

<script>

export default {
  name: "FormSearch",
  props: ["moduleName"],
  data() {
    return {
     dataName: null,
     dataCategory: null,
     dataPrice: null,
     dataStatus: null
    };
  },
  created() {
    this.initialize();
  },
  computed: {
    categoryOptions() {
      return this.$store.state.categories.records;
    },
    statusEnums() {
      return this.$store.state[this.moduleName].statusEnums;
    },
  },
  methods: {
    initialize() {
      console.log(this.moduleName)
      this.$store.dispatch(`${this.moduleName}/fetchEnums`, {
        routeName: "activeStatus",
        stateKey: "statusEnums",
      });
    },
    async searchItem(data, field) {
      var a = {};

      a.status = this.dataStatus;
      if (field == "status") {
        a.status = data.value;
      }
      if (field == "category") {
        a.category = data.id;
      }

      await this.$store.dispatch(this.moduleName + "/fetchItems", a);
      await this.$store.dispatch(this.moduleName + "/resetPagination");
    },
  },
};
</script>

<style scoped>
.radius {
  border-radius: 25px !important;
}
.flex-end {
  justify-content: flex-end;
}
</style>
