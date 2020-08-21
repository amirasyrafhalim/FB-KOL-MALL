<template>
  <v-app class="layouts__login">
    <div class="background">
    <v-content>
      <nuxt />
    </v-content>
    </div>
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
    overlay() {
      return this.$store.state.overlay;
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
