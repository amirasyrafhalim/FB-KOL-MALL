import BaseApi from "./baseApi";
import { apiRoutes } from '@/config';

export default class DropdownApi extends BaseApi {
  constructor(axios, helper) {
    super(axios, helper, "dropdown");
  }

  getAllCountry(searchQuery) {
    let url = apiRoutes.countries.getAllOrCreate;
		if (searchQuery) {
			url += '?' + searchQuery;
		}
		return this.axios.$get(url);
    // return super.getDropdown("getAllCountry", params);
  }

  getAllState(searchQuery) {
    let url = apiRoutes.states.getAllOrCreate;
		if (searchQuery) {
			url += '?' + searchQuery;
		}
		return this.axios.$get(url);
  }

  getAllPostcode(searchQuery) {
    let url = apiRoutes.postcodes.getAllOrCreate;
		if (searchQuery) {
			url += '?' + searchQuery;
		}
		return this.axios.$get(url);
  }
}
