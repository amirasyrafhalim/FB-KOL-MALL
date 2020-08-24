import { apiRoutes } from "@/config";

export default async function ({ app, store }) {
  if (!app.$auth.loggedIn) {
    return;
  }

  const auth = app.$auth;
  const authStrategy = auth.strategy.name;

  if (authStrategy === "facebook" || authStrategy === "google") {
    // window.location.href = "https://localhost/kolstore-api/public/v1/auth/fb-redirect";
    
    // this.$store.commit('setToken', this.$route.query.token);
    // const accessToken = this.$store.state.token;
    // const formModel = {
    //  token: accessToken,
    // };

    try {
      const { data } = await app.$axios.$post(apiRoutes.auth.login, this.$store.state.token);
      auth.setToken("local", "Bearer " + data.token);
      auth.setStrategy("local");
      store.commit("setOverlay", false);
      await auth.fetchUser();
    } catch (err) {
      auth.logout();
      console.log(err);
    }
  }
}
