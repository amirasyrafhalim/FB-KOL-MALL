import BaseVuex from "@/services/baseVuex";

export const state = () => ({
  ...BaseVuex.state,
  ...{
    moduleName: "merchantPages",

  },
});

export const mutations = {
  ...BaseVuex.mutations,
};

export const actions = {
  ...BaseVuex.actions,
};
