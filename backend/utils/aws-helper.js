const AWS = require('aws-sdk');


const ALLOWED_EXTENSIONS = ["pdf", "png", "jpg", "jpeg", "gif"]

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
});
