<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div id="pages__campaign">
    <form-search :module-name="moduleName" />
    <v-btn
      color="primary"
      class="float-right"
      :to="localePath({ name: 'campaigns-create' })"
    >
      {{ $t("pageTitle.campaign.add") }}
    </v-btn>
    <v-data-table
      :headers="headers"
      :items="records.slice().reverse()"
      :loading="isFetching"
      :items-per-page="pagination.perPage"
      class="elevation-1"
      hide-default-footer
    >
      <template v-slot:top>
        <data-table-top :title="$t('menuTitle.campaign')" />
      </template>

      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              class="ma-2"
              v-on="on"
              :to="
                localePath({
                  name: 'campaigns-id-edit',
                  params: { id: item.id }
                })
              "
              color="secondary"
              small
            >
              {{ $t("label.edit") }}
            </v-btn>
          </template>
          <span>{{ $t("label.edit") }}</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              class="ma-2"
              v-on="on"
              :to="
                localePath({
                  name: 'campaigns-id-liveConsole',
                  params: { id: item.id }
                })
              "
              color="blue darken-1"
              small
            >
              <span class="white--text">{{ $t("label.facebook") }} </span>
            </v-btn>
          </template>
          <span>{{ $t("label.facebook") }}</span>
        </v-tooltip>

        <!-- <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
               v-on="on"
               :to="
                localePath({
                  name: 'campaigns-id-summary',
                  params: { id: item.id }
                })
              "
               color="info"
               small
            >
              <span class="black--text">{{ $t("label.summary") }}</span>
            </v-btn>
          </template>
          <span>{{ $t("label.summary") }}</span>
        </v-tooltip> -->

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              :hidden="hidden"
              v-on="on"
              @click="deleteItem(item.id)"
              color="error"
              small
            >
              {{ $t("label.delete") }}
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
    />

    <alert-confirmation ref="confirmDialog" />
  </div>
</template>

<script>
import AlertConfirmation from "@/components/widgets/alerts/AlertConfirmation";
import DataTableTop from "@/components/widgets/dataTables/DataTableTop";
import DataTablePagination from "@/components/widgets/dataTables/DataTablePagination";
import FormSearch from "@/components/pages/campaigns/FormSearch";

import dataTableMixin from "@/mixins/dataTable";

export default {
  components: {
    AlertConfirmation,
    DataTableTop,
    DataTablePagination,
    FormSearch
  },
  mixins: [dataTableMixin],
  asyncData({ app, store }) {
    return {
      moduleName: "campaigns",
      headers: [
        { text: app.i18n.t("label.name"), value: "name" },
        { text: app.i18n.t("label.merchantName"), value: "merchant_name" },
        { text: app.i18n.t("label.streamId"), value: "stream_id" },
        { text: app.i18n.t("label.streamStartAt"), value: "stream_start_at" },
        { text: app.i18n.t("label.streamEndAt"), value: "stream_end_at" },
        {
          text: app.i18n.t("label.status"),
          value: "status_description",
          align: "center"
        },
        { text: app.i18n.t("label.actions"), value: "actions", align: "center" }
      ],
      hidden: false
    };
  },
  created() {
    this.fetchMerchant();
    // this.hidden = this.$store.getters.isAdmin ? true : false;
  },
  computed: {
    merchant() {
      return this.$store.state.merchants.records;
    },
    records() {
      return this.$store.state[this.moduleName].records;;
    }
  },
  methods: {
    async fetchMerchant() {
      await this.$store.dispatch("merchants/fetchItems");
    }
  }
};
</script>
