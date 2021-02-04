import { useContext, useEffect, useRef, useState } from "react";
import { PasswordContext } from "../../context/PasswordContext";
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
  const { isLoading, passes } = useContext(PasswordContext);

  const [data, setData] = useState([]);

  const search = useRef();

  const handleFilter = (e) => {
    console.log('fired')
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

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          placeholder="search"
          ref={search}
          onChange={debounce(handleFilter, 200)}
        />
      </div>
      <div className="wrapper">
        {isLoading
          ? "loading"
          : data.map((e) => (
              <PasswordOne
                title={e.name}
                username={e.username}
                password={e.password}
                email={e.email}
                key={e._id}
                id={e._id}
              />
            ))}
      </div>
    </>
  );
};

export default PasswordList;
