const localApiAddress = "http://localhost:8421";
const productionApiAddress = "https://passmanager.fitsworld.online";
const apiAddress = process.env.NODE_ENV === 'development' ? localApiAddress : productionApiAddress



export { apiAddress }
