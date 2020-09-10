import BuyerApi from '../services/api/buyerApi';
import BuyerOrderApi from '../services/api/buyerOrderApi';
import CampaignApi from '@/services/api/campaignApi';
import CampaignPackageApi from '@/services/api/campaignPackageApi';
import CampaignShippingApi from '@/services/api/campaignShippingApi';
import DropdownApi from '../services/api/dropdownApi';
import EnumApi from '@/services/api/enumApi';
import FacebookApi from '../services/api/facebookApi';
import MerchantApi from '../services/api/merchantApi';
import MerchantPageApi from '../services/api/merchantPageApi';
import MerchantPageTokenApi from '../services/api/merchantPageTokenApi';
import MerchantShippingApi from '../services/api/merchantShippingApi';
import OrderApi from '../services/api/orderApi';
import ProductApi from '../services/api/productApi';
import AuthApi from '@/services/api/authApi';
import UserApi from '@/services/api/userApi';
import PasswordApi from '@/services/api/passwordApi';
import EmailApi from '../services/api/emailApi';
import CategoryApi from '../services/api/categoryApi';
import VideoApi from '../services/api/videoApi';
import ShippingPartnerApi from '../services/api/ShippingPartnerApi';
import OrderDeliveriesApi from '../services/api/orderDeliveriesApi';


export default ({ $axios, app }, inject) => {
	const api = {
		campaigns: new CampaignApi($axios, app.$helper),
		campaignPackages: new CampaignPackageApi($axios, app.$helper),
		campaignShippings: new CampaignShippingApi($axios, app.$helper),
		enums: new EnumApi($axios, app.$helper),
		dropdown: new DropdownApi($axios, app.$helper),
		auth: new AuthApi($axios, app.$helper),
		user: new UserApi($axios, app.$helper),
		merchants: new MerchantApi($axios, app.$helper),
		merchantPages: new MerchantPageApi($axios, app.$helper),
		merchantPageTokens: new MerchantPageTokenApi($axios, app.$helper),
		merchantShippings: new MerchantShippingApi($axios, app.$helper),
		products: new ProductApi($axios, app.$helper),
		buyers: new BuyerApi($axios, app.$helper),
		orders: new OrderApi($axios, app.$helper),
		facebook: new FacebookApi($axios, app.$helper),
		buyerOrders: new BuyerOrderApi($axios, app.$helper),
		password: new PasswordApi($axios, app.$helper),
		email: new EmailApi($axios, app.$helper),
		categories: new CategoryApi($axios, app.$helper),
		videos: new VideoApi($axios, app.$helper),
		shippingPartners: new ShippingPartnerApi($axios, app.$helper),
		orderDeliveries: new OrderDeliveriesApi($axios, app.$helper)
	};

	inject('api', api);
};
