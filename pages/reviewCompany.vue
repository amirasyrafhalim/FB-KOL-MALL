<template>
  <v-container id="referral_code" class="d-flex flex-column  background-gradient" fluid>
    <v-layout>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="7" md="6">
          <v-card class="elevation-1 pa-3 radius">
            <alert-form-error :error-message="errorMessage" />
            <v-card-text>
              <div class="layout column align-center">
                <h1 class="flex text-center mb-2 primary--text">
                  <v-img icon class="pl-1">
                    <img
                      :src="require('~/assets/Img/logo.png')"
                      width="auto"
                      height="50"
                      contain
                      class="mt-5"
                    />
                  </v-img>
                </h1>
                <h2
                  class="flex text-xs-center black--text mt-5 mb-5"
                >
                  {{ $t("label.review") }}
                </h2>
              </div>
                <v-text-field
                  type="referral"
                  :label="$t('label.size')"
                  :error-messages="formErrors ? formErrors.size : ''"
                  v-model="formModel.referral"
                  single-line
                  flat
                  solo
                  aria-autocomplete="on"
                  hide-details
                  class="mb-4 pl-5 pr-5 mt-5 mb-5"
                ></v-text-field>
                 <v-text-field
                  type="referral"
                  :label="$t('label.retail')"
                  :error-messages="formErrors ? formErrors.retail : ''"
                  v-model="formModel.referral"
                  single-line
                  flat
                  solo
                  aria-autocomplete="on"
                  hide-details
                  class="mb-4 pl-5 pr-5 "
                ></v-text-field>
                 <v-text-field
                  type="referral"
                  :label="$t('label.website')"
                  :error-messages="formErrors ? formErrors.website : ''"
                  v-model="formModel.referral"
                  single-line
                  flat
                  solo
                  aria-autocomplete="on"
                  hide-details
                  class="mb-4 pl-5 pr-5"
                ></v-text-field>
                 <v-text-field
                  type="referral"
                  :label="$t('label.kindProduct')"
                  :error-messages="formErrors ? formErrors.kindProduct : ''"
                  v-model="formModel.referral"
                  single-line
                  flat
                  solo
                  aria-autocomplete="on"
                  hide-details
                  class="mb-4 pl-5 pr-5"
                ></v-text-field>
            </v-card-text>
            <v-card-actions class="flex-column text-right px-5">
              <v-btn
                class="default-button text-white mb-5 mx-auto"
                block
                @click="next"
                large
                :href="localePath('/')"
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
      formModel: {
        type: 0,
        email: "",
        referral: ""
      }
    };
  },

   async next() {
      // console.log(this.formModel)
      // this.$store.commit("setOverlay", true);

      try {
        // var a = await this.$auth.loginWith("local", {
        //   data: this.formModel
        // });
        // this.clearPreviousError();
        this.$router.push("/");
      } catch (err) {
        console.log(err)
        // this.handleApiErrors(err);
      } finally {
        this.$store.commit("setOverlay", false);
      }
    },

  beforeCreate() {
    if (this.$route.hash) {
      this.$store.commit("setOverlay", true);
    }
  },
  methods: {
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
