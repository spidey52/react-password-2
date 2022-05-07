const localApiAddress = "http://localhost:5000";
const productionApiAddress = "https://passmanager.fitsworld.online";
const apiAddress = process.env.NODE_ENV === 'development' ? productionApiAddress : productionApiAddress



export { apiAddress }
