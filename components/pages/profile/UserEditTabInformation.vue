<!-- =========================================================================================
  File Name: UserEditTabInformation.vue
  Description: User Edit Information Tab content
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="user-edit-tab-info" class="flex flex-col justify-between h-full">
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
            <label class="vs-input--label"
              >Business Size (Monthly Revenue)</label
            >
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
        <div class="mt-4">
          <vs-input
            class="w-full mt-4"
            label="Address"
            v-model="formModel.dataAddress"
          />
        </div>
        <!-- Col Content -->
        <div class="vx-row">
          <div class="vx-col w-full md:w-1/2">
            <div class="mt-4">
              <label class="vs-input--label">State</label>
              <v-select
                :options="states"
                label="name"
                v-model="formModel.state_id"
                @input="getStates($event)"
              />
            </div>
          </div>
          <div class="vx-col w-full md:w-1/2">
            <div class="mt-4">
              <div class="mt-4">
                <label class="vs-input--label mt-4">State</label>
                <vs-select
                  class="w-full"
                  placeholder="Search and Select"
                  autocomplete
                  v-model="formModel.state_id"
                  @input="getStatesNew($event)"
                >
                  <vs-select-item
                    :options="states"
                    :key="index"
                    :value="item.id"
                    :text="item.name"
                    v-for="(item, index) in states"
                  />
                </vs-select>
              </div>
            </div>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col w-full md:w-1/2">
            <div
              class="mt-4"
              v-if="
                this.$store.state.auth.user.merchant.detail.postcode ==
                  null
              "
            >
              <label class="vs-input--label mt-4">Postcode</label>
              <vs-select
                placeholder="Search and Select"
                class="w-full"
                autocomplete
                v-model="formModel.postcode_id"
              >
                <vs-select-item
                  :key="index"
                  :value="item.id"
                  :text="item.code"
                  v-for="(item, index) in postcodes"
                  @input.native="getPostcodes($event)"
                />
              </vs-select>
            </div>
            <div
              class="mt-4"
              v-if="
                this.$store.state.auth.user.merchant.detail.postcode !=
                  null
              "
            >
              <label class="vs-input--label mt-4">Postcode</label>
              <vs-select
                :placeholder="
                  this.$store.state.auth.user.merchant.detail.postcode.code
                "
                class="w-full"
                autocomplete
                v-model="formModel.postcode_id"
              >
                <vs-select-item
                  :key="index"
                  :value="item.id"
                  :text="item.code"
                  v-for="(item, index) in postcodes"
                  @input.native="getPostcodes($event)"
                />
              </vs-select>
            </div>
          </div>
          <div class="vx-col w-full md:w-1/2">
            <div class="mt-4">
              <label class="vs-input--label mt-4">Country</label>
              <vs-select
                class="w-full"
                placeholder="Search and Select"
                autocomplete
                v-model="formModel.country_code"
                @input.native="getCountries($event.target.value)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
          <vs-button class="ml-auto mt-2" @click="validate"
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
import { debounce, isEmpty } from "lodash";
export default {
  layout: "main",
  components: {
    vSelect
  },
  data() {
    return {
      countries: [],
      states: [],
      postcodes: [],
      business: [
        { label: "0-5000" },
        { label: "5000-10000" },
        { label: "10000-35000" },
        { label: "35000-50000" },
        { label: "more than 50000" }
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
        state_id: 0,
        postcode_id: "",
        country_code: ""
      },
      formModel1: {
        name: ""
      }
    };
  },

  computed: {
    records() {
      return this.$store.state.merchantDetails.record;
    }
  },

  methods: {
    async fetchMerchant() {
      await this.$store.dispatch(
        "merchants/fetchItem",
        this.$store.state.auth.user.merchant.id
      );
    },
    async fetchMerchantDetails() {
      await this.$store.dispatch(
        "merchantDetails/fetchItem",
        this.$store.state.auth.user.merchant.detail.id
      );
    },
    async fetchUser() {
      await this.$store.dispatch("users/fetchItems");
    },
    async getCountries(code) {
      try {
        const { data } = await this.$api.dropdown.getAllCountry();
        this.countries = data;
      } catch (error) {
        console.error("[API Service] Get Postcodes Error:", error);
      }
    },

    async getStatesNew(event) {
      try {
        const { data } = await this.$api.dropdown.getAllState({
          countryCode: "MY",
          name
        });
        this.states = data;
        this.getPostcodes(event);
      } catch (error) {
        console.error("[API Service] Get States Error:", error);
      }
    },

    async getStates(event) {
      try {
        console.log("event", event);
        const { data } = await this.$api.dropdown.getAllState({
          countryCode: "MY",
          name
        });
        this.states = data;
        if (event) {
          this.getPostcodes(event.id);
        }
      } catch (error) {
        console.error("[API Service] Get States Error:", error);
      }
    },

    async getPostcodes(state_Id) {
      try {
        console.log(this.formModel.state_id);
        const { data } = await this.$api.dropdown.getAllPostcode(
          this.$helper.stringifyParams({
            state_Id: state_Id
          })
        );
        console.log("data", data);
        this.postcodes = data;
      } catch (error) {
        console.error("[API Service] Get Postcodes Error:", error);
      }
    },
    reset_data() {
      this.formModel.dataCompany = this.user.merchant.detail.company_name;
      this.formModel.dataLogo = this.user.merchant.logo;
      this.formModel1.name = this.user.merchant.name;
      this.formModel.dataBusinessSize = this.user.merchant.detail.business_size;
      this.formModel.dataAddress = this.user.merchant.detail.address;
      this.formModel.city = this.user.merchant.detail.city;
      this.formModel.state_id = this.user.merchant.detail.state.id;
      this.formModel.postcode_id = this.user.merchant.detail.postcode.id;
      this.formModel.country_code = this.user.merchant.detail.country.code;
    },
    async validate() {
      if (this.formModel.postcode_id == "") {
        var a = this.user.merchant.detail.postcode.id;
      } else {
        var a = this.formModel.postcode_id;
      }
      const obj = {
        name: this.formModel1.name,
        company_name: this.formModel.dataCompany,
        business_size: this.formModel.dataBusinessSize,
        address: this.formModel.dataAddress,
        city: this.formModel.city,
        state_id: this.formModel.state_id,
        postcode_id: a,
        country_code: this.formModel.country_code
      };
      if (
        this.formModel.dataBusinessSize != null &&
        this.formModel.country_code != null &&
        this.formModel.postcode_id != null &&
        this.formModel.state_id != null
      ) {
        try {
          let res = await this.$api.merchants.update(
            obj,
            this.user.merchant.id
          );
          let res1 = await this.$api.merchants.updateDetail(
            obj,
            this.user.merchant.detail.id
          );

          if (res.http_code == 200 && res1.http_code == 200) {
            this.$vs.notify({
              title: "Success!",
              text: "Your data has been updated",
              color: "success",
              position: "bottom-left"
            });
            location.reload();
            //           this.fetchMerchant();
            // this.fetchMerchantDetails()
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
    this.formModel1.name = this.user.merchant.name;
    this.formModel.dataBusinessSize = this.user.merchant.detail.business_size;
    this.formModel.dataAddress = this.user.merchant.detail.address;
    this.formModel.city = this.user.merchant.detail.city;
    this.formModel.state_id =
      this.user.merchant.detail.state && this.user.merchant.detail.state.id;
    this.formModel.country_code =
      this.user.merchant.detail.country &&
      this.user.merchant.detail.country.code;
  },

  created() {
    this.getStates = debounce(this.getStates, 500);
    this.getPostcodes = debounce(this.getPostcodes, 500);
    this.getCountries = debounce(this.getCountries, 500);
    this.getCountries();
    this.getStates();
    this.getPostcodes();
    this.fetchMerchant();
    this.fetchMerchantDetails();
    this.merchant = this.$store.state.merchants.record;
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

.select-countries .vs__dropdown-menu {
  z-index: 10000;
}
</style>