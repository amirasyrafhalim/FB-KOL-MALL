<!-- =========================================================================================
  File Name: UserEditTabInformation.vue
  Description: User Edit Information Tab content
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div>
    <div class="vx-col w-full">
      <div title="Bank Information" v-if="records.length === 0">
        <div
          class="vx-col flex items-center justify-center flex-col sm:w-1/2 md:w-3/5 lg:w-3/4 xl:w-1/2 mx-auto text-center"
        >
          <h3 class="sm:mx-0 mx-4 mb-2 font-semibold">Add Bank Information</h3>
          <h5 class="font-normal">
            Fill in the required info correctly to ensure success
          </h5>
          <h5 class="sm:mx-0 mx-4 mb-6 font-normal">receiving of payment.</h5>
        </div>

        <div class="mt-5 flex items-center justify-center mb-5">
          <vs-button
            @click="popupActive2 = true"
            color="primary"
            type="filled"
            size="large"
            >Add Bank Information</vs-button
          >
        </div>
      </div>

      <div v-else>
        <table v-for="(data, i) in records" :key="i">
          <tr>
            <td class="font-semibold pb-6">Bank Name</td>
            <td class="pl-6 pb-6">{{ data.bank.name }}</td>
          </tr>
          <tr>
            <td class="font-semibold pb-6">Name</td>
            <td class="pl-6 pb-6">{{ data.name }}</td>
          </tr>
          <tr>
            <td class="font-semibold pb-6">Account No.</td>
            <td class=" pl-6 pb-6">{{ data.account_no }}</td>
          </tr>
          <tr>
            <td class="font-semibold pb-6">Remark</td>
            <td class="pl-6 pb-6">{{ data.remark }}</td>
          </tr>
        </table>

        <p style="color:red;font-size:11px;">
          *Please contact the customer service if you want to update your bank
          information..
        </p>
      </div>
    </div>

    <vs-popup
      classContent="popup-example"
      title="Add Bank Information"
      :active.sync="popupActive2"
    >
      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <span>Bank Name</span>
        </div>
        <div class="vx-col sm:w-2/3 w-full">
          <v-select
            name="status"
            :options="bank"
            label="name"
            v-model="formModel.bank_id"
          />
        </div>
      </div>

      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <span>Name</span>
        </div>
        <div class="vx-col sm:w-2/3 w-full">
          <vs-input class="w-full" icon-no-border v-model="formModel.name" />
        </div>
      </div>

      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <span>Account No</span>
        </div>
        <div class="vx-col sm:w-2/3 w-full">
          <vs-input class="w-full" v-model="formModel.accountno" />
        </div>
      </div>
      <!-- <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <span>Status</span>
        </div>
        <div class="vx-col sm:w-2/3 w-full">
          <v-select
            name="status"
            :options="status"
            v-model="formModel.status"
          />
        </div>
      </div> -->
      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <span>Remark</span>
        </div>
        <div class="vx-col sm:w-2/3 w-full">
          <vs-textarea class="w-full" v-model="formModel.remark" />
        </div>
      </div>
      <!-- <div class="vx-row mb-6"> -->
        <!-- <div class="vx-col sm:w-1/3 w-full">
          <span>Bank Statement</span>
          <input
            type="file"
            class="hidden"
            ref="updateImgInput"
            accept="image/*"
          />
        </div> -->
        <!-- <div class="upload-img vx-col sm:w-2/3 w-full">
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
      <!-- </div> -->
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
              @click="reset"
              >Reset</vs-button
            >
          </div>
        </div>
      </div>
    </vs-popup>

    <!-- <div class="vx-row">
      <div class="vx-col w-full md:w-1/2">
        <div>
          <div class="mt-4">
            <label class="vs-input--label">Bank Option</label>
            <v-select name="bank" />
            <span class="text-danger text-sm"></span>
          </div>
          <vs-input class="w-full mt-4" label="Name" />
          <vs-input class="w-full mt-4" label="Account No." />
        </div>
      </div>
      <div class="vx-col w-full md:w-1/2">
        <div class="mt-4">
          <label class="text-sm">Status</label>
          <v-select />
          <span class="text-danger text-sm"></span>
        </div>
        <vs-input class="w-full mt-4" label="Remark" />
      </div>
    </div> -->

    <!-- Save & Reset Button -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      
      dataImg: "",
      moduleName: "merchantBanks",
      status: [
        { label: "Active", code: 1 },
        { label: "Inactive", code: 2 }
      ],
      popupActive2: false,
      merchant_id: this.$auth.state.user.merchant.id,
      formModel: {
        bank_id: "",
        accountno: "",
        name: "",
        remark: "",
        status: 1,
        image: ""
      }
    };
  },
  computed: {
    bank() {
      return this.$store.state.banks.records;
    },
    records() {
      return this.$store.state.merchantBanks.records;
    }
  },
  methods: {

    updateCurrImg(input) {
      if (input.target.files && input.target.files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
          this.formModel.image = e.target.result;
        };
        reader.readAsDataURL(input.target.files[0]);
      }
    },
    async validate() {
      const obj = {
        bank_id: this.formModel.bank_id.id,
        merchant_id: this.$auth.state.user.merchant.id,
        name: this.formModel.name,
        account_no: this.formModel.accountno,
        status: this.formModel.status,
        remark: this.formModel.remark,
        image: this.formModel.image.replace(/^data:(.*;base64,)?/, "")
      };
      try {
        let res = await this.$api.merchantBanks.create(obj, this.user.id);
        if (res.http_code == 201) {
          this.$vs.notify({
            title: "Success!",
            text: "Your data has been updated",
            color: "success",
            position: "bottom-left"
          });
        }
        this.popupActive2 = false;
        this.fetchUser();
        this.$router.push("/userprofile/" + this.$store.state.auth.user.id + "/edit");
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
    },
    fetchBank(page = 1) {
      let params = { page: page };
      this.$store.dispatch("banks/fetchItems", params);
    },
    fetchUser(merchantId) {
      let params = { merchantId: this.$store.state.auth.user.merchant.id };
      this.$store.dispatch("merchantBanks/fetchItems", params);
    },
    reset() {
      this.formModel = {
        bankname: "",
        accountno: "",
        name: "",
        remark: "",
        status: ""
      };
    }
  },
  created() {
   
    this.fetchUser();
    this.fetchBank();
    this.user = this.$store.state.auth.user;
  }
};
</script>
<style scoped></style>
