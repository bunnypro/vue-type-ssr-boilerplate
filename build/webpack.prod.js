const path = require('path');
const glob = require('glob-all');
const merge = require('webpack-merge');
const Webpackbar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurgeCssPlugin = require('purgecss-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const baseClientConfig = require('./webpack.client');
const baseServerConfig = require('./webpack.server');
const config = require('../config/prod');

class TailwindExtractor {
    static extract(content) {
        return content.match(/[A-z0-9-:\/]+/g) || [];
    }
}

const productionCofig = {
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style/[name].css'
        })
    ]
};

const clientConfig = merge(baseClientConfig, productionCofig, {
    mode: 'production',
    output: {
        path: config.clientOutputPath,
        filename: 'script/[name].[hash].js',
        publicPath: config.publicPath
    },
    plugins: [
        new PurgeCssPlugin({
            paths: glob.sync([
                path.join(__dirname, "../src/**/*.ts"),
                path.join(__dirname, "../src/**/*.vue")
            ]),
            extractors: [
                {
                    extractor: TailwindExtractor,
                    extensions: ["ts", "vue"]
                }
            ],
            whitelist: ['html', 'body']
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: { safe: true, map: { inline: false } }
        }),
        new VueSSRClientPlugin(),
        new Webpackbar({
            name: 'Client',
            color: 'green'
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    test: /node_modules/,
                    enforce: true
                }
            },
            minChunks: Infinity
        },
        runtimeChunk: {
            name: 'manifest'
        }
    }
});

const serverConfig = merge(baseServerConfig, productionCofig, {
    plugins: [
        new Webpackbar({
            name: 'Server',
            color: 'orange'
        })
    ]
});

module.exports = [
    clientConfig,
    serverConfig
];