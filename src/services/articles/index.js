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

router.get("/withAuthors", async (req, res, next) => {
  try {
    // find articles joined with authors and categories
    const query = `SELECT a.headline,a.content, a.category, authors.name, authors.img 
    FROM articles AS a INNER JOIN authors ON a.authorid=authors.id`;

    const articlesAndAuthors = await database.query(query);
    res.send(articlesAndAuthors.rows);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/withAuthorsAndCategories", async (req, res, next) => {
  try {
    // find articles joined with authors and categories
    const query = `SELECT a.headline,a.content, a.category,a.subhead, authors.name, authors.img, categories."categoryName"
    FROM articles AS a INNER JOIN authors ON a.authorid=authors.id 
     INNER JOIN categories ON a."categoryId"=categories.id`;

    const articlesAndAuthorsAndCategories = await database.query(query);
    res.send(articlesAndAuthorsAndCategories.rows);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
