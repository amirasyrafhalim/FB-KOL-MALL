const broadcastServerUrl = process.env.BROADCAST_SERVER_URL;

export default [
	// '@nuxtjs/vuetify'
	'@nuxtjs/dotenv',
	[
		'@nuxtjs/laravel-echo',
		{
			broadcaster: 'socket.io',
			host: broadcastServerUrl
		}
	]
];
