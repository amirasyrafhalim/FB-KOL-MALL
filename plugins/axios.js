export default function({ store, app: { $axios } }) {
  $axios.onRequest(config => {
    config.headers["Content-Type"] = "application/json";
    config.headers["Access-Control-Allow-Origin"] = "*";

    if (store.$auth.getToken("local")) {
      config.headers.common["Authorization"] = store.$auth.getToken("local");
    }
  });
}
