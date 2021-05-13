const localApiAddress = "http://localhost:8400";
const productionApiAddress = "https://spidey-passmanager.herokuapp.com";
const apiAddress = process.env.NODE_ENV === 'development' ? localApiAddress : productionApiAddress



export { apiAddress }
