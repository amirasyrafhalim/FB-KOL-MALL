<template>
  <div id="pages__facebook_page">
    <form-search :module-name="moduleName" />
    <v-btn color="primary" class="float-right" :to="localePath({ name: 'facebook_page-create' })">
     {{$t('pageTitle.facebookPage.add')}}
    </v-btn>
    <v-data-table
      :headers="headers"
      :items="records"
      :loading="isFetching"
      :items-per-page="pagination.perPage"
      class="elevation-1"
      hide-default-footer
    >
      <template v-slot:top>
        <data-table-top :title="$t('menuTitle.facebookPage')" />
      </template>

      <template v-slot:item.page_url="{ item }">
        <a target="_blank" :href="item.page_url">
          {{ item.page_url }}
        </a>
      </template>
    
      

      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
               color="primary"
              small
              v-on="on"
              :to="
                localePath({ name: 'facebook_page-id-edit', params: { id: item.id } })
              "
            >
              <span>{{ $t("label.edit") }}</span>
            </v-btn>
          </template>
          <span>{{ $t("label.edit") }}</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" @click="deleteItem(item.id)" icon small>
              <v-icon>mdi-delete</v-icon>
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

    <alert-confirmation ref="confirmDialog" />
  </div>
</template>

<script>
import dataTableMixin from "@/mixins/dataTable";
import AlertConfirmation from "@/components/widgets/alerts/AlertConfirmation";
import DataTableTop from "@/components/widgets/dataTables/DataTableTop";
import DataTablePagination from "@/components/widgets/dataTables/DataTablePagination";
import FormSearch from "@/components/pages/facebook_page/FormSearch";

export default {
  name: "index",
  components: {
    AlertConfirmation,
    DataTableTop,
    DataTablePagination,
    FormSearch
  },
  mixins: [dataTableMixin],
  asyncData({ app, store }) {
    return {
      moduleName: "merchants",
      headers: [
        { text: app.i18n.t("label.name"), value: "name" },
        { text: app.i18n.t("label.pageUrl"), value: "page_url" },
        { text: app.i18n.t("label.pageId"), value: "page_id" },
        { text: app.i18n.t("label.actions"), value: "actions" }
      ]
    };
  }
};
</script>
