const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
	output: {
		publicPath: '/',
	},

	devServer: {
		port: 3000,
		historyApiFallback: true,
	},

	module: {
		rules: [
			{
				test: /\.m?js/,
				type: 'javascript/auto',
				resolve: {
					fullySpecified: false,
				},
			},
			{
				test: /\.(css|s[ac]ss)$/i,
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},
			{
				test: /\.(ts|tsx|js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.(js|jsx)$/,
				resolve: {
					extensions: ['.js', '.jsx'],
				},
			},
			{
				test: /\.(png|svg|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
		],
	},

	plugins: [
		new HtmlWebPackPlugin({
			template: './src/index.html',
		}),
	],
};
