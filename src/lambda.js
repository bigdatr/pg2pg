import cli from 'cli';
import request from 'request';

import config_import from './config_import';

cli.enable('status');

const { config, hostname } = cli.parse({
    config: ['c', 'A config file with details', 'file'],
    hostname: ['h', 'Hostname for the lamda (https://...)', 'string']
});

if (!config) {
    cli.fatal('Config path is required. See `pg2pg --help`');
    process.exit(1);
} else if (!hostname) {
    cli.fatal('Config path is required. See `pg2pg --help`');
    process.exit(1);
}

console.log('----------------------------------');
console.log(' PG2PG Lambda');
console.log('----------------------------------');

config_import(config)
    .then(c => send(c))
    .then(resp => console.log(JSON.parse(resp)))
    .catch(err => {
        console.log(err);
    });

function send(conf) {
    return new Promise((resolve, reject) => {
        const uri = `${hostname}?query=${encodeURIComponent(JSON.stringify(conf))}`;

        request(uri, (err, res, body) => {
            if (err) {
                return reject(err);
            } else if (res.statusCode >= 400) {
                const b = body ? JSON.parse(body) : { message: body };
                return reject(
                    new Error(
                        `[${res.statusCode}] ${res.statusMessage} - ${b.message}`
                    )
                );
            }

            return resolve(body);
        });
    });
}
