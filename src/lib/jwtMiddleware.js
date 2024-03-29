import jwt from "jsonwebtoken";
import User from "../models/user.js";

const jwtMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get("access_token");
  if (!token) return next(); // 토큰이 없음
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    ctx.state.user = {
      _id: decoded._id,
      username: decoded.username,
    };
    // 토큰 3.5일 미만 남으면 재발급
    const now = Math.floor(Date.now() / 1000);
    if (process.env.NODE_ENV == "production") {
      //프로덕션 https
      if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
        const user = await User.findById(decoded._id);
        const token = user.generateToken();
        ctx.cookies.set("access_token", token, {
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
          httpOnly: true,
          //CHROME 80 Cookie Issue
          sameSite: "none",
          secure: true,
        });
      }
    } else if (process.env.NODE_ENV == "development") {
      //개발환경 http
      console.log("Development Mode");
      if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
        const user = await User.findById(decoded._id);
        const token = user.generateToken();
        ctx.cookies.set("access_token", token, {
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
          //CHROME 80 Cookie Issue
          sameSite: "none",
          secure: true,
        });
      }
    }

    return next();
  } catch (e) {
    // 토큰 검증 실패
    return next();
  }
};

export default jwtMiddleware;
