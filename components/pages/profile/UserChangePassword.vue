<template>
  <div>
    <div>
      <template v-if="user.has_password == true">
        <td class="font-semibold pb-5">Update your password</td>
      </template>
      <template v-if="user.has_password != true">
        <td class="font-semibold pb-5">Please set your password</td>
      </template>
      <vs-input
        type="password"
        class="w-full pb-3"
        icon-pack="feather"
        icon="icon-lock"
        icon-no-border
        label-placeholder="Current Password"
        v-model="formModel.current_password"
        v-if="user.has_password == true"
      />
      <span class="text-danger text-sm" :error-messages="formErrors ? formErrors.current_password : ''">{{ this.formErrors.current_password ? this.formErrors.current_password[0] : '' }}</span>
      <vs-input
        type="password"
        class="w-full pb-3"
        icon-pack="feather"
        icon="icon-lock"
        icon-no-border
        label-placeholder="New Password"
        v-model="formModel.new_password"
      />
      <span class="text-danger text-sm" :error-messages="formErrors ? formErrors.new_password : ''">{{ this.formErrors.new_password ? this.formErrors.new_password[0] : '' }}</span>
      <vs-input
        type="password"
        class="w-full pb-3"
        icon-pack="feather"
        icon="icon-lock"
        icon-no-border
        label-placeholder="Confirm New Password"
        v-model="formModel.new_confirm_password"
      />
      <span class="text-danger text-sm" :error-messages="formErrors ? formErrors.new_confirm_password : ''">{{ this.formErrors.new_confirm_password ? this.formErrors.new_confirm_password[0] : '' }}</span>
    </div>

    <!-- Save & Reset Button -->
    <div class="float-right">
      <vs-button class="ml-auto mt-2" @click="validate" type="filled">Save Changes</vs-button>
      <vs-button
        type="border"
        color="warning"
        class="mb-3"
        @click="
          formModel.new_confirm_password = formModel.new_password = formModel.current_password =
            ''
        "
      >Reset</vs-button>
    </div>
  </div>
</template>

<script>
import formMixin from "@/mixins/form";
export default {
  mixins: [formMixin],
  data() {
    return {
      moduleName: "password",
      formModel: {
        current_password: null,
        new_confirm_password: null,
        new_password: null,
      },
    };
  },
  asyncData() {
    return {
      user: [],
    };
  },

  methods: {
    async validate() {
      try {
        let res = await this.$api.password.updatePassword({
          ...this.formModel,
        });
        if (res.http_code == 201) {
           this.handleApiSuccess(res, this.redirectRoute);
            this.popupActive2 = false;
        }
      } catch (err) {
        if (err) {
          this.handleApiErrors(err);
        }
      }
    },
  },
  created() {
    this.user = this.$store.state.auth.user;
    console.log("user", this.user);
  },
};
</script>
