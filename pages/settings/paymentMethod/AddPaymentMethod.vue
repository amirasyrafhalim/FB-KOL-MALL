<template>
  <div>
    <div class="vx-col w-full">
      <div>
        <h5 class="font-normal mb-5">
          Enable and choose your payment methods during checkout
        </h5>
      </div>
    </div>

    <vx-card>
      <div class="vx-row">
        <div class="vx-col sm:w-1/3 w-full">
          <span>Payment Method</span>
        </div>
        <div class="vx-col sm:w-2/3 w-full">
          <v-select
            multiple
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
            <!-- <vs-button
              class="ml-4 mt-2"
              type="border"
              color="warning"
              @click="reset"
              >Reset</vs-button
            > -->
          </div>
        </div>
      </div>
    </vx-card>
  </div>
</template>
<script>
import map from "lodash/map";
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
        payment_method_id: []
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
    // reset() {
    //   this.formModel.payment_method_id =
    //     this.user.merchant.payment_method_id;
    // },
    async validate() {
        var a= []
         this.formModel.payment_method_id.forEach((element,id) => {
            a.push(element.code)
        });
        const obj = {
            payment_method_id : a
        }
      if (this.formModel.payment_method_id != null) {
        try {
          let res = await this.$api.merchants.update(obj, this.$store.state.auth.user.merchant.id);
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
      } else
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
//   mounted() {
//     this.formModel.payment_method_id =
//       this.user.merchant.payment_method_id == 2 ? "Offline" : "Xenopay";
//   }
};
</script>
