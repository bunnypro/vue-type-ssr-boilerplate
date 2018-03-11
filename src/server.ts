import createApp from './index';

export default context => {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp();

        router.push(context.url);

        router.onReady(async () => {
            const components = router.getMatchedComponents();

            if (!components.length) {
                return reject({ code: 404 });
            }

            try {
                await Promise.all(components.map(component => {
                    if (component['asyncData']) {
                        return component['asyncData']({
                            store,
                            route: router.currentRoute
                        });
                    }
                }));

                context.state = store.state;

                resolve(app);
            } catch (err) {
                reject(err);
            }
        }, reject);
    });
}