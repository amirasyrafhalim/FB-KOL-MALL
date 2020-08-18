<template>
  <div class="components__rowData">
    <p class="body-2 text--secondary mb-1">{{ label }}</p>
    <h4 class="subtitle-2 font-weight-bold">
      <slot />
    </h4>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    }
  }
};
</script>