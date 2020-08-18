<template>
  <v-container id="pages__login" class="fill-height">
    <v-layout>
      <v-row align="center" justify="center">
        <v-col cols="8" sm="6" md="5">
          <v-card class="elevation-1 pa-3">
            <!-- <alert-form-error :error-message="errorMessage" /> -->

            <v-card-title>
              <v-btn :to="localePath('login')" icon small>
                <v-icon>mdi-keyboard-backspace</v-icon>
              </v-btn>
              <div><p class="text-center my-auto">VERIFY EMAIL</p></div>
            </v-card-title>
            <v-divider> </v-divider>
            <v-card-text>
              <p class="subheading">
                Your email has been verified. Please proceed to login page.
              </p>
              <v-btn
                color="primary"
                block
                class="mx-0 text-center"
                :to="localePath('login')"
                >Go To Login</v-btn
              >
            </v-card-text>
          </v-card>
        </v-col>
      </v-row></v-layout
    >
  </v-container>
</template>

<script>
export default {
  auth: "guest",
  layout: "auth",
  data() {
    return {
      moduleName: "email"
    };
  },
  created() {
    this.verifiedEmail();
  },
  methods: {
    async verifiedEmail() {
      let res = await this.$api[this.moduleName].verifiedEmail({
        id: this.$route.query.id,
        hash: this.$route.query.hash
      });
    }
  }
};
</script>
