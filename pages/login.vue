<template>
  <div
    class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
    id="page-login"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter justify-center items-center">
            <div class="vx-col hidden lg:block lg:w-1/2">
              <img
                src="@/assets/images/pages/login.png"
                alt="login"
                class="mx-auto"
              />
            </div>

            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="px-8 py-8 login-tabs-container">
                <div class="vx-card__title mb-4">
                  <h4 class="mb-4">Login</h4>
                  <p>Welcome back, please login to your account.</p>
                </div>

                <login-firebase></login-firebase>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import LoginFirebase from './login/LoginFirebase.vue'
import { apiRoutes } from "@/config";

export default {
  auth: "guest",
  layout: "auth",
  components: {
    LoginFirebase
  },
  asyncData() {
    return {};
  },
  beforeCreate() {
    if (this.$route.hash) {
      // this.$store.commit("setOverlay", true)
    }
  },
  created() {
  },
  computed: {
  
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.login-tabs-container {
  min-height: 505px;

  .con-tab {
    padding-bottom: 14px;
  }

  .con-slot-tabs {
    margin-top: 1rem;
  }
}

.login-option__divider {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0;

  .login-option__divider--wrapper {
    flex: 1 1 auto;
  }
}
.radius {
  border-radius: 25px !important;
}
</style>
