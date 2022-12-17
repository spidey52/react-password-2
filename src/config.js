const localApiAddress = "http://localhost:5000";
const productionApiAddress = "https://passmanager.spideyworld.co.in";
const apiAddress =
 process.env.NODE_ENV === "development"
  ? productionApiAddress
  : productionApiAddress;

export const login_url = `${apiAddress}/users/login`;
  

export const password_list_url = `${apiAddress}/passwds`;
export const password_create_url = `${apiAddress}/passwds`;
export const password_update_url = `${apiAddress}/passwds`;
export const password_delete_url = `${apiAddress}/passwds`;

export { apiAddress };
