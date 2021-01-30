import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { apiAddress } from "../config";
import { UserContext } from "./UserContext";

export const PasswordContext = createContext();

const PasswordContextProvider = ({ children }) => {
  const [passes, setPasses] = useState([]);
  const { isAuthenticated } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPasses = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${apiAddress}/passwds`, {
        headers: { Authorization: `Bearer ${isAuthenticated.token}` },
      });
      setPasses(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getPassById = (id) => {
    return passes.find((pass) => pass._id === id);
  };

  useEffect(() => {
    console.log("run here");
    if (isAuthenticated.token) {
      fetchPasses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated.token]);

  const editPass = async (pass) => {
    setIsLoading(true);
    await axios.patch(`${apiAddress}/passwds`, pass, {
      headers: { Authorization: `Bearer ${isAuthenticated.token}` },
    });
    await fetchPasses();
  };

  const deletePass = async (id) => {
    setIsLoading(true);
    await axios.delete(`${apiAddress}/passwds/${id}`, {
      headers: { Authorization: `Bearer ${isAuthenticated.token}` },
    });
    await fetchPasses();
  };

  const addPass = async (pass) => {
    setIsLoading(true);
    await axios.post(`${apiAddress}/passwds`, pass, {
      headers: { Authorization: `Bearer ${isAuthenticated.token}` },
    });
    await fetchPasses();
  };

  return (
    <PasswordContext.Provider
      value={{
        passes,
        isLoading,
        editPass,
        deletePass,
        addPass,
        getPassById,
        fetchPasses,
      }}
    >
      {children}
    </PasswordContext.Provider>
  );
};

export default PasswordContextProvider;
