<template>
  <v-container id="pages__login" class="fill-height" fluid>
    <v-layout>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-1 pa-3">
            <alert-form-error :error-message="errorMessage" />
            <v-card-text>
              <div class="layout column align-center">
                <h1 class="flex text-center mt-4 mb-2 primary--text">
                  {{ $store.state.appName }}
                </h1>
                <h4 class="flex text-xs-center">{{ $t("label.welcome") }}</h4>
              </div>
              <v-form>
                <v-text-field
                  append-icon="mdi-mail"
                  type="email"
                  :label="$t('label.email')"
                  :error-messages="formErrors ? formErrors.email : ''"
                  v-model="formModel.email"
                ></v-text-field>
                <v-text-field
                  type="password"
                  append-icon="mdi-lock"
                  :label="$t('label.password')"
                  :error-messages="formErrors ? formErrors.password : ''"
                  v-model="formModel.password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="flex-column text-right">
              <v-btn color="primary" block @click="login">
                {{ $t("label.login") }}
              </v-btn>
              <a :href="localePath('forgotPassword')" class="caption text-right mt-2"> Forgot Password? </a>
              <div class="login-option__divider">
                <div class="login-option__divider--wrapper">
                  <v-divider />
                </div>
                <p class="mb-0 px-6">{{ $t("label.or") }}</p>
                <div class="login-option__divider--wrapper">
                  <v-divider />
                </div>
              </div>

              <v-btn color="#3b5998" block dark @click="loginWithFacebook">
                <v-icon left>mdi-facebook</v-icon>
                {{ $t("label.loginWithFacebook") }}
              </v-btn>
            </v-card-actions>
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
  mixins: [formMixin],
  components: {
    AlertFormError
  },
  asyncData() {
    return {
      formModel: {
        type: 0,
        email: "",
        password: ""
      }
    };
  },
  beforeCreate() {
    if (this.$route.hash) {
      this.$store.commit("setOverlay", true);
    }
  },
  methods: {
    async login() {
      this.$store.commit("setOverlay", true);

      try {
        await this.$auth.loginWith("local", {
          data: this.formModel
        });
        this.clearPreviousError();
        this.$router.push("/");
      } catch (err) {
        this.handleApiErrors(err);
      } finally {
        this.$store.commit("setOverlay", false);
      }
    },
    async loginWithFacebook() {
      this.$store.commit("setOverlay", true);

      try {
        await this.$auth.loginWith("facebook");
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login-option__divider {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0;

  .login-option__divider--wrapper {
    flex: 1 1 auto;
  }
}
</style>
