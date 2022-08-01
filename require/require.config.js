requirejs.config({
	baseUrl: '.',
	waitSeconds: 30,
	// deps: ["migrate"],
	paths: {
		'jquery': 'jq/jquery-3.6.0.min',
		'migrate': 'jq/jquery-migrate'
	},
	shim: {
		// 'jquery': {
		// 	deps: ['migrate']
		// }
	}
});
