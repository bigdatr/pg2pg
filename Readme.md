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

The following config will copy all data in the `users` table from the source db to the target db.

NOTE: The table must exist in the target db.

```json
{
    "schema_version": 1,
    "source": {
        "host": "",
        "database": "",
        "user": "",
        "password": "",
        "port": 5432
    },
    "target": {
        "host": "",
        "database": "",
        "user": "",
        "password": "",
        "port": 5432
    },
    "commands": [
        {
            "description": "Copy users table to the new server",
            "type": "copy",
            "source_query": "SELECT * FROM users",
            "target_table": "users"
        }
    ]
}

```
