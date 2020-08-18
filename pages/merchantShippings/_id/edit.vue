<template>
   <v-card id="pages__merchant-create">
      <v-toolbar color="primary" dark text dense>
         <v-toolbar-title class="subheading">
            {{ $t("pageTitle.merchantShippings.edit") }}
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
  import FormBasic from "@/components/pages/merchantShippings/FormBasic";

  import getOneMixin from "@/mixins/getOne";

  export default {
    name: "edit",
    mixins: [getOneMixin],
    components: {
      FormBasic
    },
    asyncData() {
      return {
        moduleName: "merchantShippings"
      };
    }
  }
</script>

<style scoped>

</style>
