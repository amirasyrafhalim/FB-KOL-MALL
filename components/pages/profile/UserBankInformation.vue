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
          <feather-icon icon="userIcon" class="mr-2" svgClasses="w-5 h-5" />
          <span class="leading-none font-medium">Information Bank 1</span>
        </div>

        <!-- Col Content -->
        <div>
          <!-- DOB -->
          <div class="mt-4">
            <label class="vs-input--label">Bank Option</label>
            <v-select name="bank" />
            <span class="text-danger text-sm"></span>
          </div>
          <vs-input class="w-full mt-4" label="Name" />
          <vs-input class="w-full mt-4" label="Account No." />

          <div class="mt-4">
            <label class="text-sm">Status</label>
            <v-select />
            <span class="text-danger text-sm"></span>
          </div>
          <vs-input class="w-full mt-4" label="Remark" />

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
export default {};
</script>
