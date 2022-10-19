//env
import dotenv from "dotenv";
dotenv.config();

//serverless framework
import serverless from "serverless-http";

import koa from "koa";
import cors from "@koa/cors";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import mongoose from "mongoose";

//serve
import serve from "koa-static";
import send from "koa-send";

const { PORT, MONGO_URI } = process.env;

import createFakeData from "./src/createFakeData.js";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("connected to db");
    //createFakeData();
  })
  .catch((e) => {
    console.error(e);
  });

const app = new koa();
const router = new Router();

import api from "./src/api/index.js";
import jwtMiddleware from "./src/lib/jwtMiddleware.js";
router.use("/api", api.routes());

app.use(cors());
app.use(bodyParser());
app.use(jwtMiddleware);
app.use(router.routes()).use(router.allowedMethods());

//serve
app.use(serve(__dirname + "./build"));

const port = PORT || 4000;

app.listen(PORT, () => {
  console.log("Listening to port %d", port);
});

//serverless hadnler exports
export const handler = serverless(app);
