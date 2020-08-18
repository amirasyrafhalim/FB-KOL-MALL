<template>
  <div class="components__merchant--form-basic">
    <v-text-field
      v-model="formModel.name"
      :label="$t('label.name')"
      :error-messages="formErrors ? formErrors.name : ''"
    ></v-text-field>

    <v-text-field
      v-model="formModel.phone_no"
      :label="$t('label.phoneNo')"
      :error-messages="formErrors ? formErrors.phone_no : ''"
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
      v-model="formModel.address"
      :label="$t('label.address')"
      :error-messages="formErrors ? formErrors.address : ''"
    ></v-text-field>

    <v-autocomplete
      :items="dropdownCountry"
      :label="$t('label.country')"
      :error-messages="formErrors ? formErrors.country_id : ''"
      item-text="name"
      item-value="id"
      v-model="formModel.country_id"
      @input.native="fetchCountry($event.target.value)"
    ></v-autocomplete>

    <v-autocomplete
      :items="dropdownState"
      :label="$t('label.state')"
      :error-messages="formErrors ? formErrors.state_id : ''"
      item-text="name"
      item-value="id"
      v-model="formModel.state_id"
      @input.native="fetchState($event.target.value)"
    ></v-autocomplete>

    <v-autocomplete
      :items="dropdownPostcode"
      :label="$t('label.postcode')"
      :error-messages="formErrors ? formErrors.postcode_id : ''"
      item-text="code"
      item-value="id"
      v-model="formModel.postcode_id"
      @input.native="fetchPostcode($event.target.value)"
    ></v-autocomplete>

    <span class="subtitle-1	">
      {{ $t("label.live") }}
    </span>
    <v-switch
      v-model="formModel.stream_channel"
      :label="
        `${
          formModel.stream_channel === 0
            ? $t('label.personal')
            : $t('label.page')
        }`
      "
      :true-value="1"
      :false-value="0"
      color="primary"
    ></v-switch>

    <input-radio-group
      v-if="this.$store.getters.isAdmin"
      v-model="formModel.status"
      :label="$t('label.status')"
      :options="statusEnums"
      :errorMessage="formErrors ? formErrors.status : ''"
    ></input-radio-group>

    <crud-form-action
      :backPath="this.$store.getters.isAdmin ? 'merchants' : 'companyDetails'"
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
        phone_no: null,
        banner: null,
        page_url: null,
        address: null,
        country_id: null,
        state_id: null,
        postcode_id: null,
        status: null,
        stream_channel: 0
      }
    };
  },
  computed: {
    statusEnums() {
      return this.$store.state[this.moduleName].statusEnums;
    },
    dropdownPostcode() {
      return this.$store.state[this.moduleName].dropdownPostcode;
    },
    dropdownState() {
      return this.$store.state[this.moduleName].dropdownState;
    },
    dropdownCountry() {
      return this.$store.state[this.moduleName].dropdownCountry;
    },
    redirectRoute() {
      return this.$store.getters.isAdmin ? "merchants" : "companyDetails";
    }
  },
  watch: {
    record(value) {
      if (value !== "undefined") {
        this.isCreate = false;
        this.formModel = this.$helper.jsonReparse(value);
        if(value.stream_channel == "Page") {
          this.formModel.stream_channel = 1
        } else {
          this.formModel.stream_channel = 0
        }
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
    this.fetchPostcode();
    this.fetchCountry();
    this.fetchState();
    this.fetchStatus();
  },
  methods: {
    updateBanner(event, name) {
      this.bannerUpdate = true;
      this.handleFileSelect(event, name);
    },
    fetchPostcode(value) {
      this.$store.dispatch(`${this.moduleName}/fetchPostcode`, {
        routeName: "getAllPostcode",
        stateKey: "dropdownPostcode",
        code: value
      });
    },
    fetchStatus() {
      this.$store.dispatch(`${this.moduleName}/fetchEnums`, {
        routeName: "merchantStatus",
        stateKey: "statusEnums"
      });
    },
    fetchState(value) {
      this.$store.dispatch(`${this.moduleName}/fetchState`, {
        routeName: "getAllState",
        stateKey: "dropdownState",
        name: value
      });
    },
    fetchCountry(value) {
      this.$store.dispatch(`${this.moduleName}/fetchCountry`, {
        routeName: "getAllCountry",
        stateKey: "dropdownCountry",
        name: value
      });
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

        this.handleApiSuccess(res, this.redirectRoute);
        // location.reload();
      } catch (err) {
        this.handleApiErrors(err);
      }
    }
  }
};
</script>
