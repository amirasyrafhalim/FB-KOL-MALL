<template>
  <div>
    <vs-input
      name="email"
      icon-no-border
      icon="icon icon-user"
      icon-pack="feather"
      label-placeholder="Email"
      v-model="email"
      class="w-full"
    />
    <!-- <span class="text-danger text-sm">{{ errors.first('email') }}</span> -->

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
    <!-- <span class="text-danger text-sm">{{ errors.first('password') }}</span> -->

    <div class="flex flex-wrap justify-between my-5">
      <!-- <vs-checkbox v-model="checkbox_remember_me" class="mb-3">Remember Me</vs-checkbox> -->
      <router-link to="/forgotPassword">Forgot Password?</router-link>
    </div>
    <vs-button type="border" @click="registerUser">Register</vs-button>
    <vs-button class="float-right" :disabled="!validateForm" @click="login"
      >Login</vs-button
    >

    <vs-divider>OR</vs-divider>

    <div class="social-login-buttons flex flex-wrap items-center mt-4">
      <!-- facebook -->
      <div
        class="bg-facebook pt-3 pb-2 px-4 rounded-lg cursor-pointer mr-4 w-full text-center text-white"
        @click="loginWithFacebook"
      >
        {{ "Login With Facebook" }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      checkbox_remember_me: false,
      grant_type: "password",
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      scope: "*"
    };
  },
  created() {
    if (this.$route.query.token) {
      console.log("token", this.$route.query.token);
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
      console.log("auth", this.$store.state);
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

      const payload ={
        userDetails: {
          username: this.email,
          password: this.password,
          grant_type: "password",
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          scope: "*"
        }
      }
      
      try {
        await this.$auth.loginWith("local", {
          data: payload.userDetails
        });
       console.log('auth', this.$auth.user);;
        // this.$router.push("/referralCode");
        
       if (this.$auth.user.merchant) {
          this.$router.push("/"); 
        } else {
          this.$router.push("/referralCode");
        }
        
      } catch (err) {
        console.log(err);
      } finally {
        this.$vs.loading.close();
      }
    },

    // Facebook login
    loginWithFacebook() {
      this.$vs.loading();
      window.location.href =
        process.env.API_URL_REDIRECT + "/v1/auth/fb-redirect";
      // this.$store.dispatch('auth/loginWithFacebook', { notify: this.$vs.notify })
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
        console.log("data", data);
        this.$auth.setToken("local", "Bearer " + data);
        this.$auth.setStrategy("local");
        await this.$auth.fetchUser();
        console.log('authh', this.$auth.user)
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
#page-login {
  .social-login-buttons {
    .bg-facebook {
      background-color: #1551b1;
    }
    .bg-twitter {
      background-color: #00aaff;
    }
    .bg-google {
      background-color: #4285f4;
    }
    .bg-github {
      background-color: #333;
    }
  }
}
</style>
