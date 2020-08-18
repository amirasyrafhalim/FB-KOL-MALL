<template>
  <v-app class="layouts__login">
    <div
      class="background-overlay"
      :style="{ backgroundColor: backgroundColor }"
    ></div>
    <v-content>
      <nuxt />
    </v-content>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <notification-message />
  </v-app>
</template>

<script>
import NotificationMessage from "@/components/NotificationMessage";

export default {
  components: {
    NotificationMessage
  },
  computed: {
    backgroundColor() {
      return process.env.THEME_PRIMARY;
    },
    overlay() {
      return this.$store.state.overlay;
    }
  }
};
</script>

<style lang="scss" scoped>
.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
}
</style>