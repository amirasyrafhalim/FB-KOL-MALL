<!-- =========================================================================================
  File Name: UserEditTabInformation.vue
  Description: User Edit Information Tab content
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="user-edit-tab-info">
    <div class="vx-row">
      <div class="vx-col w-full md:w-1/2">
        <!-- Col Header -->
        <!-- <div class="flex items-end">
          <feather-icon icon="UserIcon" class="mr-2" svgClasses="w-5 h-5" />
          <span class="leading-none font-medium">Information</span>
        </div> -->

        <!-- Col Content -->
        <div class="mt-4">
          <!-- 
          <template v-if="formModel.dataLogo">
          <div class="flex flex-wrap items-center mb-base">
            <vs-avatar
              :src="formModel.dataLogo"
              size="70px"
              class="mr-4 mb-4"
            />
            <div>
              <p class="text-sm mt-2">
                Allowed JPG, GIF or PNG. Max size of 800kB
              </p>
            </div>
          </div>
          </template> -->

          <!-- <div class="upload-img mx-auto flex items-center justify-center">
            <input
              type="file"
              class="hidden"
              ref="uploadImgInput"
              @change="updateCurrImg"
              accept="image/*"
            />
            <vs-button
              @click="$refs.uploadImgInput.click()"
              color="success"
              type="gradient"
              >Upload Image</vs-button
            >
          </div> -->
          <vs-input
            class="w-full mt-4"
            label="Merchant Name"
            v-model="formModel1.name"
          />

          <vs-input
            class="w-full mt-4"
            label="Company"
            v-model="formModel.dataCompany"
          />
          <div class="mt-4">
            <label class="vs-input--label">Payment Methods</label>
            <v-select
              name="status"
              :options="payment"
              v-model="formModel1.payment_method_id"
            />
            <span class="text-danger text-sm"></span>
          </div>
        </div>
      </div>

      <!-- Address Col -->
      <div class="vx-col w-full md:w-1/2">
        <!-- Col Content -->
        <div>
          <vs-input
            class="w-full mt-4"
            label="Address"
            v-model="formModel.dataAddress"
          />
          <span class="text-danger text-sm"></span>
        </div>
        <div class="mt-4">
          <label class="vs-input--label">Business Size</label>
          <v-select
            name="status"
            :options="business"
            v-model="formModel.dataBusinessSize"
          />
          <span class="text-danger text-sm"></span>
        </div>
      </div>
    </div>

    <!-- Save & Reset Button -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
          <vs-button @click="validate" class="ml-auto mt-2"
            >Save Changes</vs-button
          >
          <vs-button
            class="ml-4 mt-2"
            type="border"
            color="warning"
            @click="reset_data"
            >Reset</vs-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import { mapState } from "vuex";
export default {
  layout: "main",
  components: {
    vSelect
  },
  props: {},
  data() {
    return {
      payment: [
        { label: "Xenopay", code: 1 },
        { label: "Offline", code: 2 }
      ],
      business: [
        { label: "0-5" },
        { label: "6-10" },
        { label: "11-15" },
        { label: "16-20" }
      ],
      formModel: {
        dataCompany: "",
        dataPhone: "",
        dataProduct: "",
        dataGender: "",
        dataDelivery: "",
        dataLogo: "",
        dataBusinessSize: "",
        dataAddress: ""
      },
      formModel1: {
        name: "",
        payment_method_id: ""
      }
    };
  },
  methods: {
    reset_data() {
      this.formModel.dataCompany = this.user.merchant.detail.company_name;
      this.formModel.dataPhone = this.user.social.phone_no;
      this.formModel1.payment_method_id =
      this.user.merchant.payment_method_id == 2 ? "Offline" : "Xenopay";
      this.formModel.dataLogo = this.user.merchant.logo;
      this.formModel1.name = this.user.merchant.name;
      this.formModel.dataBusinessSize = this.user.merchant.detail.business_size;
      this.formModel.dataAddress = this.user.merchant.detail.address;
    },
    async validate() {
      try {
        const obj = {
          name: this.formModel1.name,
          payment_method_id: this.formModel1.payment_method_id.code,
          company_name: this.formModel.dataCompany,
          business_size: this.formModel.dataBusinessSize.label,
          address: this.formModel.dataAddress
        };
        let res = await this.$api.merchants.update(obj, this.user.id);
        let res1 = await this.$api.merchants.updateDetail(obj, this.user.id);
        if ((res.http_code == 200) & (res1.http_code == 200)) {
          this.$vs.notify({
            title: "Success!",
            text: "Your data has been updated",
            color: "success"
          });
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
  // computed: {
  //   ...mapState({ user: state => state.auth.user })
  // },
  mounted() {
    this.formModel.dataCompany = this.user.merchant.detail.company_name;
    this.formModel.dataPhone = this.user.social.phone_no;
    this.formModel1.payment_method_id =
    this.user.merchant.payment_method_id == 2 ? "Offline" : "Xenopay";
    this.formModel.dataLogo = this.user.merchant.logo;
    this.formModel1.name = this.user.merchant.name;
    this.formModel.dataBusinessSize = this.user.merchant.detail.business_size;
    this.formModel.dataAddress = this.user.merchant.detail.address;
  },
  created() {
    this.user = this.$store.state.auth.user;
    console.log("userss", this.user);
  }
};
</script>
<style scoped>
.img-upload {
  margin-top: 2rem;
}

.con-img-upload {
  padding: 0;
}

.con-input-upload {
  width: 100%;
  margin: 0;
}
</style>
