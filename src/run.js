import cli from 'cli';
import status from 'node-status';
import colors from 'colors';

import config_validate from './config_validate';
import {connectAll, disconnectAll} from './config_connections';
import Notifications from './classes/Notifications';

// Commands
const COMMANDS = {
    copy: require('./commands/copy'),
    query: require('./commands/query')
};

export default async function run(config) {
    try {
        await config_validate(config);
        const connections = await connectAll(config);

        const notifications = new Notifications(config, connections);

        await runCommands(config.commands, connections, config, notifications);
        await notifications.send('success');

        await disconnectAll(connections);
    } catch (err) {
        // await notifications.send('fail');
        cli.fatal(err.stack || err);
        process.exit(1);
    }
}

async function runCommands(commands, connections, config, notifications) {
    // Init status bar
    status.start({pattern: '.'});

    for (var i = 0; i < commands.length; i++) {
        const c = commands[i];

        if (!COMMANDS[c.type]) {
            cli.fatal(`Command type \`${c.type}\` is not supported`);
        }

        const fn = COMMANDS[c.type].default;

        // Run command
        await fn(c, connections, config);

        // Run success notification
        notifications.send('successCommand' + (i + 1), {command: c});
        notifications.send('successAfterEachCommand', {command: c});
    }

    status.clear();
    status.removeAll();
    status.stop();
}

async function successNotification() {

}
