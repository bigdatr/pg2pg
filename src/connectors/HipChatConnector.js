import BaseConnector from './BaseConnector';
import cli from 'cli';

import Hipchatter from 'hipchatter';

export default class HipChatConnector extends BaseConnector {
    async connect() {
        this._client = new Hipchatter(this.config.token);
    }

    async disconnect() {
        this._client = null;
    }
}
