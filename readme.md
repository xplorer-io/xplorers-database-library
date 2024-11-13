
# Database Library

A Node.js library for interacting with a PostgreSQL database, designed to work with CockroachDB. This library includes basic functionalities for connecting, executing queries, and managing database connections. The library also supports database migrations via Flyway.
 
## Installation Steps

### Step 1: Install the library
```
pnpm install https://github.com/xplorer-io/explorers-database
```

### Step 2: Setup Environment Variables
Create a .env file in the root of your project and add the DATABASE_URL for your CockroachDB database connection.
```
DATABASE_URL=postgresql://user:password@localhost:26257/database_name?sslmode=disable
```
Replace user, password and database_name with your actual database credentials.

### Step3: Configure Flyway (Optional, for Migrations)
If you want to use Flyway for managing migrations, ensure your flyway.conf is correctly configured with database connection strings. 
Example `flyway.conf`
```
flyway.url=${DATABASE_URL}
flyway.user=${FLYWAY_USER}
flyway.password=${FLYWAY_PASSWORD}
flyway.locations=${PATH TO YOUR SCHEMA/ SP FILE}
```
### Flyway Naming Convention
For Flyway it's essential to follow a consistent naming convention for migration files, as Flyway organizes migrations by their version number and ensures they're applied in the correct order. 

Schema Migrations
Use the following naming convention for schema in migration files:

`V<version_number>__<description.sql>`
V: Indicates a versioned migration
version_number: A unique version number to order migrations.
Example: `V1.01__events.sql`

For Stored Procedure or Repeateable Migrations:
For stored procedures or repeatable migrations—migrations Flyway will apply every time they change—use the prefix R:
`R_<description>.sql`

R: Indicates a repeateable migration
description: A clear, concise description of the migration content. Avoid using version numbers, as these will be reapplied whenever they change. 
`R_Get_Events.sql`


# Example usage:
```
import DatabaseLibrary from ".";

let config = {
    "url":"your database url",
    "user":"username",
    "password":"password"
}

const db_config = new DatabaseLibrary(config)

const query = "select * from events where location = $1"
// Using $1, $2, etc., for parameters to prevent SQL injection and ensure safe query execution.
// These placeholders are replaced with values in the params array when the query is executed.
const params = ['Test Location']
async function runQuery(){
    const rows = await db_config.execute(query, params)
    console.log(rows)
}

runQuery()

```