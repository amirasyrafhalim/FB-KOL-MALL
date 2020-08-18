import isEmpty from "lodash/isEmpty";

export default {
  computed: {
    record() {
      return this.$store.state[this.moduleName].record;
    },
    hasRecord() {
      return !isEmpty(this.record);
    },
  },
  methods: {
    fetchItem() {
      this.$store.dispatch(
        this.moduleName + "/fetchItem",
        this.$route.params.id
      );
    },
  },
  created() {
    this.fetchItem();
  },
  beforeDestroy() {
    this.$store.commit(this.moduleName + "/setRecord", {});
  },
};
