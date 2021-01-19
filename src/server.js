const express = require("express");

const server = express();

const port = process.env.PORT || 5099;

server.get("/", (req, res, next) => {
  res.send("This port is running!");
});

server.listen(port, () => {
  console.log("This port is running on port:  " + port);
});
