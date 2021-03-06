const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // extracts CSS into separate files. It creates a CSS file per JS file which contains CSS
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssets = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
        {
            test: /\.(sa|sc|c)ss$/,
            use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader"]
        },
        {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
              'file-loader',
              {
                loader: 'image-webpack-loader',
                options: {
                  bypassOnDebug: true, // webpack@1.x
                  disable: true, // webpack@2.x and newer
                }
              }
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin("styles.css"),
        new OptimizeCSSAssets()
    ],
    optimization: {
        minimizer: [new UglifyJsPlugin()]
    }
})