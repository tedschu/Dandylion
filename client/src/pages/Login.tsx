import { useNavigate } from "react-router-dom";
import { UserInfo } from "../types/types";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";

function Login() {
  const { userInfo, setUserInfo, isLoggedIn, setIsLoggedIn, token, setToken } =
    useAuth();
  const [loginFailed, setLoginFailed] = useState(false);

  const navigate = useNavigate();

  // Submit button for account registration via Dandylion
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    loginUser();
  };

  // Handles form values
  const setFormValues = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setUserInfo((prev) => ({
      ...prev,
      [name as keyof UserInfo]: value,
    }));
  };

  async function loginUser() {
    try {
      const response = await fetch(
        "/auth/login", //path to login (see vite.config)
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userInfo.email,
            password: userInfo.password,
          }),
        }
      );

      const data = await response.json();

      console.log("Here is userInfo: ", userInfo);
      console.log("HEre is data from response:", data);

      if (!response.ok) {
        throw new Error("Login failed");
        setLoginFailed(true);
      } else {
        localStorage.setItem("token", data.token); // SETS TOKEN TO LOCALSTORAGE IN BROWSER
        localStorage.setItem("userId", data.id); // SETS USER ID INTO LOCALSTORAGE TO HELP WITH RENDERING USER DATA ON GAME AND ACCOUNT PAGES
        setToken(data.token);
        setUserInfo((prev) => ({
          ...prev,
          firstName: data.firstName,
        }));
        setIsLoggedIn(true);
        setLoginFailed(false);
        navigate("/me");
      }
    } catch (error) {
      console.error("Error during login", error);
      setLoginFailed(true);
    }
  }

  return (
    <>
      <div className="loginContainer">
        <div className="backgroundImage"></div>
        <Header variant="header-fixed" />
        <div className="loginContentContainer">
          <p>[Continue with Google]</p>
          <p>OR</p>
          <form action="" className="loginForm" onSubmit={submit}>
            <input
              className="loginInput"
              type="text"
              placeholder="Email"
              name="email"
              value={userInfo.email}
              onChange={setFormValues}
            />
            <input
              className="loginInput"
              type="password"
              //   placeholder="example: Count Woofula"
              name="password"
              placeholder="Password"
              value={userInfo.password}
              onChange={setFormValues}
            />

            <div className="registerButtonContainer">
              <button className="register">Sign in</button>
            </div>
          </form>
          {loginFailed && (
            <div
              className="loginFailAlert"
              style={{ color: "var(--error)", marginTop: "20px" }}
            >
              Login error. Forget your password?
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
