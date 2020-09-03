export default {
  auth: {
    register: "/v1/register",
    login: "/v1/oauth/token",
    loginFB: "/v1/auth/fb-login",
    logout: "/v1/auth/logout",
    user: "/v1/me"
  },
  enums: {
    campaignStatus: "/v1/enums/campaignStatus",
    campaignPackageStatus: "/v1/enums/campaignPackageStatus",
    merchantStatus: "/v1/enums/merchantStatus",
    productStatus: "/v1/enums/productStatus",
    userStatus: "/v1/enums/userStatus",
    userVerifyStatus: "/v1/enums/userVerifyStatus",
    deliveryMethod: "/v1/enums/deliveryMethod",
    paymentStatus: "/v1/enums/paymentStatus",
    deliveryStatus: "/v1/enums/deliveryStatus",
    userRole: "/v1/enums/userRole"
  },
  campaigns: {
    getAllOrCreate: "/v1/campaigns",
    getOneOrUpdateOrDelete: "/v1/campaigns/{id}",
    updateLiveVideo: "/v1/campaigns/1/live-video",
    getSummary: "/v1/campaigns/orderSummary",
    streamEnd: "/v1/campaigns/streamEnd/{id}",
    streamPause: "/v1/campaigns/streamPause/{id}",
    streamStart: "/v1/campaigns/streamStart/{id}",
    // orderCount: "/v1/packages/{id}",
    orderCount: "/v1/campaigns/orderCount/{id}",
    orderLog: "/v1/campaigns/orderLog/{id}",
    streamRefresh: "/v1/campaigns/streamRefresh/{id}"
  },
  categories: {
    getAllOrCreate: "/v1/categories",
    getOneOrUpdateOrDelete: "/v1/campaigns/{id}",
  },
  campaignPackages: {
    getAllOrCreate: "/v1/packages",
    getOneOrUpdateOrDelete: "/v1/packages/{id}"
  },

  campaignShippings: {
    getAllOrCreate: "/v1/package-shipping",
    getOneOrUpdateOrDelete: "/v1/campaigns/{campaignId}/campaignShippings/{id}"
  },
  merchants: {
    getAllOrCreate: "/v1/merchants",
    // getDetail: "/v1/merchants",
    getOneOrUpdateOrDelete: "/v1/merchants/{id}"
  },
  merchantPages: {
    getAllOrCreate: "/v1/merchant-pages",
    getOneOrUpdateOrDelete: "/v1/merchant-pages/{id}",
    liveVideos: "/v1/merchant-pages/{id}/live-videos",
  },
  merchantPageTokens: {
    getAllOrCreate: "/v1/merchantPageTokens",
    getOneOrUpdateOrDelete: "/v1/merchantPageTokens/{id}",
    debugPageToken: "/v1/merchantPageTokens/{id}/debugMerchantPageToken"
  },
  products: {
    getAllOrCreate: "/v1/products",
    getOneOrUpdateOrDelete: "/v1/products/{id}"
  },
  merchantShippings: {
    getAllOrCreate: "/v1/merchantShippings",
    getOneOrUpdateOrDelete: "/v1/merchantShippings/{id}"
  },
  dropdown: {
    getAllCountry: "/v1/dropdown/country",
    getAllPostcode: "/v1/dropdown/postcode",
    getAllState: "/v1/dropdown/state"
  },
  buyers: {
    getAllOrCreate: "/v1/buyers",
    getOneOrUpdateOrDelete: "/v1/buyers/{id}"
  },
  orders: {
    getAllOrCreate: "/v1/orders",
    getOneOrUpdateOrDelete: "/v1/orders/{id}",
    updateDelivery: "/v1/orders/{id}/updateDelivery",
    updatePickup: "/v1/orders/{id}/updatePickup"
  },
  facebook: {
    video: "/v1/facebook/addVideo"
  },
  buyerOrders: {
    addBuyerOrder: "/v1/buyerOrder"
  },
  password: {
    resetPassword: "/v1/password/reset",
    newPassword: "/v1/password/update"
  },
  user: {
    getAllOrCreate: "/v1/users",
    getOneOrUpdateOrDelete: "/v1/users/{id}"
  },
  email: {
    verifiedEmail: "/v1/email/verify"
  },
};
