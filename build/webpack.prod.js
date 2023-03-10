/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const { resolve, parse } = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {TsconfigPathsPlugin}  = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


/**
 * Webpack Production
 *
 * @type {import('webpack').Configuration}
 */

const webpackProductionConfig = {

    mode: 'production',
    target: "web",
    entry: {
        "mv.main": resolve("./src/.build.ts"),
        "cpr" : resolve("./src/bootstrap/cpr.js")
    },
    resolve: {
        alias: {
            "mv": resolve("./src/mv")
        },
        extensions: [".ts", ".js", ".css"],
        plugins: [
            new TsconfigPathsPlugin({
                baseUrl : resolve("./src"),
                configFile : resolve("./src/tsconfig.json")
            })
        ],
    },

    plugins: [
        new htmlWebpackPlugin({
            title: 'Miver',
            favicon: "./resources/favicon.ico",
            template: resolve("./src/mv/app/template/mv.template.html"),
            inject: "body",
            minify: false,
        }),
        new MiniCssExtractPlugin({
            filename: "./style/[name].bundle.css",
            chunkFilename : "cl"
        })
    ],

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader : 'ts-loader'
            },
            {
                test: /\.css/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
                
                
            },
            {
                exclude:/\.(png|ttf|svg|woff|woff2)/, 
            }
        ]
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
        minimizer: [
            new CssMinimizerPlugin(),
          ],
        
    }
}

module.exports = webpackProductionConfig;