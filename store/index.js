require('dotenv').config();

// export const state = () => ({
// 	token: null,
// 	appName: process.env.APP_NAME,
// 	drawer: true,
// 	overlay: false,
// 	snackbar: {
// 		show: false,
// 		text: null,
// 		timeout: 3000,
// 		color: null
// 	}
// });

export const getters = {
	currentUser(state) {
		return state.auth.user;
	},
	roles(state) {
		return state.auth.loggedIn ? state.auth.user.roles : [];
	},
	isAdmin(state, getters) {
		return getters.roles.includes('admin');
	},
	isVerifiedMerchant(state, getters) {
		return getters.roles.includes('merchant') && state.auth.user.verify_status == 1;
	},
	// COMPONENT
	// vx-autosuggest
	// starredPages: state => state.navbarSearchAndPinList.data.filter((page) => page.highlightAction),
	windowBreakPoint: (state) => {
		// This should be same as tailwind. So, it stays in sync with tailwind utility classes
		if (state.windowWidth >= 1200) return 'xl';
		else if (state.windowWidth >= 992) return 'lg';
		else if (state.windowWidth >= 768) return 'md';
		else if (state.windowWidth >= 576) return 'sm';
		else return 'xs';
	},

	scrollbarTag: (state) => {
		return state.is_touch_device ? 'div' : 'VuePerfectScrollbar';
	}
};

export const mutations = {
	toggleDrawer(state) {
		state.drawer = !state.drawer;
	},
	updateDrawer(state, value) {
		state.drawer = value;
	},
	setOverlay(state, value) {
		state.overlay = value;
	},
	closeSnackbar(state) {
		state.snackbar.show = false;
		state.snackbar.timeout = 3000;
		state.snackbar.text = state.snackbar.color = null;
	},
	setSnackbar(state, data) {
		state.snackbar.show = true;
		state.snackbar.timeout = data.timeout || 3000;
		state.snackbar.text = data.text;
		state.snackbar.color = data.color;
	},
	setToken(state, data) {
		state.token = data;
	},
	// /////////////////////////////////////////////
	// COMPONENTS
	// /////////////////////////////////////////////

	// Vertical NavMenu

	TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE(state, value) {
		state.isVerticalNavMenuActive = value;
	},
	TOGGLE_REDUCE_BUTTON(state, val) {
		state.reduceButton = val;
	},
	UPDATE_MAIN_LAYOUT_TYPE(state, val) {
		state.mainLayoutType = val;
	},
	UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN(state, val) {
		state.verticalNavMenuItemsMin = val;
	},
	UPDATE_VERTICAL_NAV_MENU_WIDTH(state, width) {
		state.verticalNavMenuWidth = width;
	},

	// VxAutoSuggest

	UPDATE_STARRED_PAGE(state, payload) {
		// find item index in search list state
		const index = state.navbarSearchAndPinList['pages'].data.findIndex((item) => item.url == payload.url);

		// update the main list
		state.navbarSearchAndPinList['pages'].data[index].is_bookmarked = payload.val;

		// if val is true add it to starred else remove
		if (payload.val) {
			state.starredPages.push(state.navbarSearchAndPinList['pages'].data[index]);
		} else {
			// find item index from starred pages
			const index = state.starredPages.findIndex((item) => item.url == payload.url);

			// remove item using index
			state.starredPages.splice(index, 1);
		}
	},

	// Navbar-Vertical

	ARRANGE_STARRED_PAGES_LIMITED(state, list) {
		const starredPagesMore = state.starredPages.slice(10);
		state.starredPages = list.concat(starredPagesMore);
	},
	ARRANGE_STARRED_PAGES_MORE(state, list) {
		let downToUp = false;
		let lastItemInStarredLimited = state.starredPages[10];
		const starredPagesLimited = state.starredPages.slice(0, 10);
		state.starredPages = starredPagesLimited.concat(list);

		state.starredPages.slice(0, 10).map((i) => {
			if (list.indexOf(i) > -1) downToUp = true;
		});

		if (!downToUp) {
			state.starredPages.splice(10, 0, lastItemInStarredLimited);
		}
	},

	// ////////////////////////////////////////////
	// UI
	// ////////////////////////////////////////////

	TOGGLE_CONTENT_OVERLAY(state, val) {
		state.bodyOverlay = val;
	},
	UPDATE_PRIMARY_COLOR(state, val) {
		state.themePrimaryColor = val;
	},
	UPDATE_THEME(state, val) {
		state.theme = val;
	},
	UPDATE_WINDOW_WIDTH(state, width) {
		state.windowWidth = width;
	},
	UPDATE_WINDOW_SCROLL_Y(state, val) {
		state.scrollY = val;
	},

	// /////////////////////////////////////////////
	// User/Account
	// /////////////////////////////////////////////

	// Updates user info in state and localstorage
	UPDATE_USER_INFO(state, payload) {
		// Get Data localStorage
		let userInfo = JSON.parse(localStorage.getItem('userInfo')) || state.AppActiveUser;

		for (const property of Object.keys(payload)) {
			if (payload[property] != null) {
				// If some of user property is null - user default property defined in state.AppActiveUser
				state.AppActiveUser[property] = payload[property];

				// Update key in localStorage
				userInfo[property] = payload[property];
			}
		}
		// Store data in localStorage
		localStorage.setItem('userInfo', JSON.stringify(userInfo));
	}
};

export const actions = {
	showSnackbar({ commit }, params) {
		commit('setSnackbar', params);

		setTimeout(() => {
			commit('closeSnackbar');
		}, params.timeout || 3000);
	},
	closeSnackbar({ commit }) {
		commit('closeSnackbar');
	},
	// /////////////////////////////////////////////
	// COMPONENTS
	// /////////////////////////////////////////////

	// Vertical NavMenu
	updateVerticalNavMenuWidth({ commit }, width) {
		commit('UPDATE_VERTICAL_NAV_MENU_WIDTH', width);
	},

	// VxAutoSuggest
	updateStarredPage({ commit }, payload) {
		commit('UPDATE_STARRED_PAGE', payload);
	},

	// The Navbar
	arrangeStarredPagesLimited({ commit }, list) {
		commit('ARRANGE_STARRED_PAGES_LIMITED', list);
	},
	arrangeStarredPagesMore({ commit }, list) {
		commit('ARRANGE_STARRED_PAGES_MORE', list);
	},

	// /////////////////////////////////////////////
	// UI
	// /////////////////////////////////////////////

	toggleContentOverlay({ commit }) {
		commit('TOGGLE_CONTENT_OVERLAY');
	},
	updateTheme({ commit }, val) {
		commit('UPDATE_THEME', val);
	},

	// /////////////////////////////////////////////
	// User/Account
	// /////////////////////////////////////////////

	updateUserInfo({ commit }, payload) {
		commit('UPDATE_USER_INFO', payload);
	}
};
