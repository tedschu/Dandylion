import { useState, useSyncExternalStore } from "react";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../types/types";
import { useAuth } from "../contexts/AuthContext";

function Register() {
  // Will always show as a modal, whereas login will be a page accessed from hamburger menu
  const { userInfo, setUserInfo, isLoggedIn, setIsLoggedIn, token, setToken } =
    useAuth();

  const [registerError, setRegisterError] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const navigate = useNavigate();

  // Submit button for account registration via Dandylion
  const submitRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    registerUser();
  };

  const submitLogin = (event: React.FormEvent<HTMLFormElement>) => {
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

  const registerUser = async () => {
    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: userInfo.email,
          firstName: userInfo.firstName,
          password: userInfo.password,
        }),
      });

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        throw new Error(data.error || "Registration failed.");
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        setIsLoggedIn(true);
        navigate("/me");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setRegisterError(true);
    }
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
      <div className="registerPageContainer">
        <div className="registerModalContentContainer">
          <h1>Create a Dandylion account to view and create plans!</h1>
          <p>[Continue with Google]</p>
          <p>OR</p>
          {/* Conditionally render register form as default. */}
          {/* If user clicks "already have an account," render login form instead */}
          {!showLogin && (
            <>
              <form
                action=""
                className="registerForm"
                onSubmit={submitRegister}
              >
                <label htmlFor="firstName">First name:</label>
                <input
                  type="text"
                  placeholder="Alice"
                  name="firstName"
                  value={userInfo.firstName}
                  onChange={setFormValues}
                />
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  placeholder="name@example.com"
                  name="email"
                  value={userInfo.email}
                  onChange={setFormValues}
                />
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  //   placeholder="example: Count Woofula"
                  name="password"
                  value={userInfo.password}
                  onChange={setFormValues}
                />

                <div className="registerButtonContainer">
                  <button className="register">Create account</button>
                </div>
              </form>
              <h4>
                Already have an account?{" "}
                <span
                  onClick={() => setShowLogin(true)}
                  style={{ cursor: "pointer" }}
                >
                  Sign in
                </span>
              </h4>
            </>
          )}
          {showLogin && (
            <>
              <form action="" className="registerForm" onSubmit={submitLogin}>
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  placeholder="name@example.com"
                  name="email"
                  value={userInfo.email}
                  onChange={setFormValues}
                />
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  //   placeholder="example: Count Woofula"
                  name="password"
                  value={userInfo.password}
                  onChange={setFormValues}
                />

                <div className="registerButtonContainer">
                  <button className="register">Sign in</button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Register;
