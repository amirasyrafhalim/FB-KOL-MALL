<template>
  <div id="data-list-list-view" class="data-list-container">
    <div v-if="merchant.payment_method_id == null">
      <vx-card>
        <div>
          <div class="vx-col w-full">
            <div
              class="vx-col flex items-center justify-center flex-col sm:w-1/2 md:w-3/5 lg:w-3/4 xl:w-1/2 mx-auto text-center"
            >
              <h3 class="sm:mx-0 mx-4 mb-2 font-semibold">
                Add Payment Method
              </h3>
              <h5 class="font-normal">
                Enable payment methods to accept offline payment
              </h5>
              <h5 class="sm:mx-0 mx-4 mb-6 font-normal">
                and other payment methods during checkout.
              </h5>
            </div>

            <div class="mt-5 flex items-center justify-center mb-5">
              <div
                class="flex flex-wrap-reverse items-center data-list-btn-container"
              >
                <data-view-sidebar
                  :isSidebarActive="addNewDataSidebar"
                  @closeSidebar="toggleDataSidebar"
                  @fetchItem="fetchItem"
                  :data="sidebarData"
                />
                <vs-button
                  color="primary"
                  type="filled"
                  size="large"
                  @click="addNewData"
                >
                  <span class="ml-2 ">Add Payment Method</span>
                </vs-button>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>

    <div v-if="merchant.payment_method_id != null">
      <data-view-sidebar
        :isSidebarActive="addNewDataSidebar"
        @closeSidebar="toggleDataSidebar"
        @fetchItem="fetchItem"
        :data="sidebarData"
      />
      <div class="flex flex-wrap-reverse items-center data-list-btn-container">
        <div
          class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary"
          @click="addNewData"
        >
          <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
          <span class="ml-2 text-base text-primary">Add New</span>
        </div>
      </div>

      <vs-th>Payment Method</vs-th>
      <vs-th>Action</vs-th>
      <div v-for="(item, index) in merchant.payment_method_id" :key="index">
        <vx-card class="mb-2" v-if="item == 1">
          <span>Xenopay</span>
        </vx-card>
        <vx-card class="mb-2" v-if="item == 2">
          <span>Offline</span>
        </vx-card>
      </div>
    </div>
  </div>
</template>

<script>
import DataViewSidebar from "./DataViewSidebar.vue";
export default {
  layout: "main",
  components: {
    DataViewSidebar,
  },

  data() {
    return {
      moduleName: "merchants",
      activeConfirm: false,
      selected: [],
      itemsPerPage: 4,
      isMounted: false,
      addNewDataSidebar: false,
      sidebarData: {},
      payment_method_id: []
    };
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.table.currentx;
      }
      return 0;
    },

    merchant() {
      return this.$store.state.merchants.record;
    },

    queriedItems() {
      return this.$refs.table
        ? this.$refs.table.queriedResults.length
        : this.records.length;
    }
  },
  methods: {
    async getPaymentMethodEnum() {
      try {
        const { data } = await this.$api.enums.paymentMethod();
        console.log("enumss", data);
        this.paymentMethodEnums = data;
      } catch (error) {
        console.error("[API Service] Get Payment Method Error:", error);
      }
    },

    async fetchItem() {
      await this.$store.dispatch(
        "merchants/fetchItem",
        this.$store.state.auth.user.merchant.id
      );
    },

    addNewData() {
      this.sidebarData = {};
      this.toggleDataSidebar(true);
    },
    confirmDeleteRecord(id) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: "Confirm Delete",
        text: "You are about to delete",
        accept: this.deleteRecord,
        parameters: id
      });
    },
    deleteRecord: function(parameters) {
      // /* Below two lines are just for demo purpose */
      // this.showDeleteSuccess()

      /* UnComment below lines for enabling true flow if deleting user */
      this.$store
        .dispatch(this.moduleName + "/deleteRecord", parameters)
        .then(() => {
          this.showDeleteSuccess();
        })
        .catch(err => {
          console.error(err);
        });
    },
    showDeleteSuccess() {
      this.$vs.notify({
        color: "success",
        title: "Product Deleted",
        text: "The selected product was successfully deleted",
        position: "bottom-left"
      });
    },
    editData(data) {
      this.sidebarData = data;
      this.toggleDataSidebar(true);
    },
    toggleDataSidebar(val = false) {
      this.addNewDataSidebar = val;
    },
    getOrderStatusColor(status) {
      if (status === "Active") return "success";
      if (status === "Inactive") return "danger";
      return "primary";
    }
  },

  created() {
    this.fetchItem();
    this.getPaymentMethodEnum();
  },
  mounted() {
    this.isMounted = true;
  }
};
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
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);

        td {
          padding: 20px;

          &:first-child {
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
          }

          &:last-child {
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
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
