import BaseVuex from "@/services/baseVuex";

export const state = () => ({
  ...BaseVuex.state,
  ...{
    moduleName: "campaignPackages",
    statusEnums: [],
  },
});

export const mutations = {
  ...BaseVuex.mutations,
};

export const actions = {
  ...BaseVuex.actions,
  async fetchItems({ commit, dispatch, state }, params) {
    commit("setIsFetching", true);
    try {
      let res = await this.$api[state.moduleName].getAll(params);
      commit("setSearchModel", params);
      commit("setRecords", res.data.records);
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
