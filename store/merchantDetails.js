import BaseVuex from "@/services/baseVuex";

export const state = () => ({
  ...BaseVuex.state,
  ...{
    moduleName: "merchantDetails",
  },
});

export const mutations = {
  ...BaseVuex.mutations,
};

export const actions = {
  ...BaseVuex.actions,
};
