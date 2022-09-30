const serverless = require("serverless-http");
const koa = require("koa");
const app = new koa();

app.use((ctx) => {
  ctx.body = "hello world";
});

app.listen(4000, () => {
  console.log("Listening to port 4000");
});

module.exports.handler = serverless(app);
