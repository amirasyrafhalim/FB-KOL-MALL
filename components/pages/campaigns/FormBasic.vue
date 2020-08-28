<template>
  <div class="components__campaign--form-basic">
    <v-col sm="6" md="6">
      <v-text-field
        v-model="formModel.name"
        :label="$t('label.name')"
        :error-messages="formErrors ? formErrors.name : ''"
      />
    </v-col>
    <v-col cols="12" md="7">
      <crud-form-action backPath="campaigns" :loading="loading" @submit="submit"
    /></v-col>

  </div>
</template>

<script>
import AlertFormError from "@/components/widgets/alerts/AlertFormError";
import InputRadioGroup from "@/components/widgets/forms/InputRadioGroup";
import CrudFormAction from "@/components/widgets/forms/CrudFormAction";
import FormPackage from "@/components/pages/campaigns/FormPackage";
import ToolBar from "@/components/TheToolbar.vue";

import formMixin from "@/mixins/form";

export default {
  mixins: [formMixin],
  props: ["record"],
  components: {
    AlertFormError,
    InputRadioGroup,
    CrudFormAction,
    FormPackage,
    ToolBar
  },
  data() {
    return {
      moduleName: "campaigns",
      isCreate: true,
      formModel: {
        name: "",
        merchant_name: this.$auth.user.merchant.name,
        slug: "",
        merchant_id: this.$auth.user.merchant.id,
        status: 1,
        created_by: this.$auth.user.id,
        updated_by: this.$auth.user.id,
        video_id: 1
      }
    };
  },
 
  watch: {
    record(value) {
      if (value !== "undefined") {
        this.isCreate = false;
        this.formModel = this.$helper.jsonReparse(value);
      }
    }
  },
 
  methods: {
    async submit() {
      this.loading = true;

      try {
        let res = this.isCreate
          ? await this.$api.campaigns.create(this.formModel)
          : await this.$api.campaigns.update(this.formModel, this.record.id);

        this.handleApiSuccess(res, "campaigns");
      } catch (err) {
        this.handleApiErrors(err);
      }
    }
  }
};
</script>
