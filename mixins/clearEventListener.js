export default {
  beforeDestroy() {
    this.$bus.$off();
  }
};
