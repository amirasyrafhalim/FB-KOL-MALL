<template>
  <div id="data-list-list-view" class="data-list-container">

    <data-view-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" @fetchItems="fetchItems"
                       :data="sidebarData"/>

    <vs-table ref="table" v-model="selected" pagination :max-items="itemsPerPage" search :data="records"
              class="bg-transparent">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center data-list-btn-container">

          <div
            class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary"
            @click="addNewData">
            <feather-icon icon="PlusIcon" svgClasses="h-4 w-4"/>
            <span class="ml-2 text-base text-primary">Add New</span>
          </div>
        </div>

        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
          <div
            class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ records.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : records.length }} of {{ queriedItems }}</span>
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4"/>
          </div>
          <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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
        <vs-th sort-key="packages">Package</vs-th>
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

          <vs-td :data="data[indextr].packages">
            <div style="text-overflow: ellipsis; width: 250px !important; white-space: nowrap; overflow: hidden">
              <div v-for="(item,index) in tr.packages" :key="index" style="display: inline;">
                {{ item.name }},
              </div>
            </div>

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
            <vs-button :color="colorx" :gradient-color-secondary="colorx2" type="gradient" icon="library_books"
                       @click="goToConsole(tr || null)">Package
            </vs-button>

            <vs-button color="warning" type="border" icon="edit" class="ml-2" @click.stop="editData(tr)"></vs-button>
            <vs-button color="danger" type="border" icon="delete_outline" class="ml-2"
                       @click.stop="confirmDeleteRecord(tr.id)"></vs-button>
          </vs-td>

        </vs-tr>
        </tbody>
      </template>
    </vs-table>
  </div>
</template>

<script>
  import DataViewSidebar from './DataViewSidebar.vue' 

  export default {
    layout: 'main',
    components: {
      DataViewSidebar
    },
    data() {
      return {
        colorx: '#c72a75',
        colorx2: '#5252e8',
        moduleName: "campaigns",
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
      },
      shippingMethods() {
        return this.$store.state.shippingMethods.records;
      }
    },
    methods: {
      fetchItems(page = 1) {
        let params = {page: page};
        this.$store.dispatch(this.moduleName + "/fetchItems", params);
      },
      fetchShippingMethods(page = 1) {
        let params = {page: page, status: 1};
        this.$store.dispatch("shippingMethods/fetchItems", params);
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
        if (status === 'Pause') return 'warning'
        return 'primary'
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
        this.$store.dispatch(this.moduleName + "/deleteRecord", parameters)
          .then(() => {
            this.showDeleteSuccess()
          })
          .catch(err => {
            console.error(err)
          })
      },
      showDeleteSuccess() {
        this.$vs.notify({
          color: 'success',
          title: 'Campaign Deleted',
          text: 'The selected campaign was successfully deleted'
        })
      },
      goToConsole(item) {
        if (this.shippingMethods.length === 0) {
          this.$vs.notify({
            color: "danger",
            title: "Missing Shipping Methods",
            position: "bottom-left",
            text:
              "Please add or enable at least one shipping method to continue. Go to Settings > Shippings.",
          });
          return;
        }

        this.$router.push({path: this.localePath({name: 'campaigns-id', params: {id: item.id}})});
      },
    },
    created() {
      this.fetchItems();
      this.fetchShippingMethods();
    },
    mounted() {
      this.isMounted = true
    }
  }
</script>

<style lang="scss">
  #data-list-list-view {
    .vs-con-table {
      @media (max-width: 689px) {
        .vs-table--search {
          margin-left: 0;
          max-width: unset;
          width: 100%;

          .vs-table--search-input {
            width: 100%;
          }
        }
      }

      @media (max-width: 461px) {
        .items-per-page-handler {
          display: none;
        }
      }

      @media (max-width: 341px) {
        .data-list-btn-container {
          width: 100%;

          .dd-actions,
          .btn-add-new {
            width: 100%;
            margin-right: 0 !important;
          }
        }
      }

      .product-name {
        max-width: 23rem;
      }

      .vs-table--header {
        display: flex;
        flex-wrap: wrap;
        margin-left: 1.5rem;
        margin-right: 1.5rem;

        > span {
          display: flex;
          flex-grow: 1;
        }

        .vs-table--search {
          padding-top: 0;

          .vs-table--search-input {
            padding: 0.9rem 2.5rem;
            font-size: 1rem;

            & + i {
              left: 1rem;
            }

            &:focus + i {
              left: 1rem;
            }
          }
        }
      }

      .vs-table {
        border-collapse: separate;
        border-spacing: 0 1.3rem;
        padding: 0 1rem;

        tr {
          box-shadow: 0 4px 20px 0 rgba(0, 0, 0, .05);

          td {
            padding: 20px;

            &:first-child {
              border-top-left-radius: .5rem;
              border-bottom-left-radius: .5rem;
            }

            &:last-child {
              border-top-right-radius: .5rem;
              border-bottom-right-radius: .5rem;
            }
          }

          td.td-check {
            padding: 20px !important;
          }
        }
      }

      .vs-table--thead {
        th {
          padding-top: 0;
          padding-bottom: 0;

          .vs-table-text {
            text-transform: uppercase;
            font-weight: 600;
          }
        }

        th.td-check {
          padding: 0 15px !important;
        }

        tr {
          background: none;
          box-shadow: none;
        }
      }

      .vs-table--pagination {
        justify-content: center;
      }
    }

    .vs-lg-6 {
      width: 100% !important;
    }
  }
</style>

