import BaseVuex from "@/services/baseVuex";

export const state = () => ({
  ...BaseVuex.state,
  botEnums:[],
  ...{
    moduleName: "bots",
  },
});

export const mutations = {
  ...BaseVuex.mutations,
};

export const actions = {
  ...BaseVuex.actions,
};
