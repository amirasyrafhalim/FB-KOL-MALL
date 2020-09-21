<template>
  <div id="data-list-list-view" class="data-list-container">
    <!-- <vs-select
      class="selectExample"
      label="Figuras"
      v-model="selectedStatus"
      @change="selectOrderStatusFn()"
      >
      <vs-select-item :key="item.value" :value="item.value" :text="item.description" v-for="item in orderStatus" />
    </vs-select> -->

    <vs-table :data="records">
      <template slot="thead" class="text-center">
        <vs-th sort-key="invoice_no">Invoice No</vs-th>
        <vs-th sort-key="total_amount">Total Amount (RM)</vs-th>
        <vs-th sort-key="status">Order Status</vs-th>
        <vs-th sort-key="status">Payment Status</vs-th>
        <vs-th sort-key="created_at">Date Order</vs-th>
        <vs-th sort-key="deliver_at">Action</vs-th>
      </template>

      <template slot-scope="{ data }">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
        
          <vs-td>
            {{ tr.invoice_no || "-" }}
          </vs-td>

          <vs-td>
            {{ tr.total_amount || "-" }}
          </vs-td>

          <vs-td>
            {{ (tr.status && tr.status.description) || "-" }}
          </vs-td>
          <vs-td class="mx-auto">
            <div
              v-if="tr.payment"
              :color="getOrderPaymentStatusColor(tr.payment.status)"
            >
              {{ tr.payment.status.description }}
            </div>
            <p v-else>Not available</p>
          </vs-td>
            <vs-td>
            {{ tr.created_at || "-" }}
          </vs-td>

          <vs-td>
            <nuxt-link
              :to="localePath({ name: 'orders-id', params: { id: tr.id } })"
            >
              <vs-button color="danger" type="border" icon="visibility">
              </vs-button>
            </nuxt-link>

            <vs-button
              v-if="tr.delivery"
              color="primary"
              type="border"
              class="ml-2"
              @click="activePromptFn(indextr)"
            >
            Tracking Info
            </vs-button>
          </vs-td>

          <template class="expand-user text-center" slot="expand">
            <div class="con-expand-users ml-5 pl-5" style="width:100%">
              <table>
                 <tr>
                  <td width="15%" class="font-bold">Campaign Name</td>
                  <td width="1%">:</td>
                  <td>{{ tr.campaign && tr.campaign.name  }}</td>
                </tr>
                <tr>
                  <td class="font-bold">Buyer Name</td>
                  <td width="1%">:</td>
                  <td>{{ tr.user && tr.user.name }}</td>
                </tr>
                <tr>
                  <td class="font-bold">Tracking Number</td>
                  <td width="1%">:</td>
                  <td>{{ tr.tracking_no || '-' }}</td>
                </tr>
                
              </table>
            </div>
          </template>
        </vs-tr>
      </template>
    </vs-table>

    <!-- prompt update tracking number -->
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
      orderStatus: [
        {
          value: 0,
          key: "Failed",
          description: "Failed"
        },
        {
          value: 1,
          key: "Success",
          description: "Success"
        },
        {
          value: 2,
          key: "Pending",
          description: "Pending"
        }
      ],
      selectedPartner: "",
      selectedStatus: ""
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
    selectOrderStatusFn(value) {
      console.log(value);
    },
    getOrderStatusColor(status) {
      if (status === 1) return "success";
      if (status === 2) return "warning";
      if (status === 3) return "warning";
      if (status === 4) return "warning";
      if (status === 5) return "danger";
      if (status === 6) return "danger";
    },
    getOrderPaymentStatusColor(paymentStatus) {
      if (paymentStatus.value === 0) return "danger";
      if (paymentStatus.value === 1) return "success";
      if (paymentStatus.value === 2) return "warning";
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
    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>
