import {
  auth,
  axios,
  build,
  buildModules,
  css,
  head,
  i18n,
  loading,
  modules,
  plugins,
  proxy,
  router,
  server,
  vuetify,
  webfontloader
} from "./config/nuxt";

export default {
  mode: "spa",
  head,
  loading,
  css,
  plugins,
  buildModules,
  modules,
  i18n,
  axios,
  auth,
  router,
  proxy,
  server,
  vuetify,
  webfontloader,
  build
};
