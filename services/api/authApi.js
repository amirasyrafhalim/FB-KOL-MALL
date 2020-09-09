import BaseApi from "./baseApi";
import { apiRoutes } from "@/config";

export default class AuthApi extends BaseApi {
  constructor(axios, helper) {
    super(axios, helper, "auth");
  }

  register(payload) {
    return this.axios.$post(apiRoutes[this.module].register, payload);
  }

  loginFB(payload){
    return this.axios.$post(apiRoutes[this.module].loginFB, payload);
  }

  getUser(searchQuery) {
    let url = apiRoutes.auth.user;
    if (searchQuery) {
      url += "?" + searchQuery;
    }
    return this.axios.$get(url);
  }
}
