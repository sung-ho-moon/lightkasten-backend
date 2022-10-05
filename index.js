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

import api from "./src/api/index.js";
router.use("/api", api.routes());

app.use(cors());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;

app.listen(PORT, () => {
  console.log("Listening to port %d", port);
});

//serverless hadnler exports
export const handler = serverless(app);
