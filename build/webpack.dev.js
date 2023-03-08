/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

//webpack-config-development configuration

const { resolve, parse } = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {TsconfigPathsPlugin}  = require('tsconfig-paths-webpack-plugin')

/**
 * Webpack Dev
 *
 * @type {import('webpack').Configuration}
 */

const mainConfiguration = {

    mode: "development",
    target: "web",
    entry: {
        "build.dev": resolve("./src/.build.ts"),
    },
    devtool: "inline-source-map",
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
        ]
    },

    plugins: [
        new htmlWebpackPlugin({
            title: 'Miver',
            cache: true,
            favicon: resolve("./resources/miver.ico"),
            template: resolve("./src/mv/app/template/mv.template.html")
        }),
        
       
    ],

    module: {
        rules : [

            {
                test: /\.ts$/,
                loader : 'ts-loader'
            },
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader'],
                
            },
            {
                test: /\.(png|ttf|svg)/,
                type:'asset'
            }
        ]
    },

    devServer: {
        static: resolve("./static"),
        historyApiFallback: true,
        open: true,       
        liveReload:true
    },

    output: {
        filename: "[name].bundle.js",
        path: resolve("./static"),
        clean: true,
        publicPath : "/",
    },

    optimization: {
        runtimeChunk : "single"
    }



}

module.exports = mainConfiguration;

