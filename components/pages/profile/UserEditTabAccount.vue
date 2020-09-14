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

        <vs-input class="w-full mt-4" label="Name" />
        <span class="text-danger text-sm"></span>

        <vs-input class="w-full mt-4" label="Email" />
        <span class="text-danger text-sm"></span>
      </div>

      <div class="vx-col md:w-1/2 w-full">

        <div class="mt-4">
          <label class="vs-input--label">Status</label>
          <v-select name="status"/>
          <span class="text-danger text-sm" ></span>
        </div>

      </div>
    </div>

    <!-- Save & Reset Button -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
          <vs-button class="ml-auto mt-2" >Save Changes</vs-button>
          <vs-button class="ml-4 mt-2" type="border" color="warning">Reset</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'

export default {
  layout:'main',
  components: {
    vSelect
  },
  props: {

  },
  data () {
    return {

    }
  },
  computed: {
 
  },
  methods: {
  }
}
</script>
