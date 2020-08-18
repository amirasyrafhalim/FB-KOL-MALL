<template>
   <div class="components__product--form-basic">
      <v-text-field
         v-model="formModel.name"
         :label="$t('label.name')"
         :error-messages="formErrors ? formErrors.name : ''"></v-text-field>
      <v-text-field
         v-model="formModel.description"
         :label="$t('label.description')"
         :error-messages="formErrors ? formErrors.description : ''"></v-text-field>

      <v-row>
         <v-col>
            <v-file-input
               :label="$t('label.image')"
               :error-messages="formErrors ? formErrors.image : ''"
               accept="image/*"
               show-size
               @change="updateBanner($event, 'image')"
               @click:clear="formModel.image = null"
               prepend-icon="mdi-library"
            ></v-file-input>
         </v-col>
         <v-col cols="auto" class="my-auto">
            <v-avatar size="32px" item>
               <v-img :src="formModel.image || '/default_avatar.png'"></v-img>
            </v-avatar>
         </v-col>
      </v-row>
       <v-autocomplete
      :items="merchants"
      :label="$t('menuTitle.facebookPage')"
      :error-messages="formErrors ? formErrors.merchant_name : ''"
      item-text="name"
      item-value="id"
      v-model="formModel.merchant_id"
      @input.native="fetchItems($event.target.value)"
    ></v-autocomplete>
      <input-radio-group
         v-model="formModel.status"
         :label="$t('label.status')"
         :options="statusEnums"
         :errorMessage="formErrors ? formErrors.status : ''"></input-radio-group>

      <crud-form-action
         backPath="products"
         :loading="loading"
         @submit="submit"></crud-form-action>
   </div>
</template>

<script>

  import AlertFormError from "@/components/widgets/alerts/AlertFormError";
  import InputRadioGroup from "@/components/widgets/forms/InputRadioGroup";
  import CrudFormAction from "@/components/widgets/forms/CrudFormAction";
  import formMixin from "@/mixins/form";

  export default {
    name: "FormBasic",
    mixins: [formMixin],
    props: ["record"],
    components: {
      AlertFormError,
      InputRadioGroup,
      CrudFormAction
    },
    data() {
      return {
        moduleName: "products",
        isCreate: true,
        bannerUpdate: false,
        formModel: {
          name: null,
          merchant_id: null,
          description: null,
          image: null,
          status: null
        },
      };
    },
    computed: {
      statusEnums() {
        return this.$store.state[this.moduleName].statusEnums;
      },
        merchants() {
      return this.$store.state.merchants.records;
    }
    },
    watch: {
      record(value) {
        if (value !== "undefined") {
          this.isCreate = false;
          this.formModel = this.$helper.jsonReparse(value);
          this.formModel.status = this.formModel.status == 'Active' ? 0 : 1;
        }
      }
    },
    created() {
      this.$store.dispatch(`${this.moduleName}/fetchEnums`, {
        routeName: "productStatus",
        stateKey: "statusEnums"
      });
      this.fetchItems();
    },
    methods: {
      fetchItems(value) {
      this.$store.dispatch(`merchants/fetchItems`, {
        code: value
      });
    },
      updateBanner(event, name){
        this.bannerUpdate = true;
        this.handleFileSelect(event, name)
      },
      async submit() {
        this.loading = true;

        if (!this.bannerUpdate){
          this.formModel.image = '';
        }
        try {
          let res = this.isCreate
            ? await this.$api.products.create(this.formModel)
            : await this.$api.products.update(this.formModel, this.record.id);

          this.handleApiSuccess(res, "products");
        } catch (err) {
          this.handleApiErrors(err);
        }
      }
    }
  };
</script>

<style scoped>

</style>
