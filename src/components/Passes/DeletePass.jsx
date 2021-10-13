import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { PasswordContext } from "../../context/PasswordContext";

const Delete = ({ match }) => {
  const history = useHistory();
  const { deletePass, isLoading } = useContext(PasswordContext);

  const deleteHandler = async () => {
    await deletePass(match.params.id);
    history.push("/passes");
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        display: "flex",
        padding: "1rem",
        margin: "0 auto",
      }}
    >
      <button onClick={deleteHandler} className="btn btn-danger mx-3">
        {isLoading ? "deleting" : "Yes, delete"}
      </button>

      <Link to="/passes" className="btn btn-primary">
        No, Cancel
      </Link>
    </div>
  );
};

export default Delete;
