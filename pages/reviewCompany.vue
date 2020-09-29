<template>
  <div
    class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
    id="page-login"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vs-row vs-justify="center">
        <vs-col vs-sm="12" vs-md="12" vs-lg="6">
          <vs-card>
            <div slot="header" class="text-center">
              <img
                :src="require('~/assets/img/logo.png')"
                alt="content-img"
                class="mx-auto card-img-top "
              />
            </div>
            <!-- <div> -->
            <vx-card :title="$t('label.review')">
              <vs-input
                :label="$t('label.company_name')"
                v-model="formModel.company_name"
                class="w-full"
              />
              <span
                class="text-danger text-sm pa-5"
                :error-messages="formErrors ? formErrors.company_name : ''"
                >{{
                  this.formErrors.company_name
                    ? this.formErrors.company_name[0]
                    : ""
                }}</span
              >

              <p class="mt-3">{{ $t("label.size") }}</p>

              <v-select
                class=" pa-3"
                :options="rangeSize"
                label="value"
                v-model="formModel.business_size"
                :error-messages="formErrors ? formErrors.business_size : ''"
              />
              <span
                class="text-danger text-sm pa-5"
                :error-messages="formErrors ? formErrors.business_size : ''"
                >{{
                  this.formErrors.business_size
                    ? this.formErrors.business_size[0]
                    : ""
                }}</span
              >

              <p class="mt-3">{{ $t("label.category") }}</p>
               <v-select
                class=" pa-3"
                :options="categories"
                label="description"
                v-model="formModel.categories"
                multiple
                :error-messages="formErrors ? formErrors.categories : ''"
              />
              <span
                class="text-danger text-sm mb-5 pa-5"
                :error-messages="formErrors ? formErrors.categories : ''"
                >{{
                  this.formErrors.categories
                    ? this.formErrors.categories[0]
                    : ""
                }}</span
              >
              <vs-button class="mr-4 mt-5 w-full" @click="next">Next</vs-button>
            </vx-card>
          </vs-card>
        </vs-col>
      </vs-row>
    </div>
  </div>
</template>

<script>
import AlertFormError from "@/components/widgets/alerts/AlertFormError";

import formMixin from "@/mixins/form";

export default {
  // auth: "guest",
  layout: "auth",
  mixins: [formMixin],
  components: {
    AlertFormError
  },
  asyncData() {
    return {
      rangeSize: "",
      formModel: {
        company_name: "",
        business_size: null,
        categories: []
      }
    };
  },
  computed: {
    categories() {
      return this.$store.state.categories.records;
    }
  },
  created() {
    this.fetchItems();
    this.rangeSize = this.$store.state.businessSize;
  },
  methods: {
    async fetchItems(value) {
      await this.$store.dispatch("categories/fetchItems");
      await this.checkMerchant();
    },
    checkMerchant() {
      if (this.$store.state.auth.user && this.$store.state.auth.user.merchant) {
        this.$router.push({ path: `/` })
      }
    },
    async next() {
      const categories = this.formModel.categories;
      var payload = {
        company_name: this.formModel.company_name || "",
        business_size:
          (this.formModel.business_size &&
            this.formModel.business_size.value) ||
          "",
        categories: []
      };

      if (categories.length > 0) {
        categories.forEach(element => {
          payload.categories.push(element.id);
        });
      }
      try {
        var res = await this.$api.merchants.create(payload);
        await this.$auth.fetchUser();
        this.handleApiSuccess(res, "/");
      } catch (err) {
        this.handleApiErrors(err);
      } finally {
        this.$store.commit("setOverlay", false);
      }
    },

    beforeCreate() {
      if (this.$route.hash) {
        this.$store.commit("setOverlay", true);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.background {
  width: 100%;
  height: 100%;
  background: transparent linear-gradient(270deg, #982b8e 0%, #623cd3 100%) 0%
    0% no-repeat padding-box;
}
.v-select .vs__dropdown-toggle .vs__search {
  color: transparent !important;
  background: transparent !important;
  display: none !important;
}
</style>
