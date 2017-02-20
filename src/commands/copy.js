import status from 'node-status';
import colors from 'colors';
import {getToken} from '../utils';

export default async function copy(command, connections) {
    status.setPattern(`  {spinner.line.magenta} {copy.custom.magenta}   {uptime.cyan} / {copy.count.cyan} ${'rows imported'.cyan}`);

    const copyStatus = status.addItem('copy', {
        custom: () => command.description
    });

    command._status = {};

    const source_database = connections[getToken(command.source_database)].connection;
    const target_database = connections[getToken(command.target_database)].connection;

    await source_database.queryWithCursor({
        query: command.source_query,
        batchSize: command.batchSize,
        onResults: async function onResults(rows) {
            await target_database.bulkInsert(command.target_table, rows);

            copyStatus.inc(rows.length);
            command._status.importedRows = (command._status.importedRows || 0) + rows.length;
        }
    });

    status.setPattern(`  ${'\u2713 '.magenta} {copy.custom.magenta}   {uptime.cyan} / {copy.count.cyan} ${'rows imported'.cyan}`);
    status.stamp();
    status.removeItem(copyStatus);
}
