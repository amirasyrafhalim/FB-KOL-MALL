<template>
  <div class="layouts__login">
    <div class="layout--full-page bg-img">
    <div>
      <nuxt />
    </div>
    </div>
    <!-- <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay> -->
    <!-- <notification-message /> -->
  </div>
</template>

<script>
// import NotificationMessage from "@/components/NotificationMessage";

export default {
  components: {
    // NotificationMessage
  },
  computed: {
    // overlay() {
    //   return this.$store.state.overlay;
    // }
  }
};
</script>

<style lang="scss" scoped>

</style>
