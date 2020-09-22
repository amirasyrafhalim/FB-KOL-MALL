<!-- =========================================================================================
  File Name: UserEdit.vue
  Description: User Edit Page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <vx-card>
    <div slot="no-body" class="tabs-container px-6 pt-6">
      <vs-tabs class="tab-action-btn-fill-conatiner">
        <!-- <vs-tab label="Account" icon-pack="feather" icon="icon-user">
          <div class="tab-text">
            <UserEditTabAccount class="mt-4" />
          </div>
        </vs-tab> -->
        <vs-tab
          icon-pack="feather"
          icon="icon-lock"
          label="Password Settings"
        >
          <div>
            <UserChangePassword />
          </div>
        </vs-tab>
        <vs-tab
          label="Merchant Information"
          icon-pack="feather"
          icon="icon-info"
          style="height:55vh;"
        >
          <div class="tab-text">
            <UserEditTabInformation />
          </div>
        </vs-tab>
        <vs-tab label="Bank Information" icon-pack="feather" icon="icon-info">
          <div class="tab-text">
            <UserBankInformation class="mt-4" />
          </div>
        </vs-tab>
      </vs-tabs>
    </div>
  </vx-card>
</template>

<script>
import UserEditTabAccount from "@/components/pages/profile/UserEditTabAccount.vue";
import UserEditTabInformation from "@/components/pages/profile/UserEditTabInformation.vue";
import UserChangePassword from "@/components/pages/profile/UserChangePassword.vue";
import UserBankInformation from "@/components/pages/profile/UserBankInformation.vue";

export default {
  layout: "main",
  components: {
    UserEditTabInformation,
    UserEditTabAccount,
    UserChangePassword,
    UserBankInformation
  },
  data() {
    return {
      //   user_data: null,
      //   user_not_found: false,
      /*
        This property is created for fetching latest data from API when tab is changed

        Please check it's watcher
      */
      //   activeTab: 0
    };
  },
    computed: {
    records() {
      return this.$store.state.auth.user;
    }
  },
  //   watch: {
  //     activeTab () {
  //       this.fetch_user_data(this.$route.params.userId)
  //     }
  //   },
  //   methods: {
  //     fetch_user_data (userId) {
  //       this.$store.dispatch('userManagement/fetchUser', userId)
  //         .then(res => { this.user_data = res.data })
  //         .catch(err => {
  //           if (err.response.status === 404) {
  //             this.user_not_found = true
  //             return
  //           }
  //           console.error(err)
  //         })
  //     }
  //   },
};
</script>
