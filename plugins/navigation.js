export default ({ route, app }, inject) => {
	const navigation = {
		index: {
			title: 'Dashboard'
		},
		merchantPage: {
			title: 'Pages',
			breadcrumb: [ { title: 'Page', url: '/merchantPage' }, { title: 'List', active: true } ]
		},
    products: {
      title: 'Products',
      breadcrumb: [ { title: 'Products', url: '/products' }, { title: 'List', active: true } ]
    },
    campaigns: {
      title: 'Campaigns',
      breadcrumb: [ { title: 'Campaigns', url: '/campaigns' }, { title: 'List', active: true } ]
    }
	};

	inject('navigation', navigation);
};
