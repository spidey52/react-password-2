const localApiAddress = "http://localhost:8400";
const productionApiAddress = "http://www.kaprabecho.ml";
const apiAddress = process.env.NODE_ENV === 'development' ? localApiAddress : productionApiAddress



export { apiAddress }
