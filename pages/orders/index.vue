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
      <!-- <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
        <div class="flex flex-wrap-reverse items-center data-list-btn-container">
        </div>
      </div> -->

      <template slot="thead">
        <vs-th sort-key="user.name">Name</vs-th>
        <vs-th sort-key="invoice_no">Invoice Number</vs-th>
        <vs-th sort-key="campaign.name">Campaign Name</vs-th>
        <vs-th sort-key="order_deliveries.tracking_no">Tracking Number</vs-th>
        <vs-th sort-key="total_amount">Total Amount</vs-th>
        <vs-th sort-key="status">Status</vs-th>
        <vs-th sort-key="deliver_at">Action</vs-th>
      </template>

      <template slot-scope="{ data }">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="tr.user.name">
            {{ tr.user && tr.user.name }}
          </vs-td>

          <vs-td :data="tr.invoice_no">
            {{ tr.invoice_no }}
          </vs-td>
          <vs-td :data="tr.campaign.name">
            {{ tr.campaign && tr.campaign.name }}
          </vs-td>
          <vs-td :data="tr.order_deliveries.tracking_no">
            {{ tr.order_deliveries && tr.order_deliveries.tracking_no }}
          </vs-td>

          <vs-td :data="tr.total_amount">
            {{ tr.total_amount }}
          </vs-td>

          <vs-td :data="tr.status">
            {{ tr.status && tr.status.description }}
          </vs-td>

          <vs-td :data="tr.status">
            <feather-icon
              icon="EditIcon"
              class="mr-1"
              @click="activePromptFn(indextr)"
            />
            <!-- <feather-icon  :icon="card_4.footer_text_1_icon" svgClasses="h-5 w-5 text-warning stroke-current" /> -->
            <!-- <vs-button color="primary" type="border">Update Tracking Number</vs-button> -->

            <vs-prompt
              @cancel="val = ''"
              @accept="updateTracking()"
              @close="close"
              :active.sync="activePrompt"
              title="Update Tracking Number"
            >
              <div class="con-exemple-prompt">
                <v-select
                  :options="shippingPartners"
                  label="name"
                  @input="fetchPartners"
                  v-model="selected"
                  :value="selected" 
                ></v-select>
                <vs-input
                  placeholder="Tracking Number"
                  vs-placeholder="Tracking Number"
                  v-model="tracking_no"
                  class="mt-3 w-full"
                />
              </div>
            </vs-prompt>
          </vs-td>
        </vs-tr>
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
      tracking_no: "",
      orderDeliveryId: "",
      partner: ""
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
    }
  },
  methods: {
    setSelected(value) {
      console.log(value)
     //  trigger a mutation, or dispatch an action  
  },
    activePromptFn(orderDeliveryId) {
      this.orderDeliveryId = this.records[orderDeliveryId].order_deliveries.id;
      this.activePrompt = true;
    },
    async fetchPartners(value) {
      if(value) {
        this.partner = value.name;
      }
      var a = await this.$api.shippingPartners.getAll();
      this.shippingPartners = a.data;
    },
    async updateTracking() {
      var res = await this.$api.orderDeliveries.updateOrderDelivery(
        { tracking_no: this.tracking_no, partner: this.partner },
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
        title: "Update racking number",
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
    this.fetchPartners();
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
}
</style>
