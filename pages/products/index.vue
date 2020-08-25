<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div id="pages__product">
    <form-search :module-name="moduleName" />
    <v-row class="justify-space-between">
      <v-col class="font-weight-bold">
        {{ $t("pageTitle.product.total") }}
      </v-col>
      <v-col class="text-right">
        <v-btn
          color="primary"
          class="text-right border-radius-button text-capitalize small-button"
          :to="localePath({ name: 'products-create' })"
        >
          {{ $t("pageTitle.product.add") }}
        </v-btn>
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="records"
      :loading="isFetching"
      :items-per-page="pagination.perPage"
      class="elevation-1"
      hide-default-footer
    >
      <template v-slot:[`item.image`]="{ item }">
        <v-avatar size="50px" tile>
          <v-img :src=" item.image || '/upload-image.png'"></v-img>
        </v-avatar>
      </template>
     
      <template v-slot:[`item.category`]="{ item }">
        <span v-for="(category, i) in item.category" :key="i">{{category.name}}</span>
      </template>

       <template v-slot:[`item.status`]="{ item }">
         
        <span>{{item.status.description}}</span>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
            x-small
              class="px-0"
              text
              v-on="on"
              :to="localePath({ name: 'products-id', params: { id: item.id } })"
            >
              <img src="view.png" />
            </v-btn>
          </template>
          <span>{{ $t("label.view") }}</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
             x-small
              class="px-0"
              text
              v-on="on"
              :to="
                localePath({
                  name: 'products-id-edit',
                  params: { id: item.id }
                })
              "
            >
              <img src="edit.png" />
            </v-btn>
          </template>
          <span>{{ $t("label.edit") }}</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
             x-small
              v-on="on"
              class="px-0"
              @click="deleteItem(item.id)"
              text
              color="transparent"
            >
              <img src="deletepurple.png" />
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
        { text: app.i18n.t("label.image"), value: "image" },
        { text: app.i18n.t("label.name"), value: "name" },
        { text: app.i18n.t("label.category"), value: "category" },
        

        { text: app.i18n.t("label.status"), value: "status" },
        {
          text: app.i18n.t("label.actions"),
          value: "actions"
        }
      ]
    };
  },
  computed: {
    records() {
      return this.$store.state[this.moduleName].records;
    }
  },
  created() {}
  // methods: {
};
</script>

<style scoped></style>
