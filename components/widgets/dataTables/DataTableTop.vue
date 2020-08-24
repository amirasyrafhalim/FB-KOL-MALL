<template>
  <v-toolbar flat>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-divider class="mx-4" inset vertical></v-divider>
    <slot>
      <v-spacer/>
    </slot>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    title: {
      required: true,
      type: String
    }
  }
};
</script>