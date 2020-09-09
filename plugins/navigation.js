export default ({ route, app }, inject) => {
	// Inject $hello(msg) in Vue, context and store.

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
