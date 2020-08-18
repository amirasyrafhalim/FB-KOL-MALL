<template>
  <v-card id="pages__campaign-create">
    <v-toolbar color="primary" dark flat dense>
      <v-toolbar-title class="subheading">
        {{ $t("pageTitle.campaign.add") }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <form-basic />
    </v-card-text>
  </v-card>
</template>

<script>
import FormBasic from "@/components/pages/campaigns/FormBasic";

export default {
  components: {
    FormBasic
  }
};
</script>