<template>
  <div class="con-notifications-position">
    <vx-card title="Account" class="mb-base">
      <!-- Avatar user.user_social.avatar ||  -->

      <div class="vx-row">
        <!-- Avatar Col -->
        <div class="vx-col" id="avatar-col">
          <div class="img-container mb-4">
            <img
              :src="user.userSocial.avatar || 'default_avatar.png'"
              class="rounded w-full"
            />
          </div>
        </div>
        <!-- Information - Col 1 -->
        <div class="vx-col flex-1" id="account-info-col-1">
          <table>
            <tr>
              <td class="font-semibold pb-6">Name</td>

              <td class="pl-5 pb-5">{{ user.name }}</td>
            </tr>
            <tr>
              <td class="font-semibold pb-6 ">Email</td>

              <td class="pl-5 pb-5">{{ user.email }}</td>
            </tr>
            <tr>
              <td class="font-semibold">Status</td>
              <p style="color: #4CAF50;" class="pl-5">
                {{ user.status.description }}
              </p>
            </tr>
            <tr>
              <td class="font-semibold pb-5">Password</td>
              <div
                class="vx-col w-full flex pb-3 mt-3 pl-5"
                id="account-manage-buttons"
              >
                <div class="demo-alignment">
                  <vs-button
                    @click="popupActive2 = true"
                    color="primary"
                    type="filled"
                    class="my-2 mb-4 mt-3"
                    >Change Password</vs-button
                  >

                  <vs-popup
                    classContent="popup-example"
                    title="Enter your new password"
                    :active.sync="popupActive2"
                  >
                    <div class="vx-row mb-6">
                      <div class="vx-col sm:w-1/3 w-full">
                        <span> Current Password</span>
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
                    >
                      SUBMIT
                    </vs-button>
                    <vs-button
                      class="mt-4"
                      color="warning"
                      type="filled"
                      @click="
                        formModel.new_confirm_password = formModel.new_password = formModel.current_password =
                          ''
                      "
                      >Reset</vs-button
                    ></div>
                  </vs-popup>
                </div>
              </div>
            </tr>
          </table>
        </div>
        <!-- /Information - Col 1 -->

        <!-- Information - Col 2 -->
      </div>
    </vx-card>
    <div class="vx-row">
      <div class="vx-col lg:w-1/2 w-full">
        <vx-card title="Facebook Information" class="mb-base">
          <table>
            <tr>
              <td class="font-semibold pb-6">Phone No.</td>
              <td class="pl-5 pb-5">{{ user.userSocial.phone_no }}</td>
            </tr>
            <tr>
              <td class="font-semibold pb-6">Facebook ID</td>
              <td class="pl-5 pb-5">{{ user.userSocial.social_id }}</td>
            </tr>
            <tr>
              <td class="font-semibold pb-6">Gender</td>
              <template v-if="user.userSocial.gender == 1">
                <td class="pl-5 pb-5">Male</td>
              </template>
              <template v-if="user.userSocial.gender == 2">
                <td>class="pl-5 pb-5">Female</td>
              </template>
            </tr>
          </table>
        </vx-card>
      </div>
      <div class="vx-col lg:w-1/2 w-full">
        <vx-card title="Merchant Information" class="mb-base">
          <table>
            <tr>
              <td class="font-semibold pb-5">Role</td>

              <td class="pl-5 pb-5">{{ user.roles[0].name }}</td>
            </tr>
            <!-- <tr>
              <td class="font-semibold">Company</td>
              <td class="pl-5">{{ user.merchant_details.company_name }}</td>
            </tr> -->
          </table>
        </vx-card>
      </div>
    </div>
  </div>
</template>

<script>
import CrudFormAction from "@/components/widgets/forms/CrudFormAction";
import ForgotPassword from "@/components/pages/profile/forgotPassword.vue";
import formMixin from "@/mixins/form";
import AlertFormError from "@/components/widgets/alerts/AlertFormError";
export default {
  mixins: [formMixin],
  data() {
    return {
      moduleName: "password",
      formModel: {
        current_password: null,
        new_confirm_password: null,
        new_password: null
      },

      popupActive2: false
    };
  },
  layout: "main",
  components: {
    CrudFormAction,
    ForgotPassword,
    AlertFormError
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
          this.$vs.notify({title:'Success!',text:'Your password has been updated',color:'success'})
          this.popupActive2 = false;
        }
      } catch (err) {
          if (err) {
          this.$vs.notify({title:'Failed!',text:'Please insert your data correctly',color:'danger'})
      }
    }
  }
},
  created() {
    this.user = this.$store.state.auth.user;
    console.log("user", this.user);
  }
}
</script>
<style scoped>
.v-card__text,
.v-card__title {
  word-break: normal !important; /* maybe !important  */
}
.dashboard-card {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 10px #00000019;
  border-radius: 10px !important;
  padding: 10px;
  width: 280px;
  height: 190px;
}
.v-list-item__content {
  padding: 0 !important;
}
.border-radius-image {
  border-radius: 13px !important;
}
.v-list-item__title,
.v-list-item__subtitle {
  white-space: normal;
}
</style>
