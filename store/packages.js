import BaseVuex from "@/services/baseVuex";

export const state = () => ({
  ...BaseVuex.state,
  ...{
    moduleName: "packages",
    activeStatus:[],
  },
});

export const mutations = {
  ...BaseVuex.mutations,
};

export const actions = {
  ...BaseVuex.actions,

  async delete({ commit, dispatch, state }, id) {
    try {
      let res = await this.$api[state.moduleName].delete(id);

      dispatch(
        'showSnackbar',
        {
          text: res.data.status_message || this.app.i18n.t('message.successSubmit'),
          color: 'success'
        },
        {root: true}
      );
      commit('resetPagination');
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
          {root: true}
        );
      } else {
        dispatch(
          'showSnackbar',
          {
            text: errMessage || this.app.i18n.t('message.unknownError'),
            color: 'error'
          },
          {root: true}
        );
      }
    }
  }
};

