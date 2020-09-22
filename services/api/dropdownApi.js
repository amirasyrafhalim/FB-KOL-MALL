import BaseApi from "./baseApi";
import { apiRoutes } from '@/config';

export default class DropdownApi extends BaseApi {
  constructor(axios, helper) {
    super(axios, helper, "dropdown");
  }

  getAllCountry(searchQuery) {
    let url = apiRoutes[this.module].getAllCountry;
		if (searchQuery) {
			url += '?' + searchQuery;
		}
		return this.axios.$get(url);
    // return super.getDropdown("getAllCountry", params);
  }

  getAllState(searchQuery) {
    let url = apiRoutes[this.module].getAllState;
		if (searchQuery) {
			url += '?' + searchQuery;
		}
		return this.axios.$get(url);
  }

  getAllPostcode(searchQuery) {
    let url = apiRoutes[this.module].getAllPostcode;
		if (searchQuery) {
			url += '?' + searchQuery;
		}
		return this.axios.$get(url);
  }
}
