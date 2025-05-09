import { useNavigate } from "react-router-dom";

function Path() {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate("/destination-known")}>
        I know where I'm going
      </button>
      <button onClick={() => navigate("/destination-unknown")}>
        I need help picking
      </button>
    </>
  );
}

export default Path;
