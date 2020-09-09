<template>
  <v-container id="forgotPassword__login" class="fill-height" fluid >
    <v-layout>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
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
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>
                <v-btn
                  :disabled="!valid"
                  block
                  color="primary"
                  class="mr-4 "
                  @click="validate"
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
  components: {AlertFormError},
  mixins: [formMixin],
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
