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
    <!-- Content Row -->
    <div class="vx-row">
      <div class="vx-col md:w-1/2 w-full">
        <vs-input
          class="w-full mt-4"
          label="Name"
          v-model="formModel.dataName"
        />
        <span class="text-danger text-sm"></span>
        <vs-input
          class="w-full mt-4"
          label="Email"
          v-model="formModel.dataEmail"
        />
        <span class="text-danger text-sm"></span>
      </div>

      <div class="vx-col md:w-1/2 w-full">
        <div class="mt-4">
          <label class="vs-input--label">Status</label>
          <v-select
            name="status"
            :options="status"
            v-model="formModel.dataStatus"
          />
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
      status: [
        { label: "Active", code: 1 },
        { label: "Inactive", code: 0 }
      ],
      formModel: {
        dataName: "",
        dataEmail: "",
        dataStatus: ""
      }
    };
  },
  methods: {},
  computed: {
    ...mapState({ user: state => state.auth.user })
  },
  mounted() {
    this.formModel.dataName = this.user.name;
    this.formModel.dataEmail = this.user.email;
    this.formModel.dataStatus = this.user.status.key;
  }
};
</script>
