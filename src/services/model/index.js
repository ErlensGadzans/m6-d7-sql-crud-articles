const { query } = require("../database");
const database = require("../database");

class articlesModel {
  constructor(article) {
    this.article = article; //dont understand this part. WHY NAME?
  }

  async run(query) {
    try {
      const response = await database.query(query);
      return response;
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async find(fields) {
    if (!fields || Object.values(fields).length === 0) {
      const query = `SELECT * FROM ${this.article}`;
      const response = await this.run(query);
      return response;
    } else {
      const entries = Object.entries(fields);
      const whereClause = `${entries
        .map(([key, value]) => `${key}='${value}'`)
        .join(" AND ")}`;
      const query = `SELECT * FROM ${this.article} WHERE  ${whereClause};`;
      const response = await this.run(query);
      return response;
    }
  }
}

module.exports = articlesModel;
