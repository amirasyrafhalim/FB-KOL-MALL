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
                <div class="vx-card__title mb-8">
                  <h4 class="mb-4">Recover your password</h4>
                  <p>Please enter your email address and we'll send you instructions on how to reset your password.</p>
                </div>
                <vs-input 
                  v-model="email"
                  :rules="emailRules"
                  label-placeholder="Email"
                  required
                  class="w-full mb-8" 
                  :danger-text="formErrors.email ? formErrors.email[0] : ''"
                  :danger="formErrors ? formErrors.email : ''"
                  />
                <vs-button
                  type="border"
                  to="/login"
                  class="px-4 w-full md:w-auto">
                  Back To Login
                </vs-button>
                <vs-button
                  class="float-right px-4 w-full md:w-auto mt-3 mb-8 md:mt-0 md:mb-0"
                  :disabled="!valid"
                  @click="validate"
                  :loading="loading">
                  Recover Password
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
  mixins: [formMixin],
  components: {
    AlertFormError
  },
  auth: "guest",
  layout: "auth",
  data: () => ({
    moduleName: "password",
    valid: true,
    loading: false,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ]
  }),
  computed: {
  },

  methods: {
    async validate() {

        try {
          this.loading = true
        let res = await this.$api[this.moduleName].resetPassword({email: this.email});
        console.log(res)
        this.valid = false
        this.handleApiSuccess(res);
      } catch (err) {
        console.log(err)
        this.handleApiErrors(err);
      }
    },
  }
};
</script>
<style scoped>

</style>
