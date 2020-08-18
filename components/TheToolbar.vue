<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-app-bar
    color="primary"
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    dark
  >
    <v-app-bar-nav-icon @click.stop="$store.commit('toggleDrawer')" />
    <v-toolbar-title style="width: 500px" class="ml-0 pl-4">
      <span class="hidden-sm-and-down">{{ appName }}</span>
    </v-toolbar-title>
    <v-spacer />

    <v-menu offset-y transition="scale-transition">
      <template v-slot:activator="{ on }">
        <v-btn icon large v-on="on">
          <v-avatar size="32px" item>
            <img :src="(currentUser && currentUser.avatar) || '/default_avatar.png'" :alt="logoAlt" />
          </v-avatar>
        </v-btn>
      </template>
      <v-list class="pa-0">
        <v-list-item @click="logout">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t("label.logout") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    logoAlt() {
      return this.$store.state.appName + " Logo";
    }
  },
  data: () => ({
    appName: process.env.APP_NAME
  }),
  methods: {
    async logout() {
      try {
        await this.$auth.logout();
      } catch (err) {
        this.$store.dispatch("showSnackbar", {
          text: this.$t("message.logoutError"),
          color: "error"
        });
      }
    }
  }
};
</script>
