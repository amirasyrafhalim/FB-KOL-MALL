import { apiRoutes } from "@/config";

export default async function ({ app, store }) {
  if (!app.$auth.loggedIn) {
    return;
  }

  const auth = app.$auth;
  const authStrategy = auth.strategy.name;

  if (authStrategy === "facebook" || authStrategy === "google") {
    const accessToken = store.$auth.getToken(authStrategy).substr(7);
    const formModel = {
      type: 1,
      access_token: accessToken,
    };

    try {
      const { data } = await app.$axios.$post(apiRoutes.auth.login, formModel);
      auth.setToken("local", "Bearer " + data.access_token);
      auth.setStrategy("local");
      store.commit("setOverlay", false);
      await auth.fetchUser();
    } catch (err) {
      auth.logout();
      console.log(err);
    }
  }
}
