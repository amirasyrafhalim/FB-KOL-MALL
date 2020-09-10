export default {
	state: {
		searchModel: {},
		record: {},
		records: [],
		isFetching: false,
		pagination: {
			currentPage: 1,
			lastPage: 1,
			perPage: 20,
			total: 0
		}
	},
	mutations: {
		setDynamicStateProperty(state, dynamicState) {
			state[dynamicState.key] = dynamicState.value;
		},
		setSearchModel(state, item) {
			state.searchModel = item;
		},
		setRecord(state, item) {
			state.record = item;
		},
		setRecords(state, items) {
			state.records = items;
		},
		setIsFetching(state, value) {
			state.isFetching = value;
		},
		setPagination(state, pagination) {
			state.pagination.currentPage = pagination.current_page;
			state.pagination.lastPage = pagination.last_page;
			state.pagination.perPage = pagination.per_page;
			state.pagination.total = pagination.total;
		},
		resetPagination(state) {
			state.pagination.currentPage = 1;
			state.pagination.lastPage = 1;
			state.pagination.perPage = 20;
			state.pagination.total = 0;
		}
	},
	actions: {
		async fetchItems({ commit, dispatch, state }, params) {
			commit('setIsFetching', true);

			try {
				let res = await this.$api[state.moduleName].getAll(this.$helper.stringifyParams(params));
console.log(res)
				commit('setSearchModel', params);
				commit('setRecords', res.data);
				commit('setPagination', res.meta);
			} catch (err) {
				let resBody = err;
				let errMessage = resBody;
				dispatch(
					'showSnackbar',
					{
						text: errMessage || this.app.i18n.t('message.unknownError'),
						color: 'error'
					},
					{ root: true }
				);
			} finally {
				commit('setIsFetching', false);
			}
		},

		async fetchItem({ commit, dispatch, state }, id) {
			try {
				let res = await this.$api[state.moduleName].getOne(id);
				commit('setRecord', res.data);
			} catch (err) {
				let resBody = err.response;
				let errMessage = resBody.data.status_message;
				dispatch(
					'showSnackbar',
					{
						text: errMessage || this.app.i18n.t('message.notFound'),
						color: 'error'
					},
					{ root: true }
				);
				this.$router.go(-1);
			}
		},
		async fetchPostcode({ commit, dispatch, state }, params) {
			try {
				if (state[params.stateKey].length == 0) {
					let res = await this.$api.dropdown[params.routeName]();
					commit('setSearchModel', params);
					commit('setDynamicStateProperty', {
						key: params.stateKey,
						value: res.data
					});
				} else {
					let res = await this.$api.dropdown[params.routeName](
						this.$helper.stringifyParams({ code: params.code })
					);
					commit('setDynamicStateProperty', {
						key: params.stateKey,
						value: res.data
					});
				}
			} catch (err) {
				let resBody = err.response;
				let errMessage = resBody.data.status_message;
				dispatch(
					'showSnackbar',
					{
						text: errMessage || this.app.i18n.t('message.unknownError'),
						color: 'error'
					},
					{ root: true }
				);
			}
		},

		async fetchState({ commit, dispatch, state }, params) {
			try {
				if (state[params.stateKey].length == 0) {
					let res = await this.$api.dropdown[params.routeName](params.value);
					commit('setDynamicStateProperty', {
						key: params.stateKey,
						value: res.data
					});
				} else {
					let res = await this.$api.dropdown[params.routeName](
						this.$helper.stringifyParams({ name: params.name })
					);
					commit('setDynamicStateProperty', {
						key: params.stateKey,
						value: res.data
					});
				}
			} catch (err) {
				let resBody = err.response;
				let errMessage = resBody.data.status_message;
				dispatch(
					'showSnackbar',
					{
						text: errMessage || this.app.i18n.t('message.unknownError'),
						color: 'error'
					},
					{ root: true }
				);
			}
		},

		async fetchCountry({ commit, dispatch, state }, params) {
			try {
				if (state[params.stateKey].length == 0) {
					let res = await this.$api.dropdown[params.routeName]();
					commit('setDynamicStateProperty', {
						key: params.stateKey,
						value: res.data
					});
				} else {
					let res = await this.$api.dropdown[params.routeName](
						this.$helper.stringifyParams({ name: params.name })
					);
					commit('setDynamicStateProperty', {
						key: params.stateKey,
						value: res.data
					});
				}
			} catch (err) {
				let resBody = err.response;
				let errMessage = resBody.data.status_message;
				dispatch(
					'showSnackbar',
					{
						text: errMessage || this.app.i18n.t('message.unknownError'),
						color: 'error'
					},
					{ root: true }
				);
			}
		},
		async deleteRecord({ commit, dispatch, state }, id) {
			try {
				let res = await this.$api[state.moduleName].delete(id);

				dispatch(
					'showSnackbar',
					{
						text: res.data.status_message || this.app.i18n.t('message.successSubmit'),
						color: 'success'
					},
					{ root: true }
				);
				commit('resetPagination');
				dispatch('fetchItems');
			} catch (err) {
				let resBody = err.response;
				let code = resBody.status;
				let errMessage = resBody.data.status_message;

				if (code == 400) {
					dispatch(
						'showSnackbar',
						{
							text: errMessage || this.app.i18n.t('message.errorSubmit'),
							color: 'error'
						},
						{ root: true }
					);
				} else {
					dispatch(
						'showSnackbar',
						{
							text: errMessage || this.app.i18n.t('message.unknownError'),
							color: 'error'
						},
						{ root: true }
					);
				}
			}
		},
		async fetchEnums({ commit, dispatch, state }, params) {
			try {
				if (state[params.stateKey].length == 0) {
					let res = await this.$api.enums[params.routeName]();

					commit('setDynamicStateProperty', {
						key: params.stateKey,
						value: res.data
					});
				}
			} catch (err) {
				let resBody = err.response;
				let errMessage = resBody.data.status_message;
				dispatch(
					'showSnackbar',
					{
						text: errMessage || this.app.i18n.t('message.unknownError'),
						color: 'error'
					},
					{ root: true }
				);
			}
		},
		resetPagination({ commit }) {
			commit('resetPagination');
		}
	}
};
