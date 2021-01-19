const { Pool } = require("pg");

const pool = new Pool();

module.exports = {
  //I DONT UNDERSTAND THIS CODE NEED EXPLENATION
  async query(text, params) {
    const start = Date.now(); // start time of the query
    const res = await pool.query(text, params); // actually running the query
    const duration = Date.now() - start + " ms"; // query ended, now calculating how much time it took
    console.log("executed query", { text, duration, rows: res.rowCount });
    return res;
  },
};
