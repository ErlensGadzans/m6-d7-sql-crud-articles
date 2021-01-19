const express = require("express");
const cors = require("cors");

const server = express();

const articlesRouter = require("./services/articles");

server.use(express.json());
server.use(cors());

server.use("/articles", articlesRouter);

const port = process.env.PORT || 5099;

server.get("/", (req, res, next) => {
  res.send("This port is running!");
});

server.listen(port, () => {
  console.log("This port is running on port:  " + port);
});
