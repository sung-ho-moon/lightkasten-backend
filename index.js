const serverless = require("serverless-http");
const koa = require("koa");
const Router = require("koa-router");

const app = new koa();
const router = new Router();

router.get("/", (ctx) => {
  ctx.body = "home";
});

router.get("/about", (ctx) => {
  ctx.body = "소개";
});

app.use((ctx) => {
  ctx.body = "hello world";
});
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log("Listening to port 4000");
});

module.exports.handler = serverless(app);
