<template>
  <div>
    <v-subheader class="pa-0">{{ label }}</v-subheader>
    <v-radio-group
      :disabled="disabled"
      :hint="hint"
      :value="value"
      :error-messages="errorMessage"
      hide-details="auto"
      persistent-hint
      row
      @change="handleInput"
    >
      <v-radio
        v-for="option in options"
        :key="option.value"
        :label="option.description"
        :value="option.value"
        :color="color"
      ></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      required: true,
      type: String
    },
    color: {
      type: String,
      default: "primary"
    },
    options: {
      required: true,
      type: Array
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hint: null,
    errorMessage: {},
    value: {}
  },
  methods: {
    handleInput(value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style lang="scss" scoped>
.v-subheader {
  height: auto;
}

.v-input--selection-controls {
  margin-top: 0;
}
</style>