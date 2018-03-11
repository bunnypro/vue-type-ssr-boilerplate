const dev = require('./dev');
const prod = require('./prod');

module.exports = {
    env: process.env.NODE_ENV || 'development',
    title: 'A Vue Typescript SSR Boilerplate',

    dev,
    prod
};