import cli from 'cli';

import config_import from './config_import';
import run from './run';

cli.enable('status');

const { config } = cli.parse({
    config: ['c', 'A config file with details', 'file']
});

if (!config) {
    cli.fatal('Config path is required. See `pg2pg --help`');
    process.exit(1);
}

async function importAndRun(path) {
    const startTime = new Date();

    console.log('----------------------------------');
    console.log(' PG2PG');
    console.log('----------------------------------');

    try {
        const c = await config_import(path);

        await run(c);

        const duration = new Date() - startTime;
        const seconds = Math.round(duration / 100) / 10;

        console.log('----------------------------------');
        console.log(`Total Duration: ${seconds}s`);

        process.exit(0);
    } catch (err) {
        cli.fatal(err.stack || err);
    }
}

importAndRun(config);
