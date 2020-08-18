import BaseApi from "./baseApi";
import { apiRoutes } from "@/config";

export default class EmailApi extends BaseApi {
  constructor(axios, helper) {
    super(axios, helper, "email");
  }

  verifiedEmail(payload) {
    return this.axios.$post(
        this.helper.prepareUrl(apiRoutes.email.verifiedEmail),
        payload
      );
    }
}
