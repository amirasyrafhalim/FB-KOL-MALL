<template>
   <div>
      <v-container grid-list-xl fluid>
         <v-row wrap>
            <v-col lg12>
               <v-toolbar color="primary" dark flat dense>
                  <v-toolbar-title class="subheading">
                     {{ $t("pageTitle.merchantShippings.detail") }}
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
               </v-toolbar>
               <v-divider></v-divider>
               <v-card text>
                  <v-container>
                     <v-row>
                        <v-col cols="3" class="py-0">
                           <v-subheader>{{ $t('label.merchant') }}</v-subheader>
                        </v-col>
                        <v-col cols="9" class="py-0">
                           <v-card-text>{{ record.merchant_name | "-" }}</v-card-text>
                        </v-col>
                     </v-row>
                     <v-row>
                        <v-col cols="3" class="py-0">
                           <v-subheader>{{ $t('label.postcode') }}</v-subheader>
                        </v-col>
                        <v-col cols="9" class="py-0">
                           <v-card-text>{{ record.postcode_code | "-" }}</v-card-text>
                        </v-col>
                     </v-row>
                     <v-row>
                        <v-col cols="3" class="py-0">
                           <v-subheader>{{ $t('label.chargeByWeight') }}</v-subheader>
                        </v-col>
                        <v-col cols="9" class="py-0">
                           <v-card-text>{{ record.charge_by_weight_description | "-" }}</v-card-text>
                        </v-col>
                     </v-row>

                     <v-row>
                        <v-col cols="3" class="py-0">
                           <v-subheader>{{ $t('label.createdAt') }}</v-subheader>
                        </v-col>
                        <v-col cols="9" class="py-0">
                           <v-card-text>{{ record.created_at || "-" }}</v-card-text>
                        </v-col>
                     </v-row>
                     <v-row>
                        <v-col>
                           <v-btn :to="localePath('merchantShipping')" class="mr-3">
                              {{ $t("label.back") }}
                           </v-btn>
                        </v-col>
                     </v-row>
                  </v-container>
               </v-card>
            </v-col>
         </v-row>
      </v-container>
   </div>
</template>

<script>
  import getOneMixin from "@/mixins/getOne";

  export default {
    name: "index",
    mixins: [getOneMixin],
    asyncData() {
      return {
        moduleName: "merchantShippings"
      };
    },
  };
</script>

<style scoped>

</style>
