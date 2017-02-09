import cli from 'cli';
import status from 'node-status';
import colors from 'colors';

import config_validate from './config_validate';
import {connect, disconnect, queryWithCursor, bulkInsert} from './db';

export default async function run(config) {
    try {
        await config_validate(config);

        const [source_client, target_client] = await Promise.all([
            connect(config.source),
            connect(config.target)
        ]);

        await runCommands(source_client, target_client, config.commands);

        await Promise.all([
            disconnect(source_client),
            disconnect(target_client)
        ]);
    } catch (err) {
        cli.fatal(err.message || err);
        process.exit(1);
    }
}

async function runCommands(source_client, target_client, commands) {
    // Init status bar
    status.start({
        pattern: `  {spinner.line.magenta} {rows.custom.magenta}   {uptime.cyan} / {rows.count.cyan} ${'rows imported'.cyan}`
    });

    for (var i = 0; i < commands.length; i++) {
        const c = commands[i];

        const rowCounter = status.addItem('rows', {
            custom: () => c.description
        });

        await queryWithCursor(source_client, {
            query: c.source_query,
            batchSize: c.batchSize || 1000,
            onResults: async function onResults(rows) {
                await bulkInsert(target_client, c.target_table, rows);

                rowCounter.inc(rows.length);
                c.importedRows = (c.importedRows || 0) + rows.length;
            }
        });

        status.console().log('  \u2713 '.magenta + c.description.magenta + ` (${c.importedRows} rows)`.magenta);
        status.removeAll();
        status.clear();
    }

    status.stop();
}
