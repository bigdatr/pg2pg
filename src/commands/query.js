import chalk from 'chalk';

export default (async function query(command, connections, queryParams) {
    // const STATUS_MESSAGE = `{command.custom.magenta}   {uptime.cyan}`;
    // status.setPattern(`  {spinner.line.magenta} ${STATUS_MESSAGE}`);
    //
    // const commandStatus = status.addItem('command', {
    //     custom: () => command.description
    // });
    //
    // command._status = {};

    if (!connections[command.database]) {
        throw new Error(
            `Could not find database '${command.database}' in refs. Please check command '${command.description}'`
        );
    }

    const database = connections[command.database].connection;

    const result = await database.query(command.query, queryParams);

    console.log(chalk.green('COMPLETE:'), command.query);

    // let STATUS_MESSAGE_SUFFIX = '';
    //
    // if (result.command === 'DELETE') {
    //     STATUS_MESSAGE_SUFFIX = ` DELETED ${result.rowCount} rows`.cyan;
    // }

    // status.setPattern(
    //     `  ${'\u2713 '.magenta} ${STATUS_MESSAGE}    ${STATUS_MESSAGE_SUFFIX}`
    // );
    // status.stamp();
    // status.removeItem(commandStatus);
});
