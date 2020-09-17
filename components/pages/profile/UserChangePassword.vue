<template>
<div>
    <td class="font-semibold pb-5">Enter your new password</td>

    <vs-input
      type="password"
      class="w-full pb-3"
      icon-pack="feather"
      icon="icon-lock"
      icon-no-border
      label-placeholder="Current Password"
      v-model="formModel.current_password"
    />
    <vs-input
      type="password"
      class="w-full pb-3"
      icon-pack="feather"
      icon="icon-lock"
      icon-no-border
      label-placeholder="New Password"
      v-model="formModel.new_password"
    />
    <vs-input
      type="password"
      class="w-full pb-3"
      icon-pack="feather"
      icon="icon-lock"
      icon-no-border
      label-placeholder="Confirm New Password"
      v-model="formModel.new_confirm_password"
    />

    <!-- Save & Reset Button -->
    <div class="float-right">
      <vs-button class="ml-auto mt-2" @click="validate" type="filled"
        >Save Changes</vs-button
      >
      <vs-button
        type="border"
        color="warning"
        class="mb-3"
        @click="
          formModel.new_confirm_password = formModel.new_password = formModel.current_password =
            ''
        "
        >Reset</vs-button
      >
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      moduleName: "password",
      formModel: {
        current_password: null,
        new_confirm_password: null,
        new_password: null
      }
    };
  },
  asyncData() {
    return {
      user: []
    };
  },

  methods: {
    async validate() {
      try {
        let res = await this.$api.password.updatePassword({
          ...this.formModel
        });
        if (res.http_code == 201) {
          this.$vs.notify({
            title: "Success!",
            text: "Your password has been updated",
            color: "success"
          });
          this.popupActive2 = false;
        }
      } catch (err) {
        if (err) {
          this.$vs.notify({
            title: "Failed!",
            text: "Please insert your data correctly",
            color: "danger"
          });
        }
      }
    }
  },
  created() {
    this.user = this.$store.state.auth.user;
    console.log("user", this.user);
  }
};
</script>

<tr>
              <td class="font-semibold pb-5">Password</td>
              <div class="vx-col w-full flex pb-3 mt-3 pl-5" id="account-manage-buttons">
                <div class="demo-alignment">
                  <vs-button
                    @click="popupActive2 = true"
                    color="primary"
                    type="filled"
                    class="my-2 mb-4 mt-3"
                  >Change Password</vs-button>

                  <vs-popup
                    classContent="popup-example"
                    title="Enter your new password"
                    :active.sync="popupActive2"
                  >
                    <div class="vx-row mb-6">
                      <div class="vx-col sm:w-1/3 w-full">
                        <span>Current Password</span>
                      </div>
                      <div class="vx-col sm:w-2/3 w-full">
                        <vs-input
                          type="password"
                          class="w-full"
                          icon-pack="feather"
                          icon="icon-lock"
                          icon-no-border
                          v-model="formModel.current_password"
                        />
                      </div>
                    </div>

                    <div class="vx-row mb-6">
                      <div class="vx-col sm:w-1/3 w-full">
                        <span>New Password</span>
                      </div>
                      <div class="vx-col sm:w-2/3 w-full">
                        <vs-input
                          type="password"
                          class="w-full"
                          icon-pack="feather"
                          icon="icon-lock"
                          icon-no-border
                          v-model="formModel.new_password"
                        />
                      </div>
                    </div>

                    <div class="vx-row mb-6">
                      <div class="vx-col sm:w-1/3 w-full">
                        <span>Confirm New Password</span>
                      </div>
                      <div class="vx-col sm:w-2/3 w-full">
                        <vs-input
                          type="password"
                          class="w-full"
                          icon-pack="feather"
                          icon="icon-lock"
                          icon-no-border
                          v-model="formModel.new_confirm_password"
                        />
                      </div>
                    </div>
                    <div class="float-right">
                      <vs-button
                        class="primary mt-4"
                        color="rgb(6, 137, 219)"
                        @click="validate"
                        type="filled"
                      >SUBMIT</vs-button>
                      <vs-button
                        class="mt-4"
                        color="warning"
                        type="filled"
                        @click="
                          formModel.new_confirm_password = formModel.new_password = formModel.current_password =
                            ''
                        "
                      >Reset</vs-button>
                    </div>
                  </vs-popup>
                </div>
              </div>
            </tr>
