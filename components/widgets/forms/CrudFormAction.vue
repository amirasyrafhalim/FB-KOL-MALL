<template>
  <div class="mt-3">
     <v-btn :disabled="loading" :to="localePath(backPath)" class="mr-3 w-30">
      {{ $t("label.back") }}
    </v-btn>
    <v-btn
      class="mr-3 w-30 bg-gradient white--text"
      :loading="loading"
      @click="$emit('submit')"
    >
      {{ $t("label.save") }}
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