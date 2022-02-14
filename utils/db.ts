import {createPool} from "mysql2/promise";

export const pool = createPool({
    db: 'localhost',
    user: 'root',
    database: 'arena',
    namedPlaceholders: true,
    decimalNumbers: true
})