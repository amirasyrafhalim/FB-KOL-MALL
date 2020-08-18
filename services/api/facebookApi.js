import BaseApi from "./baseApi";
import { apiRoutes } from "@/config";

export default class FacebookApi extends BaseApi {
  constructor(axios, helper) {
    super(axios, helper, "facebook");
  }

  addVideo(payload) {
    return this.axios.$post(apiRoutes[this.module].video, payload);
  }
}
