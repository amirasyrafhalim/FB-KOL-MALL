import BaseVuex from "@/services/baseVuex";

export const state = () => ({
  ...BaseVuex.state,
  liveVideos: [],
  ...{
    moduleName: "merchantPages",
  },
});

export const mutations = {
  ...BaseVuex.mutations,
  setLiveVideos(state, item) {
    state.liveVideos = item;
  },
};

export const actions = {
  ...BaseVuex.actions,
  async liveVideos({ commit, dispatch, state }, params) {
    commit("setIsFetching", true);
    try {
      let res = await this.$api[state.moduleName].liveVideos(params);
      commit("setLiveVideos", res.data);
    } catch (err) {
      let resBody = err;
      let errMessage = resBody
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
