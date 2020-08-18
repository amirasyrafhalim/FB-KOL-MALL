import BaseApi from "./baseApi";
import { apiRoutes } from "@/config";

export default class PasswordApi extends BaseApi {
  constructor(axios, helper) {
    super(axios, helper, "password");
  }

  resetPassword(payload) {
    return this.axios.$post(
        this.helper.prepareUrl(apiRoutes.password.resetPassword),
        payload
      );
    }
    newPassword(payload) {
      return this.axios.$post(
        this.helper.prepareUrl(apiRoutes.password.newPassword),
        payload
      );
    }
}
