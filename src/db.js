import pg from 'pg';
import Cursor from 'pg-cursor';
import cli from 'cli';

export function connect(options) {
    return new Promise((resolve, reject) => {
        const client = new pg.Client(options);

        client.connect((err) => {
            if (err) { return reject(err); }

            cli.debug(`Connected DB: ${options.host}`);

            return resolve(client);
        });
    });
}

export function disconnect(client) {
    return new Promise((resolve, reject) => {
        client.end((err) => {
            if (err) { return reject(err); }

            cli.debug(`Disconnected DB: ${client.host}`);

            return resolve();
        });
    });
}

export function queryWithCursor(client, options) {
    return new Promise((resolve, reject) => {
        if (!client) {
            return reject(new Error('Missing client'));
        }
        else if (!options) {
            return reject(new Error('Missing options'));
        }
        else if (!options.query) {
            return reject(new Error('Missing `query` in options'));
        }
        else if (!options.onResults) {
            return reject(new Error('Missing `onResults` in options'));
        }

        const {query, batchSize, onResults} = options;

        const cursor = client.query(new Cursor(query));

        // Read in a function that can be called recursively
        function _readFromCursor() {
            cursor.read(batchSize, async (err, rows) => {
                cli.debug('Reading with cursor');

                if (err) {
                    cli.fatal(err.message);
                    return reject(err);
                }
                else if(rows.length === 0) {
                    cli.debug('No more rows to read');
                    return resolve();
                }

                const cursorIsSupportedByDB = rows.length <= batchSize;

                cli.debug('Processing results ' + rows.length);

                if (cursorIsSupportedByDB) {
                    await onResults(rows);
                    _readFromCursor();
                }
                else {
                    // Most likely connected to redshift
                    await _batchAndProcess(batchSize, rows, onResults);
                    return resolve();
                }

            });
        }

        // Start reading
        _readFromCursor();
    });
}

async function _batchAndProcess(batchSize, rows, onResults) {
    const batches = [];

    // Chunk into batches
    for (let i=0, j=rows.length; i<j; i+=batchSize) {
        const chunk = rows.slice(i, i + batchSize);
        batches.push(chunk);
    }

    for (let b=0; b<batches.length; b++) {
        await onResults(batches[b]);
    }
}

export function bulkInsert(client, table, rows) {
    return new Promise((resolve, reject) => {
        cli.debug(`Bulk inserting ${rows.length} rows to '${table}'`);

        function buildStatement (insert) {
            const params = [];
            const chunks = [];

            rows.forEach(row => {
                const valueClause = [];

                Object.keys(row).forEach(p => {
                    params.push(row[p])
                    valueClause.push('$' + params.length)
                });

                chunks.push('(' + valueClause.join(', ') + ')')
            });

            return {
                query: insert + chunks.join(', '),
                values: params
            }
        }

        const fields_query = Object.keys(rows[0]).join(', ');
        const {query, values} = buildStatement(`INSERT INTO ${table}(${fields_query}) VALUES `);

        client.query(query, values, (err, result) => {
            if (err) {
                cli.fatal(err.message);
                return reject(err);
            }

            return resolve(result);
        });
    });
}
