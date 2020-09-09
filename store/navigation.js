import camelCase from 'lodash/camelCase';

export default {
	state: {
		pageTitle: null,
		breadcrumb: null
	},
	mutations: {
		setPageTitle(state, pageTitle) {
			state.pageTitle = pageTitle;
		},
		setBreadcrumb(state, breadcrumb) {
			state.breadcrumb = breadcrumb;
		}
	},
	actions: {
		getNavigation({ commit, dispatch, state }, route) {
			let routeName = route.name.split('___', 1)[0];

			if (routeName) {
				routeName = camelCase(routeName);
			}

			if (routeName && this.$navigation[routeName]) {
				if (this.$navigation[routeName].title) {
					commit('setPageTitle', this.$navigation[routeName].title);
				} else {
					commit('setPageTitle', null);
				}

				if (this.$navigation[routeName].breadcrumb) {
					commit('setBreadcrumb', this.$navigation[routeName].breadcrumb);
				} else {
					commit('setBreadcrumb', null);
				}
			} else {
				dispatch('clear');
			}
		},
		clear({ commit }) {
			commit('setPageTitle', null);
		}
	}
};
