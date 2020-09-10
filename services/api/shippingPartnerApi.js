import BaseApi from "./baseApi";
import { apiRoutes } from '@/config'

export default class ShippingPartnerApi extends BaseApi {
  constructor(axios, helper) {
    super(axios, helper, "shippingPartners");
  }

  getAll(){

    let url = apiRoutes[this.module].getAll;
    console.log(this.module);

    // if (searchQuery) {
    //   url += "?" + searchQuery;
    // }

    return this.axios.$get(url);
    // return this.axios.$get(
    //     this.helper.prepareUrl(apiRoutes[this.module].getAll)
    //   );
  }
}
