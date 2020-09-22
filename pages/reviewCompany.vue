<template>
  <div id="referral_code" class="d-flex flex-column" fluid>
    <div
      class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
      id="page-login"
    >
      <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
        <vs-row vs-justify="center">
          <vs-col
            type="block"
            
         
          
            vs-w="6"
          >
            <vs-card class="bg-white">
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
                  :error-messages="formErrors ? formErrors.company_name : ''"
                  v-model="formModel.company_name"
                  class="w-full mb-4"
                />

                <p>{{$t('label.size')}}</p>
                <v-select
                class="mb-5 pa-3"
                  v-model="formModel.business_size"
                  :options="rangeSize"
                  :menu-props="{ maxHeight: '400' }"
                  label="value"
                  hint="Pick your monthly revenue"
                ></v-select>
                 <p>{{$t('label.category')}}</p>
                <v-select
                class="mb-5 pa-3"
                  v-model="formModel.categories"
                  :options="categories"
                  :menu-props="{ maxHeight: '400' }"
                  label="name"
                  multiple
                  hint="Pick your categories"
                ></v-select>

                <vs-button class="mr-4 w-full" @click="next">Next</vs-button>
              </vx-card>
              <!-- </div> -->
            </vs-card>
          </vs-col>
        </vs-row>
      </div>
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
      rangeSize: '',
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
    this.rangeSize = this.$store.state.monthlyRevenue
  },
  methods: {
    fetchItems(value) {
      this.$store.dispatch("categories/fetchItems");
    },
    async next() {
      try {
        this.formModel.business_size = this.formModel.business_size.value
        var res = await this.$api.merchants.create(this.formModel);
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
.radius {
  border-radius: 25px !important;
}

.background {
  width: 100%;
  height: 100%;
  background: transparent linear-gradient(270deg, #982b8e 0%, #623cd3 100%) 0%
    0% no-repeat padding-box;
}
</style>
