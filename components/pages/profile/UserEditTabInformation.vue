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
        <div class="mt-4">
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
            <vs-select
              class="w-full"
              autocomplete
              v-model="formModel.dataBusinessSize"
            >
              <vs-select-item
                :options="business"
                :key="index"
                :value="item.label"
                :text="item.label"
                v-for="(item, index) in business"
              />
            </vs-select>

            <span class="text-danger text-sm"></span>
          </div>
        </div>
      </div>

      <!-- Address Col -->
      <div class="vx-col w-full md:w-1/2 sm:w-1/2">
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
              <vs-input class="w-full" label="City" v-model="formModel.city" />
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
                this.$store.state.auth.user.merchant.detail.postcode == null
              "
            >
              <label class="vs-input--label mt-4">Postcode</label>
              <vs-select
                placeholder="Search and Select"
                class="w-full"
                autocomplete
                v-model="formModel.postcode_id"
                @input-change="getPostcodes($event.target.value)"
              >
                <vs-select-item
                
                  :key="index"
                  :value="item.id"
                  :text="item.code"
                  v-for="(item, index) in postcodes"
                />
              </vs-select>
            </div>
            <div
              class="mt-4"
              v-if="
                this.$store.state.auth.user.merchant.detail.postcode != null
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
                @input-change="getPostcodes($event.target.value)"
              >
                <vs-select-item
                  :key="index"
                  :value="item.id"
                  :text="item.code"
                  v-for="(item, index) in postcodes"
                />
              </vs-select>
            </div>
          </div>
          <div class="vx-col w-full md:w-1/2 sm:w-1/2">
            <div class="mt-4">
              <label class="vs-input--label mt-4">Country</label>
              <vs-select
                class="w-full"
                placeholder="Search and Select"
                autocomplete
                v-model="formModel.country_code"
              >
                <vs-select-item
                  :options="countries"
                  :key="index"
                  :value="item.code"
                  :text="item.name"
                  v-for="(item, index) in countries"
                />
              </vs-select>
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
        postcode_id: 0,
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

    async getPostcodes(code) {
      try {
        const { data } = await this.$api.dropdown.getAllPostcode(
          this.$helper.stringifyParams({
            state_Id: this.formModel.state_id,
            code: code
          })
        );
        this.postcodes = data
         console.log("event", event.data)
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
      this.formModel.state_id =
        this.user.merchant.detail.state && this.user.merchant.detail.state.id;
      this.formModel.postcode_id =
        this.user.merchant.detail.postcode &&
        this.user.merchant.detail.postcode.code;
      this.formModel.country_code =
        this.user.merchant.detail.country &&
        this.user.merchant.detail.country.code;
    },
    async validate() {
      if (this.formModel.country_code == null) {
        var country = null;
      }
      if (this.formModel.state_id == null) {
        var state = null;
      }

      if (this.formModel.postcode_id == "") {
        var postcode =
          this.user.merchant.detail.postcode &&
          this.user.merchant.detail.postcode.id;
      }

      if (this.formModel.country_code != "") {
        var country = this.formModel.country_code;
      }
      if (this.formModel.state_id != "") {
        var state = this.formModel.state_id;
      }
      if (this.formModel.postcode_id != "") {
        var postcode = this.formModel.postcode_id;
      }

      const obj = {
        name: this.formModel1.name,
        company_name: this.formModel.dataCompany,
        business_size: this.formModel.dataBusinessSize,
        address: this.formModel.dataAddress,
        city: this.formModel.city,
        state_id: state,
        postcode_id: postcode,
        country_code: country
      };
      if (this.formModel.dataBusinessSize != null) {
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
          }
          this.fetchUser();
          this.fetchMerchant();
          this.fetchMerchantDetails();
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
.select-countries .v-select.vs__search::placeholder,
.select-countries .v-select.vs__dropdown-toggle,
.select-countries .v-select.vs__dropdown-menu {
  max-height: 100px;
}
</style>
