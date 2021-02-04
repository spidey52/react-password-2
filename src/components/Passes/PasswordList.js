import { useContext, useEffect, useRef, useState } from "react";
import { PasswordContext } from "../../context/PasswordContext";
import PasswordOne from "./PasswordOne";

const PasswordList = () => {
  const { isLoading, passes } = useContext(PasswordContext);

  const [data, setData] = useState([]);

  const search = useRef();

  const handleFilter = (e) => {
    // FIXME: if filter is from api apply debounce here
    setData(passes.filter((pass) => pass.name.includes(e.target.value)));
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
          onChange={handleFilter}
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
