exports.handler = async (events, context, callback) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ msg: "hello from function" }),
  };
};
