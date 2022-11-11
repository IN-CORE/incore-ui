// For info about this file refer to webpack and webpack-hot-middleware documentation
// For info on how we"re generating bundles with hashed filenames for cache busting: https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95#.w99i89nsz
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import autoprefixer from "autoprefixer";
import path from "path";
import TerserPlugin from "terser-webpack-plugin";

export default {
	mode: "production",
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
	},
	devtool: "source-map", // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
	entry: ["babel-polyfill", "whatwg-fetch", path.resolve(__dirname, "src/index.js")],
	target: "web", // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
	output: {
		path: path.resolve(__dirname, "dist"),
		publicPath: "",
		filename: "[name].[chunkhash].js"
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production"),
				INCORE_REMOTE_HOSTNAME: JSON.stringify(process.env.INCORE_REMOTE_HOSTNAME)
			},
			"__DEV__": false
		}),

		// Generate an external css file with a hash in the filename
		new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),

		// Generate HTML file that contains references to generated bundles. See here for how this works: https://github.com/ampedandwired/html-webpack-plugin#basic-usage
		new HtmlWebpackPlugin({
			template: "src/index.ejs",
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
			inject: true,
			// Note that you can add custom options here if you need to handle other custom logic in index.html
			// To track JavaScript errors via TrackJS, sign up for a free trial at TrackJS.com and enter your token below.
			trackJSToken: "",
			favicon: "./src/public/favicon.ico"
		}),

		new webpack.LoaderOptionsPlugin({
			debug: true,
			options: {
				sassLoader: {
					includePaths: [path.resolve(__dirname, "src", "scss")]
				},
				context: "/",
				postcss: [autoprefixer()]
			}
		})
	],
	module: {
		rules: [
			{
				test: /\.[tj]sx?$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /\.eot(\?v=\d+.\d+.\d+)?$/,
				type: "asset/inline"
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				type: "asset/inline"
			},
			{
				test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
				type: "asset/inline"
			},
			{
				test: /\.svg(\?v=\d+.\d+.\d+)?$/,
				type: "asset/inline"
			},
			{
				test: /\.(jpe?g|png|gif)$/i,
				type: "asset/resource"
			},
			{ test: /\.ico$/, type: "asset/resource" },
			{
				test: /(\.css|\.scss)$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: ["autoprefixer"]
							}
						}
					},
					"sass-loader"
				]
			},
			{ test: /\.json$/, loader: "json-loader" }
		]
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					ecma: 8,
					compress: {
						warnings: false
					}
				}
			})
		]
	}
};
