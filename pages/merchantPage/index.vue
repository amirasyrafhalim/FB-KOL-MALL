<template>
  <div id="pages__facebookPage">
    <v-container>
      <v-toolbar color="white" dark flat dense>
        <v-toolbar-title
          class="subheading black--text font-weight-bold"
        >{{ $t("pageTitle.facebookPage.title") }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-row>
        <v-col cols="4">
          <v-card flat>
            <v-card-title>Selling on Facebook</v-card-title>
            <v-card-text>
              A Facebook shop lets you show and sell products to people on
              Facebook. Choose a Facebook Page to add a shop.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col v-if="merchantPage.length == 1">
          <v-card class="secondary pa-4">
            <v-card-title>Facebook Account</v-card-title>
            <v-card-text>
              You need to connect your facebook account before start using all
              facebook features, including page shops.
            </v-card-text>
            <v-card-actions>
              <v-btn color="#3b5998" dark :href="redirectPage + '/v1/auth/fb-page/' + this.user.id">
                <img width="auto" height="25px" src="facebook.png" />
                {{
                $t("label.connectWithFacebook")
                }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col v-else>
          <v-card class="secondary pa-4">
            <v-card-title>{{ $t("pageTitle.facebookPage.title") }}</v-card-title>
            <v-row>
              <v-col cols="auto">
                <v-avatar size="32px" item>
                  <img :src="'/default_avatar.png'" />
                </v-avatar>
              </v-col>
              <v-col v-if="merchantPage && merchantPage.length > 0">
                <h4>{{ merchantPage[0].name || null }}</h4>
                <span>{{ $t("label.id") }} : {{ merchantPage[0].page_id || null }}</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn dark class="primary" @click="liveVideo()">{{ $t(`label.goToLive`) }}</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AlertConfirmation from "@/components/widgets/alerts/AlertConfirmation";
import { apiRoutes } from "@/config";
require("dotenv").config();

export default {
  layout: "main",
  name: "index",
  components: {
    AlertConfirmation,
  },
  asyncData({ app, store }) {
    return {
      redirectPage: process.env.API_URL_REDIRECT,
      moduleName: "merchantPages",
      headers: [
        { text: app.i18n.t("label.name"), value: "name" },
        { text: app.i18n.t("label.pageUrl"), value: "page_url" },
        { text: app.i18n.t("label.pageId"), value: "page_id" },
        { text: app.i18n.t("label.actions"), value: "actions" },
      ],
      user: null,
    };
  },
  computed: {
    merchantPage() {
      return this.$store.state[this.moduleName].records;
    },
  },
  created() {
    this.initialize();
    this.fetchMerchantPage();
  },
  methods: {
    initialize() {
      this.user = this.$store.state.auth.user;
      console.log(this.user);
    },
    async fetchMerchantPage() {
      try {
        await this.$store.dispatch(this.moduleName + "/fetchItems");
      } catch (err) {
        console.log(err);
      }
    },
    async liveVideo() {
      try {
        console.log("id");

        this.$router.push({
          path: `/facebookPage/` + this.merchantPage[0].id + `/liveVideo`,
        });

        //  this.$router.push( { path: this.localePath("type: 'facebookPage-id-liveConsole', params: { id: this.merchantPage[0].id }") });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
