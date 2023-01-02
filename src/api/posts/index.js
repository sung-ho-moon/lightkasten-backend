import Router from "koa-router";
import * as postsCtrl from "./posts.ctrl.js";
import checkLoggedIn from "../../lib/checkLoggedIn.js";
import upload from "../../lib/s3.js";

const posts = new Router();

posts.get("/", postsCtrl.list);
posts.post("/", checkLoggedIn, upload.single("image"), postsCtrl.write);
posts.get("/:id", postsCtrl.getPostById, postsCtrl.read);
posts.delete(
  "/:id",
  checkLoggedIn,
  postsCtrl.getPostById,
  postsCtrl.checkOwnPost,
  postsCtrl.remove
);
posts.patch(
  "/:id",
  checkLoggedIn,
  postsCtrl.getPostById,
  postsCtrl.checkOwnPost,
  upload.single("image"),
  postsCtrl.update
);

//테스트 업로드
posts.post("/image", upload.single("image"), (ctx, next) => {
  /*
  const {
    fieldname,
    originalname,
    encoding,
    mimetype,
    location,
    destination,
    filename,
    path,
    size,
  } = ctx.req.file;
  const { name } = ctx.req.body;

  console.log("body 데이터 : ", name);
  console.log("폼에 정의된 필드명 : ", fieldname);
  console.log("사용자가 업로드한 파일 명 : ", originalname);
  console.log("파일의 엔코딩 타입 : ", encoding);
  console.log("파일의 Mime 타입 : ", mimetype);
  console.log("파일이 저장된 폴더 : ", destination);
  console.log("파일이 저장된 위치 : ", location);
  console.log("destinatin에 저장된 파일 명 : ", filename);
  console.log("업로드된 파일의 전체 경로 ", path);
  console.log("파일의 바이트(byte 사이즈)", size);

  ctx.body = { ok: true, data: "Single Upload Ok" };
  */
});

export default posts;
