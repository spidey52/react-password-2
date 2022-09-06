const localApiAddress = "http://localhost:5000";
const productionApiAddress = "https://passmanager.spideyworld.co.in";
const apiAddress = process.env.NODE_ENV === 'development' ? productionApiAddress : productionApiAddress



export { apiAddress }
