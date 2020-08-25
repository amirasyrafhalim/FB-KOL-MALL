<template>
  <div class="components__campaign--form-basic">
    <v-row>
      <v-col sm="6" md="6">
        <v-text-field
          v-model="formModel.name"
          :label="$t('label.name')"
          :error-messages="formErrors ? formErrors.name : ''"/>
        <!-- <v-autocomplete
          :items="merchants"
          :label="$t('menuTitle.facebookPage')"
          :error-messages="formErrors ? formErrors.merchant_name : ''"
          item-text="name"
          @input.native="fetchItems($event.target.value)"
        ></v-autocomplete -->
      </v-col>
    </v-row>
    <div class="d-inline-flex my-5">
      <crud-form-action
        class="mx-2"
        backPath="campaigns"
        :loading="loading"
        @submit="submit"
      />
    </div>

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
  </div>
</template>

<script>
import AlertFormError from "@/components/widgets/alerts/AlertFormError";
import InputRadioGroup from "@/components/widgets/forms/InputRadioGroup";
import CrudFormAction from "@/components/widgets/forms/CrudFormAction";
import FormPackage from "@/components/pages/campaigns/FormPackage";

import formMixin from "@/mixins/form";

export default {
  mixins: [formMixin],
  props: ["record"],
  components: {
    AlertFormError,
    InputRadioGroup,
    CrudFormAction,
    FormPackage
  },
  data() {
    return {
      moduleName: "campaigns",
      isCreate: true,
      formModel: {
        name: null,
        merchant_name: null,
        merchant_id:1,
        status: 1,
        created_by:null,
        updated_by:null,
        created_at:null,
        updated_at:null,
        video_id:null
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
