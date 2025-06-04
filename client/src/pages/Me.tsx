import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Me() {
  const { userInfo } = useAuth();

  const navigate = useNavigate();

  return (
    <>
      <h1>
        Hey there, {userInfo.firstName}. Your email: {userInfo.email}
      </h1>
      <button onClick={() => navigate("/")}>Go home</button>
    </>
  );
}

export default Me;
