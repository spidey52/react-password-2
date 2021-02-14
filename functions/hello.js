exports.handler = async (events, context, callback) => {
  const crypto = require("crypto");

  const epass = Buffer.from(events.headers.pass, "base64").toString("ascii");
  const pass = JSON.parse(epass);

  console.log(pass);

  const algorithm = "aes-256-ctr";
  const secretKey = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";

  const decrypt = (hash) => {
    const decipher = crypto.createDecipheriv(
      algorithm,
      secretKey,
      Buffer.from(hash.iv, "hex")
    );

    const decrpyted = Buffer.concat([
      decipher.update(Buffer.from(hash.content, "hex")),
      decipher.final(),
    ]);

    return decrpyted.toString();
  };

  const d = decrypt(pass);

  return {
    statusCode: 200,
    body: d,
  };
};
