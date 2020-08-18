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
         <template v-slot:top>
            <data-table-top :title="$t('menuTitle.buyer')"/>
         </template>
         <template v-slot:item.avatar="{ item }">
            <v-avatar size="32px" item>
               <v-img :src="item.avatar || '/default_avatar.png'"></v-img>
            </v-avatar>
         </template>
          <template v-slot:item.gender="{ item }">
            {{ item.gender ? item.gender.description : null }}
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
  import FormSearch from "@/components/pages/buyers/FormSearch";

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
        moduleName: "buyers",
        headers: [
          {text: app.i18n.t("label.facebookId"), value: "facebook_id"},
          {text: app.i18n.t("label.avatar"), value: "avatar"},
          {text: app.i18n.t("label.name"), value: "name"},
          {text: app.i18n.t("label.email"), value: "email"},
          {text: app.i18n.t("label.phoneNo"), value: "phone_no"},
          {text: app.i18n.t("label.gender"), value: "gender"},
          {text: app.i18n.t("label.dateOfBirth"), value: "date_of_birth"}
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
