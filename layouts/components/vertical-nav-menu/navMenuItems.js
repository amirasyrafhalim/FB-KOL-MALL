/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

export default [
	{
		url: '/',
		name: 'Dashboard',
		slug: 'dashboard',
		icon: 'HomeIcon'
	},
	{
		url: '/facebookPage',
		name: 'Page',
		slug: 'facebook-page',
		icon: 'LayoutIcon'
	},
	{
		url: '/products',
		name: 'Products',
		slug: 'products',
		icon: 'BookOpenIcon'
	},
	{
		url: '/campaigns',
		name: 'Campaigns',
		slug: 'campaigns',
		icon: 'PackageIcon'
	},
	{
		url: '/orders',
		name: 'Orders',
		slug: 'orders',
		icon: 'ShoppingCartIcon'
	},
	{
		url: '/#',
		name: 'Videos',
		slug: 'videos',
		icon: 'VideoIcon'
	},
	{
		header: 'Misc',
		icon: 'FileIcon',
		i18n: 'Pages',
		items: [
			{
				url: '/#',
				slug: 'settings',
				name: 'Setting',
				icon: 'SettingsIcon'
			}
		]
	}
];
