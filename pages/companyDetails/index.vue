<template>
  <v-card id="pages__company-detail">
    <v-toolbar color="primary" dark flat dense>
      <v-toolbar-title class="subheading">
        {{ $t("pageTitle.company.detail") }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <template v-if="showCreateForm">
        <form-basic />
      </template>
      <template v-else>
        <detail-card :record="record" />
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
import isEmpty from "lodash/isEmpty";
import getOneMixin from "@/mixins/getOne";
import FormBasic from "@/components/pages/merchants/FormBasic";
import DetailCard from "@/components/pages/merchants/DetailCard";

export default {
  mixins: [getOneMixin],
  components: {
    FormBasic,
    DetailCard
  },
  asyncData() {
    return {
      moduleName: "merchants"
    };
  },
  computed: {
    showCreateForm() {
      return isEmpty(this.record);
    }
  },
  methods: {
    fetchItem() {
      this.$store.dispatch(this.moduleName + "/fetchDetail");
    }
  }
};
</script>