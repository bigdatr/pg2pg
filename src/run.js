import cli from 'cli';
import status from 'node-status';
import colors from 'colors';

import config_validate from './config_validate';
import {connectAll, disconnectAll} from './config_connections';

// Commands
const COMMANDS = {
    copy: require('./commands/copy')
};

export default async function run(config) {
    try {
        await config_validate(config);
        const connections = await connectAll(config);

        await runCommands(config.commands, connections);

        await disconnectAll(connections);
    } catch (err) {
        cli.fatal(err.message || err);
        process.exit(1);
    }
}

async function runCommands(commands, connections) {
    // Init status bar
    status.start({pattern: '.'});

    for (var i = 0; i < commands.length; i++) {
        const c = commands[i];
        const fn = COMMANDS[c.type].default;

        await fn(c, connections);
    }

    status.clear();
    status.removeAll();
    status.stop();
}
