<template>
  <div id="data-list-list-view" class="data-list-container">
    <form-search :module-name="moduleName" />
    <vs-table
      ref="table"
      v-model="selected"
      pagination
      :max-items="itemsPerPage"
      :data="records"
      class="bg-transparent"
    >
      <div
        slot="header"
        class="flex flex-wrap-reverse items-center flex-grow justify-between"
      >
        <div  
          class="flex flex-wrap-reverse items-center data-list-btn-container"
        ></div>
        <vs-dropdown
          vs-trigger-click
          class="cursor-pointer mb-4 mr-4 items-per-page-handler"
        >
          <div
            class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
          >
            <span class="mr-2"
              >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} -
              {{
                records.length - currentPage * itemsPerPage > 0
                  ? currentPage * itemsPerPage
                  : records.length
              }}
              of {{ queriedItems }}</span
            >
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>
          <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
          <vs-dropdown-menu>
            <vs-dropdown-item @click="itemsPerPage = 10">
              <span>10</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage = 20">
              <span>20</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage = 30">
              <span>30</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage = 40">
              <span>40</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>
      <template slot="thead" class="text-center">
        <vs-th sort-key="invoice_no">{{ $t("label.invoiceNo") }}</vs-th>
        <vs-th sort-key="total_amount">{{ $t("label.campaignName") }}</vs-th>
        <vs-th sort-key="total_amount">{{ $t("label.buyerName") }}</vs-th>
        <vs-th sort-key="total_amount">{{ $t("label.trackingNo") }}</vs-th>
        <vs-th sort-key="total_amount">{{ $t("label.totalAmount") }}</vs-th>

        <vs-th sort-key="status">{{ $t("label.orderStatus") }}</vs-th>
        <vs-th sort-key="status">{{ $t("label.paymentStatus") }}</vs-th>
        <vs-th sort-key="created_at">{{ $t("label.dateOrder") }}</vs-th>
        <vs-th sort-key="deliver_at">{{ $t("label.actions") }}</vs-th>
      </template>

      <template slot-scope="{ data }">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <vs-td>
            {{ tr.invoice_no || "-" }}
          </vs-td>
          <vs-td>
            {{ (tr.campaign && tr.campaign.name) || "-" }}
          </vs-td>
          <vs-td>
            {{ (tr.detail && tr.detail.name) || "-" }}
          </vs-td>
         
           <vs-td v-if="tr.delivery">
            <p  @click="activePromptFn(indextr)" style="text-decoration: underline">{{ (tr.delivery && tr.delivery.tracking_no) || "Update Tracking Number" }}</p>
          </vs-td>
          <vs-td v-else>
            <p>Not Availble</p>
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
              {{ (tr.payment.status && tr.payment.status.description) || '-' }}
            </div>
            <p v-else>{{ $t("label.notAvailable") }}</p>
          </vs-td>
          <vs-td>
            {{ tr.created_at || "-" }}
          </vs-td>

          <vs-td class="whitespace-no-wrap">
              <nuxt-link style="color: inherit" :to=" localePath({ name: 'orders-id', params: { id: tr.id } })">
                 <vs-button color="danger" type="border" icon="info" class="ml-2">  </vs-button>
              </nuxt-link>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
    <!-- prompt update tracking number -->
    <vs-prompt
      @cancel="val = ''"
      @accept="updateTracking()"
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
import FormSearch from "@/components/pages/orders/FormSearch";

export default {
  layout: "main",
  components: {
    UpdateDeliveryModal,
    FormSearch
  },
  data() {
    return {
      moduleName: "orders",
      selected: [],
      activePrompt: false,
      itemsPerPage: 15,
      isMounted: false,
      shippingPartners: {},
      tracking_no: [],
      tracking_no_id: "",
      orderDeliveryId: "",
      partner: "",
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
      this.tracking_no = [];
      const record = this.$store.state[this.moduleName].records;

      record.forEach((data, i) => {
        if (data.delivery) {

          if (data.delivery.tracking_no) {
            this.tracking_no.push(data.delivery.tracking_no);
          }
        } else {
            this.tracking_no.push('');
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
    getOrderPaymentStatusColor(paymentStatus) {
      if (paymentStatus.value === 0) return "danger";
      if (paymentStatus.value === 1) return "success";
      if (paymentStatus.value === 2) return "warning";
    },
    setSelected(value) {
      //  trigger a mutation, or dispatch an action
    },
    activePromptFn(orderDeliveryId) {
      console.log('orderDeliveryId', orderDeliveryId)
      if(this.records[orderDeliveryId].delivery){
        this.orderDeliveryId = this.records[orderDeliveryId].delivery.id;
      }
      
      this.tracking_no_id = this.tracking_no[orderDeliveryId];
      this.activePrompt = true;
    },
    async updateTracking() {
      var res = await this.$api.orderDeliveries.updateOrderDelivery(
        { tracking_no: this.tracking_no_id },
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
        position: "bottom-left",
        title: "Update tracking number",
        text: "The selected tracking number was successfully updated"
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
.dropdown-button-container {
  display: flex;
  align-items: center;

  .btnx {
    border-radius: 5px 0px 0px 5px;
  }
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
    }

    .vs-lg-6 {
      width: 100% !important;
    }
  }
</style>
