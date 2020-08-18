import BaseApi from "./baseApi";
import { apiRoutes } from "@/config";

export default class CampaignPackageApi extends BaseApi {


  constructor(axios, helper) {
    super(axios, helper, "campaignPackages");
  }

  getAll(searchQuery) {
    return this.axios.$get(
      this.helper.prepareUrl(apiRoutes[this.module].getAllOrCreate, {
        campaignId: searchQuery,
      })
    );
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
    return this.axios.$put(
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
