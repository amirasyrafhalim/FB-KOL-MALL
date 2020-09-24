<template>
  <div class="con-notifications-position">
    <div class="vx-row mb-base">
      <div class="vx-col lg:w-1/2 w-full">
        <vx-card title="Account" class="">
          <!-- Avatar user.user_social.avatar ||  -->

          <div class="vx-row">
            <!-- Avatar Col -->
            <div class="vx-col" id="avatar-col">
              <div class="img-container mb-4">
                <img
                  :src="
                    user.social && user.social.avatar
                      ? user.social.avatar
                      : 'default_avatar.png'
                  "
                  class="rounded w-full"
                />
              </div>
            </div>
            <div class="vx-row">
              <div class="vx-col md:w-1/2 w-full">
                <div class="vx-col flex-1" id="account-info-col-1">
                  <table>
                    <tr>
                      <td class="font-semibold pb-6">Name</td>

                      <td class="pl-5 pb-5">{{ user.name }}</td>
                    </tr>
                    <tr>
                      <td class="font-semibold pb-6">Email</td>

                      <td class="pl-5 pb-5">{{ user.email }}</td>
                    </tr>
                    <tr>
                      <td class="font-semibold pb-5">Phone No.</td>
                      <p class="pl-5 mb-5">
                        <template v-if="user.phone_no != null">{{
                          user.phone_no
                        }}</template>
                        <template
                          v-if="user.phone_no == null && user.social != null"
                          >{{ user.social.phone_no }}</template
                        >
                        <template
                          v-if="user.phone_no == null && user.social == null"
                          >-</template
                        >
                      </p>
                    </tr>
                    <tr>
                      <td class="font-semibold pb-5">Status</td>
                      <p
                        class="pl-5 mb-5 text-success"
                        v-if="user.status.value == 1"
                      >
                        {{ user.status.description }}
                      </p>
                      <p
                        class="pl-5 mb-5 text-warning"
                        v-if="user.status.value == 2"
                      >
                        {{ user.status.description }}
                      </p>
                    </tr>
                  </table>

                  <div class="vx-col w-full flex" id="account-manage-buttons">
                    <vs-button
                      icon-pack="feather"
                      icon="icon-edit"
                      class="mr-4"
                      :to="
                        localePath({
                          name: 'userprofile-id-edit',
                          params: { id: user.id }
                        })
                      "
                      >Edit</vs-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </vx-card>
      </div>
      <div class="vx-col lg:w-1/2 w-full">
        <vx-card class="h-full flex flex-col justify-center">
          <div v-if="user.social == null">
            <div class="text-center">
              <span>
                Easily connect and synchronize your profile with your Facebook
                Account
              </span>
              <vs-button
                color="#3b5998"
                class="w-100 my-auto mt-3"
                :href="redirectPage + '/v1/auth/fb-page/' + this.user.id"
              >
                <vs-row>
                  <vs-col vs-type="flex" vs-w="auto">
                    <feather-icon icon="FacebookIcon" class="mr-1" />
                    <span class="my-auto">{{
                      $t("label.connectWithFacebook")
                    }}</span>
                  </vs-col>
                </vs-row>
              </vs-button>
            </div>
          </div>
          <div v-if="user.social != null">
            <div class=" text-center ">
              <span>
                You can now using all facebook features, including page shops
              </span>
              <vs-button
                type="filled"
                color="#3b5998"
                class="my-auto mt-3"
              >
                <vs-row>
                  <vs-col vs-type="flex" vs-w="auto">
                    <feather-icon icon="FacebookIcon" class="mr-1" />
                    <span class="my-auto">Connected as</span>
                    <span class="my-auto pl-2">{{ user.social.name }}</span>
                  </vs-col>
                </vs-row>
              </vs-button>
            </div>
          </div>
        </vx-card>
      </div>
    </div>

      <div class="vx-col w-full" v-if="user.social == null">
        <vx-card title="Merchant Information" class="mb-base">
          <table>
            <tr>
              <td class="font-semibold pb-5">Company Name</td>
              <td class="pl-5 pb-5">
                {{ merchant.detail && merchant.detail.company_name }}
              </td>
            </tr>

            <tr>
              <td class="font-semibold pb-5">Monthly Revenue (RM)</td>
              <td class="pl-5 pb-5">
                {{ merchant.detail && merchant.detail.business_size }}
              </td>
            </tr>
            <tr>
              <td class="font-semibold pb-5">Payment Method</td>
              <ol
                v-for="(item, index) in merchant.payment_method_id"
                :key="index"
                style="display: inline;"
              >
                <template v-if="item == 1">
                  <li class="pl-5">Xenopay</li>
                </template>
                <template v-if="item == 2">
                  <li class="pl-5">Offline</li>
                </template>
              </ol>
            </tr>
            <tr>
              <td class="font-semibold pt-3 ">Business Categories</td>
              <td class="pt-3">
                <ol
                  class="pl-5"
                  v-for="(item, key) in merchant.detail &&
                    merchant.detail.categories"
                  :key="key"
                >
                  <li>{{ item.name }}</li>
                </ol>
              </td>
            </tr>
          </table>
        </vx-card>
      </div>

      <div class="vx-col w-full" v-if="user.social != null">
        <vx-card title="Merchant Information" class="mb-base">
          <table>
            <tr>
              <td class="font-semibold pb-5">Company Name</td>
              <td class="pl-5 pb-5">
                {{ merchant.detail && merchant.detail.company_name }}
              </td>
            </tr>
            <tr>
              <td class="font-semibold pb-5">Monthly Revenue (RM)</td>
              <td class="pl-5 pb-5">
                {{ merchant.detail && merchant.detail.business_size }}
              </td>
            </tr>
            <tr>
              <td class="font-semibold pb-5">Payment Method</td>
              <ol
                v-for="(item, index) in merchant.payment_method_id"
                :key="index"
                style="display: inline;"
              >
                <template v-if="item == 1">
                  <li class="pl-5">Xenopay</li>
                </template>
                <template v-if="item == 2">
                  <li class="pl-5">Offline</li>
                </template>
              </ol>
            </tr>
            <tr>
              <td class="font-semibold pt-3 ">Business Categories</td>
              <td class="pt-3">
                <ol
                  class="pl-5"
                  v-for="(item, key) in merchant.detail &&
                    merchant.detail.categories"
                  :key="key"
                >
                  <li>{{ item.name }}</li>
                </ol>
              </td>
            </tr>
          </table>
        </vx-card>
      </div>
  </div>
</template>

<script>
import CrudFormAction from "@/components/widgets/forms/CrudFormAction";
import ForgotPassword from "@/components/pages/profile/ForgotPassword.vue";
import formMixin from "@/mixins/form";
import AlertFormError from "@/components/widgets/alerts/AlertFormError";
import { apiRoutes } from "@/config";
require("dotenv").config();
export default {
  mixins: [formMixin],
  data() {
    return {
      redirectPage: process.env.API_URL,
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
    async fetchUser() {
      await this.$store.dispatch(
        "merchants/fetchItem",
        this.$store.state.auth.user.merchant.id
      );
    },
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
    this.fetchUser();
    this.user = this.$store.state.auth.user;
  },
  computed: {
    merchant() {
      return this.$store.state.merchants.record;
    }
  }
};
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
