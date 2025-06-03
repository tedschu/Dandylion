import { useNavigate } from "react-router-dom";
import { UserInfo } from "../types/types";
import { useState } from "react";

type LoginProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

function Login({
  userInfo,
  setUserInfo,
  isLoggedIn,
  setIsLoggedIn,
  setToken,
}: LoginProps) {
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
            username: userInfo.email,
            password: userInfo.password,
          }),
        }
      );

      const data = await response.json();

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
      <p>[Continue with Google]</p>
      <p>OR</p>
      <form action="" className="registerForm" onSubmit={submit}>
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
  );
}

export default Login;
