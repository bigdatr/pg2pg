export default class Notifications {
    constructor(config, connections) {
        this._config = config;
        this._connections = connections;
        this.notifications = this._config.notifications || {};
    }

    async send(stage, context) {
        const n = this.notifications[stage];
        if (!n) { return null; }

        const service = this.getService(n.service);
        if (!service) { return null; }

        try {
            const nextNotification = Object.assign({}, n, {
                message: this.tokenizeMessage(n.message, context)
            });

            await service.send(nextNotification);
        } catch (err) {
            console.log(err.stack);
        }
    }

    getService(name) {
        return this._connections[name].connection || null;
    }

    tokenizeMessage(str, context) {
        if (!context) { return str; }

        let nextStr = str;

        Object.keys(context).forEach((k) => {
                Object.keys(context[k]).forEach((prop) => {
                    if (prop.startsWith('_')) { return; }
                    if (typeof context[k][prop] === 'object') { return; }

                    const commandKey = '${' + `${k}.${prop}` + '}';
                    nextStr = nextStr.replace(commandKey, context[k][prop]);
                });
        });

        return nextStr;
    }
}
