export default [
	'@nuxtjs/dotenv',
	'@nuxtjs/vuetify',
	[
		'@nuxtjs/laravel-echo',
		{
			broadcaster: 'socket.io',
			host: 'http://localhost:6001'
		}
	]
];
