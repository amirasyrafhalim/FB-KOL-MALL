<template>
  <div
    class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter">
            <div
              class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center"
            >
             <img
                src="logo-black.png"
                alt="login"
                class="mx-auto mb-5"
              />
              <img
                src="@/assets/images/pages/register.jpg"
                alt="register"
                class="mx-auto"
              />
            </div>
            <div
              class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center  d-theme-dark-bg"
            >
              <div class="px-8 py-8 register-tabs-container">
                <div class="vx-card__title mb-4">
                  <h4 class="mb-4">Create Account</h4>
                  <p>Fill the below form to create a new account.</p>
                </div>
                <register-firebase></register-firebase>
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
import RegisterFirebase from "./register/RegisterFirebase.vue";

import formMixin from "@/mixins/form";

export default {
  auth: "guest",
  layout: "auth",
  mixins: [formMixin],
  components: {
    AlertFormError,
    RegisterFirebase
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
        var res = await this.$api.auth.register(this.formModel);

        this.handleApiSuccess(res, "login");
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
