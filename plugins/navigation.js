export default ({ route, app }, inject) => {
	const navigation = {
		index: {
			title: 'Dashboard'
		},
		merchantPage: {
			title: 'Pages',
			breadcrumb: [ { title: 'Page', url: '/merchantPage' }, { title: 'List', active: true } ]
		}
	};

	inject('navigation', navigation);
};
