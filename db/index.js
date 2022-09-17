const { Pool } = require('pg');
// eslint-disable-next-line import/extensions
const config = require('../config.js');

const pool = new Pool({
  user: 'postgres',
  host: '71.63.240.63',
  password: `${config.PGPASS}`,
  database: 'questions_answers',
  port: '5432',
});
pool.connect(err => console.log(err));
module.exports = {
  pool
};
