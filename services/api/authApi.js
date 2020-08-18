import BaseApi from "./baseApi";

export default class AuthApi extends BaseApi {
  constructor(axios, helper) {
    super(axios, helper, "auth");
  }

  getUser(searchQuery) {
    let url = apiRoutes.auth.user;
    if (searchQuery) {
      url += "?" + searchQuery;
    }
    return this.axios.$get(url);
  }
}
