import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <>
      <div className="header">
        <h1 onClick={() => navigate("/")}>dandylion</h1>
      </div>
    </>
  );
}

export default Header;
