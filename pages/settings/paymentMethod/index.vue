<template>
  <div class="con-notifications-position">
    <div class="vx-row">
      <div class="vx-col w-full">
        <div>
          <h3 class="sm:mx-0 mx-4 mb-2 font-semibold">Payment Methods</h3>
          <h5 class="font-normal mb-5">
            Enable and choose your payment methods during checkout
          </h5>
        </div>
        <!-- <div class="vx-col w-full">
      <div class="float-right mb-2">
        <vs-button
          :to="
            localePath({
              name: 'userprofile-id-edit',
              params: { id: user.id }
            })
          "
          >Add Payment Method</vs-button
        >
      </div>
      </div> -->
      </div>
    </div>

    <div class="vx-row match-height">
      <div class="vx-col w-full mb-base">
        <vx-card>
          <vs-col
            vs-order="1"
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-w="3"
          >
            Payment Method
          </vs-col>
          <vs-col
            vs-order="2"
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-w="5"
          >
            Status
          </vs-col>
          <vs-col
            vs-order="1"
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-w="4"
          >
            Action
          </vs-col>
          <vs-divider></vs-divider>

          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
            <template v-if="user.merchant.payment_method_id == 1">
              <span>Xenopay</span>
            </template>
            <template v-if="user.merchant.payment_method_id == 2">
              <span>Offline</span>
            </template>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="5">
            <span class="text-success">Enabled</span>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
            <vs-button
              @click="popupActive2 = true"
              color="primary"
              type="filled"
              icon-pack="feather"
              icon="icon-edit"
              class="mb-3"
              >Edit</vs-button
            >
          </vs-col>
        </vx-card>
      </div>
    </div>

    <vs-popup
      classContent="popup-example"
      title="Update Payment Method"
      :active.sync="popupActive2"
    >
      <div class="vx-row">
        <div class="vx-col sm:w-1/3 w-full">
          <span>Payment Method</span>
        </div>
        <div class="vx-col sm:w-2/3 w-full">
          <v-select
            class="w-full"
            :options="payment"
            v-model="formModel.payment_method_id"
          />
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="mt-2 flex flex-wrap items-center justify-end">
            <vs-button class="ml-auto mt-2" @click="validate"
              >Save Changes</vs-button
            >
            <vs-button
              class="ml-4 mt-2"
              type="border"
              color="warning"
              @click="reset"
              >Reset</vs-button
            >
          </div>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import CrudFormAction from "@/components/widgets/forms/CrudFormAction";
import ForgotPassword from "@/components/pages/profile/ForgotPassword.vue";
import formMixin from "@/mixins/form";
import AlertFormError from "@/components/widgets/alerts/AlertFormError";
export default {
  mixins: [formMixin],
  data() {
    return {
      payment: [
        { label: "Xenopay", code: 1 },
        { label: "Offline", code: 2 }
      ],
      moduleName: "password",
      formModel: {
        payment_method_id: ""
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
    reset() {
      this.formModel.payment_method_id =
        this.user.merchant.payment_method_id == 2 ? "Offline" : "Xenopay";
    },
    async validate() {
      const obj = {
        payment_method_id:
          this.formModel.payment_method_id &&
          this.formModel.payment_method_id.code
      };

      if (this.formModel.payment_method_id != null) {
        try {
          let res = await this.$api.merchants.update(obj, this.user.id);
          if (res.http_code == 200) {
            this.$vs.notify({
              title: "Success!",
              text: "Your data has been updated",
              color: "success",
              position: "bottom-left"
            });
          }
          this.popupActive2 = false;
        } catch (err) {
          if (err) {
            this.$vs.notify({
              title: "Failed!",
              text: "Please insert your data correctly",
              color: "danger",
              position: "bottom-left"
            });
          }
        }
      } 
      else 
        this.$vs.notify({
          title: "Failed!",
          text: "Please insert your data correctly",
          color: "danger",
          position: "bottom-left"
        });
    }
  },
  created() {
    this.user = this.$store.state.auth.user;

  },
  mounted() {
    this.formModel.payment_method_id =
      this.user.merchant.payment_method_id == 2 ? "Offline" : "Xenopay";
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
