<template>
  <v-container id="referral_code" class="d-flex flex-column mt-5" fluid>
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
            <vx-card title="Referral Code">
              <vs-input
                :placeholder="$t('label.referral')"
                :error-messages="formErrors ? formErrors.referral : ''"
                v-model="formModel.referral"
                class="w-full mb-4"
              />
              <vs-button class="mr-4 w-full" @click="name = email = msg = ''"
                >Submit</vs-button
              >
                <a
                :href="localePath('reviewCompany')"
                class="h6 text-right mt-5 center"
                style="font-weight:none;"
              >
                Skip
              </a>
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
    submit() {}
  }
};
</script>

<style lang="scss">
.vx-card .vx-card__header {
    display: block!important;
    }
</style>
