import BaseApi from "./baseApi";
import { apiRoutes } from "@/config";

export default class MerchantPageTokenApi extends BaseApi {
  constructor(axios, helper) {
    super(axios, helper, "merchantPageTokens");
  }

  getAll(searchQuery) {
    return super.getAll(searchQuery);
  }

  getOne(id) {
    return super.getOne(id);
  }

  create(payload) {
    return super.create(payload);
  }

  update(payload, id) {
    return super.update(payload, id);
  }

  delete(id) {
    return super.delete(id);
  }

  debugPageToken(id) {
    return this.axios.$get(
      this.helper.prepareUrl(apiRoutes[this.module].debugPageToken, {
        id: id
      })
    );
  }
}
