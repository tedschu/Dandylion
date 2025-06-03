import { useState, useSyncExternalStore } from "react";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../types/types";

type RegisterProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

function Register({
  setIsModalOpen,
  userInfo,
  setUserInfo,
  isLoggedIn,
  setIsLoggedIn,
}: RegisterProps) {
  // Will always show as a modal, whereas login will be a page accessed from hamburger menu

  const [registerError, setRegisterError] = useState(false);

  const navigate = useNavigate();

  // Submit button for account registration via Dandylion
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    registerUser();
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
        navigate("/your-destination-plan");
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setRegisterError(true);
    }
  };

  return (
    <>
      <div className="registerModalOverlay">
        <div className="registerModalContentContainer">
          <p
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              margin: "0",
              color: "gray",
              cursor: "pointer",
            }}
            onClick={() => setIsModalOpen(false)}
          >
            X
          </p>
          <h1>Get your personalized results</h1>
          <p>[Continue with Google]</p>
          <p>OR</p>
          <form action="" className="registerForm" onSubmit={submit}>
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
              onClick={() => navigate("/login")}
              style={{ cursor: "pointer" }}
            >
              Sign in
            </span>
          </h4>
        </div>
      </div>
    </>
  );
}

export default Register;
