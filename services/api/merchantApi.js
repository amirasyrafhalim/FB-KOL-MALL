import BaseApi from "./baseApi";
import { apiRoutes } from "@/config";

export default class MerchantApi extends BaseApi {
  constructor(axios, helper) {
    super(axios, helper, "merchants");
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

  getDetail() {
    return this.axios.$get(apiRoutes[this.module].getDetail);
  }
}
