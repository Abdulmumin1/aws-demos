// aws.config.js
import AWS from "aws-sdk";

const { REACT_APP_ACCESS_KEY_ID, REACT_APP_SECRET_KEY } = process.env;

let accessKeyId = REACT_APP_ACCESS_KEY_ID;
let secretAccessKey = REACT_APP_SECRET_KEY;

console.log(accessKeyId, secretAccessKey);

AWS.config.update({
  accessKeyId,
  secretAccessKey,
  region: "us-east-1",
});

export const sns = new AWS.SNS();
