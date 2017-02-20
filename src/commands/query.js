import status from 'node-status';
import colors from 'colors';

export default async function query(command, connections) {
    const STATUS_MESSAGE = `{command.custom.magenta}   {uptime.cyan}`;
    status.setPattern(`  {spinner.line.magenta} ${STATUS_MESSAGE}`);

    const commandStatus = status.addItem('command', {
        custom: () => command.description
    });

    command._status = {};

    const database = connections[command.database].connection;

    const result = await database.query(command.query);

    let STATUS_MESSAGE_SUFFIX = '';

    if (result.command === 'DELETE') {
        STATUS_MESSAGE_SUFFIX = ` DELETED ${result.rowCount} rows`.cyan
    }

    status.setPattern(`  ${'\u2713 '.magenta} ${STATUS_MESSAGE}    ${STATUS_MESSAGE_SUFFIX}`);
    status.stamp();
    status.removeItem(commandStatus);
}
