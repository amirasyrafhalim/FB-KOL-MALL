<template>
   <v-card class="components__merchant-shippings-form-search mb-5">
      <v-card-text class="pt-0">
         <v-row>
            <v-col sm="6" md="4">
               <v-text-field
                  :label="$t('label.postcode')"
                  v-model="formModel.name"
                  hide-details></v-text-field>
            </v-col>
         </v-row>

         <search-form-action @search @reset></search-form-action>
      </v-card-text>
   </v-card>
</template>

<script>
  import SearchFormAction from "@/components/widgets/forms/SearchFormAction";

  export default {
    name: "FormSearch",
    props: ["moduleName"],
    components: {
      SearchFormAction
    },
    data() {
      return {
        formModel: {
          postcode: null,
        }
      };
    },
  }
</script>

<style scoped>

</style>
