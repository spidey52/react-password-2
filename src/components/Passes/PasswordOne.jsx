import React, { useState } from "react";
import { Link } from "react-router-dom";
import Toast from "../Helper/Toast";
import { toast } from 'react-toastify'

const PasswordOne = ({ title, username, password, id, getDecryptPass, addClicks }) => {
  const copyHandler = async () => {
    if (navigator) {
      const pass = await getDecryptPass(password);
      await navigator.clipboard.writeText(pass);
      toast.success('Password copied to clipboard')
      await addClicks(id)
    }
  };

  const copyUsername = async () => {
    if (navigator) await navigator.clipboard.writeText(username);
    toast.success('Username copied to clipboard')
  };

  return (
    <>
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
