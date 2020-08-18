<template>
  <v-container id="pages__login" class="fill-height" fluid>
    <v-layout>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="6" md="5">
          <v-card class="elevation-1 pa-3 radius secondary">
            <alert-form-error :error-message="errorMessage" />
            <v-card-text>
              <div class="layout column align-center">
                <h1 class="flex text-center mt-4 mb-2 primary--text">
                  <v-img icon class="pl-1">
                    <img
                      :src="require('~/assets/Img/logo.png')"
                      width="auto"
                      height="50"
                      contain
                      class="mt-5"
                    />
                  </v-img>
                </h1>
                <h2
                  class="flex text-xs-center font-weight-black black--text text-h2 mt-5 mb-5"
                >
                  {{ $t("label.welcome") }}
                </h2>
              </div>
              <v-form>
                <v-btn
                  color="#3b5998"
                  block
                  dark
                  large
                  @click="loginWithFacebook"
                  class="mt-5"
                >
                  <img
                    width="auto"
                    height="25px"
                    class="pr-5"
                    src="../assets/Img/facebook.png"
                  />{{ $t("label.loginWithFacebook") }}
                </v-btn>
                <v-btn
                  block
                  @click="loginWithGoogle"
                  class="mt-5"
                  large
                  outlined
                >
                  <img
                    width="auto"
                    height="25px"
                    class="pr-5"
                    src="../assets/Img/google.png"
                  />{{ $t("label.loginWithGoogle") }}
                </v-btn>
                <v-row align="center" justify="center" class="mt-10 mb-10">
                  <h4
                    class="subtitle font-weight-bold black--text text-center"
                    :href="localePath('')"
                  >
                    Dont't have an account?
                  </h4>
                  <a href="#" class=" text-h4 pl-1 " style="text-decoration:none;">
                    Sign Up Now
                  </a>
                </v-row>
                <v-text-field
                  type="email"
                  :label="$t('label.email')"
                  :error-messages="formErrors ? formErrors.email : ''"
                  single-line
                  flat
                  solo
                  aria-autocomplete="on"
                  hide-details
                  class="mb-2"
                ></v-text-field>
                <v-text-field
                  type="password"
                  :label="$t('label.password')"
                  :error-messages="formErrors ? formErrors.password : ''"
                  single-line
                  flat
                  solo
                  aria-autocomplete="on"
                  hide-details
                  class="mb-2"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="flex-column text-right">
              <v-btn
                class="default-button text-white"
                block
                @click="login"
                large
              >
                <h4 class="text-white text-h3">{{ $t("label.login") }}</h4>
              </v-btn>
              <a
                :href="localePath('forgotPassword')"
                class="caption text-right mt-5 "
                style="text-decoration:none;"
                
              >
                Forgot Password
              </a>
              <div class="login-option__divider">
                <div class="login-option__divider--wrapper">
                  <v-divider />
                </div>
                <div class="login-option__divider--wrapper">
                  <v-divider />
                </div>
              </div>
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
.radius {
  border-radius: 25px !important;
}
</style>
