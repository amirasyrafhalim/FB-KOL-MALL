<template>
  <v-container id="pages__register" class="fill-height background" fluid>
    <v-layout justify-center>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="elevation-1 pa-3 border-radius-box secondary">
            <alert-form-error :error-message="errorMessage" />
            <v-card-text>
              <div class="layout column align-center">
                <img :src="require('~/assets/img/logo.png')" height="50" width="auto" contain />
                <h2
                  class="flex text-xs-center text-black bold font-weight-black my-4"
                >
                  {{ $t("label.joinUs") }}
                </h2>
              </div>
              {{formErrors.name}}
              <div>
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
                    src="../assets/img/facebook.png"
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
                    src="../assets/img/google.png"
                  />{{ $t("label.loginWithGoogle") }}
                </v-btn>
              </div>
              <div class="login-option__divider mt-2">
                <div class="login-option__divider--wrapper"></div>
                <h5 class="mb-0 py-2 text-center">{{ $t("label.or") }}</h5>
                <div class="login-option__divider--wrapper"></div>
              </div>

              <v-form>
                <v-text-field
                  text--primary
                  font-weigth-black
                  class="my-2"
                  text-grey
                  single-line
                  solo
                  flat
                  dense
                  type="text"
                  :label="$t('label.name')"
                  :error-messages="formErrors ? formErrors.name : ''"
                  v-model="formModel.name"
                ></v-text-field>
                <v-text-field
                  text--primary
                  font-weigth-black
                  class="my-2"
                  text-grey
                  single-line
                  solo
                  flat
                  dense
                  type="email"
                  :label="$t('label.email')"
                  :error-messages="formErrors ? formErrors.email : ''"
                  v-model="formModel.email"
                ></v-text-field>
                <v-text-field
                  class="my-2"
                  single-line
                  solo
                  flat
                  dense
                  type="password"
                  :label="$t('label.password')"
                  :error-messages="formErrors ? formErrors.password : ''"
                  v-model="formModel.password"
                ></v-text-field>
                <v-text-field
                  class="my-2"
                  single-line
                  solo
                  flat
                  dense
                  type="password"
                  :label="$t('label.confirmPassword')"
                  :error-messages="formErrors ? formErrors.password : ''"
                  v-model="formModel.password_confirmation"
                ></v-text-field>
                <v-text-field
                  class="my-2"
                  single-line
                  solo
                  flat
                  dense
                  type="text"
                  :label="$t('label.referalCode')"
                  v-model="formModel.referrer_code"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="flex-column text-right">
              <v-btn class="default-button white--text mb-2" block @click="signUp">
                {{ $t("label.signUp") }}
              </v-btn>

              <v-row align="center" justify="center">
                <h4 class="subtitle font-weight-bold black--text text-center">
                  Already have an account?
                </h4>
                <a
                  :href="localePath('login')"
                  class=" text-h4 pl-1 "
                  style="text-decoration:none;"
                >
                  Sign In
                </a>
              </v-row>

              <v-checkbox
                v-model="agree_checkbox"
                :rules="[v => !!v || 'You must agree to continue!']"
                required
                label="I agree with KOL Store Terms and Condition"
              ></v-checkbox>
              <a
                :href="localePath('forgotPassword')"
                class="caption text-right"
              >
                Forgot Password?
              </a>
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
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        referrer_code: ""
      },
      agree_checkbox: false
    };
  },
  beforeCreate() {
    if (this.$route.hash) {
      this.$store.commit("setOverlay", true);
    }
  },
  methods: {
    loginWithGoogle() {
      this.$store.commit("setOverlay", true);
      console.log("login with google");
    },
    async signUp() {
      this.$store.commit("setOverlay", true);
        try {
          var res = await this.$api.auth.register(this.formModel)
    
          this.handleApiSuccess(res, 'login');
        } catch (err) {
          console.log(err);
          this.handleApiErrors(err);
        } finally {
          this.$store.commit("setOverlay", false);
        }
    },
    async loginWithFacebook() {
      this.$store.commit("setOverlay", true);
      console.log("login with facebook");

      //   try {
      //     await this.$auth.loginWith("facebook");
      //   } catch (err) {
      //     console.log(err);
      //   }
    }
  }
};
</script>

<style lang="scss" scoped>
.register-option__divider {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0;
}

h5:before,
h5:after {
  content: "";
  flex: 1 1;
  border-bottom: 2px solid lightgray;
  margin: auto;
  padding: 0 20px;
}
h5 {
  display: flex;
  flex-direction: row;
}
</style>
