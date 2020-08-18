<template>
  <v-card id="pages__company-detail-edit">
    <v-toolbar color="primary" dark flat dense>
      <v-toolbar-title class="subheading">
        {{ $t("pageTitle.company.edit") }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <form-basic :record="record" />
    </v-card-text>
  </v-card>
</template>

<script>
import FormBasic from "@/components/pages/merchants/FormBasic";
import getOneMixin from "@/mixins/getOne";

export default {
  name: "edit",
  mixins: [getOneMixin],
  components: {
    FormBasic
  },
  asyncData() {
    return {
      moduleName: "merchants"
    };
  },
  methods: {
    fetchItem() {
      this.$store.dispatch(this.moduleName + "/fetchDetail");
    }
  }
};
</script>