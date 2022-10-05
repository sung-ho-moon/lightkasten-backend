import Post from "../../model/posts.js";

/* 포스트 작성
POST /api/posts
{ title, body }
*/
export const write = async (ctx) => {
  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 포스트 목록 조회
GET /api/posts
*/
export const list = (ctx) => {};

/* 특정 포스트 조회
GET /api/posts/:id
*/
export const read = (ctx) => {};

/* 특정 포스트 제거
DELETE /api/posts/:id
*/
export const remove = (ctx) => {};

/* 포스트 수정(교체)
PUT /api/posts/:id
{ title, body }
*/
export const replace = (ctx) => {};

/* 포스트 수정(특정 필드 변경)
PATCH /api/posts/:id
{ title, body }
*/
export const update = (ctx) => {};
