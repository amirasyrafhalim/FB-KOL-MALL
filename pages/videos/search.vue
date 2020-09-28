<template>
  <vx-card ref="filterCard" title="Filters" class="user-list-filters mb-8" actionButtons @refresh="resetItem"
           @remove="resetItem">
    <div class="vx-row">
      <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
        <label class="text-sm opacity-75">ID</label>
        <vs-input class="w-full mb-4 md:mb-0" v-model="dataId"/>
      </div>
      <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
        <label class="text-sm opacity-75">Video ID</label>
        <vs-input class="w-full mb-4 md:mb-0" v-model="dataIdVideo"/>
      </div>
      <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
        <label class="text-sm opacity-75">Title</label>
        <vs-input class="w-full mb-4 md:mb-0" v-model="dataTitle"/>
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
        moduleName: "videos",
        dataId: '',
        dataIdVideo: '',
        dataTitle: '',
      };
    },
    methods: {
      async searchItem() {
        var item = {};

        item.streamId = this.dataId;
        item.streamVideoId = this.dataIdVideo;
        item.title = this.dataTitle;
        await this.$store.dispatch(this.moduleName + "/fetchItems", item);
        await this.$store.dispatch(this.moduleName + "/resetPagination");
      },
      async resetItem() {
        this.dataId = '';
        this.dataIdVideo = '';
        this.dataTitle = '';

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

