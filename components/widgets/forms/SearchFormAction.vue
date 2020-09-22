<template>
  <div class="mt-3" style="text-align: end">
    <vs-button color="primary" class="mr-3" @click="$emit('search')">
      {{ $t("label.search") }}
    </vs-button>
    <vs-button class="mr-3" @click="$emit('reset')">
      {{ $t("label.reset") }}
    </vs-button>
  </div>
</template>
