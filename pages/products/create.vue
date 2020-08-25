<template>
   <div id="pages__product-create">
      <v-toolbar color="white" dark flat dense>
         <v-toolbar-title class="black--text font-weight-bold">
            {{ $t("pageTitle.product.add") }}
         </v-toolbar-title>
         <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>
         <form-basic/>
   </div>
</template>

<script>
  import FormBasic from "@/components/pages/products/FormBasic";
  export default {
    name: "create",
    components: {FormBasic}
  }
</script>

<style scoped>
hr {
    overflow: hidden!important;
}
</style>
