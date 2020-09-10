import BaseVuex from '@/services/baseVuex';

export const state = () => ({
	...BaseVuex.state,
	...{
		moduleName: 'dashboard',
		statusEnums: [],
		salesSummary: null,
		salesChart: null
	}
});

export const mutations = {
	...BaseVuex.mutations,
	setSalesSummary(state, item) {
		state.salesSummary = item;
	},
	setSalesChart(state, item) {
		state.salesChart = item;
	}
};

export const actions = {
	...BaseVuex.actions,
	async fetchSalesSummary({ commit, dispatch, state }, params) {
		commit('setIsFetching', true);

		try {
			let res = await this.$api[state.moduleName].getSalesSummary(this.$helper.stringifyParams(params));

			commit('setSearchModel', params);
			commit('setSalesSummary', res.data);
		} catch (err) {
			let resBody = err;
			let errMessage = resBody;

			this.$vs.notify({
				color: 'error',
				title: 'Error',
				text: errMessage || this.app.i18n.t('message.unknownError')
			});
		} finally {
			commit('setIsFetching', false);
		}
	},
	async fetchSalesChart({ commit, dispatch, state }, params) {
		commit('setIsFetching', true);

		try {
			let res = await this.$api[state.moduleName].getSalesChart(this.$helper.stringifyParams(params));

			commit('setSalesChart', res.data);
		} catch (err) {
			let resBody = err;
			let errMessage = resBody;

			this.$vs.notify({
				color: 'error',
				title: 'Error',
				text: errMessage || this.app.i18n.t('message.unknownError')
			});
		} finally {
			commit('setIsFetching', false);
		}
	}
};
