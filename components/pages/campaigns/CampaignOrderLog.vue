<template>
   <div id="scroll-target"
        style="max-height: 600px"
        class="overflow-y-auto">
      <v-row
         justify="center"
         style="height: 600px; width: 100%"
         >
         <v-col>
            <v-card flat >
               <v-card-title>
                  {{ $t('label.log') }}
               </v-card-title>
               <basic-log v-if="logData" :log="logData"></basic-log>
               <br/>
            </v-card>
         </v-col>
      </v-row>
   </div>
</template>

<script>

  import BasicLog from "./BasicLog";
  export default {
    name: "CampaignOrderLog",
    components: {BasicLog},
    props: ['comments', 'logData']
  }
</script>

<style>
   .border-line {
      border: 1px solid lightgrey !important;
   }

   .v-list {
      padding: 0!important;
   }

   .v-list-item__avatar {
       margin-bottom: 0;
       margin-top: 0 ;
   }
</style>

