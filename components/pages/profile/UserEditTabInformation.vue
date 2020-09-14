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
          <span class="leading-none font-medium">Merchant Information</span>
        </div>

        <!-- Col Content -->
        <div>
          <!-- DOB -->
          <div class="mt-4">
            <label class="vs-input--label">Role</label>
            <v-select name="role" />
            <span class="text-danger text-sm"></span>
          </div>
          <vs-input class="w-full mt-4" label="Company" />
          <vs-input class="w-full mt-4" label="Mobile" name="mobile" />
          <span class="text-danger text-sm"></span>

          <vs-input class="w-full mt-4" label="Website" />
          <span class="text-danger text-sm"></span>

          <div class="mt-4">
            <label class="text-sm">Languages</label>
            <v-select />
            <span class="text-danger text-sm"></span>
          </div>

          <!-- Gender -->
          <div class="mt-4">
            <label class="text-sm">Gender</label>
            <div class="mt-2">
              <vs-radio vs-value="male" class="mr-4">Male</vs-radio>
              <vs-radio vs-value="female" class="mr-4">Female</vs-radio>
              <vs-radio vs-value="other">Other</vs-radio>
            </div>
          </div>

          <div class="mt-6">
            <label>Contact Options</label>
            <div class="flex flex-wrap mt-1">
              <vs-checkbox vs-value="email" class="mr-4 mb-2"
                >Email</vs-checkbox
              >
              <vs-checkbox vs-value="message" class="mr-4 mb-2"
                >Message</vs-checkbox
              >
              <vs-checkbox vs-value="Phone" class=" mb-2">Phone</vs-checkbox>
            </div>
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
export default {};
</script>
