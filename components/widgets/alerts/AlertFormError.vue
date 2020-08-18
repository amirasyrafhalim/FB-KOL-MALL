<template>
  <v-alert :value="isShow" color="error" icon="mdi-alert" outlined>
    {{ errorMessage }}
  </v-alert>
</template>

<script>
export default {
  props: {
    errorMessage: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    isShow() {
      return this.errorMessage ? true : false;
    }
  }
};
</script>