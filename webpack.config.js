var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        index: path.join(__dirname, './', 'app/assets/javascript/main.js')
    },
    output: {
        filename: 'assets/javascript/[name]-[hash].js',
        path: path.join(__dirname, './', 'build'),
        publicPath: '/'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', query: { presets: ['es2015', 'react'], compact: true } },
            { test: /\.sass$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
               NODE_ENV: '"production"'
            }
        }),
        new HtmlWebpackPlugin({
            template: 'app/index.html',
            filename: 'index.html',
            chunks: ['index']
        }),
        new ExtractTextPlugin('assets/stylesheet/[name]-[hash].min.css'),
        new webpack.ProvidePlugin({
            React: 'react'
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        })
    ],
    stats: {
        colors: true
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.sass'],
        modules: ['app', 'node_modules']
    }
};
