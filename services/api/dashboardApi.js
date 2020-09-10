import BaseApi from './baseApi';
import { apiRoutes } from '@/config';

export default class DashboardApi extends BaseApi {
	constructor(axios, helper) {
		super(axios, helper, 'dashboard');
	}

	getSalesSummary(searchQuery) {
		let url = apiRoutes[this.module].getSalesSummary;

		if (searchQuery) {
			url += '?' + searchQuery;
		}

		return this.axios.$get(url);
	}
}
