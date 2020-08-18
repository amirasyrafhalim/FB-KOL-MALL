<template>
  <v-card id="pages__merchant-view">
    <v-toolbar color="primary" dark flat dense>
      <v-toolbar-title class="subheading">
        {{ $t("pageTitle.facebookPage.detail") }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-divider></v-divider>

    <v-card-text>
      <v-tabs v-model="currentTab">
        <v-tab>
          {{ $t("label.detail") }}
        </v-tab>
        <v-tab>
          {{ $t("label.pageToken") }}
        </v-tab>
      </v-tabs>

      <v-tabs-items class="mt-3" v-model="currentTab">
        <v-tab-item>
          <detail-card :record="record" />
        </v-tab-item>
        <v-tab-item>
          <page-token />
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
import getOneMixin from "@/mixins/getOne";
import DetailCard from "@/components/pages/facebook_page/DetailCard";
// import PageToken from "@/components/pages/merchants/PageToken";

export default {
  name: "index",
  mixins: [getOneMixin],
  components: {
    DetailCard,
    // PageToken
  },
  asyncData() {
    return {
      moduleName: "merchants",
      currentTab: null
    };
  }
};
</script>
