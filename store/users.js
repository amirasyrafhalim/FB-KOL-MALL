
export const state = () => ({
  searchModel: {},
  records: [],
  pagination: {
    currentPage: 1,
    lastPage: 1,
    perPage: 20,
    total: 0,
  },
  ...{
    moduleName: "users",
    statusEnums: [],
  },
});

export const mutations = {
  setDynamicStateProperty(state, dynamicState) {
    state[dynamicState.key] = dynamicState.value;
  },
  setSearchModel(state, item) {
    state.searchModel = item;
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
  },
};

export const actions = {
  async fetchItems({ commit, dispatch, state }, params) {
    commit("setIsFetching", true);
    try {
      let res = await this.$api['auth'].getUser(
        this.$helper.stringifyParams(params)
      );
      console.log(res)

      commit("setSearchModel", params);
      commit("setRecords", res.data);
    } catch (err) {
      let resBody = err.response;
      let errMessage = resBody.data.status_message;
      dispatch(
        "showSnackbar",
        {
          text: errMessage || this.app.i18n.t("message.unknownError"),
          color: "error",
        },
        { root: true }
      );
    } finally {
      commit("setIsFetching", false);
    }
  },
  async fetchEnums({ commit, dispatch, state }, params) {
    try {
      if (state[params.stateKey].length === 0) {
        let res = await this.$api.enums[params.routeName]();
        console.log('res', res)

        commit("setDynamicStateProperty", {
          key: params.stateKey,
          value: res.data,
        });
      }
    } catch (err) {
      let resBody = err.response;
      let errMessage = resBody.data.status_message;
      dispatch(
        "showSnackbar",
        {
          text: errMessage || this.app.i18n.t("message.unknownError"),
          color: "error",
        },
        { root: true }
      );
    }
  },
};


