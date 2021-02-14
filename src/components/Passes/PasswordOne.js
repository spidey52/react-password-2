import React from "react";
import { Link } from "react-router-dom";

const PasswordOne = ({ title, username, password, id, getDecryptPass }) => {
  const copyHandler = async () => {
    if (navigator) {
      let start = Date.now();
      const pass = await getDecryptPass(password);
      await navigator.clipboard.writeText(pass);
      console.log(start - Date.now());
    }
    alert("copied to clipboard");
  };

  const copyUsername = async () => {
    if (navigator) await navigator.clipboard.writeText(username);
    alert("username copied");
  };

  return (
    <div className="card">
      <div className="card__header">{title}</div>
      <div className="card__body" onClick={copyUsername}>
        {username}
      </div>
      <div className="card__footer">
        <span onClick={copyHandler} className="copy">
          copy
        </span>
        <Link className="edit" to={`/passes/edit/${id}`}>
          <span>edit</span>
        </Link>
        <Link className="delete" to={`/passes/delete/${id}`}>
          <span>delete</span>
        </Link>
      </div>
    </div>
  );
};

export default PasswordOne;
