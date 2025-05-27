const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    }
});

// Test the connection
pool.connect()
    .then(() => {
        console.log('Successfully connected to the database');
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
    });

module.exports = pool;