import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { apiAddress } from "../config";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState("");
  const [loading, setLogging] = useState(false);
  const [error, setError] = useState(null)

  const logout = async () => {
    setLogging(true);
    try {
      await axios.post(
        `${apiAddress}/users/logout`,
        {},
        { headers: { Authorization: `Bearer ${isAuthenticated.token}` } }
      );
      localStorage.removeItem("user");
      setIsAuthenticated("");
    } catch (error) {
      // setLogging(true);
      alert(error.message);
    } finally {
      setLogging(false);
    }
  };

  const login = async ({ username, password }) => {
    setLogging(true);
    setError(null)
    try {
      const { data } = await axios.post(`${apiAddress}/users/login`, {
        email: username,
        password,
      });
      setLogging(false);
      setIsAuthenticated(data);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.log(error.message);
      setLogging(false);
      setError(error.message)
    } finally {
      setLogging(false);
    }
  };

  const sendOtp = async (email) => {
    try {
      setError("")
      const { data } = await axios.get(`${apiAddress}/reset-password?email=${email}`)
      return data
    } catch (error) {
      if (error.response.data) {
        setError(JSON.stringify(error.response.data))
      } else {
        setError(error.message)
      }
    }
  }

  const resetPassword = async (email, otp, newPassword) => {
    try {
      const { data } = await axios.post(`${apiAddress}/reset-password`, { email, otp, newPassword })
      return data
    } catch (error) {
      if (error.response.data) {
        setError(JSON.stringify(error.response.data))
      } else {
        setError(error.message)
      }
    }
  }

  const register = async ({ username, password, firstName, lastName, email }) => {
    setLogging(true)
    setError(null)
    try {
      const { data } = await axios.post(`${apiAddress}/users`, { email, username, password, firstName, lastName })
      setIsAuthenticated(data);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.log(error.response.data)
      if (error.response.data) {
        setError(JSON.stringify(error.response.data));
      } else {
        setError(error.message)
      }
    }

  }

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(JSON.parse(user));
    } else {
    }
    return () => {
      setLogging(false);
      setError(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{ isAuthenticated, loading, logout, login, register, error, sendOtp, resetPassword }}>
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
