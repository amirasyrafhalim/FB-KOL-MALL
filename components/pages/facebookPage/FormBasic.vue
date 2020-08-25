<template>
    <div class="components__facebook_page--form-basic">
    <v-text-field
      v-model="formModel.name"
      :label="$t('label.name')"
      :error-messages="formErrors ? formErrors.name : ''"
    ></v-text-field>

    <v-row>
      <v-col>
        <v-file-input
          :label="$t('label.image')"
          :error-messages="formErrors ? formErrors.banner : ''"
          accept="image/*"
          show-size
          @change="updateBanner($event, 'banner')"
          @click:clear="formModel.banner = null"
          prepend-icon="mdi-library"
        ></v-file-input>
      </v-col>
      <v-col cols="auto" class="my-auto">
        <v-avatar size="32px" item>
          <v-img :src="(formModel && formModel.banner) || '/default_avatar.png'"></v-img>
        </v-avatar>
      </v-col>
    </v-row>

    <v-text-field
      v-model="formModel.page_url"
      :label="$t('label.pageUrl')"
      :error-messages="formErrors ? formErrors.page_url : ''"
    ></v-text-field>

    <v-text-field
      v-model="formModel.page_id"
      :label="$t('label.pageId')"
      :error-messages="formErrors ? formErrors.pageId : ''"
    ></v-text-field>

    <v-text-field
      v-model="formModel.page_token"
      :label="$t('label.facebookToken')"
      :error-messages="formErrors ? formErrors.name : ''"
    ></v-text-field>

    <crud-form-action
      backPath='facebook_page'
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
      moduleName: "merchants",
      isCreate: true,
      bannerUpdate: false,
      imageName: null,
      select: null,
      formModel: {
        name: null,
        banner: null,
        page_url: null,
        page_id: null,
        page_token: null,
        status: null
      }
    };
  },
  computed: {
    
  },
  watch: {
    record(value) {
      if (value !== "undefined") {
        this.isCreate = false;
        this.formModel = this.$helper.jsonReparse(value);
        if (value.status_description == "Pending") {
          this.formModel.status = 0;
        } else if (value.status_description == "Approve") {
          this.formModel.status = 1;
        } else {
          this.formModel.status = 2;
        }
      }
    }
  },
  created() {
  
  },
  methods: {
    updateBanner(event, name) {
      this.bannerUpdate = true;
      this.handleFileSelect(event, name);
    },
    async submit() {
      this.loading = true;
      if (!this.bannerUpdate) {
        this.formModel.banner = "";
      }
      if (!this.$store.getters.isAdmin) {
        this.formModel.status = 0;
      }
      try {
        let res = this.isCreate
          ? await this.$api.merchants.create(this.formModel)
          : await this.$api.merchants.update(this.formModel, this.record.id);
        this.handleApiSuccess(res, 'facebook_page');
        // location.reload();
      } catch (err) {
        this.handleApiErrors(err);
      }
    }
  }
};
</script>