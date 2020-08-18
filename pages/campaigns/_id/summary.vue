<template>
   <div id="pages__order">

      <v-data-table
         :headers="headers"
         :items="records"
         :loading="isFetching"
         :items-per-page="pagination.perPage"
         class="elevation-1"
         hide-default-footer
      >

         <template v-slot:top>
            <data-table-top :title="$t('menuTitle.orderSummary')"/>
         </template>

         <template v-slot:item.payment.pending="{ item }">
            <a @click.prevent="orderFilter(item.id, 0, 'payment_status')">
               {{item.payment.pending}}
            </a>
         </template>

         <template v-slot:item.payment.paid="{ item }">
            <a @click.prevent="orderFilter(item.id, 1, 'payment_status')">
               {{item.payment.paid}}
            </a>
         </template>

         <template v-slot:item.delivery_method.delivery="{ item }">
            <a @click.prevent="orderFilter(item.id, 0, 'delivery_method')">
               {{item.delivery_method.delivery}}
            </a>
         </template>
         <template v-slot:item.delivery_method.self_pickup="{ item }">
            <a @click.prevent="orderFilter(item.id, 1, 'delivery_method')">
               {{item.delivery_method.self_pickup}}
            </a>
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

  import dataTableMixin from "@/mixins/dataTable";

  export default {
    name: "index",
    components: {
      AlertConfirmation,
      DataTableTop,
      DataTablePagination,
    },
    mixins: [dataTableMixin],
    asyncData({app, store}) {
      return {
        moduleName: "campaigns",
        headers: [
          {text: app.i18n.t("label.campaignName"), value: "name"},
          {text: app.i18n.t("label.pending"), value: "payment.pending"},
          {text: app.i18n.t("label.paid"), value: "payment.paid"},
          {text: app.i18n.t("label.selfPickup"), value: "delivery_method.self_pickup"},
          {text: app.i18n.t("label.delivery"), value: "delivery_method.delivery"},
          {text: app.i18n.t("label.complete"), value: "completed"},
          {text: app.i18n.t("label.total"), value: "total_order"},
        ]
      };
    },
    computed: {
      records() {
        return this.$store.state[this.moduleName].summary;
      }
    },
    created() {
      this.fetchSummary();
    },
    methods: {
      fetchSummary() {
        this.$store.dispatch(this.moduleName + "/fetchSummary");
      },
      orderFilter(id, value, field) {
        this.$router.push({path: `/campaigns/`+id+`/orderFilter/?`+field+`=${value}`})
      }
    }
  }
</script>

<style scoped>
   a {
      color: #000!important;
   }
</style>
