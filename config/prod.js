const path = require('path');
const { merge } = require('lodash');

const config = {
    clientOutputPath: path.resolve(__dirname, '../dist/client'),
    serverOutputPath: path.resolve(__dirname, '../dist/server'),
    host: 'localhost',
    port: '8089',
    assetPath: 'asset'
};

module.exports = merge(config, {
    publicPath: `/${config.assetPath}/`
});