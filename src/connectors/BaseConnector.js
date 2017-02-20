export default class BaseConnector {
    constructor(conf) {
        if (!conf) {
            throw new Error('Connector config is required');
        }

        this.config = conf;
    }

    async connect() {
        throw new Error(`${this.constructor.name}.connect() has not been implemented`);
    }
    async disconnect() {
        throw new Error(`${this.constructor.name}.disconnect() has not been implemented`);
    }
}
