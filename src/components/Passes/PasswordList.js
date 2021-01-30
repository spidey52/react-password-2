import  { useContext } from "react";
import { PasswordContext } from "../../context/PasswordContext";
import PasswordOne from "./PasswordOne";

const PasswordList = () => {
  const { isLoading, passes } = useContext(PasswordContext);

  return (
    <div className="wrapper">
      {isLoading
        ? "loading"
        : passes.map((e) => (
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
  );
};

export default PasswordList;
