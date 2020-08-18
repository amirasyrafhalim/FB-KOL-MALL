<template>
  <div id="pages__merchant">
    <form-search :module-name="moduleName" />

    <v-data-table
      :headers="headers"
      :items="records"
      :loading="isFetching"
      :items-per-page="pagination.perPage"
      class="elevation-1"
      hide-default-footer
    >
      <template v-slot:top>
        <data-table-top :title="$t('menuTitle.company')" />
      </template>
      <template v-slot:item.address="{ item }">
        <div>
          {{
            item.address +
              " " +
              item.postcode_code +
              " " +
              item.state_name +
              " " +
              item.country_name
          }}
        </div>
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
                localePath({ name: 'merchants-id', params: { id: item.id } })
              "
            >
              <span>{{ $t("label.view") }}</span>
            </v-btn>
          </template>
          <span>{{ $t("label.view") }}</span>
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
import FormSearch from "@/components/pages/merchants/FormSearch";

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
        { text: app.i18n.t("label.phoneNo"), value: "phone_no" },
        { text: app.i18n.t("label.pageUrl"), value: "page_url" },
        { text: app.i18n.t("label.address"), value: "address" },
        { text: app.i18n.t("label.streamChannel"), value: "stream_channel" },
        { text: app.i18n.t("label.status"), value: "status_description" },
        { text: app.i18n.t("label.actions"), value: "actions" }
      ]
    };
  }
};
</script>
