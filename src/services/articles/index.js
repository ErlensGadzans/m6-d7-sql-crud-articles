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

router.post("/", async (req, res, next) => {
  try {
    const response = await articlesModel.save(req.body);
    res.send(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deleteArticle = await articlesModel.findByIdAndDelete(req.params.id);
    res.send(deleteArticle);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const editedArticle = await articlesModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.send(editedArticle);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
