const url = require('url');
const express = require('express');
const config = require('./config');
const { createBundleRenderer } = require('vue-server-renderer');

const renderer = createBundleRenderer(require('./dist/server/vue-ssr-server-bundle.json'), {
    runInNewContext: false,
    template: require('fs').readFileSync('./dist/client/index.html', 'utf-8'),
    clientManifest: require('./dist/client/vue-ssr-client-manifest.json')
});

const server = express();

server.use(`/${config.prod.assetPath}`, express.static(config.prod.clientOutputPath));

server.get('*', (req, res) => {
    renderer.renderToString({ url: req.url }, (err, html) => {
        if (err) {
            if (err.code === 404) {
                res.status(404).end('Page not found')
            } else {
                res.status(500).end('Internal Server Error')
            }
        } else {
            res.end(html)
        }
    })
});

server.listen(config.prod.port, config.prod.host, function () {
    const listenHost = url.format({
        host: `${config.prod.host}:${config.prod.port}`,
        protocol: 'http:'
    });

    console.log(`Application is running on ${listenHost}`)
});
