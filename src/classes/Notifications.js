export default class Notifications {
    constructor(config, connections) {
        this._config = config;
        this._connections = connections;
        this.notifications = this._config.notifications || {};
    }

    async send(stage) {
        const n = this.notifications[stage];
        if (!n) { return null; }

        const service = this.getService(n.service);
        if (!service) { return null; }

        try {
            await service.send(n);
            console.log('asdkjhasjdhakjsdhkjasd');
        } catch (err) {
            console.log(err.stack);
        }
    }

    getService(name) {
        return this._connections[name].connection || null;
    }
}
