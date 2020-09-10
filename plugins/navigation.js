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
		},
		merchantPageIdLiveVideo: {
			title: 'Live Videos',
			breadcrumb: [
				{ title: 'Page', url: '/merchantPage' },
				{ title: 'Live Videos' },
				{ title: 'List', active: true }
			]
		},
		videosId: {
			title: 'Video Console',
			breadcrumb: [ { title: 'Videos', url: '/videos' }, { title: 'Console', active: true } ]
		}
	};

	inject('navigation', navigation);
};
