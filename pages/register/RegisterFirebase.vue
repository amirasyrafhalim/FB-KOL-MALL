<template>
  <div class="clearfix">
    <div class="social-login-buttons flex flex-wrap items-center mt-4">
      <!-- facebook -->
      <vs-button
        color="#3b5998"
        class="w-full"
        @click="loginWithFacebook"
        :disabled="!validateForm">
        <vs-row>
          <vs-col vs-type="flex" vs-w="auto">
             <feather-icon
                icon="FacebookIcon"
                class="mr-1"
      />
       <span class="my-auto">
          {{ $t("label.signUpWithFacebook") }}
        </span>
          </vs-col>
        </vs-row>
      </vs-button>
    </div>
    <vs-divider>OR</vs-divider>

    <vs-input
      label-placeholder="Name"
      name="displayName"
      placeholder="Name"
      v-model="formModel.name"
      class="w-full"
      :danger-text="formErrors.name ? formErrors.name[0] : ''"
      :danger="formErrors ? formErrors.name : ''"
    />

    <vs-input
      name="email"
      type="email"
      label-placeholder="Email"
      placeholder="Email"
      v-model="formModel.email"
      class="w-full mt-6"
      :danger-text="formErrors.email ? formErrors.email[0] : ''"
      :danger="formErrors ? formErrors.email : ''"
    />
  
    <vs-input
      ref="password"
      type="password"
      name="password"
      label-placeholder="Password"
      placeholder="Password"
      v-model="formModel.password"
      class="w-full mt-6"
      :danger-text="formErrors.password ? formErrors.password[0] : ''"
      :danger="formErrors ? formErrors.password : ''"
    />

    <vs-input
      type="password"
      data-vv-as="password"
      name="confirm_password"
      label-placeholder="Confirm Password"
      placeholder="Confirm Password"
      v-model="formModel.password_confirmation"
      class="w-full mt-6"
      :danger-text="formErrors.password ? formErrors.password[0] : ''"
      :danger="formErrors ? formErrors.password : ''"
    />

    <vs-row>
      <vs-col vs-w="1" >
        <vs-checkbox 
          v-model="formModel.isTermsConditionAccepted"
          value="true"
          class="mt-6 w-10">
        </vs-checkbox >
      </vs-col>
      <vs-col vs-w="10" class="my-auto mb-0 ml-1">
        <span style="font-size: 12px" class="my-auto">I agree to all KOL Store's <a href="https://kolstore.co/tnc" target="_blank" class="my-auto" style="text-decoration: underline">Terms & Conditions.</a></span>
      </vs-col>
    </vs-row>
   
    <vs-button type="border" to="/login" class="mt-6">Login</vs-button>
    <vs-button
      class="float-right mt-6"
      @click="signUp"
      :disabled="!validateForm"
      >Register</vs-button
    >
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
  data() {
    return {
      formModel: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        isTermsConditionAccepted: false,
        referrer_code: ""
      }
    };
  },
  computed: {
    validateForm() {
      if (this.formModel.isTermsConditionAccepted) {
        return true;
      }
      // return !this.errors.any() && this.displayName !== '' && this.email !== '' && this.password !== '' && this.confirm_password !== '' && this.isTermsConditionAccepted === true
    }
  },
  created() {
    if (this.$route.query.token) {
      this.signUpFB();
    }
  },
  methods: {
    loginWithFacebook() {
      this.$vs.loading();
      window.location.href =
        process.env.API_URL + "/v1/auth/fb-redirect";
    },
    async signUpFB() {
      this.$vs.loading();
      try {
        var auth = this.$store.state.auth;
        const { data } = await this.$api.auth.loginFB({
          token: this.$route.query.token
        });
        this.$auth.setToken("local", "Bearer " + data);
        this.$auth.setStrategy("local");
        await this.$auth.fetchUser();
        if (this.$auth.user.merchant) {
          this.$router.push("/");
        } else {
          this.$router.push("/referralCode");
        }
        this.$vs.loading.close();
      } catch (err) {
        console.log(err);
      }
    },
    checkLogin() {
      // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn) {
        // Close animation if passed as payload
        // this.$vs.loading.close()

        this.$vs.notify({
          title: "Login Attempt",
          text: "You are already logged in!",
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "warning"
        });

        return false;
      }
      return true;
    },
    async signUp() {
      this.$vs.loading();
      try {
        console.log("formModel", this.formModel);
        var res = await this.$api.auth.register(this.formModel);

        this.handleApiSuccess(res, "login");
      } catch (err) {
        this.handleApiErrors(err);
      } finally {
        this.$vs.loading.close();
      }
    }
  }
};
</script>