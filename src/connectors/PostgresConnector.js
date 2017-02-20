import BaseConnector from './BaseConnector';
import pg from 'pg';
import Cursor from 'pg-cursor';
import cli from 'cli';

const DEFAULT_BATCH_SIZE = 1000;

export default class PostgresConnector extends BaseConnector {
    async connect() {
        return new Promise((resolve, reject) => {
            this._client = new pg.Client(this.config);

            this._client.connect((err) => {
                if (err) { return reject(err); }

                cli.debug(`Connected DB: ${this.config.host}`);

                return resolve();
            });
        });
    }

    async disconnect() {
        return new Promise((resolve, reject) => {
            this._client.end((err) => {
                if (err) { return reject(err); }

                cli.debug(`Disconnected DB: ${this.config.host}`);

                return resolve();
            });
        });
    }

    async query(sql, params) {
        return new Promise((resolve, reject) => {
            this._client.query(sql, params || [], (err, result) => {
                if (err) { return reject(err); }

                return resolve(result);
            });
        });
    }

    async queryWithCursor(options) {
        return new Promise((resolve, reject) => {
            if (!this._client) {
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

            const {query, onResults} = options;
            let {batchSize} = options;

            batchSize = batchSize || DEFAULT_BATCH_SIZE;

            const cursor = this._client.query(new Cursor(query));

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
                        cli.debug('Using Postgres cursor to batch copy');

                        try {
                            await onResults(rows);
                            _readFromCursor();
                        } catch (onResults_err) {
                            cli.fatal(onResults_err.message)
                        }
                    }
                    else {
                        // Most likely connected to redshift
                        cli.debug('Cursor not supported by database. Fetching All. This may cause issues for large amounts of data.');
                        await _batchAndProcess(batchSize, rows, onResults);
                        return resolve();
                    }

                });
            }

            // Start reading
            _readFromCursor();
        });
    }

    async bulkInsert(table, rows) {
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

            this._client.query(query, values, (err, result) => {
                if (err) {
                    cli.fatal(err.message);
                    return reject(err);
                }

                return resolve();
            });
        });
    }
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
