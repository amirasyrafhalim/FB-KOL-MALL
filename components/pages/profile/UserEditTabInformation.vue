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
        <div class="flex items-end">
          <feather-icon icon="UserIcon" class="mr-2" svgClasses="w-5 h-5" />
          <span class="leading-none font-medium">Information</span>
        </div>

        <!-- Col Content -->
        <div>
          <vs-input
            class="w-full mt-4"
            label="Company"
            v-model="formModel.dataCompany"
          />
          <vs-input
            class="w-full mt-4"
            label="Mobile"
            name="mobile"
            v-model="formModel.dataPhone"
          />
          <div class="mt-4">
            <label class="vs-input--label">Gender</label>
            <v-select
              name="status"
              :options="gender"
              v-model="formModel.dataGender"
            />
            <span class="text-danger text-sm"></span>
          </div>

          <div class="mt-4">
            <label class="vs-input--label">Payment Methods</label>
            <v-select
              name="status"
              :options="payment"
              v-model="formModel.dataPayment"
            />
            <span class="text-danger text-sm"></span>
          </div>
        </div>
      </div>

      <!-- Address Col -->
      <div class="vx-col w-full md:w-1/2">
        <!-- Col Header -->
        <div class="flex items-end md:mt-0 mt-base">
          <feather-icon icon="MapPinIcon" class="mr-2" svgClasses="w-5 h-5" />
          <span class="leading-none font-medium">Address</span>
        </div>

        <!-- Col Content -->
        <div>
          <vs-input class="w-full mt-4" label="Address Line 1" />
          <span class="text-danger text-sm"></span>

          <vs-input class="w-full mt-4" label="Address Line 2" />

          <vs-input class="w-full mt-4" label="Post Code" />
          <span class="text-danger text-sm"></span>

          <vs-input class="w-full mt-4" label="City" />
          <span class="text-danger text-sm"></span>

          <vs-input class="w-full mt-4" label="State" />
          <span class="text-danger text-sm"></span>

          <vs-input class="w-full mt-4" label="Country" />
          <span class="text-danger text-sm"></span>
        </div>
      </div>
    </div>

    <!-- Save & Reset Button -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
          <vs-button class="ml-auto mt-2">Save Changes</vs-button>
          <vs-button class="ml-4 mt-2" type="border" color="warning"
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
        { label: "Ofline", code: 2 }
      ],
      gender: [
        { label: "Male", code: 2 },
        { label: "Female", code: 1 }
      ],
      product: [
        { label: "Admin", code: 1 },
        { label: "Staff", code: 0 },
        { label: "Merchant", code: 0 }
      ],
      formModel: {
        dataCompany: "",
        dataPhone: "",
        dataPayment: "",
        dataProduct: "",
        dataGender: "",
        dataDelivery:"",
      }
    };
  },
  methods: {
    fetchProducts(page = 1) {
      let params = { page: page };
      this.$store.dispatch("products/fetchItems", params);
    }
  },
  computed: {
    products() {
      return this.$store.state.products.records;
    },
    ...mapState({ user: state => state.auth.user })
  },
  mounted() {
    this.formModel.dataCompany = this.user.merchant.detail.company_name;
    this.formModel.dataPhone = this.user.social.phone_no;
    this.formModel.dataPayment = this.user.merchant.payment_method_id == 2 ? 'Offline' : 'Xenopay';
    this.formModel.dataGender = this.user.social.gender == 2 ? 'Male' : 'Female';
    // this.formModel.dataDelivery = this.
  },
  created() {
    this.fetchProducts();
    this.user = this.$store.state.auth.user;
    console.log("user", this.user);
  }
};
</script>
