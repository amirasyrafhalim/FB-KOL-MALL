import BaseApi from "./baseApi";

export default class DropdownApi extends BaseApi {
  constructor(axios, helper) {
    super(axios, helper, "dropdown");
  }

  getAllCountry(params) {
    return super.getDropdown("getAllCountry", params);
  }

  getAllState() {
    return super.getDropdown("getAllState");
  }

  getAllPostcode(params) {
    return super.getDropdown("getAllPostcode", params);
  }
}
