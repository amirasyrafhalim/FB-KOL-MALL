import BaseApi from "./baseApi";

export default class BuyerOrderApi extends BaseApi {
  constructor(axios, helper) {
    super(axios, helper, "buyerOrders");
  }

  addBuyerOrder(payload){
    return this.axios.$post('/api/v1/buyerOrder', payload);
  }
}
