/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const { resolve } = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const ResourceHintWebpackPlugin = require("resource-hints-webpack-plugin");
/**
 * Webpack Production
 *
 * @type {import('webpack').Configuration}
 */

const webpackProductionConfig = {
	mode: "production",
	target: "web",
	entry: {
		"mv.main": resolve("./src/.build.ts"),
		cpr: resolve("./src/bootstrap/cpr.js"),
	},
	resolve: {
		alias: {
			mv: resolve("./src/mv"),
		},
		extensions: [".ts", ".js", ".css"],
		plugins: [
			new TsconfigPathsPlugin({
				baseUrl: resolve("./src"),
				configFile: resolve("./src/tsconfig.json"),
			}),
		],
	},

	plugins: [
		new htmlWebpackPlugin({
			title: "Miver",
			favicon: "./resources/favicon.ico",
			template: resolve("./src/mv/app/template/mv.template.html"),
			publicPath: "/",
			inject: "body",
			minify: false,
		}),
        new ResourceHintWebpackPlugin(),
        
        /**
         * Uncomment in the final build
         */

		// new FaviconsWebpackPlugin("./resources/miver_70x70.png"),
		new MiniCssExtractPlugin({
			filename: "./style/[name].bundle.css",
			chunkFilename: "cl",
		}),
		new HtmlWebpackTagsPlugin({
            tags: [
				{
					path: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined",
					attributes: { rel: "stylesheet" },
                    type : "css"
				},

				{
					path: "https://fonts.googleapis.com",
					attributes: { rel: "preconnect" },
                    type : "css"
				},
				{
					path: "https://fonts.gstatic.com",
					attributes: { rel: "preconnect", crossorigin: "" },
                    type : "css"
				},
				{
					path: "https://fonts.googleapis.com/css2?family=Montserrat&display=swap",
					attributes: { rel: "stylesheet" },
                    type : "css"
				},
			],

			append: true,
		}),
	],

	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: "ts-loader",
			},
			{
				test: /\.css/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				exclude: /\.(png|ttf|svg|woff|woff2)/,
			},
		],
	},

	output: {
		filename: "./compressed/[name].bundle.js",
		path: resolve("./public"),
		publicPath: "/",
		iife: true,
		assetModuleFilename: "./style/resources/[name][ext]",
		asyncChunks: true,
		chunkLoadingGlobal: "mv",
	},
	optimization: {
		minimizer: [new CssMinimizerPlugin()],
	},
};

module.exports = webpackProductionConfig;
