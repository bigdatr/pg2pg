import PostgresConnector from './connectors/PostgresConnector';
import HipChatConnector from './connectors/HipChatConnector';

const CONNECTORS = {
    postgres: PostgresConnector,
    redshift: PostgresConnector,
    hipchat: HipChatConnector
};

export async function connectAll(config) {
    const {refs} = config;

    const connections = Object.keys(refs)
        .filter((ref) => {
            // Ignore refs that don't have a connector defined
            return !!Object.keys(CONNECTORS).find((c) => c === refs[ref].type);
        })
        .map((ref) => {
            const conf = refs[ref];

            return {
                [ref]: {
                    conf: conf,
                    connection: new CONNECTORS[conf.type](conf)
                }
            };
        })
        .reduce((state, val) => Object.assign(state, val), {});

    await Promise.all(Object.keys(connections).map((c) => connections[c].connection.connect()));

    return connections;
}

export async function disconnectAll(connections) {
    await Promise.all(Object.keys(connections).map((c) => connections[c].connection.disconnect()));
}
