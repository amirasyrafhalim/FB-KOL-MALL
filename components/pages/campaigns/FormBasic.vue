<template>
  <div class="components__campaign--form-basic">
    <v-text-field
      v-model="formModel.name"
      :label="$t('label.name')"
      :error-messages="formErrors ? formErrors.name : ''"
    />
    <v-autocomplete
      :items="merchants"
      :label="$t('menuTitle.facebookPage')"
      :error-messages="formErrors ? formErrors.merchant_name : ''"
      item-text="name"
      item-value="id"
      v-model="formModel.merchant_id"
      @input.native="fetchItems($event.target.value)"
    ></v-autocomplete>

    <!--<v-text-field-->
      <!--v-model="formModel.stream_id"-->
      <!--:label="$t('label.streamId')"-->
      <!--:error-messages="formErrors ? formErrors.stream_id : ''"-->
    <!--/>-->

    <!--<v-text-field-->
      <!--v-model="formModel.stream_start_at"-->
      <!--:label="$t('label.streamStartAt')"-->
      <!--:error-messages="formErrors ? formErrors.stream_start_at : ''"-->
    <!--/>-->

    <!--<v-text-field-->
      <!--v-model="formModel.stream_end_at"-->
      <!--:label="$t('label.streamEndAt')"-->
      <!--:error-messages="formErrors ? formErrors.stream_end_at : ''"-->
      <!--/>-->
      <!-- <input-radio-group
         :disabled="formModel.status === 2"
         v-model="formModel.status"
         :label="$t('label.status')"
         :options="statusEnums"
         :errorMessage="formErrors ? formErrors.status : ''"
      /> -->

    <crud-form-action
      backPath="campaigns"
      :loading="loading"
      @submit="submit"
    />
  </div>
</template>

<script>
import AlertFormError from "@/components/widgets/alerts/AlertFormError";
import InputRadioGroup from "@/components/widgets/forms/InputRadioGroup";
import CrudFormAction from "@/components/widgets/forms/CrudFormAction";

import formMixin from "@/mixins/form";

export default {
  mixins: [formMixin],
  props: ["record"],
  components: {
    AlertFormError,
    InputRadioGroup,
    CrudFormAction
  },
  data() {
    return {
      moduleName: "campaigns",
      isCreate: true,
      formModel: {
        name: null,
        merchant_name: null,
        // stream_id: null,
        // stream_start_at: null,
        // stream_end_at: null,
        status: 1
      }
    };
  },
  computed: {
    merchants() {
      return this.$store.state.merchants.records;
    }
  },
  watch: {
    record(value) {
      if (value !== "undefined") {
        this.isCreate = false;
        this.formModel = this.$helper.jsonReparse(value);
      }
    }
  },
  created() {
    this.fetchItems();
  
  },
  methods: {
    fetchItems(value) {
      this.$store.dispatch(`merchants/fetchItems`, {
        code: value
      });
    },
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
