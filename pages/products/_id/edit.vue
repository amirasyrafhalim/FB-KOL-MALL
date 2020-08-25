<template>
   <!-- <v-card id="pages__products-create"> -->
     <div>
         <v-toolbar color="white" dark flat dense>
         <v-toolbar-title class="subheading font-weight-bold black--text" >
            {{ $t("pageTitle.product.edit") }}
         </v-toolbar-title>
         <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>
       <form-basic :record="record" />
     </div>
      
      <!-- <v-card-text> -->
        
      <!-- </v-card-text> -->
   <!-- </v-card> -->
</template>

<script>
  import FormBasic from "@/components/pages/products/FormBasic";

  import getOneMixin from "@/mixins/getOne";

  export default {
    name: "edit",
    mixins: [getOneMixin],
    components: {
      FormBasic
    },
    asyncData() {
      return {
        moduleName: "products"
      };
    }
  }
</script>

<style scoped>

</style>
