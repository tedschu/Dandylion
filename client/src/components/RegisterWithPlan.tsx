import { useState, useSyncExternalStore } from "react";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../types/types";
import { useAuth } from "../contexts/AuthContext";
import { h3 } from "motion/react-client";
import itineraryExample from "../assets/images/itinerary-example.png";

type RegisterWithPlanProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function RegisterWithPlan({ setIsModalOpen }: RegisterWithPlanProps) {
  // Will always show as a modal, whereas login will be a page accessed from hamburger menu
  const { userInfo, setUserInfo, isLoggedIn, setIsLoggedIn, token, setToken } =
    useAuth();

  const [registerError, setRegisterError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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

      console.log("Here is data:", data);

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

      let errorMsg = "Something went wrong";
      if (error instanceof Error) {
        errorMsg = error.message;
      } else if (typeof error === "string") {
        errorMsg = error;
      }
      setErrorMessage("Oops. " + errorMsg);
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

      if (!response.ok) {
        setLoginFailed(true);
        throw new Error("Login failed");
      } else {
        localStorage.setItem("token", data.token); // SETS TOKEN TO LOCALSTORAGE IN BROWSER
        localStorage.setItem("userId", data.id); // SETS USER ID INTO LOCALSTORAGE TO HELP WITH RENDERING USER DATA ON GAME AND ACCOUNT PAGES
        setToken(data.token);
        setIsLoggedIn(true);
        setLoginFailed(false);
        navigate("/your-destination-plan");
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error during login", error);
      setLoginFailed(true);
    }
  }

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
              fontSize: "16px",
            }}
            onClick={() => setIsModalOpen(false)}
          >
            X
          </p>
          <div className="registerModalText">
            <h1 style={{ margin: "10px 0 5px 0" }}>
              Almost there! Your custom travel plan is ready
            </h1>
            <p
              style={{
                fontSize: "16px",
                margin: "10px 0 7px 0",
                color: "var(--brand-slate-light)",
              }}
            >
              Your personalized plan includes:
            </p>
            <li>Custom destination matching for your travel style</li>
            <li>Day-by-day itineraries with specific recommendations </li>
            <li>Restaurants and local experiences you'll enjoy</li>
            <li>Accommodation suggestions within your budget</li>
          </div>
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
                  className="loginInput"
                  type="text"
                  placeholder="Alice"
                  name="firstName"
                  value={userInfo.firstName}
                  onChange={setFormValues}
                />
                <label htmlFor="email">Email:</label>
                <input
                  className="loginInput"
                  type="text"
                  placeholder="name@example.com"
                  name="email"
                  value={userInfo.email}
                  onChange={setFormValues}
                />
                <label htmlFor="password">Password:</label>
                <input
                  className="loginInput"
                  type="password"
                  //   placeholder="example: Count Woofula"
                  name="password"
                  value={userInfo.password}
                  onChange={setFormValues}
                />

                <div className="registerButtonContainer">
                  <button className="register" style={{ color: "white" }}>
                    Get my results
                  </button>
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
          {registerError && (
            <h3 style={{ margin: "2px", color: "red" }}>{errorMessage}</h3>
          )}
        </div>
      </div>
    </>
  );
}

export default RegisterWithPlan;
