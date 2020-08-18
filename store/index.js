require("dotenv").config();

export const state = () => ({
  appName: process.env.APP_NAME,
  drawer: true,
  overlay: false,
  snackbar: {
    show: false,
    text: null,
    timeout: 3000,
    color: null,
  },
});

export const getters = {
  currentUser(state) {
    return state.auth.user
  },
  roles(state) {
    return state.auth.loggedIn ? state.auth.user.roles : [];
  },
  isAdmin(state, getters) {
    return getters.roles.includes("admin");
  },
  isVerifiedMerchant(state, getters) {
    return (
      getters.roles.includes("merchant") && state.auth.user.verify_status == 1
    );
  },
};

export const mutations = {
  toggleDrawer(state) {
    state.drawer = !state.drawer;
  },
  updateDrawer(state, value) {
    state.drawer = value;
  },
  setOverlay(state, value) {
    state.overlay = value;
  },
  closeSnackbar(state) {
    state.snackbar.show = false;
    state.snackbar.timeout = 3000;
    state.snackbar.text = state.snackbar.color = null;
  },
  setSnackbar(state, data) {
    state.snackbar.show = true;
    state.snackbar.timeout = data.timeout || 3000;
    state.snackbar.text = data.text;
    state.snackbar.color = data.color;
  },
};

export const actions = {
  showSnackbar({ commit }, params) {
    commit("setSnackbar", params);

    setTimeout(() => {
      commit("closeSnackbar");
    }, params.timeout || 3000);
  },
  closeSnackbar({ commit }) {
    commit("closeSnackbar");
  },
};
