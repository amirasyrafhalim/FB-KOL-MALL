import BaseVuex from "@/services/baseVuex";

export const state = () => ({
  ...BaseVuex.state,
  ...{
    moduleName: "merchants",
    statusEnums: [],
    dropdownPostcode: [],
    dropdownState: [],
    dropdownCountry: []
  }
});

export const mutations = {
  ...BaseVuex.mutations
};

export const actions = {
  ...BaseVuex.actions,
  async fetchDetail({ commit, dispatch, state },params) {
    try {
      console.log("hmmm",params)
      let res = await this.$api[state.moduleName].getDetail();
      commit("setRecord", res.data);
    } catch (err) {
      let resBody = err.response;
      let errMessage = resBody.data.status_message;
      dispatch(
        "showSnackbar",
        {
          text: errMessage || this.app.i18n.t("message.notFound"),
          color: "error"
        },
        { root: true }
      );
    }
  }
};
