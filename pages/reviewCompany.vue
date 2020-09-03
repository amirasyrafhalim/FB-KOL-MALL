<template>
  <v-container
    id="referral_code"
    class="d-flex flex-column background-gradient"
    fluid
  >
    <v-layout>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="7" md="6">
          <v-card class="elevation-1 pa-3 radius secondary">
            <alert-form-error :error-message="errorMessage" />
            <v-card-text>
              <div class="layout column align-center">
                <h1 class="flex text-center mb-2 primary--text">
                  <v-img icon class="pl-1">
                    <img
                      :src="require('~/assets/img/logo.png')"
                      width="auto"
                      height="50"
                      contain
                      class="mt-5"
                    />
                  </v-img>
                </h1>
                <h2 class="flex text-xs-center black--text mt-5 mb-5">
                  {{ $t("label.review") }}
                </h2>
              </div>
              <v-text-field
                type="referral"
                :label="$t('label.name')"
                :error-messages="formErrors ? formErrors.company_name : ''"
                v-model="formModel.company_name"
                single-line
                flat
                solo
                aria-autocomplete="on"
                class=""
              ></v-text-field>
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
            </v-card-text>
            <v-card-actions class="flex-column text-right px-5">
              <v-btn
                class="default-button text-white mb-5 mx-auto"
                block
                @click="next"
                large
              >
                <h4 class="text-white">{{ $t("label.next") }}</h4>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-layout>
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
        { value: "0-100" },
        { value: "101-200" },
        { value: "201-300" },
        { value: "301-400" }
      ],
      formModel: {
        company_name: "KOL MALL",
        business_size:null,
        categories: [1,2],
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
