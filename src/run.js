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

        await runCommandsForEachQueryParamsObject(config, connections, notifications);
        await notifications.send('success');

        await disconnectAll(connections);
    } catch (err) {
        // await notifications.send('fail');
        cli.fatal(err.stack || err);
        process.exit(1);
    }
}

async function runCommandsForEachQueryParamsObject(config, connections, notifications) {
    let queryParams = config.queryParams;

    if (!queryParams || queryParams.length === 0) {
        queryParams = [{}];
        cli.debug(`Found no queryParams`);
    }
    else {
        cli.debug(`Found ${queryParams.length} queryParams to execute`);
    }

    // Init status bar
    status.start({pattern: '.'});

    for (var i = 0; i < queryParams.length; i++) {
        await runCommands(config.commands, connections, queryParams[i], notifications);
    }

    status.clear();
    status.removeAll();
    status.stop();
}

async function runCommands(commands, connections, queryParams, notifications) {
    for (var i = 0; i < commands.length; i++) {
        const c = commands[i];

        if (!COMMANDS[c.type]) {
            cli.fatal(`Command type \`${c.type}\` is not supported`);
        }

        const fn = COMMANDS[c.type].default;

        // Run command
        cli.debug(`Running Command ${i + 1}`);
        await fn(c, connections, queryParams);

        // Run success notification
        notifications.send('successCommand' + (i + 1), {command: c});
        notifications.send('successAfterEachCommand', {command: c});
    }
}

async function successNotification() {

}
