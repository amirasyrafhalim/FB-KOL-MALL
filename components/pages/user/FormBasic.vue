<template>
  <div class="components__product--form-basic">
    <v-text-field
      v-model="formModel.name"
      :label="$t('label.name')"
      :error-messages="formErrors ? formErrors.name : ''"
    ></v-text-field>
    <v-text-field
      v-model="formModel.email"
      :label="$t('label.email')"
      :error-messages="formErrors ? formErrors.email : ''"
    ></v-text-field>

    <v-row>
      <v-col cols="6">
        <v-text-field
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          name="input-10-2"
          label="Password"
          v-model="formModel.password"
          class="input-group--focused"
          :error-messages="formErrors ? formErrors.password : ''"
          @click:append="show1 = !show1"
        ></v-text-field>
      </v-col>
      <v-col cols="6" class="my-auto">
        <v-text-field
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[passwordConfirmationRule]"
          :type="show2 ? 'text' : 'password'"
          name="input-10-2"
          label="Confirm Password"
          v-model="formModel.password_confirmation"
          class="input-group--focused"
          :error-messages="formErrors ? formErrors.password_confirmation : ''"
          @click:append="show2 = !show2"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-autocomplete
      :items="rolesEnums"
      :label="$t('label.role')"
      :error-messages="formErrors ? formErrors.merchant_name : ''"
      item-text="description"
      item-value="value"
      v-model="formModel.role"
      @input.native="roleEnums($event.target.value)"
    ></v-autocomplete>

    <crud-form-action
      backPath="users"
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
      show1: true,
      show2: true,
      moduleName: "user",
      isCreate: true,
      formModel: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: ""
      },
      rules: {
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  computed: {
    rolesEnums() {
      return this.$store.state[this.moduleName].statusEnums;
    },
    passwordConfirmationRule() {
      return () =>
        this.password === this.confirmPassword || "Password must match";
    }
  },
  watch: {
    record(value) {
      if (value !== "undefined") {
        console.log(value);
        this.isCreate = false;
        this.formModel = this.$helper.jsonReparse(value);
        this.formModel.status = this.formModel.status == "Active" ? 0 : 1;

        this.formModel.role =
          value.roles[0] == "merchant" ? "merchant" : "admin";
      }
    }
  },
  created() {
    this.$store.dispatch(`${this.moduleName}/fetchEnums`, {
      routeName: "userRole",
      stateKey: "statusEnums"
    });
  },
  methods: {
    async submit() {
      this.loading = true;
      console.log(this.formModel);

      try {
        let res = this.isCreate
          ? await this.$api.user.create(this.formModel)
          : await this.$api.user.update(this.formModel, this.record.id);

        this.handleApiSuccess(res, "users");
      } catch (err) {
        this.handleApiErrors(err);
      }
    }
  }
};
</script>

<style scoped></style>
