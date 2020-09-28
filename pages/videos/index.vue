<template>
  <div id="data-list-list-view" class="data-list-container">
    <search></search>

    <div class="vx-card">
      <vs-table
        stripe
        ref="table"
        v-model="selected"
        pagination
        :max-items="itemsPerPage"
        :data="records"
        class="bg-transparent"
      >
        <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between p-6">
          <vs-dropdown
            vs-trigger-click
            class="cursor-pointer items-per-page-handler ml-auto"
          >
            <div
              class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
            >
            <span
              class="mr-2"
            >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ records.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : records.length }} of {{ queriedItems }}</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4"/>
            </div>
            <vs-dropdown-menu>
              <vs-dropdown-item @click="itemsPerPage=10">
                <span>10</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="itemsPerPage=20">
                <span>20</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="itemsPerPage=30">
                <span>30</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="itemsPerPage=40">
                <span>40</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
        <template slot="thead">
          <vs-th sort-key="stream_id">ID</vs-th>
          <vs-th sort-key="stream_video_id">Video ID</vs-th>
          <vs-th sort-key="title">Title</vs-th>
          <vs-th sort-key="start_at">Broadcast At</vs-th>
          <vs-th sort-key="created_at">Created At</vs-th>
          <vs-th>Action</vs-th>
        </template>

        <template slot-scope="{data}">
          <tbody>
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="data[indextr].stream_id">{{ tr.stream_id }}</vs-td>
            <vs-td :data="data[indextr].stream_video_id">{{ tr.stream_video_id }}</vs-td>
            <vs-td :data="data[indextr].title">{{ tr.title }}</vs-td>
            <vs-td :data="data[indextr].start_at">{{ tr.start_at }}</vs-td>
            <vs-td :data="data[indextr].created_at">{{ tr.created_at }}</vs-td>
            <vs-td class="whitespace-no-wrap">
              <vs-button color="primary" type="border" icon="videocam" class="ml-2" :to="localePath({ name: 'videos-id', params: { id: tr.id } })"></vs-button>
            </vs-td>
          </vs-tr>
          </tbody>
        </template>
      </vs-table>
    </div>
  </div>
</template>

<script>
  import search from './search'

  export default {
    layout: "main",
    components: {
      search
    },
    data() {
      return {
        moduleName: "videos",
        selected: [],
        itemsPerPage: 10,
        isMounted: false,
        addNewDataSidebar: false,
        sidebarData: {},
      };
    },
    computed: {
      currentPage() {
        if (this.isMounted) {
          return this.$refs.table.currentx;
        }
        return 0;
      },
      records() {
        return this.$store.state[this.moduleName].records;
      },
      queriedItems() {
        return this.$refs.table
          ? this.$refs.table.queriedResults.length
          : this.records.length;
      },
    },
    created() {
      this.fetchItems();
    },
    mounted() {
      this.isMounted = true;
    },
    methods: {
      fetchItems(page = 1) {
        let params = {page: page};
        this.$store.dispatch(this.moduleName + "/fetchItems", params);
      },
    },
  };
</script>

<style lang="scss">
  #data-list-list-view {
    .vs-lg-6 {
      width: 100% !important;
    }

    .vs-con-table {
      .vs-con-tbody {
        border: none !important;
      }
    }
  }
</style>
