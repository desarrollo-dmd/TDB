const pg = require("pg");

const { Pool } = pg;

const db = new Pool();

module.exports = { db };
