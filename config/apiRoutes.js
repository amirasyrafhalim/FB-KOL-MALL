export default {
  auth: {
    register: "/v1/register",
    login: "/v1/oauth/token",
    logout: "/api/v1/auth/logout",
    user: "/api/v1/auth/user"
  },
  enums: {
    campaignStatus: "/api/v1/enums/campaignStatus",
    campaignPackageStatus: "/api/v1/enums/campaignPackageStatus",
    merchantStatus: "/api/v1/enums/merchantStatus",
    productStatus: "/api/v1/enums/productStatus",
    userStatus: "/api/v1/enums/userStatus",
    userVerifyStatus: "/api/v1/enums/userVerifyStatus",
    deliveryMethod: "/api/v1/enums/deliveryMethod",
    paymentStatus: "/api/v1/enums/paymentStatus",
    deliveryStatus: "/api/v1/enums/deliveryStatus",
    userRole: "/api/v1/enums/userRole"
  },
  campaigns: {
    getAllOrCreate: "/api/v1/campaigns",
    getOneOrUpdateOrDelete: "/api/v1/campaigns/{id}",
    getSummary: "/api/v1/campaigns/orderSummary",
    streamEnd: "/api/v1/campaigns/streamEnd/{id}",
    streamPause: "/api/v1/campaigns/streamPause/{id}",
    streamStart: "/api/v1/campaigns/streamStart/{id}",
    orderCount: "/api/v1/campaigns/orderCount/{id}",
    orderLog: "/api/v1/campaigns/orderLog/{id}",
    streamRefresh: "/api/v1/campaigns/streamRefresh/{id}"
  },
  campaignPackages: {
    getAllOrCreate: "/api/v1/campaigns/{campaignId}/campaignPackages",
    getOneOrUpdateOrDelete: "/api/v1/campaigns/{campaignId}/campaignPackages/{id}"
  },

  campaignShippings: {
    getAllOrCreate: "/api/v1/campaigns/{campaignId}/campaignShippings",
    getOneOrUpdateOrDelete: "/api/v1/campaigns/{campaignId}/campaignShippings/{id}"
  },
  merchants: {
    getAllOrCreate: "/api/v1/merchants",
    getDetail: "/api/v1/merchants/detail",
    getOneOrUpdateOrDelete: "/api/v1/merchants/{id}"
  },
  merchantPageTokens: {
    getAllOrCreate: "/api/v1/merchantPageTokens",
    getOneOrUpdateOrDelete: "/api/v1/merchantPageTokens/{id}",
    debugPageToken: "/api/v1/merchantPageTokens/{id}/debugMerchantPageToken"
  },
  products: {
    getAllOrCreate: "/api/v1/products",
    getOneOrUpdateOrDelete: "/api/v1/products/{id}"
  },
  merchantShippings: {
    getAllOrCreate: "/api/v1/merchantShippings",
    getOneOrUpdateOrDelete: "/api/v1/merchantShippings/{id}"
  },
  dropdown: {
    getAllCountry: "/api/v1/dropdown/country",
    getAllPostcode: "/api/v1/dropdown/postcode",
    getAllState: "/api/v1/dropdown/state"
  },
  buyers: {
    getAllOrCreate: "/api/v1/buyers",
    getOneOrUpdateOrDelete: "/api/v1/buyers/{id}"
  },
  orders: {
    getAllOrCreate: "/api/v1/orders",
    getOneOrUpdateOrDelete: "/api/v1/orders/{id}",
    updateDelivery: "/api/v1/orders/{id}/updateDelivery",
    updatePickup: "/api/v1/orders/{id}/updatePickup"
  },
  facebook: {
    video: "/api/v1/facebook/addVideo"
  },
  buyerOrders: {
    addBuyerOrder: "/api/v1/buyerOrder"
  },
  password: {
    resetPassword: "/api/v1/password/reset",
    newPassword: "/api/v1/password/update"
  },
  user: {
    getAllOrCreate: "/api/v1/users",
    getOneOrUpdateOrDelete: "/api/v1/users/{id}"
  },
  email: {
    verifiedEmail: "/api/v1/email/verify"
  },
};
