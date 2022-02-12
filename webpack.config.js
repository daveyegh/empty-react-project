const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    mode: "production",
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), new HtmlMinimizerPlugin()]
    },
    module: {
        rules: [
            // JS Loader
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            // Image Loader
            {
                test: /\.(svg|jpg|gif|ico|png|jpeg)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        outputPath: 'images',
                        name: '[name]-[sha1:hash:7].[ext]'
                    }
                }]
            },
            // Fonts Loader
            {
                test: /\.(ttf|otf|eot|woff|woff2)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts',
                        name: '[name].[ext]'
                    }
                }]
            },
            // CSS Loader
            {
                test: /\.(css)$/,
                use: [MiniCssExtractPlugin.loader, {loader: "css-loader", options: {sourceMap: true}}],
            },
            // SASS/SCSS Loader
            {
                test: /\.(scss|sass)$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'React App',
            template: "public/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: 'main-[hash:8].css'
        })
    ],
    devServer: {
        open: true,

    }
};