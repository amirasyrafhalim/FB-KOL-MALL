import BaseVuex from "@/services/baseVuex";

export const state = () => ({
  ...BaseVuex.state,
  ...{
    moduleName: "orders",
    deliveryMethodsEnums:[],
    paymentEnums:[],
    deliveryEnums:[],
    statusEnums:[],
  },
});

export const mutations = {
  ...BaseVuex.mutations,
};

export const actions = {
  ...BaseVuex.actions,
};
