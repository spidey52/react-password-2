import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { apiAddress } from "../config";
import { UserContext } from "./UserContext";

export const PasswordContext = createContext();

const PasswordContextProvider = ({ children }) => {
  const [passes, setPasses] = useState([]);
  const { isAuthenticated } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const getDecryptPass = async (password) => {
    // const { data } = await axios.get("/.netlify/functions/hello", {
    const { data } = await axios.get(`${apiAddress}/passwds/copy`, {
      headers: { pass: password, Authorization: `Bearer ${isAuthenticated.token}` },
    });

    return data;
  };

  const addClicks = async (id) => {
    await axios.get(`${apiAddress}/passwds/${id}/clicks`,
      { headers: { Authorization: `Bearer ${isAuthenticated.token}` } },
    )
  }

  const fetchPasses = async () => {
    if (passes.length === 0) {
      setIsLoading(true);
    }
    try {
      const { data } = await axios.get(`${apiAddress}/passwds`, {
        headers: { Authorization: `Bearer ${isAuthenticated.token}` },
      });
      setPasses(data);
      localStorage.setItem("passes", JSON.stringify(data));
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getPassById = (id) => {
    const pass = passes.find((pass) => pass._id === id);
    return pass;
  };

  useEffect(() => {
    console.log("run here");
    setPasses(JSON.parse(localStorage.getItem("passes")) || []);
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
        getDecryptPass,
        addClicks
      }}
    >
      {children}
    </PasswordContext.Provider>
  );
};

export default PasswordContextProvider;
