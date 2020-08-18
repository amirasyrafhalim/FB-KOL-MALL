<template>
   <v-card id="pages__user-create">
      <v-toolbar color="primary" dark flat dense>
         <v-toolbar-title class="subheading">
            {{ $t("pageTitle.user.add") }}
         </v-toolbar-title>
         <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
         <form-basic/>
      </v-card-text>
   </v-card>
</template>

<script>
  import FormBasic from "@/components/pages/user/FormBasic";
  export default {
    name: "create",
    components: {FormBasic}
  }
</script>

<style scoped>

</style>
