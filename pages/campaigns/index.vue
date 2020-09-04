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
      :items="records"
      :loading="isFetching"
      :items-per-page="pagination.perPage"
      hide-default-footer
    >
      <template v-slot:top>
        <data-table-top :title="$t('menuTitle.campaign')" />
      </template>
        <template class v-slot:[`item.status`]="{ item }">
          <span>{{ item.status.description }}</span>
        </template>
      <template>
        <data-table-top :title="$t('menuTitle.campaign')" />
      </template>
      <template class v-slot:[`item.actions`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              x-small
              class="px-0"
              text
              v-on="on"
              :to="
                localePath({
                  name: 'campaigns-id-campaignPackages',
                  params: { id: item.id }
                })
              "
            >
              <v-icon color="purple darken-4">mdi-gamepad-down</v-icon>
            </v-btn>
          </template>
          <span>Package Console</span>
        </v-tooltip>

        <!-- <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              x-small
              class="px-0"
              text
              v-on="on"
              :to="
                localePath({
                  name: 'campaigns-id-addPackage',
                  params: { id: item.id }
                })
              "
            >
              <img src="/view.png" />
            </v-btn>
          </template>
          <span>{{ $t("label.view") }}</span>
        </v-tooltip> -->

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              x-small
              class="px-0"
              text
              v-on="on"
              :to="
                localePath({
                  name: 'campaigns-id-edit',
                  params: { id: item.id }
                })
              "
            >
              <img src="/edit.png" />
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
              <img src="/deletepurple.png" />
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
        { text: app.i18n.t("label.campaignName"), value: "name" },
        // { text: app.i18n.t("label.createdBy"), value: "name" },
        // { text: app.i18n.t("label.streamId"), value: "video_id" },
        { text: app.i18n.t("label.streamStartAt"), value: "created_at" },
        {
          text: app.i18n.t("label.status"),
          value: "status",
          align: "center"
        },
        { text: app.i18n.t("label.actions"), value: "actions", align: "center" }
      ],
      hidden: false
      // records: [
      //   // {id:1,
      //   //   name: "test"

      // ]
    };
  },
  created() {
    // this.fetchMerchant();
    // this.hidden = this.$store.getters.isAdmin ? true : false;
  },
  computed: {
    records() {
      return this.$store.state[this.moduleName].records;
    },
    merchants() {
      return this.$store.state.merchants.records;
    }
  },
  methods: {
    // async fetchMerchant() {
    //   await this.$store.dispatch("merchants/fetchItems");
    // }
  }
};
</script>
