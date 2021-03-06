export default {
	auth: {
		register: '/v1/register',
		login: '/v1/oauth/token',
		loginFB: '/v1/auth/fb-login',
		logout: '/v1/auth/logout',
		user: '/v1/me'
	},
	campaigns: {
		getAllOrCreate: '/v1/campaigns',
		getOneOrUpdateOrDelete: '/v1/campaigns/{id}',
		updateLiveVideo: '/v1/campaigns/{id}/live-video',
		getSummary: '/v1/campaigns/orderSummary',
		streamEnd: '/v1/campaigns/streamEnd/{id}',
		streamPause: '/v1/campaigns/streamPause/{id}',
		streamStart: '/v1/campaigns/streamStart/{id}',
		orderCount: '/v1/campaigns/orderCount/{id}',
		orderLog: '/v1/campaigns/orderLog/{id}',
		streamRefresh: '/v1/campaigns/streamRefresh/{id}'
	},
	categories: {
		getAllOrCreate: '/v1/categories',
		getOneOrUpdateOrDelete: '/v1/campaigns/{id}'
	},
	campaignPackages: {
		getAllOrCreate: '/v1/packages',
		getOneOrUpdateOrDelete: '/v1/packages/{id}'
	},
	campaignShippings: {
		getAllOrCreate: '/v1/package-shipping',
		getOneOrUpdateOrDelete: '/v1/campaigns/{campaignId}/campaignShippings/{id}'
	},
	email: {
		verifiedEmail: '/v1/email/verify'
	},
	enums: {
		activeStatus: '/v1/enums/active-status',
		botResponseType: '/v1/enums/bot-response-type',
		campaignStatus: '/v1/enums/campaign-status',
		deliveryMethod: '/v1/enums/delivery-method',
		deliveryStatus: '/v1/enums/delivery-status',
		freeMinimumType: '/v1/enums/free-minimum-type',
		gender: '/v1/enums/gender',
		orderStatus: '/v1/enums/order-status',
		paymentStatus: '/v1/enums/payment-status',
		paymentMethod: '/v1/enums/payment-method',
		registerMethod: '/v1/enums/register-method',
		sellMethod: '/v1/enums/sell-method',
		socialProvider: '/v1/enums/social-provider',
		status: '/v1/enums/status',
		subscriptionPlan: '/v1/enums/subscription-plan',
		userStatus: '/v1/enums/user-status',
		videoStatus: '/v1/enums/video-status'
	},
	facebook: {
		video: '/v1/facebook/addVideo'
	},
	merchants: {
		getAllOrCreate: '/v1/merchants',
		getOneOrUpdateOrDelete: '/v1/merchants/{id}'
	},
	merchantDetails: {
		getOneOrUpdateOrDelete: '/v1/merchant-details/{id}'
	},
	banks: {
		getAllOrCreate: '/v1/banks'
	},
	merchantBanks: {
		getAllOrCreate: '/v1/merchant-banks',
		getDetail: '/v1/merchant-banks/{id}',
		getOneOrUpdateOrDelete: '/v1/merchant-banks/{id}'
	},
	merchantPages: {
		getAllOrCreate: '/v1/merchant-pages',
		getOneOrUpdateOrDelete: '/v1/merchant-pages/{id}',
		liveVideos: '/v1/merchant-pages/{id}/live-videos'
	},
	merchantPageTokens: {
		getAllOrCreate: '/v1/merchantPageTokens',
		getOneOrUpdateOrDelete: '/v1/merchantPageTokens/{id}',
		debugPageToken: '/v1/merchantPageTokens/{id}/debugMerchantPageToken'
	},
	products: {
		getAllOrCreate: '/v1/products',
		getOneOrUpdateOrDelete: '/v1/products/{id}'
	},
	merchantShippings: {
		getAllOrCreate: '/v1/merchantShippings',
		getOneOrUpdateOrDelete: '/v1/merchantShippings/{id}'
	},
	countries:{
		getAllOrCreate: '/v1/countries',
	},
	states:{
		getAllOrCreate: '/v1/states'
	},
	postcodes:{
		getAllOrCreate: '/v1/postcodes',
	},
	buyers: {
		getAllOrCreate: '/v1/buyers',
		getOneOrUpdateOrDelete: '/v1/buyers/{id}'
	},
	orders: {
		getAllOrCreate: '/v1/orders',
		updateOrderPayment: '/v1/order-payments/{id}',
		getOneOrUpdateOrDelete: '/v1/orders/{id}',
		updateDelivery: '/v1/order-deliveries/{id}',
		updatePickup: '/v1/orders/{id}/updatePickup'
	},
	orderDeliveries: {
		updateOrderDelivery: '/v1/order-deliveries/{id}'
	},
	buyerOrders: {
		addBuyerOrder: '/v1/buyerOrder'
	},
	packages: {
		getAllOrCreate: '/v1/packages',
		getOneOrUpdateOrDelete: '/v1/packages/{id}'
	},
	password: {
		resetPassword: '/v1/password/reset-request',
		newPassword: '/v1/password/reset',
		updatePassword: '/v1/update-passwords'
	},
	shippingMethods: {
		getAllOrCreate: '/v1/shipping-methods',
		getOneOrUpdateOrDelete: '/v1/shipping-methods/{id}'
	},
	shippingPartners: {
		getAllOrCreate: '/v1/shipping-partners',
		getOneOrUpdateOrDelete: '/v1/shipping-partners/{id}'
	},
	user: {
		getAllOrCreate: '/v1/users',
		getOneOrUpdateOrDelete: '/v1/users/{id}'
	},
	videos: {
		getAllOrCreate: '/v1/videos',
		getOneOrUpdateOrDelete: '/v1/videos/{id}'
	},
	dashboard: {
		getSalesSummary: '/v1/dashboard/sales-summary',
		getSalesChart: '/v1/dashboard/sales-chart',
		getOrderSummary: '/v1/dashboard/order-summary'
	},
	bots: {
		getAllOrCreate: '/v1/bot-responses',
		getOneOrUpdateOrDelete: '/v1/bot-responses/{id}'
	},
};