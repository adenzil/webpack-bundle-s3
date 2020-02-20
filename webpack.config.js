const path = require('path');
var S3Plugin = require('webpack-s3-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
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
			},
		],
	},
    plugins: [
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
		})
	]
};