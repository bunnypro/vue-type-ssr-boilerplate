const path = require('path');
const webpack = require('webpack');
const config = require('../config');

module.exports = {
    context: path.resolve(__dirname, '../'),
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@Component': path.resolve(__dirname, '../src/Components'),
            '@Page': path.resolve(__dirname, '../src/Pages')
        },
        extensions: ['.css', '.js', '.ts', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader'
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(config.env)
        })
    ]
};