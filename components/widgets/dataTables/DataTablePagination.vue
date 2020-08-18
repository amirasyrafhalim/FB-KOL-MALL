<template>
  <v-pagination
    v-model="nextPage"
    v-if="lastPage > 1"
    :length="lastPage"
    @input="refetchItems"
    class="pt-3"
  ></v-pagination>
</template>

<script>
export default {
  props: {
    moduleName: {
      required: true
    },
    currentPage: {
      required: true,
      default: 1
    },
    lastPage: {
      required: true,
      default: 1
    }
  },
  data() {
    return {
      nextPage: this.currentPage
    };
  },
  watch: {
    currentPage(value) {
      if (value == 1) {
        this.nextPage = 1;
      }
    }
  },
  created() {
    this.$bus.$on("resetCurrentPage", () => {
      this.nextPage = 1;
    });
  },
  methods: {
    refetchItems(page) {
      this.$bus.$emit("changePage", page);
    }
  }
};
</script>
