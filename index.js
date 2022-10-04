require("dotenv").config();
//serverless framework
const serverless = require("serverless-http");

const koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const mongoose = require("mongoose");

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((e) => {
    console.error(e);
  });

const app = new koa();
const router = new Router();

const api = require("./src/api/index");
router.use("/api", api.routes());

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;
app.listen(PORT, () => {
  //sls offline이라서 쉽지않네
  console.log(`Listening to port ${port}`);
});

//serverless hadnler exports
module.exports.handler = serverless(app);
