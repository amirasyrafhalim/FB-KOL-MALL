<template>
   <v-card class="components__campaigns-form-search mb-5">
      <v-card-text class="pt-0">
         <v-row>
            <v-col sm="6" md="4">
               <v-text-field
                  :label="$t('label.name')"
                  v-model="formModel.name"
                  hide-details></v-text-field>
            </v-col>
            <v-col sm="6" md="4">
               <v-select
                  :items="statusEnums"
                  :label="$t('label.status')"
                  item-text="description"
                  item-value="value"
                  hide-details
                  v-model="formModel.status"
                  clearable></v-select>
            </v-col>
         </v-row>

         <search-form-action  v-on:search="search()" v-on:reset="reset()"></search-form-action>
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
          name: null,
          status: null
        }
      };
    },
    computed: {
      statusEnums() {
        return this.$store.state[this.moduleName].statusEnums;
      }
    },
    created() {
      this.$store.dispatch(`${this.moduleName}/fetchEnums`, {
        routeName: "merchantStatus",
        stateKey: "statusEnums"
      });
    },
      methods: {
     async search() {
        await this.$store.dispatch(this.moduleName + "/fetchItems",  {...this.formModel});
        await this.$store.dispatch(this.moduleName + "/resetPagination");
      },
       reset() {
        this.$helper.clearSearchForm( this.formModel);
        this.$store.dispatch(this.moduleName + "/fetchItems",  {...this.formModel});
        this.$store.dispatch(this.moduleName + "/resetPagination");
      }
  }
  }
</script>

<style scoped>

</style>
