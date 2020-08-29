import { apiRoutes } from "@/config";

export default class BaseApi {
  constructor(axios, helper, module) {
    this.axios = axios;
    this.helper = helper;
    this.module = module;
  }
  getEnums(methodName) {
    return this.axios.$get(apiRoutes[this.module][methodName]);
  }
  getDropdown(methodName, searchQuery) {
    let url = apiRoutes[this.module][methodName];

    if (searchQuery) {
      url += "?" + searchQuery;
    }
    return this.axios.$get(url);
  }

  getAll(searchQuery) {
    let url = apiRoutes[this.module].getAllOrCreate;

    if (searchQuery) {
      url += "?" + searchQuery;
    }

    return this.axios.$get(url);
  }

  getOne(id) {
    return this.axios.$get(
      this.helper.prepareUrl(apiRoutes[this.module].getOneOrUpdateOrDelete, {
        id: id,
      })
    );
  }

  create(payload) {
    return this.axios.$post(apiRoutes[this.module].getAllOrCreate, payload);
  }

  update(payload, id) {
    return this.axios.$patch(
      this.helper.prepareUrl(apiRoutes[this.module].getOneOrUpdateOrDelete, {
        id: id,
      }),
      payload
    );
  }

  delete(id) {
    return this.axios.$delete(
      this.helper.prepareUrl(apiRoutes[this.module].getOneOrUpdateOrDelete, {
        id: id,
      })
    );
  }
}
