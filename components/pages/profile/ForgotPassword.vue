<template>
    
    
      <v-card align="center" justify="center" class="background-gradient">
        <v-col cols="12" sm="8" md="8">
          <v-card class="elevation-1 pa-3">
            <alert-form-error :error-message="errorMessage" />
            <v-card-title>
              <div><p class="text-center my-auto">ENTER EMAIL</p></div>
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
      </v-card>
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
    email: "",
    // token: this.$store.state.token,
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ]
  }),
  methods: {
    async validate() {
        try {
        let res = await this.$api[this.moduleName].resetPassword({email: this.email});
        console.log(res)
        await this.$auth.logout();
        this.valid = false
        this.handleApiSuccess(res);
      } catch (err) {
        console.log(err)
        this.handleApiErrors(err);
      }
    },
  },
  
};
</script>
<style scoped>

</style>
