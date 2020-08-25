<template>
  <v-app class="layout__default">
    <the-sidebar />
    <the-toolbar />
    <v-content>
      <v-container fluid class="pa-10">
        <nuxt />
      </v-container>
    </v-content>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <notification-message />
  </v-app>
</template>


<script>
import TheToolbar from "@/components/TheToolbar";
import TheSidebar from "@/components/TheSidebar";
import NotificationMessage from "@/components/NotificationMessage";

export default {
  components: {
    TheToolbar,
    TheSidebar,
    NotificationMessage
  },
  computed: {
    overlay() {
      return this.$store.state.overlay;
    }
  }
};
</script>
