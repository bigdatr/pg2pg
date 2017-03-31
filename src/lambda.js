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
    .then(resp => {
        if (typeof resp === 'object') {
            console.log(JSON.stringify(resp, null, 4));
        } else {
            console.log(resp);
        }
    })
    .catch(err => {
        console.log(err);
    });

function send(conf) {
    return new Promise((resolve, reject) => {
        const options = {
            // uri: `${hostname}?query=${encodeURIComponent(JSON.stringify(conf))}`,
            uri: hostname,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            json: true,
            body: {
                query: conf
            }
        };

        request(options, (err, res, body) => {
            if (err) {
                return reject(err);
            } else if (res.statusCode >= 400) {
                console.log(body);

                return reject(
                    new Error(`[${res.statusCode}] ${res.statusMessage}`)
                );
            }

            return resolve(body);
        });
    });
}
