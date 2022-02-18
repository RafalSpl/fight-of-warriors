import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'arena',
    namedPlaceholders: true,
    decimalNumbers: true,
    port: 8889
})