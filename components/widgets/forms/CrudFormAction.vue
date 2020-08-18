<template>
  <div class="mt-3">
    <v-btn
      color="primary"
      class="mr-3"
      :loading="loading"
      @click="$emit('submit')"
    >
      {{ $t("label.submit") }}
    </v-btn>
    <v-btn :disabled="loading" :to="localePath(backPath)" class="mr-3">
      {{ $t("label.back") }}
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      required: true,
      type: Boolean,
      default: false
    },
    backPath: {
      required: true,
      type: String
    }
  }
};
</script>