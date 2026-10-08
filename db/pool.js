const { Pool } = require("pg");

module.exports = new Pool({
  host: process.env.PGHOST || process.env.HOST,
  user: process.env.PGUSER || process.env.USER,
  database: process.env.PGDATABASE || process.env.DATABASE,
  password: process.env.PGPASSWORD || "",
  port: process.env.PGPORT || process.env.DATABASE_PORT,
});
