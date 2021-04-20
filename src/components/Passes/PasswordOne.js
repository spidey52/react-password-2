import React, { useState } from "react";
import { Link } from "react-router-dom";
import Toast from "../Helper/Toast";

const PasswordOne = ({ title, username, password, id, getDecryptPass, addClicks }) => {
  const [visible, setVisible] = useState(false);
  const copyHandler = async () => {
    if (navigator) {
      const pass = await getDecryptPass(password);
      await navigator.clipboard.writeText(pass);
      setVisible(true);
      await addClicks(id)
      setTimeout(() => setVisible(false), 2000);
    }
  };

  const copyUsername = async () => {
    setVisible(true);
    if (navigator) await navigator.clipboard.writeText(username);
    setTimeout(() => setVisible(false), 2000);
  };

  return (
    <>
      <Toast visible={visible} message="copied" />
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
    </>
  );
};

export default PasswordOne;
