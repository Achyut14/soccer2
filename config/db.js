// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'your_username',
//   host: 'localhost',
//   database: 'your_database_name',
//   password: 'your_password',
//   port: 5432,
// });

// module.exports = pool;


// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'your_username', // <-- This should be a valid PostgreSQL role
//   host: 'localhost',
//   database: 'myappdb',
//   password: 'your_password',
//   port: 5432
// });


// const { Pool } = require('pg');

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT
// });

// module.exports = pool;

require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

module.exports = pool;
