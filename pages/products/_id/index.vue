<template>
   <div>
      <v-container grid-list-xl fluid>
         <v-row wrap>
            <v-col lg12>
               <v-toolbar color="primary" dark flat dense>
                  <v-toolbar-title class="subheading">
                     {{ $t("pageTitle.product.detail") }}
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
               </v-toolbar>
               <v-divider></v-divider>
               <v-card text>
                  <v-container>
                     <v-row>
                        <v-col cols="3" class="py-0">
                           <v-subheader>{{ $t('label.image') }}</v-subheader>
                        </v-col>
                        <v-col cols="9" class="py-0">

                           <v-card-text>
                              <v-avatar tile color="grey" size="38">
                                 <v-img :src="record.image || '/default_avatar.png'"></v-img>
                              </v-avatar>
                           </v-card-text>
                        </v-col>
                     </v-row>

                     <v-row>
                        <v-col cols="3" class="py-0">
                           <v-subheader>{{ $t('label.userName') }}</v-subheader>
                        </v-col>
                        <v-col cols="9" class="py-0">
                           <v-card-text>{{ record.name | "-" }}</v-card-text>
                        </v-col>
                     </v-row>
                     <v-row>
                        <v-col cols="3" class="py-0">
                           <v-subheader>{{ $t('label.description') }}</v-subheader>
                        </v-col>
                        <v-col cols="9" class="py-0">
                           <v-card-text>{{ record.description | "-" }}</v-card-text>
                        </v-col>
                     </v-row>
                     <v-row>
                        <v-col cols="3" class="py-0">
                           <v-subheader>{{ $t('label.status') }}</v-subheader>
                        </v-col>
                        <v-col cols="9" class="py-0">
                           <v-card-text>{{ record.status_description | "-" }}</v-card-text>
                        </v-col>
                     </v-row>
         
                     <v-row>
                        <v-col>
                           <v-btn :to="localePath('products')" class="mr-3 float-right">
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
        moduleName: "products"
      };
    },
  };
</script>

<style scoped>

</style>
