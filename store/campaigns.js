import BaseVuex from "@/services/baseVuex";

export const state = () => ({
  ...BaseVuex.state,
  ...{
    moduleName: "campaigns",
    statusEnums: [],
    summary: []
  },
});

export const mutations = {
  ...BaseVuex.mutations,
  setSummary(state, item) {
    state.summary = item;
  },
};

export const actions = {
  ...BaseVuex.actions,

  async fetchSummary({ commit, dispatch, state }, params) {
    commit("setIsFetching", true);
    try {
      let res = await this.$api[state.moduleName].getSummary(
        this.$helper.stringifyParams(params)
      );
      commit("setSearchModel", params);
      commit("setSummary", res.data.records);
      commit("setPagination", res.data.pagination);
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
};
