const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: {
        home: './src/pages/home/home.js',
        login: './src/pages/login/login.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]/script.js'
    },
    // https://github.com/webpack-contrib/mini-css-extract-plugin#extracting-all-css-in-a-single-file
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './home/index.html',
            template: '!!ejs-webpack-loader!src/pages/home/home.ejs',
            chunks: ['home'],
            minify: {
                collapseWhitespace: true
            },
            hash: true,
        }),
        new HtmlWebpackPlugin({
            filename: './login/index.html',
            template: '!!ejs-webpack-loader!src/pages/login/login.ejs',
            chunks: ['login'],
            minify: {
                collapseWhitespace: true
            },
            hash: true,
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:8].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        })
    ]
};