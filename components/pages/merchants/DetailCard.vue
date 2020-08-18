<template>
  <v-card class="components__merchant--detail-card">
    <template v-if="record.banner">
      <v-img :src="record.banner" height="200" />
    </template>

    <v-list-item>
      <v-list-item-avatar color="grey darken-3">
        <v-img
          :src="(record && record.user && record.user_avatar) || '/default_avatar.png'"
          height="250"
          class="elevation-6"
        ></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="font-weight-black">
          {{ record.user_name }}
        </v-list-item-title>
        <v-list-item-subtitle class="font-italic">
          {{ record.user_email }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <div class="text-center mb-4">
        <h3 class="headline font-weight-black text-center mb-1">
          {{ record.name }}
        </h3>

        <v-chip :color="statusStyle.color" small>
          <v-icon left>{{ statusStyle.icon }}</v-icon>
          <span class="text-uppercase">
            {{ record.status_description || "-" }}
          </span>
        </v-chip>
      </div>

      <row-data class="mb-3" :label="$t('label.phoneNo')">
        {{ record.phone_no || "-" }}
      </row-data>
      <row-data class="mb-3" :label="$t('label.pageUrl')">
        {{ record.page_url || "-" }}
      </row-data>
      <row-data class="mb-3" :label="$t('label.address')">
        {{ record.address || "-" }}
      </row-data>
      <row-data class="mb-3" :label="$t('label.postcode')">
        {{ record.postcode_code || "-" }}
      </row-data>
      <row-data class="mb-3" :label="$t('label.state')">
        {{ record.state_name || "-" }}
      </row-data>
      <row-data class="mb-3" :label="$t('label.country')">
        {{ record.country_name || "-" }}
      </row-data>
      <row-data class="mb-3" :label="$t('label.streamChannel')">
        {{ record.stream_channel || "-" }}
      </row-data>
    </v-card-text>

    <template v-if="this.$store.getters.isAdmin">
      <v-card-actions>
        <v-btn color="success" @click="updateStatus(1, record.id)">
          {{ $t("label.approve") }}
        </v-btn>
        <v-btn color="error " @click="updateStatus(2, record.id)">
          {{ $t("label.reject") }}
        </v-btn>
        <v-btn :disabled="loading" :to="localePath('merchants')" class="mr-3">
          {{ $t("label.back") }}
        </v-btn>
      </v-card-actions>
    </template>

    <template
      v-else-if="
        !this.$store.getters.isAdmin && record.status_description != 'Pending'
      "
    >
      <v-card-actions>
        <v-btn :to="localePath('companyDetails-edit')" color="primary ">
          {{ $t("label.modify") }}
        </v-btn>
      </v-card-actions>
    </template>
  </v-card>
</template>

<script>
import formMixin from "@/mixins/form";
import RowData from "@/components/widgets/RowData";

export default {
  components: {
    RowData
  },
  mixins: [formMixin],
  props: ["record"],
  computed: {
    statusStyle() {
      let statusStyle = {
        icon: "mdi-account-clock",
        color: "warning"
      };

      if (this.record.status_description == "Approve") {
        statusStyle = {
          icon: "mdi-check",
          color: "success"
        };
      } else if (this.record.status_description == "Reject") {
        statusStyle = {
          icon: "mdi-close",
          color: "error"
        };
      }

      return statusStyle;
    }
  },
  methods: {
    async updateStatus(status, id) {
      try {
        let res = await this.$api.merchants.update({ status: status }, id);
        this.handleApiSuccess(res, "merchants");
      } catch (err) {
        this.handleApiErrors(err);
      }
    }
  }
};
</script>