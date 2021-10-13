const localApiAddress = "http://localhost:4000";
const productionApiAddress = "https://passmanager.fitsworld.online";
const apiAddress = process.env.NODE_ENV === 'development' ? localApiAddress : productionApiAddress



export { apiAddress }
