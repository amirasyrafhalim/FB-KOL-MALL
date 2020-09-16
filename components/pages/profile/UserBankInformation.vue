<!-- =========================================================================================
  File Name: UserEditTabInformation.vue
  Description: User Edit Information Tab content
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="vx-col w-full">
    <vx-card title="Bank Information">
      <table>
        <tr>
          <td class="font-semibold pb-6">Bank Name</td>
          <td class=" pl-6 pb-6">Malayan Banking Berhad (Maybank)</td>
        </tr>
        <tr>
          <td class="font-semibold pb-6">Name</td>
          <td class="pl-6 pb-6">Raditz Farhan</td>
        </tr>
        <tr>
          <td class="font-semibold pb-6">Account No.</td>
          <td class=" pl-6 pb-6">151258621805</td>
        </tr>
        <tr>
          <td class="font-semibold pb-6">Status</td>
          <td class=" pl-6 pb-6">Active</td>
        </tr>
        <tr>
          <td class="font-semibold pb-6">Remark</td>
          <td class="pl-6 pb-6">Bank Name</td>
        </tr>
      </table>
    </vx-card>

    <div class="mt-5 float-right mb-5">
      <vs-button @click="popupActive2 = true" color="primary" type="filled"
        >Add</vs-button
      >
      <vs-button type="border" color="danger" @click="confirmDeleteRecord"
        >Delete</vs-button
      >
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
          <vs-input type="password" class="w-full" icon-no-border />
        </div>
      </div>

      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <span>Name</span>
        </div>
        <div class="vx-col sm:w-2/3 w-full">
          <vs-input type="password" class="w-full" icon-no-border />
        </div>
      </div>

      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <span>Account No</span>
        </div>
        <div class="vx-col sm:w-2/3 w-full">
          <vs-input type="password" class="w-full" />
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <span>Status</span>
        </div>
        <div class="vx-col sm:w-2/3 w-full">
          <vs-input type="password" class="w-full" />
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <span>Remark</span>
        </div>
        <div class="vx-col sm:w-2/3 w-full">
          <vs-input type="password" class="w-full" />
        </div>
      </div>
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
      popupActive2: false
    };
  }
};
</script>
<style scoped></style>
