import { DownhillSkiing, Download, Save } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { PasswordContext } from "../../context/PasswordContext";
import Loading from "../Loading";
import PasswordOne from "./PasswordOne";

const debounce = (fn, timer) => {
  let timeoutId;
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, timer);
  };
};

const PasswordList = () => {
  const { isLoading, passes, getDecryptPass, addClicks } = useContext(PasswordContext);
  const [data, setData] = useState([]);
  const search = useRef();
  const handleFilter = (e) => {
    console.log("fired");
    setData(
      passes.filter((elem) =>
        elem.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    search.current.focus();
    setData(passes);
  }, [passes]);

  const downloadOption = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)]), {
      type: "text/plain",
    });
    a.setAttribute("download", "password.json");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      <Box className="search-container">
        <TextField  size="small" fullWidth label="search" placeholder="type some key" ref={search} variant="outlined" onChange={debounce(handleFilter, 200)} />
        <Button variant="contained" sx={{mt: 1}}  onClick={downloadOption} endIcon={<Download />}>Download </Button>
      </Box>


      <div className="wrapper">
        {isLoading ? (
          <Loading />
        ) : (
          data.map((e) => (
            <PasswordOne
              title={e.name}
              username={e.username}
              password={e.password}
              email={e.email}
              key={e._id}
              addClicks={addClicks}
              id={e._id}
              getDecryptPass={getDecryptPass}
            />
          ))
        )}
      </div>
    </>
  );
};

export default PasswordList;
