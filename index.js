//serverless framework
const serverless = require("serverless-http");

const koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");

const app = new koa();
const router = new Router();

const api = require("./src/api/index");
router.use("/api", api.routes());

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log("Listening to port 4000");
});

//serverless hadnler exports
module.exports.handler = serverless(app);
