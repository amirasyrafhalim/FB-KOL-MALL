import BaseApi from "./baseApi";
import { apiRoutes } from "@/config";

export default class CampaignApi extends BaseApi {
  constructor(axios, helper) {
    super(axios, helper, "campaigns");
  }

  getAll(searchQuery) {
    return super.getAll(searchQuery);
  }

  getOne(id) {
    return super.getOne(id);
  }
  getSummary(searchQuery) {
    let url = apiRoutes[this.module].getSummary;
    if (searchQuery) {
      url += "?" + searchQuery;
    }
    return this.axios.$get(url);
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

  streamStart(params) {
    return this.axios.$get(
      this.helper.prepareUrl(apiRoutes[this.module].streamStart, {
        id: params,
      })
    );
  }

  streamEnd(params) {
    return this.axios.$get(
      this.helper.prepareUrl(apiRoutes[this.module].streamEnd, {
        id: params,
      })
    );
  }

  streamPause(params) {
    return this.axios.$get(
      this.helper.prepareUrl(apiRoutes[this.module].streamPause, {
        id: params,
      })
    );
  }
  orderCount(params) {
    return this.axios.$get(
      this.helper.prepareUrl(apiRoutes[this.module].orderCount, {
        id: params,
      })
    );
  }
  orderLog(params) {
    return this.axios.$get(
      this.helper.prepareUrl(apiRoutes[this.module].orderLog, {
        id: params,
      })
    );
  }
  streamRefresh(params) {
    return this.axios.$get(
      this.helper.prepareUrl(apiRoutes[this.module].streamRefresh, {
        id: params,
      })
    );
  }
  updateLiveVideo(id, payload) {
    return this.axios.$patch(
      this.helper.prepareUrl(apiRoutes[this.module].updateLiveVideo, {
        id: id,
      }),
      payload
    );
  }


}
