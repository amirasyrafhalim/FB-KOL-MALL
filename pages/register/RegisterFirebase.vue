<template>
  <div class="clearfix">
    <vs-input
      label-placeholder="Name"
      name="displayName"
      placeholder="Name"
      v-model="formModel.name"
      class="w-full" />
    <!-- <span class="text-danger text-sm">{{ errors.first('displayName') }}</span> -->

    <vs-input
      name="email"
      type="email"
      label-placeholder="Email"
      placeholder="Email"
      v-model="formModel.email"
      class="w-full mt-6" />
    <!-- <span class="text-danger text-sm">{{ errors.first('email') }}</span> -->

    <vs-input
      ref="password"
      type="password"
      name="password"
      label-placeholder="Password"
      placeholder="Password"
      v-model="formModel.password"
      class="w-full mt-6" />
    <!-- <span class="text-danger text-sm">{{ errors.first('password') }}</span> -->

    <vs-input
      type="password"
      data-vv-as="password"
      name="confirm_password"
      label-placeholder="Confirm Password"
      placeholder="Confirm Password"
      v-model="formModel.password_confirmation"
      class="w-full mt-6" />
    <!-- <span class="text-danger text-sm">{{ errors.first('confirm_password') }}</span> -->

    <vs-checkbox v-model="formModel.isTermsConditionAccepted" class="mt-6">I accept the terms & conditions.</vs-checkbox>
    <vs-button  type="border" to="/login" class="mt-6">Login</vs-button>
    <vs-button class="float-right mt-6" @click="signUp" :disabled="!validateForm">Register</vs-button>
  </div>
</template>

<script>
  import formMixin from "@/mixins/form";

export default {
  mixins: [formMixin],
  data () {
    return {
      formModel: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        isTermsConditionAccepted: true,
        referrer_code: ''
      }
     
    }
  },
  computed: {
    validateForm () {
      return true;
      // return !this.errors.any() && this.displayName !== '' && this.email !== '' && this.password !== '' && this.confirm_password !== '' && this.isTermsConditionAccepted === true
    }
  },
  methods: {
    checkLogin () {
      // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn) {

        // Close animation if passed as payload
        // this.$vs.loading.close()

        this.$vs.notify({
          title: 'Login Attempt',
          text: 'You are already logged in!',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        })

        return false
      }
      return true
    },
    async signUp() {
      this.$vs.loading()
      // this.$store.commit("setOverlay", true);
      try {
        console.log('formModel', this.formModel)
        var res = await this.$api.auth.register( this.formModel);

        this.handleApiSuccess(res, "login");
      } catch (err) {
        console.log(err);
        this.handleApiErrors(err);
      } finally {
        this.$vs.loading.close();
      }
    }
  }
}
</script>
