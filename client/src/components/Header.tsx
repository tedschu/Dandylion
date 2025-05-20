import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <>
      <div className="header">
        <h1 onClick={() => navigate("/")} style={{ color: "white" }}>
          dandylion.ai
        </h1>
      </div>
    </>
  );
}

export default Header;
