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
    <div title="Bank Information">
      <vs-divider></vs-divider>
      <table>
        <tr>
          <td class="font-semibold pb-6">Bank Name</td>
          <td class="pl-6 pb-6">{{ formModel.bankname }}</td>
        </tr>
        <tr>
          <td class="font-semibold pb-6">Name</td>
          <td class="pl-6 pb-6">{{ formModel.name }}</td>
        </tr>
        <tr>
          <td class="font-semibold pb-6">Account No.</td>
          <td class=" pl-6 pb-6">{{ formModel.accountno }}</td>
        </tr>
        <tr>
          <td class="font-semibold pb-6">Status</td>
          <td class=" pl-6 pb-6">{{ formModel.status }}</td>
        </tr>
        <tr>
          <td class="font-semibold pb-6">Remark</td>
          <td class="pl-6 pb-6">{{ formModel.remark }}</td>
        </tr>
      </table>
    </div>

    <div class="mt-5 float-right mb-5">
      <vs-button @click="popupActive2 = true" color="primary" type="filled"
        >Add</vs-button
      >
      <vs-button type="border" color="danger"
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
           <v-select
            name="status"
            :options="bank"
            v-model="formModel.bankname"
          />
        </div>
      </div>

      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <span>Name</span>
        </div>
        <div class="vx-col sm:w-2/3 w-full">
          <vs-input  class="w-full" icon-no-border v-model=" formModel.name " />
        </div>
      </div>

      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <span>Account No</span>
        </div>
        <div class="vx-col sm:w-2/3 w-full">
          <vs-input class="w-full" v-model="formModel.accountno " />
        </div>
      </div>
      <div class="vx-row mb-6">
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
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <span>Remark</span>
        </div>
        <div class="vx-col sm:w-2/3 w-full">
          <vs-input  class="w-full" v-model="formModel.remark"   />
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="mt-8 flex flex-wrap items-center justify-end">
            <vs-button class="ml-auto mt-2">Save Changes</vs-button>
            <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset"
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
      status: [ "Active",  "Inactive" ],
      bank: [ "Maybank" ,"CIMB" ,"Bank Islam" ],
      popupActive2: false,
      formModel:{
        bankname:"",
        accountno:"",
        name:"",
        remark:"",
        status:""
      }
    };
  },
   methods: {
     reset(){
       this.formModel =
       {
        bankname:"",
        accountno:"",
        name:"",
        remark:"",
        status:""
      }
     }
   },
   computed:{
      category() {
      return this.$store.state.banks.records;
    },
   }
};
</script>
<style scoped></style>
