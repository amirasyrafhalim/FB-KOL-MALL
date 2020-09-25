<template>
  <div class="h-screen flex w-full bg-img">
        <div class="vx-col w-4/5 sm:w-4/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">
                    <div class="vx-row">
                        <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
                            <img src="@/assets/images/pages/forgot-password.png" alt="login" class="mx-auto">
                        </div>
                        <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg">
                            <div class="p-8">
                                <alert-form-error :error-message="errorMessage" />
                                <div class="vx-card__title mb-8">
                                    <h4 class="mb-4">Reset Password</h4>
                                    <p>Please enter your new password.</p>
                                </div>
                                <vs-input
                                  placeholder="New Password"
                                  icon-no-border
                                  icon-pack="feather"
                                  icon-after="true"
                                  :icon="show1 ? 'icon icon-eye' : 'icon icon-eye-off'"
                                  :type="show1 ? 'password' : 'text'"
                                  :rules="[rules.password]"
                                  :error-messages="formErrors ? formErrors.password : ''"
                                  hint="At least 8 characters"
                                  v-model="formModel.password"
                                  v-on:icon-click="show1 = !show1"
                                  class="w-full mb-8" />
                                <vs-input
                                  placeholder="Confirm New Password"
                                  icon-no-border
                                  icon-pack="feather"
                                  icon-after="true"
                                  :icon="show2 ? 'icon icon-eye' : 'icon icon-eye-off'"
                                  :type="show2 ? 'password' : 'text'"
                                  :rules="[rules.password, passwordConfirmationRule]"
                                  :error-messages="
                                    formErrors ? formErrors.password_comfirmation : ''
                                  "
                                  hint="At least 8 characters"
                                  v-model="formModel.password_confirmation"
                                  v-on:icon-click="show2 = !show2"
                                  class="w-full mb-8" />
                                <vs-button
                                  type="border"
                                  to="/login"
                                  class="px-4 w-full md:w-auto">
                                  Back To Login
                                  </vs-button>
                                <vs-button 
                                  class="float-right px-4 w-full md:w-auto mt-3 mb-8 md:mt-0 md:mb-0"
                                  @click="submit"
                                  :loading="loading">
                                  Submit
                                </vs-button>
                            </div>
                        </div>
                    </div>
                </div>
            </vx-card>
        </div>
    </div>
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
