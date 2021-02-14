exports.handler = () => {
  return {
    statusCode: 200,
    body: JSON.stringify({msg: "hello from function"})
  }
}