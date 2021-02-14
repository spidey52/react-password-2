exports.handler = async (events, context, callback) => {
  const crypto = require("crypto");

  const timeStart = new Date.now();
  const mykey = crypto.createCipheriv("aes-128-cbc", "mypassword");
  let encrypted = mykey.update("abc", "utf8", "hex");
  encrypted += mykey.final("hex");

  const decryptKey = crypto.createDecipheriv("aes-128-cbc", "mypassword");
  let decrypted = decryptKey.update(
    "34feb914c099df25794bf9ccb85bea72",
    "hex",
    "utf8"
  );
  decrypted += mykey.final("utf8");

  const timeEnd = new Date.now();
  const timetaken = timeStart - timeEnd;

  return {
    statusCode: 200,
    body: JSON.stringify({ msg: encrypted, decrypted, timetaken }),
  };
};
