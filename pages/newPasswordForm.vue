<template>
  <v-container id="pages__login" class="fill-height">
    <v-layout>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="5">
          <v-card class="elevation-1 pa-3">
            <alert-form-error :error-message="errorMessage" />
            <v-card-title>
              <v-btn :to="localePath('login')" icon small>
                <v-icon>mdi-keyboard-backspace</v-icon>
              </v-btn>
              <div><p class="text-center my-auto">RESET PASSWORD</p></div>
            </v-card-title>
            <v-divider> </v-divider>
            <v-card-text>
              <v-form>
                <v-text-field
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.password]"
                  :type="show1 ? 'text' : 'password'"
                  label="New Password"
                  hint="At least 8 characters"
                  v-model="formModel.password"
                  class="input-group--focused"
                  :error-messages="formErrors ? formErrors.password : ''"
                  @click:append="show1 = !show1"
                ></v-text-field>

                <v-text-field
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.password, passwordConfirmationRule]"
                  :type="show2 ? 'text' : 'password'"
                  label="New Password"
                  hint="At least 8 characters"
                  v-model="formModel.password_confirmation"
                  class="input-group--focused"
                  :error-messages="
                    formErrors ? formErrors.password_comfirmation : ''
                  "
                  @click:append="show2 = !show2"
                ></v-text-field>

                <v-btn
                  block
                  color="primary"
                  class="mr-4 "
                  @click="submit"
                  :loading="loading"
                >
                  SUBMIT
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import AlertFormError from "@/components/widgets/alerts/AlertFormError";
import formMixin from "@/mixins/form";

export default {
  auth: "guest",
  layout: "auth",
  components: {
    AlertFormError
  },
  mixins: [formMixin],
  data() {
    return {
      moduleName: "password",
      show1: true,
      show2: true,
      loading: false,
      formModel: {
        email: null,
        password: null,
        password_confirmation: null,
        token: null
      },

      rules: {
        password: value => {
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
          return (
            pattern.test(value) ||
            "Min. 8 characters with at least one capital letter, a number and a special character."
          );
        }
      }
    };
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.formModel.password === this.formModel.password_confirmation ||
        "Password must match";
    }
  },
  methods: {
    async submit() {
      try {
        this.loading = true;
        let res = await this.$api[this.moduleName].newPassword({
          email: this.$route.query.email,
          password: this.formModel.password,
          password_confirmation: this.formModel.password_confirmation,
          token: this.$route.query.token
        });
        console.log(res);
        this.handleApiSuccess(res);
        // //redirect to login page
        this.$router.push("/");
      } catch (err) {
        console.log(err);
        this.handleApiErrors(err);
      }
    }
  }
};
</script>

<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
</style>
