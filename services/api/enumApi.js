import BaseApi from "./baseApi";

export default class EnumApi extends BaseApi {
  constructor(axios, helper) {
    super(axios, helper, "enums");
  }

  campaignStatus() {
    return super.getEnums("campaignStatus");
  }

  campaignPackageStatus() {
    return super.getEnums("campaignPackageStatus");
  }

  merchantStatus() {
    return super.getEnums("merchantStatus");
  }

  productStatus() {
    return super.getEnums("productStatus");
  }
  deliveryMethod() {
    return super.getEnums("deliveryMethod");
  }
  paymentStatus() {
    return super.getEnums("paymentStatus");
  }
  deliveryStatus() {
    return super.getEnums("deliveryStatus");
  }
  userRole() {
    return super.getEnums("userRole");
  }
  userStatus() {
    return super.getEnums("userStatus");
  }
}
