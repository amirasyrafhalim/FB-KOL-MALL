<template>
  <v-app class="layouts__login">
    <div
      class="background"
    ></div>
    <v-content>
      <nuxt />
    </v-content>
    <notification-message />
  </v-app>
</template>

<script>
import NotificationMessage from "@/components/NotificationMessage";

export default {
  components: {
    NotificationMessage
  },
};
</script>

<style lang="scss" scoped>
.background{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('../assets/Img/background.png') center center/cover;
}

</style>