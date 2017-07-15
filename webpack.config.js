var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		dashboard: './src/js/dashboard'
	},
	output: {
		filename: './dist/js/dashboard.js'
	},
	module: {
		loaders: [
			{
			test: /\.json$/,
			loader: 'json'
		}
		]
	}
		
};

