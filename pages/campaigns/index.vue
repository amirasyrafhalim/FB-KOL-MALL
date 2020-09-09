<template>
  <div id="ag-grid-demo">
    <vx-card>
      <div class="flex flex-wrap justify-between items-center">

        <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
          <vs-dropdown vs-trigger-click class="cursor-pointer">
            <div
              class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
              <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ records.length - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : records.length }} of {{ records.length }}</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4"/>
            </div>

            <vs-dropdown-menu>

              <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                <span>20</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(50)">
                <span>50</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(100)">
                <span>100</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(150)">
                <span>150</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>

        <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
          <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Search..."/>
          <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()">Export as CSV</vs-button>
        </div>
      </div>

      <ag-grid-vue
        ref="agGridTable"
        :components="components"
        :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="records"
        rowSelection="multiple"
        colResizeDefault="shift"
        :animateRows="true"
        :floatingFilter="true"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :suppressPaginationPanel="true"
        style="width: 100%;"
        :enableRtl="$vs.rtl">

      </ag-grid-vue>
      <vs-pagination
        :total="totalPages"
        :max="maxPageNumbers"
        v-model="currentPage"/>
    </vx-card>
  </div>
</template>

<script>
  import {AgGridVue} from 'ag-grid-vue'
  import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'

  import CellRendererStatus from './cell-renderer/CellRendererStatus.vue'
  import CellRendererActions from './cell-renderer/CellRendererActions.vue'

  export default {
    layout: "main",
    components: {
      AgGridVue,
      CellRendererStatus,
      CellRendererActions
    },
    data() {
      return {
        moduleName: "campaigns",
        searchQuery: '',
        gridOptions: {},
        maxPageNumbers: 7,
        gridApi: null,
        defaultColDef: {
          sortable: true,
          editable: true,
          resizable: true,
          suppressMenu: true,
          suppressAutoSize: true
        },
        columnDefs: [
          {
            headerName: 'Name',
            field: 'name',
            filter: true,
          },
          {
            headerName: 'Merchant Name',
            field: 'merchant.name',
            filter: true,
          },
          {
            headerName: 'Status',
            field: 'status.description',
            filter: true,
            cellRendererFramework: 'CellRendererStatus'
          },
          {
            headerName: 'Created By',
            field: 'created.name',
            filter: true,
          },
          {
            headerName: 'Updated By',
            field: 'updated.name',
            filter: true,
          },
          {
            headerName: 'Actions',
            field: 'transactions',
            cellRendererFramework: 'CellRendererActions'
          },
        ],
        components: {
          CellRendererStatus,
          CellRendererActions
        }
      }
    },
    computed: {
      records() {
        return this.$store.state[this.moduleName].records;
      },
      paginationPageSize() {
        if (this.gridApi) return this.gridApi.paginationGetPageSize()
        else return 50
      },
      totalPages() {
        if (this.gridApi) return this.gridApi.paginationGetTotalPages()
        else return 0
      },
      currentPage: {
        get() {
          if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
          else return 1
        },
        set(val) {
          this.gridApi.paginationGoToPage(val - 1)
        }
      }
    },
    created() {
      this.fetchItems();
    },
    methods: {
      updateSearchQuery(val) {
        this.gridApi.setQuickFilter(val)
      },
      fetchItems() {
        this.$store.dispatch(this.moduleName + "/fetchItems");
      }
    },
    mounted() {
      this.gridApi = this.gridOptions.api
      this.gridApi.sizeColumnsToFit()

      if (this.$vs.rtl) {
        const header = this.$refs.agGridTable.$el.querySelector('.ag-header-container')
        header.style.left = `-${String(Number(header.style.transform.slice(11, -3)) + 9)}px`
      }
    }
  };
</script>
