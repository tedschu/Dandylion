import { useNavigate } from "react-router-dom";
import beeLogo from "../assets/bee.png";
import prague from "../assets/prague_homepage.png";
import kyoto from "../assets/images/destinations/kyoto.png";
import paraguay from "../assets/images/destinations/paraguay.png";
import mexico from "../assets/images/destinations/mexico.png";
import example_result from "../assets/recommendation-example_cropped.png";
import { useState, useEffect } from "react";
import { QuestionsResponsesProvider } from "../contexts/QuestionsResponsesContext";
import { useAuth } from "../contexts/AuthContext";
import { div } from "motion/react-client";
import background from "../assets/images/background.jpg";

function Home() {
  const storedToken = localStorage.getItem("token");

  const { isLoggedIn, token, setUserInfo } = useAuth();
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getUserData();
  }, [isLoggedIn, token]);

  const getUserData = async () => {
    try {
      const response = await fetch("/api/users/me", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUserInfo({
          firstName: data.firstName,
          email: data.email,
        });
      }

      if (!response.ok) {
        console.log(data);
      }
    } catch (error) {
      console.error("error fetching user data:", error);
    }
  };

  const heroImage = document.querySelector(".heroImage");
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const zoomFactor = 1 + scrolled * 0.0002;
    if (heroImage && heroImage instanceof HTMLElement) {
      heroImage.style.transform = `scale(${zoomFactor})`;
    }
  });

  return (
    <>
      <div className="homeContainer">
        {/* TOP HALF / HERO SECTION */}
        <div className="homeHeroContainer">
          <img src={background} alt="hero" className="heroImage" />
          <div className="homeHeroHeaderContainer">
            <div></div>
            <h1 style={{ fontWeight: "normal", fontSize: "25px" }}>
              dandylion.ai
            </h1>
            {isLoggedIn ? (
              <button
                className="login"
                style={{
                  alignSelf: "center",
                  justifySelf: "flex-end",
                  margin: "0 20px 0 0",
                }}
                onClick={() => navigate("/me")}
              >
                My plans
              </button>
            ) : (
              <button
                className="login"
                style={{
                  alignSelf: "center",
                  justifySelf: "flex-end",
                  margin: "0 20px 0 0",
                }}
                onClick={() => navigate("/login")}
              >
                login
              </button>
            )}
          </div>

          <div className="homeHeroContentContainer">
            <h2 className="heroText">
              Travel planning
              <br />
              that is
              <span className="heroBold"> so you</span>.
            </h2>

            <div className="buttonContainer">
              <div className="formContainer">
                {/* <input
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
                /> */}
                <button className="next" onClick={() => navigate("/path")}>
                  Get started
                </button>
              </div>
            </div>
            {showAlert && (
              <div className="alert">
                <h3>Make sure you've added your name and email.</h3>
              </div>
            )}
          </div>
        </div>
        {/* <div className="divider"> t</div>

        {/* BOTTOM HALF / CONTENT SECTION */}
        <div className="homeBottomContainer">
          <div className="homeBottomContentContainer">
            <div className="homeBottomTextContainer">
              <h1>
                Skip the endless research. Get a personalized day-by-day
                itinerary in minutes.
              </h1>
              <p>
                Most travelers spend 20+ hours planning a single trip. Kinda
                takes the fun out of it, right? Whether you're stuck choosing a
                destination or know where you're going but need help with the
                details, we create a curated plan built around your travel
                style.
              </p>
              <br />
              <p>It's just a few simple steps:</p>
            </div>
            <div className="homeBottomBoxContainer">
              <div className="homeBottomBox">
                <div className="homeBottomBoxNumber">1</div>
                <h3>Tell us about yourself</h3>
                <p>
                  Help us design your ideal trip by thoughtfully answering a few
                  quick questions.
                </p>
              </div>
              <div className="homeBottomBox">
                <div className="homeBottomBoxNumber">2</div>

                <h3>Explore your custom journey</h3>
                <p>
                  Get destinations, detailed daily plans, and much more that is
                  tailored to the trip you want.
                </p>
              </div>
              {/* SVG dotted line */}
              {/* <svg
                style={{
                  position: "absolute",
                  top: "150px", // Adjust based on your layout
                  left: "70%",
                  width: "300px",
                  height: "250px",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              >
                <path
                  d="M 260 20 Q 270 60 250 90 Q 170 130 180 170 Q 150 210 120 230"
                  stroke="var(--action-coral)"
                  strokeWidth="5"
                  strokeDasharray="8,6"
                  fill="none"
                />
              </svg> */}
            </div>
            <h3 style={{ color: "var(--action-coral)", fontSize: "26px" }}>
              Maybe you'll go to...
            </h3>
            <div className="homeBottomExampleContainer">
              <div className="homeBottomExampleContentContainer">
                <h2
                  style={{
                    fontFamily: "Pacifico",
                    fontSize: "30px",
                    margin: "15px 0",
                  }}
                >
                  Prague, Czech Republic
                </h2>
                <p style={{ textAlign: "left", fontSize: "18px" }}>
                  Prague is absolutely perfect for you two! This enchanting city
                  has all the charm of Amsterdam with its winding cobblestone
                  streets, stunning bridges spanning the Vitava River, and
                  incredible Gothic and Baroque architecture. October is ideal
                  timing - you'll catch beautiful autumn colors while avoiding
                  summer crowds. The city is incredibly walkable and perfect for
                  getting wonderfully lost in its maze-like Old Town, plus Czech
                  cuisine has fantastic vegan options and the cost of living
                  makes your $1,000 budget go far!
                </p>
                <img
                  src={prague}
                  alt=""
                  style={{ borderRadius: "10px", width: "90%" }}
                />
                <div
                  style={{
                    width: "80%",
                    height: "2px",
                    backgroundColor: "var(--action-coral)",
                    margin: "35px 0 10px 0",
                  }}
                />

                <h3
                  style={{
                    margin: "20px 0 10px 0",
                    fontSize: "22px",
                    color: "var(--brand-blue)",
                  }}
                >
                  Your travel plan will include:
                </h3>
                <div
                  style={{
                    backgroundColor: "rgba(255, 139, 102, 0.2)",
                    width: "75%",
                    borderRadius: "10px",
                    padding: "20px",
                  }}
                >
                  <li>Recommendations on destinations and things to see</li>
                  <li>
                    The best places to stay and eat that fit your lifestyle
                  </li>
                  <li>Detailed itineraries for the length of your trip</li>
                  <li>Advice on local customs and tips on traveling</li>
                  <li>And (of course) much more!</li>
                </div>
                <img
                  src={beeLogo}
                  style={{ width: "50px", margin: "20px 0 5px 0" }}
                  alt=""
                />
              </div>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="next"
              style={{ margin: "20px 0" }}
            >
              Ready to get started?
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
