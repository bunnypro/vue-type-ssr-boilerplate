const url = require('url');
const { merge } = require('lodash');

const config = {
    host: 'localhost',
    port: '8089',
    protocol: 'http:'
};

module.exports = merge(config, {
    publicPath: url.format({
        host: `${config.host}:${config.port}/`,
        protocol: config.protocol
    })
});