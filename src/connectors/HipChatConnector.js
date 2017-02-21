import BaseConnector from './BaseConnector';
import cli from 'cli';

import Hipchatter from 'hipchatter';

export default class HipChatConnector extends BaseConnector {
    async connect() {
        this._client = new Hipchatter(this.config.token);
        console.log(this.config.token);
    }

    async disconnect() {
        this._client = null;
    }

    async send(options) {
        const hcOptions = {
            message: options.message || '<div>Success</div>',
            color: options.color || 'yellow',
            token: options.room_token,
            notify: true
        };

        console.log(hcOptions);

        await new Promise((resolve, reject) => {
            this._client.notify(options.room, hcOptions, (err) => {
                console.log('::notify');
                if (err) {
                    cli.error(err.message);
                }
                else {
                    cli.debug(`Sent message via HipChat to ${options.room} room`);
                }

                cli.info('hipchat', err);

                resolve();
            });
        });
    }
}
