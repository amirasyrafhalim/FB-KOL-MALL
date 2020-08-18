import BaseVuex from "@/services/baseVuex";

export const state = () => ({
  ...BaseVuex.state,
  ...{
    moduleName: "password",
  }
});

export const mutations = {
  ...BaseVuex.mutations
};

export const actions = {
  ...BaseVuex.actions,
 
};
