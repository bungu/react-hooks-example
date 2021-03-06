const { resolve } = require('path');
const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
	mode: 'development',
	target: 'web',
	context: resolve(__dirname),
	entry: { client: resolve(__dirname, './src/index.js') },
	output: {
		filename: '[name].js',
		chunkFilename: '[name].chunk.dev.js',
		publicPath: '/',
		path: resolve(__dirname, './dist/public'),
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		modules: [
			resolve(__dirname, './src'),
			'node_modules',
		],
	},
	module: {
		rules: [
			{
				test: /\.(j|t)sx?$/,
				use: [
					{
						loader: 'awesome-typescript-loader',
						options: {
							useCahce: true,
							forceIsolatedModules: true,
							reportFiles: [ "src/**/*.{ts,tsx}" ],
						},
					},
				],
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
			},
			PRODUCTION: JSON.stringify(false),
		}),
		new CheckerPlugin(),
		new ManifestPlugin(),
	],
};
