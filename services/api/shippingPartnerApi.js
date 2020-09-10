import BaseApi from "./baseApi";
import { apiRoutes } from '@/config'

export default class ShippingPartnerApi extends BaseApi {
  constructor(axios, helper) {
    super(axios, helper, "shippingPartners");
  }

  getAll(){
    return this.axios.$get(
        this.helper.prepareUrl(apiRoutes[this.module].getAll)
      );
  }
}
