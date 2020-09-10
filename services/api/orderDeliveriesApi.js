import BaseApi from "./baseApi";
import { apiRoutes } from "@/config";

export default class OrderDeliveriesApi extends BaseApi {
  constructor(axios, helper) {
    super(axios, helper, "orderDeliveries");
  }

  updateOrderDelivery(payload, id) {
    return this.axios.$patch(
      this.helper.prepareUrl(apiRoutes[this.module].updateOrderDelivery, {
        id: id,
      }),
      payload
    );
  }
}


