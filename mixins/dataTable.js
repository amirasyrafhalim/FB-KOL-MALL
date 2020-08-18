export default {
  computed: {
    records() {
      return this.$store.state[this.moduleName].records;
    },
    pagination() {
      return this.$store.state[this.moduleName].pagination;
    },
    isFetching() {
      return this.$store.state[this.moduleName].isFetching;
    },
  },
  methods: {
    fetchItems(page = 1) {
      let searchModel = this.$store.state[this.moduleName].searchModel;
      let params = { ...searchModel, page: page };

      this.$store.dispatch(this.moduleName + "/fetchItems", params);
    },
    deleteItem(id) {
      this.$refs.confirmDialog
        .open(this.$t("label.delete"), this.$t("message.confirmDelete"), {
          color: "warning",
        })
        .then((confirm) => {
          if (confirm) {
            this.$store.dispatch(this.moduleName + "/deleteRecord", id);
          }
        });
    },
  },
  created() {
    this.fetchItems();
    this.$store.commit(this.moduleName + "/resetPagination");
    this.$bus.$on("changePage", (page) => {
      this.fetchItems(page);
    });
  },
};
