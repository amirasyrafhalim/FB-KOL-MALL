<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
   <div id="pages__campaign">
      <form-search :module-name="moduleName"/>

      <v-data-table
         :headers="headers"
         :items="records"
         :loading="isFetching"
         :items-per-page="pagination.perPage"
         class="elevation-1"
         hide-default-footer
      >
         <template v-slot:item.rules="{ item }">
            <ul>
               <li v-if="item.rules.length > 0">
                  <span v-for="(rule, i) in item.rules" :key="i">
                     {{$t("label.min")+': '+ rule.min + 'gram  ' + $t("label.max") +': '+ rule.max + 'gram  ' + $t("label.price")+': RM' + rule.price}}
                     </span>
               </li>
               <li v-else>
                  {{$t("label.price")+": RM "+ item.rules.price}}
               </li>
            </ul>
         </template>

         <template v-slot:top>
            <data-table-top :title="$t('menuTitle.merchantShippings')"/>
         </template>
         <template v-slot:item.actions="{ item }">
            <v-tooltip bottom>
               <template v-slot:activator="{ on }">
                  <v-btn color="primary" small v-on="on"
                         :to="localePath({ name: 'merchantShippings-id', params: { id: item.id } })">
                     <span>{{ $t("label.view") }}</span>
                  </v-btn>
               </template>
               <span>{{ $t("label.view") }}</span>
            </v-tooltip>

            <v-tooltip bottom>
               <template v-slot:activator="{ on }">
                  <v-btn color="secondary" small v-on="on"
                         :to="localePath({ name: 'merchantShippings-id-edit', params: { id: item.id } }) ">
                     <span>{{ $t("label.edit") }}</span>
                  </v-btn>
               </template>
               <span>{{ $t("label.edit") }}</span>
            </v-tooltip>

            <v-tooltip bottom>
               <template v-slot:activator="{ on }">
                  <v-btn v-on="on" @click="deleteItem(item.id)" color="error" small>
                     <span>{{ $t("label.delete") }}</span>
                  </v-btn>
               </template>
               <span>{{ $t("label.delete") }}</span>
            </v-tooltip>
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
  import FormSearch from "@/components/pages/merchantShippings/FormSearch";

  import dataTableMixin from "@/mixins/dataTable";

  export default {
    name: "index",
    components: {
      AlertConfirmation,
      DataTableTop,
      DataTablePagination,
      FormSearch
    },
    mixins: [dataTableMixin],
    asyncData({app, store}) {
      return {
        moduleName: "merchantShippings",
        headers: [
          {text: app.i18n.t("label.postcode"), value: "postcode_code"},
          {text: app.i18n.t("label.chargeByWeight"), value: "charge_by_weight_description"},
          {text: app.i18n.t("label.rules"), value: "rules"},
          {
            text: app.i18n.t("label.actions"), value: "actions"
          }
        ]
      };
    },
    computed: {
      records() {
        return this.$store.state[this.moduleName].records;
      },
    },
  }
</script>

<style scoped>

</style>
