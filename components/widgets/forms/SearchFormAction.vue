<template>
  <div class="mt-3">
    <v-btn color="primary" class="mr-3" @click="$emit('search')">
      {{ $t("label.search") }}
    </v-btn>
    <v-btn class="mr-3" @click="$emit('reset')">
      {{ $t("label.reset") }}
    </v-btn>
  </div>
</template>
