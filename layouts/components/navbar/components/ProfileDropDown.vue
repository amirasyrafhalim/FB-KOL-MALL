<template>
  <div class="the-navbar__user-meta flex items-center" v-if="activeUserInfo.name">
    <div class="text-right leading-tight hidden sm:block">
      <p class="font-semibold">{{ activeUserInfo.name }}</p>
      <small>Merchant</small>
    </div>

    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
      <div class="con-img ml-3">
        <img
          v-if="activeUserInfo.social && activeUserInfo.social.avatar"
          key="onlineImg"
          :src="activeUserInfo.social.avatar"
          alt="user-img"
          width="40"
          height="40"
          class="rounded-full shadow-md cursor-pointer block"
        />
        <vs-avatar v-else color="primary" :text="activeUserInfo.name" />
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">
          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push(localePath('userprofile'))"
          >
            <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Profile</span>
          </li>

          <vs-divider class="m-1" />

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="logout"
          >
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Logout</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
export default {
  computed: {
    activeUserInfo() {
      // return this.$store.state.AppActiveUser
      return this.$auth.user;
    },
  },
  methods: {
    async logout() {
      try {
        await this.$auth.logout();
      } catch (err) {
        this.$store.dispatch("showSnackbar", {
          text: this.$t("message.logoutError"),
          color: "error",
        });
      }
    },
  },
};
</script>

<style lang="scss">
.con-vs-avatar {
  width: 40px !important;
  height: 40px !important;
  margin: 0 !important;
}
</style>
