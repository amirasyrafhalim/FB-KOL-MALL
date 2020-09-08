<template>
  <div>
    <v-toolbar color="primary" class="mx-auto" dark text dense width="820px">
      <v-toolbar-title class="subheading">{{
        $t("label.profiledetail")
      }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card class="mx-auto" width="820px">
      <v-row>
        <v-col cols="12">
          <v-card-subtitle align="center">
            <v-avatar size="60px" class=" ml-1">
              <v-img
                :src="user.user_social.avatar || '/default_avatar.png'"
                class="elevation-6"
              ></v-img>
            </v-avatar>
          </v-card-subtitle>
        </v-col>
        <v-col cols="12">
          <v-card-subtitle class="headline pt-0"
            >Name : {{ user.name }}</v-card-subtitle
          >
          <v-card-subtitle class="headline pt-0"
            >Email : {{ user.email }}</v-card-subtitle
          >
          <v-card-subtitle class="headline pt-0"
            >Status : {{ user.status.description }}</v-card-subtitle
          >
          <v-card-subtitle class="headline pt-0"
            >Phone No : {{ user.user_social.phone_no }}</v-card-subtitle
          >
          <v-card-subtitle class="headline pt-0"
            >Password :
            <ForgotPassword />
          </v-card-subtitle>
        </v-col>
      </v-row>
    </v-card>
    <v-row>
      <v-col cols="4" sm="6" md="4" class="mx-auto pl-5 mr-10 pr-5">
        <crud-form-action
          backPath="campaigns"
          :loading="loading"
          @submit="submit"/></v-col
    ></v-row>
  </div>
</template>

<script>
import CrudFormAction from "@/components/widgets/forms/CrudFormAction";
import ForgotPassword from "@/components/pages/orders/forgotPassword.vue";
export default {
  components: {
    CrudFormAction,
    ForgotPassword
  },
  asyncData() {
    return {
      user: []
    };
  },
  created() {
    this.user = this.$store.state.auth.user;
    console.log("user", this.user);
  }
};
</script>
<style scoped>
.v-card__text,
.v-card__title {
  word-break: normal !important; /* maybe !important  */
}
.dashboard-card {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 10px #00000019;
  border-radius: 10px !important;
  padding: 10px;
  width: 280px;
  height: 190px;
}
.v-list-item__content {
  padding: 0 !important;
}
.border-radius-image {
  border-radius: 13px !important;
}
.v-list-item__title,
.v-list-item__subtitle {
  white-space: normal;
}
</style>
