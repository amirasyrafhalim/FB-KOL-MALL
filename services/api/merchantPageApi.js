import BaseApi from "./baseApi";
import { apiRoutes } from "@/config";

export default class merchantPage extends BaseApi {
  constructor(axios, helper) {
    super(axios, helper, "merchantPages");
  }

  getAll(searchQuery) {
    return super.getAll(searchQuery);
  }

  liveVideos(searchQuery){
    return this.axios.$get(
      this.helper.prepareUrl(apiRoutes[this.module].liveVideos, {
        id: searchQuery,
      })
    );
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
