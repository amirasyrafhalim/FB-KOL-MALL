import BaseApi from "./baseApi";
import { apiRoutes } from "@/config";

export default class OrderApi extends BaseApi {
  constructor(axios, helper) {
    super(axios, helper, "orders");
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

  updateDelivery(payload, id) {
    return this.axios.$patch(
      this.helper.prepareUrl(apiRoutes[this.module].updateDelivery, {
        id: id,
      }),
      payload
    );
  }

  updatePickup(payload, id) {
    return this.axios.$patch(
      this.helper.prepareUrl(apiRoutes[this.module].updatePickup, {
        id: id,
      }),
      payload
    );
  }
  updateOrderPayment(payload, id) {
    return this.axios.$patch(apiRoutes[this.module].updateOrderPayment, {
        id: id,
      }),
      payload
    ;
  }

  delete(id) {
    return super.delete(id);
  }
}
