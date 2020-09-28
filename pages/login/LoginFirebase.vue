<template>
  <div>
    <div class="social-login-buttons flex flex-wrap items-center mt-4">
      <!-- facebook -->
      <vs-button color="#3b5998" class="w-full my-auto" @click="loginWithFacebook">
        <vs-row>
          <vs-col vs-type="flex" vs-w="auto">
             <feather-icon
        icon="FacebookIcon"
        class="mr-1"
      />
       <span class="my-auto">
          {{ $t("label.loginWithFacebook") }}
        </span>
          </vs-col>
        </vs-row>
      </vs-button >
    </div>
  

    <vs-divider>OR</vs-divider>

    <vs-input
      name="email"
      icon-no-border
      icon="icon icon-user"
      icon-pack="feather"
      label-placeholder="Email"
      v-model="email"
      class="w-full"
    />

    <vs-input
      type="password"
      name="password"
      icon-no-border
      icon="icon icon-lock"
      icon-pack="feather"
      label-placeholder="Password"
      v-model="password"
      class="w-full mt-6"
    />

    <vs-alert 
      color="danger" 
      :active="!validated"
      class="mt-4"
    >
      Invalid Email or Password
    </vs-alert>

    <div class="flex flex-wrap justify-between my-5">
      <!-- <vs-checkbox v-model="checkbox_remember_me" class="mb-3">Remember Me</vs-checkbox> -->
      <router-link to="/forgotPassword">Forgot Password?</router-link>
    </div>
    <vs-button type="border" @click="registerUser">Register</vs-button>
    <vs-button class="float-right" :disabled="!validateForm" @click="login"
      >Login</vs-button
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
      email: "",
      password: "",
      checkbox_remember_me: false,
      grant_type: "password",
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      scope: "*",
      validated: true
    };
  },
  created() {
    if (this.$route.query.token) {
      this.signUpFB();
    }
  },
  computed: {
    validateForm() {
      return true;
      // return !this.errors.any() && this.email !== '' && this.password !== ''
    }
  },
  methods: {
    checkLogin() {
      // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn) {
        // Close animation if passed as payload
        this.$vs.loading.close();

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
    async login() {
      // Loading
      this.$vs.loading();

      const payload = {
        userDetails: {
          username: this.email,
          password: this.password,
          grant_type: "password",
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          scope: "*"
        }
      };

      try {
        await this.$auth.loginWith("local", {
          data: payload.userDetails
        });

        if (this.$auth.user.merchant) {
          this.$router.push("/");
        } else {
          this.$router.push("/referralCode");
        }
      } catch (err) {
        this.validated = false
      } finally {
        this.$vs.loading.close();
      }
    },

    // Facebook login
    loginWithFacebook() {
      this.$vs.loading();
      window.location.href =
        process.env.API_URL + "/v1/auth/fb-redirect";
    },
    registerUser() {
      if (!this.checkLogin()) return;
      this.$router.push("/register");
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
    }
  }
};
</script>

<style lang="scss">

</style>
