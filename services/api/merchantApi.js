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
    console.log("aaa")
    return super.update(payload, id);

  }
  updateDetail(payload, id) {
    console.log("bbb",payload,id)
    return this.axios.$patch(
      this.helper.prepareUrl(apiRoutes.merchantDetail.getOneOrUpdateOrDeleteMerchantDetail, {
        id: id,
      }),
      payload
    );
  }

  delete(id) {
    return super.delete(id);
  }

  getDetail() {
    return this.axios.$get(apiRoutes[this.module].getDetail);
  }
}
