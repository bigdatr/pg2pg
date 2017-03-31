import fs from 'fs';

export default (async function config_import(path) {
    const raw = await getFile(path);
    const config = await parse(raw);

    return config;
});

async function getFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }

            return resolve(data);
        });
    });
}

async function parse(text) {
    const config = JSON.parse(text);

    // Import Queries from sql files
    for (var i = 0; i < config.commands.length; i++) {
        const c = config.commands[i];

        if (c.source_query_file) {
            c.source_query = await getFile(c.source_query_file);
        } else if (c.query_file) {
            c.query = await getFile(c.query_file);
        }

        if (!c.description) {
            c.description = `Command ${i + 1}`;
        }

        config.commands[i] = c;
    }

    return config;
}
