const express = require("express");
const router = express.Router();

const Model = require("../model");

const articlesModel = new Model("articles");

const database = require("../database");

router.get("/", async (req, res, next) => {
  try {
    const response = await articlesModel.find(req.query);
    console.table(response.rows);
    res.send(response.rows);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
