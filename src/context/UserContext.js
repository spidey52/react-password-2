import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { apiAddress } from "../config";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState("");
  const [loading, setLogging] = useState(false);

  const logout = async () => {
    setLogging(true);
    await axios.post(
      `${apiAddress}/users/logout`,
      {},
      { headers: { Authorization: `Bearer ${isAuthenticated.token}` } }
    );
    localStorage.removeItem("user");
    setIsAuthenticated("");
  };

  const login = async ({ username, password }) => {
    setLogging(true);
    try {
      const { data } = await axios.post(`${apiAddress}/users/login`, {
        email: username,
        password,
      });
      setIsAuthenticated(data);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.log(error.message);
    } finally {
      setLogging(false);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(JSON.parse(user));
    } else {
    }
  }, []);

  return (
    <UserContext.Provider value={{ isAuthenticated, loading, logout, login }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

// class UserContextProvider extends Component {
//   state = {
//     isAuthenticated: false,
//   };

//   toggleAuth = () => {
//     this.setState({ isAuthenticated: !this.state.isAuthenticated });
//   };

//   render() {
//     return (
//       <UserContext.Provider
//         value={{ ...this.state, toggleAuth: this.toggleAuth }}
//       >
//         {this.props.children}
//       </UserContext.Provider>
//     );
//   }
// }
