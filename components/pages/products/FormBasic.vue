<template>
  <div class="components__product--form-basic">
  
    <v-row>
      <v-col cols="6">
        <v-text-field
        solo
          class="my-2 border-radius-button"
          v-model="formModel.name"
          :label="$t('label.name')"
          :error-messages="formErrors ? formErrors.name : ''"
        >
        </v-text-field>
      </v-col>
      <v-col cols="6" class="mt-0">
         <v-autocomplete
         solo
          class="my-2 border-radius-button"
          :items="categories"
          :label="$t('label.category')"
          :error-messages="formErrors ? formErrors.category : ''"
          item-text="name"
          item-value="id"
          v-model="formModel.category_id"
          @input.native="fetchItems($event.target.value)"
        ></v-autocomplete>

       
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-textarea
        solo
          class="my-2 border-radius-button"
          name="input-7-4"
          label="Description"
          v-model="formModel.description"
          :error-messages="formErrors ? formErrors.description : ''"
        ></v-textarea>
      </v-col>
      <v-col cols="6">
        <v-file-input
        solo
          v-model="files"
          color="primary"
          label="File input"
        
          style="min-height:40%"
          placeholder="Upload your photo"
          :show-size="1000"
          @change="updateBanner($event, 'image')"
          @click:clear="formModel.image = null"
        >
          <template v-slot:selection="{ text }">
            <v-chip color="deep-purple accent-4" dark label small>
              {{ text }}
            </v-chip>
          </template>
        </v-file-input>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-switch
          hide-details
          class="text-right"
          v-model="formModel.status"
         :label="`Status: ${formModel.status == true ? 'Active' : 'Inactive'}`"
        ></v-switch>
      </v-col>
      
    </v-row>
    <crud-form-action
      backPath="products"
      :loading="loading"
      @submit="submit"
    ></crud-form-action>
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
      files: null,
      formModel: {
        merchant_id: 1,
        name: null,
        status: false,
        description: null,
        image: null,
        category_id: null,
      }
    };
  },
  computed: {
    statusEnums() {
      return this.$store.state[this.moduleName].statusEnums;
    },
    categories() {
      return this.$store.state.categories.records;
    }
  },
  watch: {
    record(productValue) {
      if (productValue !== "undefined") {
        console.log('value', productValue)
        this.isCreate = false;
        this.formModel.merchant_id = productValue.merchant_id
        this.formModel.name = productValue.name
        this.formModel.status = productValue.status.value == 1 ? true : false;
        this.formModel.description = productValue.description
        this.formModel.category_id = productValue.category[0].id;
      }
    }
     
    
  },
  created() {
    // this.$store.dispatch(`${this.moduleName}/fetchEnums`, {
    //   routeName: "productStatus",
    //   stateKey: "statusEnums"
    // });
    this.fetchItems();
  },
  methods: {
    fetchItems(value) {
      this.$store.dispatch("categories/fetchItems");
    },
    updateBanner(event, name) {
      this.bannerUpdate = true;
      this.handleFileSelect(event, name);
    },
    async submit() {
      this.loading = true;

      if (!this.bannerUpdate) {
        this.formModel.image = "";
      }
      
        this.formModel.status = this.formModel.status == true ? 1 : 0;

      
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
.field-text-box {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  background: white;
  align-items: center;
  color: inherit;
  display: flex;
  margin-bottom: 8px;
  min-height: inherit;
  position: relative;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  width: 100%;
  box-sizing: inherit;
}
.col-xl, .col-xl-auto, .col-xl-12, .col-xl-11, .col-xl-10, .col-xl-9, .col-xl-8, .col-xl-7, .col-xl-6, .col-xl-5, .col-xl-4, .col-xl-3, .col-xl-2, .col-xl-1, .col-lg, .col-lg-auto, .col-lg-12, .col-lg-11, .col-lg-10, .col-lg-9, .col-lg-8, .col-lg-7, .col-lg-6, .col-lg-5, .col-lg-4, .col-lg-3, .col-lg-2, .col-lg-1, .col-md, .col-md-auto, .col-md-12, .col-md-11, .col-md-10, .col-md-9, .col-md-8, .col-md-7, .col-md-6, .col-md-5, .col-md-4, .col-md-3, .col-md-2, .col-md-1, .col-sm, .col-sm-auto, .col-sm-12, .col-sm-11, .col-sm-10, .col-sm-9, .col-sm-8, .col-sm-7, .col-sm-6, .col-sm-5, .col-sm-4, .col-sm-3, .col-sm-2, .col-sm-1, .col, .col-auto, .col-12, .col-11, .col-10, .col-9, .col-8, .col-7, .col-6, .col-5, .col-4, .col-3, .col-2, .col-1 {
    width: 100%;
    padding: 0px 12px;
}


</style>
