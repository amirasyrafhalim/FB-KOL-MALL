<template>
   <div id="pages__campaigns-id-orderFilter">

      <v-data-table
         :headers="headers"
         :items="records"
         :loading="isFetching"
         :items-per-page="pagination.perPage"
         class="elevation-1"
         hide-default-footer
      >
         <template v-slot:top>
            <data-table-top :title="$t('pageTitle.order.list')"/>
         </template>
         <template v-slot:item.delivery_method="{ item }">
            {{item.delivery_method.description}}
         </template>
         <template v-slot:item.payment_status="{ item }">
            {{item.payment_status.description}}
         </template>
         <template v-slot:item.delivery_status="{ item }">
            {{item.delivery_status.value === 0 ? $t('label.pending') : $t('label.delivered')}}
         </template>
         <template v-slot:item.total_amount="{ item }">
            {{item.total_amount ? item.total_amount : 0}}
         </template>

      </v-data-table>

      <data-table-pagination
         :moduleName="moduleName"
         :currentPage="pagination.currentPage"
         :lastPage="pagination.lastPage"
      ></data-table-pagination>

      <alert-confirmation ref="confirmDialog"/>
   </div>
</template>

<script>
  import AlertConfirmation from "@/components/widgets/alerts/AlertConfirmation";
  import DataTableTop from "@/components/widgets/dataTables/DataTableTop";
  import DataTablePagination from "@/components/widgets/dataTables/DataTablePagination";

  // import dataTableMixin from "@/mixins/dataTable";


  export default {
    name: "orderFilter",
    components: {
      AlertConfirmation,
      DataTableTop,
      DataTablePagination,
    },
    asyncData({app, store}) {
      return {
        moduleName: "orders",
        headers: [
          {text: app.i18n.t("label.buyerName"), value: "buyer.name"},
          {text: app.i18n.t("label.invoiceNo"), value: "invoice_no"},
          {text: app.i18n.t("label.code"), value: "code"},
          {text: app.i18n.t("label.totalAmount"), value: "total_amount"},
          {text: app.i18n.t("label.paymentStatus"), value: "payment_status"},
          {text: app.i18n.t("label.paidAt"), value: "confirmed_at"},
          {text: app.i18n.t("label.deliveryMethod"), value: "delivery_method"},
          {text: app.i18n.t("label.trackingNo"), value: "tracking_no"},
          {text: app.i18n.t("label.deliveryStatus"), value: "delivery_status"},
          {text: app.i18n.t("label.deliverAt"), value: "delivered_at"},
        ],
        isFetching: false,
        pagination: false,
        perPage: false
      };
    },
    computed: {
      records() {
        return this.$store.state[this.moduleName].records;
      }
    },
    created() {
      this.fetchItems()
    },
    methods: {
      fetchItems(page = 1) {
        var params = {
          page: page,
          campaign_id: this.$router.currentRoute.params.id,
        };

        if (this.$router.currentRoute.query.payment_status) {
          params.payment_status = this.$router.currentRoute.query.payment_status;
        }
        if (this.$router.currentRoute.query.payment_status) {
          params.payment_status = this.$router.currentRoute.query.payment_status;
        }
        if (this.$router.currentRoute.query.delivery_method) {
          params.delivery_method = this.$router.currentRoute.query.delivery_method;
        }
        this.$store.dispatch(this.moduleName + "/fetchItems", params);
      },
    }
  }
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
