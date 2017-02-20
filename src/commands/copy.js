import status from 'node-status';
import colors from 'colors';

export default async function copy(command, connections) {
    const STATUS_MESSAGE = `{command.custom.magenta}   {uptime.cyan}    ${'COPIED'.cyan} {command.count.cyan} ${'rows'.cyan}`;
    status.setPattern(`  {spinner.line.magenta} ${STATUS_MESSAGE}`);

    const commandStatus = status.addItem('command', {
        custom: () => command.description
    });

    command._status = {};

    const source_database = connections[command.source_database].connection;
    const target_database = connections[command.target_database].connection;

    await source_database.queryWithCursor({
        query: command.source_query,
        batchSize: command.batchSize,
        onResults: async function onResults(rows) {
            await target_database.bulkInsert(command.target_table, rows);

            commandStatus.inc(rows.length);
            command._status.importedRows = (command._status.importedRows || 0) + rows.length;
        }
    });

    status.setPattern(`  ${'\u2713 '.magenta} ${STATUS_MESSAGE}`);
    status.stamp();
    status.removeItem(commandStatus);
}
