const checkLoggedIn = (ctx, next) => {
  const cookie = ctx.cookies.get("access_token");
  if (!cookie) {
    ctx.status = 401;
    return;
  }
  return next();
};

export default checkLoggedIn;
