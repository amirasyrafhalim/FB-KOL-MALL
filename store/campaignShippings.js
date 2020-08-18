import BaseVuex from "@/services/baseVuex";

export const state = () => ({
  ...BaseVuex.state,
  ...{
    moduleName: "campaignShippings",
    statusEnums: [],
    shippingRecords: []
  },
});

export const mutations = {
  ...BaseVuex.mutations,
  setShippingRecords(state, item) {
    state.shippingRecords = item;
  },
};

export const actions = {
  ...BaseVuex.actions,
  async fetchItemsShipping({ commit, dispatch, state }, params) {
    commit("setIsFetching", true);
    try {
      let res = await this.$api[state.moduleName].getAll( params.campaignId || params);
      commit("setSearchModel", params);
      commit("setShippingRecords", res.data);
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
  async deleteShipping({ commit, dispatch, state }, params) {
    try {
      let campaignId = params.campaignId;
      let res = await this.$api[state.moduleName].delete(params);
      dispatch(
        "showSnackbar",
        {
          text:
            res.data.status_message ||
            this.app.i18n.t("message.successSubmit"),
          color: "success",
        },
        { root: true }
      );
      commit("resetPagination");
      dispatch("fetchItemsShipping", {campaignId});
    } catch (err) {
      let resBody = err.response;
      let code = resBody.status;
      let errMessage = resBody.data.status_message;

      if (code == 400) {
        dispatch(
          "showSnackbar",
          {
            text: errMessage || this.app.i18n.t("message.errorSubmit"),
            color: "error",
          },
          { root: true }
        );
      } else {
        dispatch(
          "showSnackbar",
          {
            text: errMessage || this.app.i18n.t("message.unknownError"),
            color: "error",
          },
          { root: true }
        );
      }
    }
  },
};
