import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import path from 'path';

export default {
	mode: 'development',
	resolve: {
		modules: ['node_modules', 'src'],
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
	},
	devtool: 'source-map',
	entry: [
		'babel-polyfill',
		'whatwg-fetch',
		'./src/webpack-public-path',
		'webpack-hot-middleware/client?reload=true',
		path.resolve(__dirname, 'src/index.js')
	],
	target: 'web',
	output: {
		publicPath: ''
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
				INCORE_REMOTE_HOSTNAME: JSON.stringify(process.env.INCORE_REMOTE_HOSTNAME),
			},
			'__DEV__': true
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			template: 'src/index.ejs',
			minify: {
				removeComments: true,
				collapseWhitespace: true
			},
			inject: true,
			favicon: './src/public/favicon.ico'
		}),
		new webpack.LoaderOptionsPlugin({
			debug: true,
			options: {
				sassLoader: {
					includePaths: [path.resolve(__dirname, 'src', 'scss')]
				},
				context: '/',
				postcss: [autoprefixer()]
			}
		})
	],
	module: {
		rules: [
			{
				// Use babel-loader for ts, tsx, js, and jsx files
				test: /\.[tj]sx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.eot(\?v=\d+.\d+.\d+)?$/,
				type: 'asset/inline'
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				type: 'asset/inline'
			},
			{
				test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
				type: 'asset/inline'
			},
			{ test: /\.ico$/, type: 'asset/resource' },
			{
				test: /\.svg(\?v=\d+.\d+.\d+)?$/,
				type: 'asset/inline'
			},
			{
				test: /\.(jpe?g|png|gif)$/i,
				type: 'asset/resource'
			},
			{
				test: /(\.css|\.scss)$/i,
				use: [
					'style-loader',
					'css-loader',
					{ loader: 'postcss-loader', options: { postcssOptions: { plugins: ['autoprefixer'] } } },
					{ loader: 'sass-loader', options: { sourceMap: true } }
				]
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			}
		]
	}
};
