export default {
	extend(config, ctx) {
		config.node = {
			fs: 'empty'
		};
	},
	transpile: [ 'vue-echarts', 'resize-detector' ]
};
