<template>
  <v-card class="components__formPageToken">
    <v-card-title class="headline">
      {{ $t("label.addPageToken") }}
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-textarea
          v-model="formModel.page_token"
          :label="$t('label.pageToken')"
          :error-messages="
            formErrors && formErrors.page_token ? formErrors.page_token : ''
          "
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="submit">
        {{ $t("label.submit") }}
      </v-btn>
      <v-btn text @click="close">
        {{ $t("label.cancel") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import formMixin from "@/mixins/form";

export default {
  mixins: [formMixin],
  props: ["record"],
  data() {
    return {
      isCreate: true,
      formModel: {
        page_token: ""
      }
    };
  },
  watch: {
    record(value) {
      if (value !== "undefined") {
        console.log('true');
        this.isCreate = false;
        this.formModel.page_token = this.$helper.jsonReparse(value[0].page_token);
      }
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      console.log("in");
      console.log(this.record);
       if (this.record.length > 0) {
         console.log("error")
        this.isCreate = false;
        this.formModel.page_token = this.$helper.jsonReparse(this.record[0].page_token);
      } else {
        console.log('no data')
      }
    },
    async submit() {
      try {
        this.$store.commit("setOverlay", true);
        this.formModel.merchant_id = this.$route.params.id;
        console.log(this.record)
        let res = this.isCreate
          ? await this.$api.merchantPageTokens.create(this.formModel)
          : await this.$api.merchantPageTokens.update(this.formModel, this.record[0].id);
        // const res = await this.$api.merchantPageTokens.create(this.formModel);
        this.resetForm();
        this.handleApiSuccess(res);
        this.$emit("close");
      } catch (err) {
        this.handleApiErrors(err);
      } finally {
        this.$store.commit("setOverlay", false);
      }
    },
    close() {
      this.resetForm();
      this.$emit("close");
    },
    resetForm() {
      this.formModel = {
        page_token: ""
      };
    }
  }
};
</script>
