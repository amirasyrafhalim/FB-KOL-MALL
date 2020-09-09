<template>

  <v-container
    id="referral_code"
    class="d-flex flex-column"
    fluid
  >

  <vs-row vs-justify="center">
      <vs-col type="block" vs-justify="center" vs-align="center" class="text-center" vs-w="6">
        <vs-card class="bg-white">
          <div slot="header" class="bg-white">
            <img
              :src="require('~/assets/img/logo.png')"
              alt="content-img"
              class="mx-auto card-img-top "
            />
          </div>
          <!-- <div> -->
            <vx-card :title=" $t('label.review') ">
              <vs-input
                :placeholder="$t('label.company_name')"
                :error-messages="formErrors ? formErrors.company_name : ''"
                v-model="formModel.company_name"
                class="w-full mb-4"
              />

              <v-autocomplete
                solo
                class="border-radius-button"
                :items="rangeSize"
                :label="$t('label.size')"
                :error-messages="formErrors ? formErrors.business_size : ''"
                item-text="value"
                item-value="id"
                v-model="formModel.business_size"
                @input.native="fetchItems($event.target.value)"
              ></v-autocomplete>

               <v-autocomplete
                solo
                class=" border-radius-button"
                :items="categories"
                multiple
                :label="$t('label.category')"
                :error-messages="formErrors ? formErrors.categories : ''"
                item-text="name"
                item-value="id"
                v-model="formModel.categories"
                @input.native="fetchItems($event.target.value)"
              ></v-autocomplete>

              <vs-button class="mr-4 w-full" @click="next"
                >Next</vs-button
              >
            </vx-card>
          <!-- </div> -->

        </vs-card>
      </vs-col>
    </vs-row>
  </v-container>
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
      rangeSize: [
        { value: "1-99" },
        { value: "100-199" },
        { value: "200-299" },
        { value: "more than 300" }
      ],
      formModel: {
        company_name: "",
        business_size:null,
        categories: [],
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
  },
  methods: {
    fetchItems(value) {
      this.$store.dispatch("categories/fetchItems");
    },
    async next() {
      try {
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
