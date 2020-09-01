<template>
  <v-card id="pages__campaign-create">
    <v-toolbar color="primary" dark flat dense>
      <v-toolbar-title class="subheading">
        {{ $t("pageTitle.campaign.edit") }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <form-edit :record="record" />
    </v-card-text>
  </v-card>
</template>

<script>
import FormEdit from "@/components/pages/campaigns/FormEdit";

import getOneMixin from "@/mixins/getOne";

export default {
  mixins: [getOneMixin],
  components: {
    FormEdit
  },
  asyncData() {
    return {
      moduleName: "campaigns"
    };
  }
};
</script>
