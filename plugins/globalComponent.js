/*=========================================================================================
  File Name: globalComponents.js
  Description: Here you can register components globally
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import Vue from 'vue';
import VxTooltip from '@/layouts/components/vx-tooltip/VxTooltip.vue';
import VxCard from '@/components/vx-card/VxCard.vue';
import VxList from '@/components/vx-list/VxList.vue';
import VxBreadcrumb from '@/layouts/components/VxBreadcrumb.vue';
import FeatherIcon from '@/components/FeatherIcon.vue';
import VxInputGroup from '@/components/vx-input-group/VxInputGroup.vue';

Vue.component(VxTooltip.name, VxTooltip);
Vue.component(VxCard.name, VxCard);
Vue.component(VxList.name, VxList);
Vue.component(VxBreadcrumb.name, VxBreadcrumb);
Vue.component(FeatherIcon.name, FeatherIcon);
Vue.component(VxInputGroup.name, VxInputGroup);

// v-select component
import vSelect from 'vue-select';

// Set the components prop default to return our fresh components
vSelect.props.components.default = () => ({
	Deselect: {
		render: (createElement) =>
			createElement('feather-icon', {
				props: {
					icon: 'XIcon',
					svgClasses: 'w-4 h-4 mt-1'
				}
			})
	},
	OpenIndicator: {
		render: (createElement) =>
			createElement('feather-icon', {
				props: {
					icon: 'ChevronDownIcon',
					svgClasses: 'w-5 h-5'
				}
			})
	}
});

Vue.component(vSelect);

window.intercomSettings = {
	app_id: 'pyvi2s7n',
	name: 'V12', // Full name
	email: 'eric@v12.sg', // Email address
	created_at: '2020-09-10' // Signup date as a Unix timestamp
};

// We pre-filled your app ID in the widget URL: 'https://widget.intercom.io/widget/pyvi2s7n'
(function() {
	var w = window;
	var ic = w.Intercom;
	if (typeof ic === 'function') {
		ic('reattach_activator');
		ic('update', w.intercomSettings);
	} else {
		var d = document;
		var i = function() {
			i.c(arguments);
		};
		i.q = [];
		i.c = function(args) {
			i.q.push(args);
		};
		w.Intercom = i;
		var l = function() {
			var s = d.createElement('script');
			s.type = 'text/javascript';
			s.async = true;
			s.src = 'https://widget.intercom.io/widget/pyvi2s7n';
			var x = d.getElementsByTagName('script')[0];
			x.parentNode.insertBefore(s, x);
		};
		if (w.attachEvent) {
			w.attachEvent('onload', l);
		} else {
			w.addEventListener('load', l, false);
		}
	}
})();
