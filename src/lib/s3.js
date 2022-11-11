import AWS from "aws-sdk";
import multer from "koa-multer";
import multerS3 from "multer-s3";
import path from "path";

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "lightkasten-resources",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
    contentDisposition: "attachment",
    serverSideEncryption: "AES256",
  }),
});

export default upload;
