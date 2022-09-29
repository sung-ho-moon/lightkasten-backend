const serverless = require("serverless-http");
const express = require("express");
const app = express();

//http://localhost:3000/dev//
app.get("/", function (req, res) {
  res.send("Hello World!");
});

//http://localhost:3000/dev/dev
app.get("/dev", function (req, res) {
  res.send("Hello World!");
});
module.exports.handler = serverless(app);
