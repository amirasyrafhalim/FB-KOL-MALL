import BaseApi from "./baseApi";

export default class merchantPage extends BaseApi {
  constructor(axios, helper) {
    super(axios, helper, "merchantPages");
  }

  getAll(searchQuery) {
    return super.getAll(searchQuery);
  }

  getOne(id) {
    return super.getOne(id);
  }

  create(payload) {
    return super.create(payload);
  }

  update(payload, id) {
    return super.update(payload, id);
  }

  delete(id) {
    return super.delete(id);
  }
}
