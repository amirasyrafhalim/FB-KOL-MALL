<template>
  <div id="data-list-list-view" class="data-list-container">
    <data-view-sidebar-package :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar"
                               @fetchItems="fetchItems" :data="sidebarData"/>

    <search></search>

    <div class="vx-card">

    <vs-table ref="table" v-model="selected" stripe pagination :max-items="itemsPerPage" :data="records"
              class="bg-transparent">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between p-6">

        <div class="flex flex-wrap-reverse items-center data-list-btn-container">

          <div
            class="btn-add-new p-3 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary"
            @click="addNewData">
            <feather-icon icon="PlusIcon" svgClasses="h-4 w-4"/>
            <span class="ml-2 text-base text-primary">Add New</span>
          </div>
        </div>

        <vs-dropdown vs-trigger-click class="cursor-pointer items-per-page-handler">
          <div
            class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ records.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : records.length }} of {{ queriedItems }}</span>
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
        <vs-th sort-key="name">Name</vs-th>
        <vs-th sort-key="sell_method.description">Sell Method</vs-th>
        <vs-th sort-key="keyword">Keyword</vs-th>
        <vs-th sort-key="quantity">Quantity</vs-th>
        <vs-th sort-key="price">Price (RM)</vs-th>
        <vs-th sort-key="status.description">Status</vs-th>
        <vs-th sort-key="created_at">Created At</vs-th>
        <vs-th>Action</vs-th>
      </template>

      <template slot-scope="{data}">
        <tbody>
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

          <vs-td :data="data[indextr].name">
            {{ tr.name }}
          </vs-td>

          <vs-td :data="data[indextr].sell_method.description">
            {{tr.sell_method.description }}
          </vs-td>

          <vs-td :data="data[indextr].keyword">
            {{ tr.keyword }}
          </vs-td>

          <vs-td :data="data[indextr].quantity">
            {{ tr.quantity }}
          </vs-td>

          <vs-td :data="data[indextr].price">
            {{ tr.price }}
          </vs-td>

          <vs-td :data="data[indextr].status.description">
            <vs-chip :color="getOrderStatusColor(tr.status.description)" class="product-order-status">
              {{tr.status.description }}
            </vs-chip>
          </vs-td>

          <vs-td :data="data[indextr].created_at">
            {{ tr.created_at }}
          </vs-td>

          <vs-td class="whitespace-no-wrap">
            <vs-button color="warning" type="border" icon="edit" class="ml-2" @click.stop="editData(tr)"></vs-button>
            <vs-button color="danger" type="border" icon="delete_outline" class="ml-2"
                       @click.stop="confirmDeleteRecord(tr.id)"></vs-button>
          </vs-td>
        </vs-tr>
        </tbody>
      </template>
    </vs-table>
    </div>

  </div>

</template>

<script>
  import DataViewSidebarPackage from './DataViewSidebarPackage'
  import search from './search'

  export default {
    layout: 'main',
    components: {
      DataViewSidebarPackage,
      search
    },
    data() {
      return {
        moduleName: "packages",
        selected: [],
        itemsPerPage: 10,
        isMounted: false,
        addNewDataSidebar: false,
        sidebarData: {}
      }
    },
    computed: {
      currentPage() {
        if (this.isMounted) {
          return this.$refs.table.currentx
        }
        return 0
      },
      records() {
        return this.$store.state[this.moduleName].records;
      },
      queriedItems() {
        return this.$refs.table ? this.$refs.table.queriedResults.length : this.records.length
      }
    },
    methods: {
      fetchItems(page = 1) {
        let params = {page: page, campaign_id: this.$route.params.id};
        this.$store.dispatch(this.moduleName + "/fetchItems", params);
      },
      addNewData() {
        this.sidebarData = {}
        this.toggleDataSidebar(true)
      },
      editData(data) {
        this.sidebarData = data
        this.toggleDataSidebar(true)
      },
      getOrderStatusColor(status) {
        if (status === 'Active') return 'success'
        if (status === 'Inactive') return 'danger'
      },
      toggleDataSidebar(val = false) {
        this.addNewDataSidebar = val
      },
      confirmDeleteRecord(id) {
        this.$vs.dialog({
          type: 'confirm',
          color: 'danger',
          title: 'Are you sure?',
          text: `You won't be able to revert this!`,
          accept: this.deleteRecord,
          parameters: id
        })
      },
      deleteRecord(parameters) {
        this.$store.dispatch(this.moduleName + "/delete", parameters)
          .then(() => {
            this.showDeleteSuccess()
            this.fetchItems()
          })
          .catch(err => {
            console.error(err)
          })
      },
      showDeleteSuccess() {
        this.$vs.notify({
          color: 'success',
          title: 'Package Deleted',
          text: 'The selected package was successfully deleted',
          position: 'bottom-left',
        })
      }
    },
    created() {
      this.fetchItems();
    },
    mounted() {
      this.isMounted = true
    }
  }
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

