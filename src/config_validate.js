export default function config_validate(config) {
    if (!config || typeof config !== 'object') {
        throw new Error('Invalid config');
    }

    ensureProps(config);

    // More validation here
}

function ensureProps(obj) {
    const requiredProps = [
        'schema_version',
        'source',
        'target',
        'commands'
    ];

    const missingProps = requiredProps.filter((p) => !obj[p]);

    if (missingProps.length > 0) {
        throw new Error(`Config is missing '${missingProps.join(', ')}'`)
    }
}
