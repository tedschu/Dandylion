import { StepProps } from "../types/types";
import { useNavigate } from "react-router-dom";
import beeLogo from "../assets/bee.png";

function Home({
  currentStep,
  setCurrentStep,
  userInfo,
  setUserInfo,
}: StepProps) {
  const setFormValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUserInfo?.((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="homeContainer">
        {/* TOP HALF / HERO SECTION */}
        <div className="homeHeroContainer">
          <div className="homeHeroHeaderContainer">
            <img src={beeLogo} alt="dandylion bee logo" />
            <h1>dandylion.ai</h1>
            <button
              className="login"
              style={{
                alignSelf: "center",
                justifySelf: "flex-end",
                margin: "0 12px 0 0",
              }}
            >
              login
            </button>
          </div>

          <div className="homeHeroContentContainer">
            <h2 style={{ marginBottom: "2px" }}>
              Travel planning that is{" "}
              <span style={{ fontStyle: "italic" }}>so you</span>
            </h2>

            <div className="buttonContainer">
              <div className="formContainer">
                <input
                  type="text"
                  placeholder="First name"
                  value={userInfo?.firstName}
                  name="firstName"
                  onChange={setFormValues}
                />
                <input
                  type="text"
                  placeholder="email"
                  value={userInfo?.email}
                  name="email"
                  onChange={setFormValues}
                />
                <button className="next" onClick={() => navigate("/path")}>
                  Get started
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM HALF / CONTENT SECTION */}
        <div className="homeBottomContainer">
          <div className="homeBottomContentContainer">
            <div className="homeBottomTextContainer">text text</div>
            <div className="homeBottomBoxContainer">
              <div className="homeBottomBox">test</div>{" "}
              <div className="homeBottomBox"></div>
              <div className="homeBottomBox">test</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
