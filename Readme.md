# pg2pg

A cli tool that lets you copy data between Postgres (and Amazon Redshift) servers. Just create a config.json file

## Install

```sh
npm install -g pg2pg
```

## Usage

```sh
pg2pg -c config.json
```

## Sample config

The following config will copy all data in the `users` table from `some_redshift_db` to `some_postgres_db`.

NOTE: The table must exist in the target db.

```json
{
    "schema_version": 1.1,
    "refs": {
        "some_postgres_db": {
            "type": "postgres",
            "host": "",
            "database": "",
            "user": "",
            "password": "",
            "port": 5432
        },
        "some_redshift_db": {
            "type": "redshift",
            "host": "",
            "database": "",
            "user": "",
            "password": "",
            "port": 543
        }
    },
    "commands": [
        {
            "type": "copy",
            "description": "Copy users table to the new server",
            "source_database": "${some_redshift_db}",
            "source_query": "SELECT * FROM users",
            "target_database": "some_postgres_db",
            "target_table": "users"
        }
    ]
}

```

## Commands

### copy
source_database <string> - Reference to a db which contains the data
source_query <string>: A query to be executed on the `source_database`
source_query_file <string>: Path to a file that contains the `source_query`
target_database <string> - Reference to a db where the results will be copied to
target_table <string> - Name of the table in the `target_database`
batchSize <number> - (optional. Default 1000) The number of rows to batch insert

```js
{
    "type": "copy",
    "description": "Copy users table to the new server",
    "source_database": "some_redshift_db",
    "source_query": "SELECT * FROM users",
    "target_database": "some_postgres_db",
    "target_table": "users"
}
```

### query
database <string> - Reference to a db to run query on
query <string>: A query to be executed on the `database`
query_file <string>: Path to a file that contains the `query`

```js
{
    "type": "query",
    "description": "Clear all existing users",
    "database": "some_postgres_db",
    "query": "DELETE FROM users"
}
```
