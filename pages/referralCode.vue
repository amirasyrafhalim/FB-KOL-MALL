<template>
  <v-container id="referral_code" class="d-flex flex-column" fluid>
    <v-layout>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="5" md="5">
          <v-card class="elevation-1 pa-3 radius">
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
                <h2
                  class="flex text-xs-center black--text mt-5 mb-5"
                >
                  {{ $t("label.referral") }}
                </h2>
                                <h4
                  class="flex text-xs-center mb-5"
                >
                  {{ $t("label.rewards") }}
                </h4>
              </div>
                <v-text-field
                  type="referral"
                  :label="$t('label.referral')"
                  :error-messages="formErrors ? formErrors.referral : ''"
                  v-model="formModel.referral"
                  single-line
                  flat
                  solo
                  aria-autocomplete="on"
                  hide-details
                  class="mb-2"
                ></v-text-field>
            </v-card-text>
            <v-card-actions class="flex-column text-right">
              <v-btn
                class="default-button text-white"
                block
                @click="submit"
                large
              >
                <h4 class="text-white ">{{ $t("label.submit") }}</h4>
              </v-btn>
              <a
                :href="localePath('reviewCompany')"
                class="caption text-right mt-5"
                style="text-decoration:none;"
                
              >
                Skip
              </a>
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
        referral: ""
      }
    };
  },
  beforeCreate() {
    if (this.$route.hash) {
      this.$store.commit("setOverlay", true);
    }
  },
  methods: {
    submit(){
      
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
