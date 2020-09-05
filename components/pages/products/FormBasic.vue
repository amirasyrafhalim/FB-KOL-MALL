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
        merchant_id: null,
        name: null,
        status: false,
        description: null,
        image: null,
        category_id: null
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
        this.isCreate = false;
        this.formModel.merchant_id = productValue.merchant_id;
        this.formModel.name = productValue.name;
        this.formModel.status = productValue.status.value == 1 ? true : false;
        this.formModel.description = productValue.description;
        this.formModel.category_id = productValue.category[0].id;
      }
    }
  },
  created() {
    this.fetchItems();
  },
  methods: {
    fetchItems(value) {
      console.log(this.$auth.user);
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
      this.formModel.merchant_id = this.$auth.user.merchant.id;
      console.log("formModel", this.formModel);

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
