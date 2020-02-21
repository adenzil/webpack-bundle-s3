const path = require('path');
var S3Plugin = require('webpack-s3-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'main.[contenthash].js',
		publicPath: 'https://webpack-bundle.s3.ap-south-1.amazonaws.com/',
	},
	devServer: {
		contentBase: './dist',
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
			}
		],
	},
    plugins: [
    	new CleanWebpackPlugin(),
		new S3Plugin({
		// Only upload css and js
			include: /.*\.(css|js)/,
			// s3Options are required
			s3Options: {
				accessKeyId: process.env.AWS_ACCESS_KEY_ID,
				secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
			},
			s3UploadOptions: {
				Bucket: 'webpack-bundle'
			}
		}),
		new HtmlWebpackPlugin()
	]
};