<template>
  <div id="data-list-list-view" class="data-list-container">
    <vs-table
      ref="table"
      v-model="selected"
      pagination
      :max-items="itemsPerPage"
      search
      :data="records"
      class="bg-transparent"
    >
      <template slot="thead" class="text-center">
        <vs-th sort-key="user.name">Name</vs-th>
        <vs-th sort-key="invoice_no">Invoice Number</vs-th>
        <vs-th sort-key="campaign.name">Campaign Name</vs-th>
        <vs-th sort-key="delivery.tracking_no">Tracking Number</vs-th>
        <vs-th sort-key="total_amount">Total Amount</vs-th>
        <vs-th sort-key="created_at">Date</vs-th>
        <vs-th sort-key="status">Order Status</vs-th>
        <vs-th sort-key="status">Payment Status</vs-th>
        <vs-th sort-key="deliver_at">Action</vs-th>
      </template>

      <template slot-scope="{ data }">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <vs-td>
            {{ tr.user && tr.user.name || '-' }}</vs-td
          >

          <vs-td >{{ tr.invoice_no || '-' }}</vs-td>
          <vs-td> {{ (tr.campaign && tr.campaign.name) || '-'}}</vs-td>
          <vs-td>
            {{ (tr.delivery && tr.delivery.tracking_no) || "-" }}
          </vs-td>
          <vs-td :data="data[indextr].total_amount"> {{ tr.total_amount || '-'  }}</vs-td>

          <vs-td>
            {{ tr.created_at || '-' }}
          </vs-td>
          <vs-td>
            <vs-chip
              :color="getOrderStatusColor(tr.status.value)"
              class="payment-status p-2"
              >{{ tr.status && tr.status.description }}</vs-chip
            >
          </vs-td>
          <!-- {{tr}} -->
          <vs-td :data="data[indextr].payment">
            <vs-chip
            v-if="tr.order_payment"
              :color="getOrderPaymentStatusColor(tr.order_payment)"
              class="p-2 mx-auto"
              >{{ orderStatus }}</vs-chip
            >
            <p v-else class="text-center"> Not available </p>
          </vs-td>

          <vs-td class="whitespace-no-wrap">
            <nuxt-link
              :to="localePath({ name: 'orders-id', params: { id: tr.id } })"
            >
              <vs-button color="danger" type="gradient" class="text-xs"
                >{{ "View" }}
              </vs-button>
            </nuxt-link>
            <vs-button
              v-if="tr.delivery"
              color="primary"
              class="text-xs"
              type="gradient border"
              @click="activePromptFn(indextr)"
              >{{ "Tracking Info" }}
            </vs-button>
          </vs-td>
        </vs-tr>
        <vs-prompt
          @cancel="val = ''"
          @accept="updateTracking()"
          @close="close"
          :active.sync="activePrompt"
          title="Update Tracking Number"
        >
          <div class="con-exemple-prompt">
            <vs-input
              placeholder="Tracking Number"
              vs-placeholder="Tracking Number"
              v-model="tracking_no_id"
              class="mt-3 w-full"
            />
          </div>
        </vs-prompt>
      </template>
    </vs-table>
  </div>
</template>

<script>
import UpdateDeliveryModal from "@/components/pages/orders/UpdateDeliveryModal";

export default {
  layout: "main",
  components: {
    UpdateDeliveryModal
  },
  data() {
    return {
      moduleName: "orders",
      selected: [],
      activePrompt: false,
      itemsPerPage: 4,
      isMounted: false,
      shippingPartners: {},
      tracking_no: [],
      tracking_no_id: "",
      orderDeliveryId: "",
      partner: "",
      orderStatus: "",
      selectedPartner: ""
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
      const record = this.$store.state[this.moduleName].records;
      this.tracking_no = [];
      record.forEach((data, i) => {
        if (data.delivery && data.delivery.length > 0) {
          if (data.delivery.tracking_no != null) {
            this.tracking_no.push(data.delivery.tracking_no);
          } else {
            this.tracking_no.push(null);
          }
        }
      });

      return this.$store.state[this.moduleName].records;
    },
    queriedItems() {
      return this.$refs.table
        ? this.$refs.table.queriedResults.length
        : this.records.length;
    }
  },
  methods: {
    getOrderStatusColor(status) {
      if (status === 1) return "success";
      if (status === 2) return "danger";
      if (status === 3) return "warning";
      if (status === 4) return "warning";
      if (status === 5) return "warning";
      if (status === 6) return "warning";
    },
    getOrderPaymentStatusColor(orderPayment) {
      console.log('orderPayment', orderPayment)
      var statusInt = 1;
      if (orderPayment) {
        if (orderPayment.status == 0) {
          this.orderStatus = "Failed";
        } else if (orderPayment.status == 1) {
          this.orderStatus = "Pending";
        } else if (orderPayment.status == 2) {
          this.orderStatus = "Success";
        }
      }

      if (this.orderStatus === "Success") return "success";
      if (this.orderStatus === "Failed") return "danger";
      if (this.orderStatus === "Pending") return "warning";
    },
    setSelected(value) {
      //  trigger a mutation, or dispatch an action
    },
    activePromptFn(orderDeliveryId) {
      this.orderDeliveryId = this.records[orderDeliveryId].delivery.id;
      this.tracking_no_id = this.tracking_no[orderDeliveryId];
      this.activePrompt = true;
    },
    async updateTracking() {
      var res = await this.$api.orderDeliveries.updateOrderDelivery(
        { tracking_no: this.tracking_no_id, partner: this.partner },
        this.orderDeliveryId
      );
      if (res) {
        this.showSuccess();
      }
      await this.fetchItems();
    },
    showSuccess() {
      this.$vs.notify({
        color: "success",
        title: "Update tracking number",
        text: "The selected tracking number was successfully updated"
      });
    },

    close() {
      this.$vs.notify({
        color: "danger",
        title: "Closed",
        text: "You close a dialog!"
      });
    },
    fetchItems() {
      this.$store.dispatch(this.moduleName + "/fetchItems");
    },
    addNewData() {
      this.sidebarData = {};
      this.toggleDataSidebar(true);
    },
    editData(data) {
      this.sidebarData = data;
      this.toggleDataSidebar(true);
    },
    toggleDataSidebar(val = false) {
      this.addNewDataSidebar = val;
    }
  },
  created() {
    this.fetchItems();
  },
  mounted() {
    this.isMounted = true;
  }
};
</script>

<style lang="scss">
.vuesax-app-is-ltr .vs-chip--text {
  margin-left: 0 !important;
  padding: 0px 10px;
}
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
    .vs-lg-6 {
      width: 100% !important;
    }
  }
}
</style>
