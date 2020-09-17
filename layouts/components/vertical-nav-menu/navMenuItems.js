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
		url: '/merchantPage',
		name: 'Page',
		slug: 'merchant-page',
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
		icon: 'CalendarIcon'
	},
	{
		url: '/orders',
		name: 'Orders',
		slug: 'orders',
		icon: 'ShoppingCartIcon'
	},
	{
		url: '/videos',
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
				url: '/settings',
				slug: 'settings',
				name: 'Settings',
				icon: 'SettingsIcon'
			}
		]
	}
];
