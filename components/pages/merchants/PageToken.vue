<template>
  <div class="components__pageToken">

    <v-dialog v-model="addDialog" persistent max-width="500">
      <template v-if="this.records.length == 0" v-slot:activator="{ on }">
        <v-btn class="mb-3" color="primary" v-on="on" small>
          {{ $t("label.addPageToken") }}
        </v-btn>
      </template>

      <template v-else v-slot:activator="{ on }">
        <v-btn class="mb-3" color="primary" v-on="on" small>
          {{ $t("label.editPageToken") }}
        </v-btn>
      </template>
      <form-page-token @close="addDialogClose" :record="records"/>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items="records"
      :loading="isFetching"
      :items-per-page="pagination.perPage"
      class="elevation-1"
      hide-default-footer
    >
      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" @click="testPageToken(item.id)" icon small>
              <v-icon>mdi-key-wireless</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("label.testPageToken") }}</span>
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
import formMixin from "@/mixins/form";
import AlertConfirmation from "@/components/widgets/alerts/AlertConfirmation";
import DataTablePagination from "@/components/widgets/dataTables/DataTablePagination";
import FormPageToken from "@/components/pages/merchants/FormPageToken";

export default {
  name: "PageToken",
  components: {
    AlertConfirmation,
    DataTablePagination,
    FormPageToken
  },
  mixins: [dataTableMixin, formMixin],
  data() {
    return {
      moduleName: "merchantPageTokens",
      addDialog: false,
      checkDialog: false,
      headers: [
        { text: this.$t("label.pageToken"), value: "page_token" },
        { text: this.$t("label.expiresIn"), value: "expires_in" },
        { text: this.$t("label.createdAt"), value: "created_at" },
        { text: this.$t("label.actions"), value: "actions", align: "center" }
      ]
    };
  },
  methods: {
    fetchItems(page = 1) {
      let params = { page: page };

      this.$store.dispatch(this.moduleName + "/fetchItems", params);
    },
    addDialogClose() {
      this.addDialog = false;
      this.fetchItems();
    },
    async testPageToken(id) {
      try {
        this.$store.commit("setOverlay", true);
        await this.$api.merchantPageTokens.debugPageToken(id);

        this.$store.dispatch("showSnackbar", {
          text: this.$t("message.pageTokenValid"),
          color: "success"
        });
      } catch (err) {
        this.handleApiErrors(err);
      } finally {
        this.$store.commit("setOverlay", false);
      }
    }
  }
};
</script>