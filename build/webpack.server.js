const merge = require('webpack-merge');
const NodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const baseConfig = require('./webpack.base');
const config = require('../config/prod');

module.exports = merge(baseConfig, {
    mode: 'production',
    entry: './src/server.ts',
    target: 'node',
    output: {
        path: config.serverOutputPath,
        libraryTarget: 'commonjs2'
    },
    externals: NodeExternals(),
    plugins: [
        new VueSSRServerPlugin()
    ]
});