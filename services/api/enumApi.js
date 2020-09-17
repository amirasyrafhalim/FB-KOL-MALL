import BaseApi from "./baseApi";

export default class EnumApi extends BaseApi {
  constructor(axios, helper) {
    super(axios, helper, "enums");
  }

  activeStatus() {
    return super.getEnums("activeStatus");
  }

  botResponseType() {
    return super.getEnums("botResponseType");
  }

  campaignStatus() {
    return super.getEnums("campaignStatus");
  }

  deliveryMethod() {
    return super.getEnums("deliveryMethod");
  }

  deliveryStatus() {
    return super.getEnums("deliveryStatus");
  }

  freeMinimumType() {
    return super.getEnums("freeMinimumType");
  }

  gender() {
    return super.getEnums("gender");
  }

  orderStatus() {
    return super.getEnums("orderStatus");
  }

  paymentMethod() {
    return super.getEnums("paymentMethod");
  }

  paymentStatus() {
    return super.getEnums("paymentStatus");
  }

  registerMethod() {
    return super.getEnums("registerMethod");
  }

  sellMethod() {
    return super.getEnums("sellMethod");
  }

  socialProvider() {
    return super.getEnums("socialProvider");
  }

  status() {
    return super.getEnums("status");
  }

  subscriptionPlan() {
    return super.getEnums("subscriptionPlan");
  }

  userStatus() {
    return super.getEnums("userStatus");
  }

  videoStatus() {
    return super.getEnums("videoStatus");
  }
}
