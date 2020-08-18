<template>
  <v-snackbar
    :timeout="0"
    :color="snackbar.color"
    v-model="snackbar.show"
    top
    right
  >
    {{ snackbar.text }}
    <v-btn dark @click="$store.dispatch('closeSnackbar')" icon>
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["snackbar"])
  }
};
</script>