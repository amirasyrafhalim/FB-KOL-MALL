<template>
  <vx-card ref="filterCard" title="Filters" class="user-list-filters mb-8" actionButtons @refresh="resetItem"
           @remove="resetItem">
    <div class="vx-row">
      <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
        <label class="text-sm opacity-75">Name</label>
        <vs-input class="w-full mb-4 md:mb-0" v-model="dataName"/>
      </div>
      <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
        <label class="text-sm opacity-75">Partner</label>
        <v-select :options="shippingPartner" label="name" :clearable=false v-model="dataPartner" class="mb-4 md:mb-0"/>
      </div>
      <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
        <label class="text-sm opacity-75">Status</label>
        <v-select :options="activeStatus" label="description" :clearable=false v-model="dataStatus" class="mb-4 md:mb-0"/>
      </div>
      <div class="vx-col md:w-1/4 sm:w-1/2 w-full" style="padding-top: 19px">
        <vs-button color="primary" @click="searchItem()" >Search</vs-button>
      </div>
    </div>
  </vx-card>
</template>

<script>
  export default {
    name: "FormSearch",
    data() {
      return {
        moduleName: "shippingMethods",
        dataName: '',
        dataStatus: null,
        dataPartner: null,
      };
    },
    created() {
      this.initialize();
    },
    computed: {
      shippingPartner() {
        return this.$store.state.shippingPartners.records;
      },
      activeStatus() {
        return this.$store.state[this.moduleName].activeStatus;
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
        if(this.dataStatus) {
          item.status = this.dataStatus.value;
        }else if (this.dataPartner) {
          item.partner = this.dataPartner.id;
        }
        await this.$store.dispatch(this.moduleName + "/fetchItems", item);
        await this.$store.dispatch(this.moduleName + "/resetPagination");
      },
      async resetItem() {
        this.dataName = '';
        this.dataStatus = null;
        this.dataPartner = null;

        this.$refs.filterCard.removeRefreshAnimation()
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

