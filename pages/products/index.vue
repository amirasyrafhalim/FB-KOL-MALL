<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div id="pages__product">
    <form-search :module-name="moduleName" />

    <v-btn color="primary" class="float-right" :to="localePath({ name: 'products-create' })">
     {{$t('pageTitle.product.add')}}
    </v-btn>
    <v-data-table
      :headers="headers"
      :items="records"
      :loading="isFetching"
      :items-per-page="pagination.perPage"
      class="elevation-1"
      hide-default-footer
    >
      <template v-slot:item.image="{ item }">
        <v-avatar size="50px" tile>
          <v-img :src="item.image || '/default_avatar.png'"></v-img>
        </v-avatar>
      </template>

      <template v-slot:top>
        <data-table-top :title="$t('menuTitle.product')" />
      </template>
      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              color="primary"
              small
              v-on="on"
              :to="localePath({ name: 'products-id', params: { id: item.id } })"
            >
             <span>{{ $t("label.view") }}</span>
            </v-btn>
          </template>
          <span>{{ $t("label.view") }}</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              color="secondary"
              small
              v-on="on"
              :to="
                localePath({
                  name: 'products-id-edit',
                  params: { id: item.id }
                })
              "
            >
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

    <alert-confirmation ref="confirmDialog" />
  </div>
</template>

<script>
import AlertConfirmation from "@/components/widgets/alerts/AlertConfirmation";
import DataTableTop from "@/components/widgets/dataTables/DataTableTop";
import DataTablePagination from "@/components/widgets/dataTables/DataTablePagination";
import FormSearch from "@/components/pages/products/FormSearch";

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
  asyncData({ app, store }) {
    return {
      moduleName: "products",
      headers: [
        { text: app.i18n.t("label.name"), value: "name" },
        { text: app.i18n.t("label.merchantId"), value: "merchant_id" },
        { text: app.i18n.t("label.description"), value: "description" },
        { text: app.i18n.t("label.image"), value: "image" },
        { text: app.i18n.t("label.status"), value: "status_description" },
        {
          text: app.i18n.t("label.actions"),
          value: "actions"
        }
      ],
    };
  },
  computed: {
    records() {
      return this.$store.state[this.moduleName].records;
    }
  },
  created() {
  }
  // methods: {
};
</script>

<style scoped></style>
