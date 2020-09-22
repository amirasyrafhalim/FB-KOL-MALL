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
    <div>
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
            <label class="vs-input--label">Business Size (Monthly Revenue)</label>
            <v-select
              name="status"
              :options="business"
              v-model="formModel.dataBusinessSize"
            />
            <span class="text-danger text-sm"></span>
          </div>
        </div>
      </div>

      <!-- Address Col -->
      <div class="vx-col w-full md:w-1/2">
        <!-- Col Content -->
        <div class="mt-4">
          <vs-input
            class="w-full mt-4"
            label="Address"
            v-model="formModel.dataAddress"
          />
        </div>

        <div class="vx-row">
          <div class="vx-col w-full md:w-1/2">
          <div class="mt-4">
            <vs-input
              label="City"
              v-model="formModel.city"
            />
          </div>
          </div>
          <div class="vx-col w-full md:w-1/2">
          <div class="mt-4">
          <label class="vs-input--label">State</label>
            <v-select
               :options="states"
              label="name"
              v-model="formModel.state_id"
              @input.native="getStates($event.target.value)"
            />
          </div>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col w-full md:w-1/2">
          <div class="mt-4">
          <label class="vs-input--label">Postcode</label>
            <v-select
              :options="postcodes"
              label="code"
              v-model="formModel.postcode_id"
              @input.native="getPostcodes($event.target.code)"
            />
          </div>
          </div>
          <div class="vx-col w-full md:w-1/2">
          <div class="mt-4">
          <label class="vs-input--label mt-4">Country</label>
            <v-select
             :options="countries"
              label="name"
              v-model="formModel.country_code"
             @input.native="getCountries($event.target.value)"
            />
          </div>
          </div>
        </div>
      </div>
    </div>
    </div>
       <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 py-8 flex flex-wrap items-center justify-end">
          <vs-button @click="validate" class="mt-2">Save Changes</vs-button>
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
import { debounce, isEmpty } from 'lodash'
export default {
  layout: "main",
  components: {
    vSelect
  },
  data() {
    return {
      countries : [],
      states : [],
      postcodes : [],
      payment: [
        { label: "Xenopay", code: 1 },
        { label: "Offline", code: 2 }
      ],
      business: [
        { label: "I'm getting started" },
        { label: "< 500 MYR" },
        { label: "500 MYR - 5,000 MYR" },
        { label: "5,000 MYR - 25,000 MYR" },
        { label: "25,000 MYR - 100,000 MYR" },
        { label: "25,000 MYR - 100,000 MYR" },
      ],
      formModel: {
        dataCompany: "",
        dataPhone: "",
        dataProduct: "",
        dataGender: "",
        dataDelivery: "",
        dataLogo: "",
        dataBusinessSize: "",
        dataAddress: "",
        city: "",
        state_id: "",
        postcode_id: "",
        country_code: ""
      },
      formModel1: {
        name: "",
        payment_method_id: ""
      }
    };
  },
  methods: {
    async getCountries(code) {
    try {
      const { data } = await this.$api.dropdown.getAllCountry();
      this.countries = data
    } catch (error) {
      console.error('[API Service] Get Postcodes Error:', error)
    }
  },
  
  async getStates(name) {
    try {
      const { data } = await this.$api.dropdown.getAllState({
        countryCode: 'MY',
        name
      })
      this.states = data
    } catch (error) {
      console.error('[API Service] Get States Error:', error)
    }
  },

  async getPostcodes(code) {
    try {
      const { data } = await this.$api.dropdown.getAllPostcode({
        code
      })
      this.postcodes = data
    } catch (error) {
      console.error('[API Service] Get Postcodes Error:', error)
    }
  },
    reset_data() {
      this.formModel.dataCompany = this.user.merchant.detail.company_name;
      this.formModel.dataPhone = this.user.social.phone_no;
      this.formModel1.payment_method_id =
      this.user.merchant.payment_method_id == 2 ? "Offline" : "Xenopay";
      this.formModel.dataLogo = this.user.merchant.logo;
      this.formModel1.name = this.user.merchant.name;
      this.formModel.dataBusinessSize = this.user.merchant.detail.business_size;
      this.formModel.dataAddress = this.user.merchant.detail.address;
      this.formModel.city = this.user.merchant.detail.city;
      this.formModel.state_id = this.user.merchant.detail.state.name;
      this.formModel.postcode_id = this.user.merchant.detail.postcode.code;
      this.formModel.country_code = this.user.merchant.detail.country.name;
    },
    async validate() {
      const obj = {
        name: this.formModel1.name,
        payment_method_id: this.formModel1.payment_method_id.code,
        company_name: this.formModel.dataCompany,
        business_size:
          this.formModel.dataBusinessSize &&
          this.formModel.dataBusinessSize.label,
        address: this.formModel.dataAddress,
        city : this.formModel.city,
        state_id : this.formModel.state_id.id,
        postcode_id : this.formModel.postcode_id.id,
        country_code : this.formModel.country_code.code
      };

      if (this.formModel.dataBusinessSize != null) {
        try {
          let res = await this.$api.merchants.update(obj, this.user.merchant.id);
          let res1 = await this.$api.merchants.updateDetail(obj, this.user.merchant.detail.id);
          if (res.http_code == 200 && res1.http_code == 200) {
            this.$vs.notify({
              title: "Success!",
              text: "Your data has been updated",
              color: "success",
              position: "bottom-left"
            });
          }
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
    this.formModel.city = this.user.merchant.detail.city;
    this.formModel.state_id = this.user.merchant.detail.state.name;
    this.formModel.postcode_id = this.user.merchant.detail.postcode.code;
    this.formModel.country_code = this.user.merchant.detail.country.name;
  },

  created() {
      this.getStates = debounce(this.getStates, 500)
    this.getPostcodes = debounce(this.getPostcodes, 500)
    this.getCountries = debounce(this.getCountries, 500)
    this.getCountries()
    this.getStates()
    this.getPostcodes()
    this.user = this.$store.state.auth.user;
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
