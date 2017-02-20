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
        'refs',
        'commands'
    ];

    const missingProps = requiredProps.filter((p) => !obj[p]);

    if (missingProps.length > 0) {
        throw new Error(`Config is missing '${missingProps.join(', ')}'`)
    }
    else if (obj.schema_version !== 1.1) {
        throw new Error(`This version of pg2pg only supports schema_version 1.1. Your schema_version is ${obj.schema_version}`)
    }
}
