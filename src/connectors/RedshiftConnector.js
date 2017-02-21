import PostgresConnector from './PostgresConnector';
import pg from 'pg';
import Cursor from 'pg-cursor';
import cli from 'cli';

const DEFAULT_BATCH_SIZE = 1000;

export default class RedshiftConnector extends PostgresConnector {
    async queryWithCursor(options) {
        return new Promise(async (resolve, reject) => {
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

            const rows = await this.query(query);
            await _batchAndProcess(batchSize, rows, onResults);
            resolve();
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
