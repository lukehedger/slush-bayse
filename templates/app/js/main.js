(function() {

	require.config({
		paths:{
			"jquery": "../vendor/jquery"
			// "custom": "custom"
		},
		shim:{
			app: ["jquery"]
			// custom: 
			// 	exports: "custom"
		}
	});

	require(["app"], function(App) {
		return new App();
	});

}).call(this);