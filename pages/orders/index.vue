<template>
  <div id="pages__order">
    <form-search :module-name="moduleName" />

    <download-excel :data="this.orders" type="csv" name="orderList.xls">
      <v-btn class="float-right mr-5 mt-1" elevation="0%" style="background-color:transparent;" medium >
        <v-icon color="green">mdi-printer</v-icon>
      </v-btn>
    </download-excel>
 
    <v-data-table
      :headers="headers"
      :items="records.slice().reverse()"
      :loading="isFetching"
      :items-per-page="pagination.perPage"
      class="elevation-1 outlined"
      hide-default-footer
      
    >
      <template v-slot:top>
        <data-table-top :title="$t('label.listorder')" />
      </template>
      <template v-slot:[`item.order_details.name`]="{ item }">
        <!-- <v-avatar size="32px" class="text-center" v-if="item && item.buyer">
          <img :src="item.buyer.avatar || '/default_avatar.png'" />
        </v-avatar> -->
        <p>{{ item.order_details.name }}</p>
      </template>
      <template v-slot:[`item.order_payment.status`]="{ item }">
        <div v-if="item.order_payment.status === 0">
          {{ $t("label.failed") }}
        </div>
        <div v-if="item.order_payment.status === 1">
          {{ $t("label.pending") }}
        </div>
        <div v-if="item.order_payment.status === 2">
          {{ $t("label.success") }}
        </div>
      </template>
      <template v-slot:[`item.order_deliveries.method`]="{ item }">
        {{
          item.order_deliveries.method === 2
            ? $t("label.selfPickup")
            : $t("label.delivery")
        }}
      </template>
      <template v-slot:[`item.order_deliveries.status`]="{ item }">
        <div v-if="item.order_deliveries.status === 1">
          {{ $t("label.processing") }}
        </div>
        <div v-if="item.order_deliveries.status === 2">
          {{ $t("label.outfordelivery") }}
        </div>
        <div v-if="item.order_deliveries.status === 3">
          {{ $t("label.delivered") }}
        </div>
        <div v-if="item.order_deliveries.status === 4">
          {{ $t("label.return") }}
        </div>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip bottom v-if="item.code">
          <template v-slot:activator="{ on }">
            <v-btn
              color="primary"
              small
              v-on="on"
              :to="localePath({ name: 'orders-id', params: { id: item.id } })"
            >
              <span>{{ $t("label.view") }}</span>
            </v-btn>
          </template>
          <span>{{ $t("label.view") }}</span>
        </v-tooltip>
        <!-- <v-tooltip bottom v-if="item.order_payment.status == 1">
          <template v-slot:activator="{ on }">
            <update-delivery-modal :records="item"  v-on="on" />
          </template>
          <span>{{ $t("label.success") }}</span>
        </v-tooltip> -->
      </template>
    </v-data-table>

    <data-table-pagination
      :moduleName="moduleName"
      :currentPage="pagination.currentPage"
      :lastPage="pagination.lastPage"
    ></data-table-pagination>

    <alert-confirmation ref="confirmDialog" />
  </div>
</template>

<script>
import AlertConfirmation from "@/components/widgets/alerts/AlertConfirmation";
import DataTableTop from "@/components/widgets/dataTables/DataTableTop";
import DataTablePagination from "@/components/widgets/dataTables/DataTablePagination";
import FormSearch from "@/components/pages/orders/FormSearch";
import UpdateDeliveryModal from "../../components/pages/orders/UpdateDeliveryModal";
import JsonExcel from "vue-json-excel";
import dataTableMixin from "@/mixins/dataTable";

export default {
  name: "index",
  components: {
    UpdateDeliveryModal,
    AlertConfirmation,
    DataTableTop,
    DataTablePagination,
    FormSearch,
    JsonExcel
  },
  mixins: [dataTableMixin],
  asyncData({ app, store }) {
    return {
      moduleName: "orders",
      headers: [
        { text: app.i18n.t("label.buyerName"), value: "order_details.name" },
        { text: app.i18n.t("label.invoiceNo"), value: "invoice_no" },
        { text: app.i18n.t("label.code"), value: "code" },
        { text: app.i18n.t("label.totalAmount"), value: "total_amount" },
        {
          text: app.i18n.t("label.paymentStatus"),
          value: "order_payment.status"
        },
        // { text: app.i18n.t("label.paidAt"), value: "confirmed_at" },
        {
          text: app.i18n.t("label.deliveryMethod"),
          value: "order_deliveries.method"
        },
        {
          text: app.i18n.t("label.trackingNo"),
          value: "order_deliveries.tracking_no"
        },
        {
          text: app.i18n.t("label.deliveryStatus"),
          value: "order_deliveries.status"
        },
        { text: app.i18n.t("label.deliverAt"), value: "order_deliveries.delivered_at" },
        { text: app.i18n.t("label.actions"), value: "actions" }
      ],
      orders: [
        {
          id: "",
          buyer_id: "",
          buyer: "",
          // merchant: "",
          campaign_name: "",
          campaign_id: "",
          invoice_no: "",
          code: "",
          delivery_method: "",
          delivery_partner: "",
          order_address: "",
          tracking_no: "",
          delivery_status: "",
          subtotal_amount: "",
          delivery_amount: "",
          tax_amount: "",
          total_amount: "",
          payment_status: "",
          remarks: "",
          confirmed_at: "",
          delivered_at: "",
          created_at: "",
          updated_at: ""
        }
      ]
    };
  },
  computed: {
    records() {
      this.orders = [];
      this.$store.state[this.moduleName].records.forEach((element, i) => {
        var address =
          element.order_address &&
          element.order_address.address +
            element.order_address.city +
            " " +
            element.order_address.postcode +
            " " +
            element.order_address.state;

        this.orders.push({
          buyer_name: element.order_details.name,
          invoice_no: element.invoice_no,
          quantity: element.order_packages.quantity,
          buyer_address: address,
          phone_no: element.order_details.phone_no,
          tracking_no: element.order_deliveries.tracking_no
        });
      });
      return this.$store.state[this.moduleName].records;
    },
    packages() {
      return this.$store.state.campaigns.records;
    }
  },
  created() {
    this.fetchItems();
    // this.fetchCampaign();
  },
  methods: {
    fetchItems(page = 1) {
      let params = { page: page, campaign_id: this.$route.params.id };
      this.$store.dispatch(this.moduleName + "/fetchItems", params);
    }
    // fetchCampaign(page = 1) {
    //   let params = { page: page, campaign_id: this.$route.params.id };
    //   this.$store.dispatch("campaigns/fetchItems");
    // }
  }
};
</script>

<style>
.v-data-table td {
  font-size: 0.875rem;
  height: 48px;
  text-align: center !important;
}

.v-application--is-ltr .v-data-table th {
  text-align: center;
}
</style>
