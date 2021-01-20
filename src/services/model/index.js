const { query } = require("../database");
const database = require("../database");

class articlesModel {
  constructor(article) {
    this.article = article;
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
  //POST METHOD
  async save(fields) {
    if (!fields || Object.values(fields).length === 0) {
      //if there is no value
      const error = new Error("There are not any value.");
      res.send(error);
    } else {
      const keys = Object.keys(fields);
      const values = Object.values(fields);
      const query = `INSERT INTO ${this.article} (${keys.join(
        ","
      )}) VALUES (${values.map((value) => `'${value}'`).join(",")})`;
      const response = await this.run(query);
      return response;
    }
  }

  async findByIdAndDelete(id) {
    if (!id) {
      const error = new Error("Thereis no object with this id.");
      res.send(error);
    } else {
      const query = `DELETE FROM ${this.article} WHERE id=${parseInt(id)}`;
      const response = await this.run(query);
      return response;
    }
  }

  async findByIdAndUpdate(id, value) {
    if (!id || Object.values(id) !== id) {
      throw new Error("There is no article with this id."); //i still dont know how to wtite if there is not correct id requested
    } else {
      const entries = Object.entries(value);

      const query = `UPDATE ${this.article} SET ${entries
        .map(([key, value]) => `${key}='${value}'`)
        .join(",")} WHERE id=${parseInt(id)};`;
      const response = await this.run(query);
      return response;
    }
  }
}

module.exports = articlesModel;
