import BaseApi from "./baseApi";
import { apiRoutes } from "@/config";
import QueryString from "qs";

export default class CampaignPackageApi extends BaseApi {


  constructor(axios, helper) {
    super(axios, helper, "campaignPackages");
  }

  getAll(searchQuery) {
    return super.getAll(searchQuery);
  }

  getOne(id, campaignId) {
    return super.getOne(id, campaignId);
  }

  create(payload, campaignId) {
    return this.axios.$post(
      this.helper.prepareUrl(apiRoutes[this.module].getAllOrCreate, {
        campaignId: campaignId,
      }),
      payload
    );
  }

  update(payload, id, campaignId) {
    return this.axios.$patch(
      this.helper.prepareUrl(apiRoutes[this.module].getOneOrUpdateOrDelete, {
        campaignId: campaignId,
        id: id
      }),
      payload
    );
  }

  delete(id, campaignId) {
    return this.axios.$delete(
      this.helper.prepareUrl(apiRoutes[this.module].getOneOrUpdateOrDelete, {
        campaignId: campaignId,
        id: id
      })
    );
  }
}
