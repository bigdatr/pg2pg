import cli from 'cli';
import colors from 'colors';

import config_import from './config_import';
import run from './run';

cli.enable('status');

const {config} = cli.parse({
    config: [ 'c', 'A config file with details', 'file']
});

if (!config) {
    cli.fatal('Config path is required. See `pg2pg --help`');
    process.exit(1);
}

async function importAndRun(path) {
    const startTime = new Date();

    console.log('----------------------------------'.magenta);
    console.log(' PG2PG'.magenta);
    console.log('----------------------------------'.magenta);

    try {
        const c = await config_import(path);

        await run(c);

        const duration = new Date() - startTime;
        const seconds = Math.round(duration / 100) / 10;

        console.log('----------------------------------'.magenta);
        console.log(`Total Duration: ${seconds}s`.magenta);
    } catch (err) {
        cli.fatal(err.message || err);
    }
}

importAndRun(config);
