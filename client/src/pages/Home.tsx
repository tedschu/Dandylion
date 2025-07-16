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
import background from "../assets/images/background.png";
import beach from "../assets/images/beach copy.png";
import DestinationCards from "../components/FanOutImages";
import FanOutImages from "../components/FanOutImages";
import MapIcon from "@mui/icons-material/Map";
import DirectionsIcon from "@mui/icons-material/Directions";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import itineraryExample from "../assets/images/itinerary-example.png";
import itineraryExample2 from "../assets/images/itinerary-example-2.png";
import itineraryExample3 from "../assets/images/itinerary-example-3.png";
import { Stack } from "@mui/material";
import ScrollRevealSteps from "../components/ScrollRevealSteps";

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
          <img src={beach} alt="hero" className="heroImage" />
          <div className="homeHeroHeaderContainer">
            <div></div>
            <h1 style={{ fontWeight: "bold", fontSize: "25px" }}>
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
            </div>
            <div className="homeBottomBoxContainer">
              <div className="homeBottomBoxTextContainer">
                <h3>No matter how you travel, we've got you covered.</h3>
                <p>
                  Whether you know where you’re going or are still deciding,
                  Dandylion creates a detailed plan just for you.
                </p>
              </div>
              <FanOutImages />
            </div>
            <div className="homeBottomHowToContainer">
              <ScrollRevealSteps />
              {/* <div className="homeBottomHowToContentContainer">
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "-10px",
                    backgroundColor: "var(--forest-green)",
                    padding: "10px",
                    height: "20px",
                    width: "20px",
                    borderRadius: "50%",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  1
                </div>
                <h3>Where are you at in your planning?</h3>
                <div className="homeBottomHowToBox">
                  <div className="homeBottomHowToContentBox">
                    <MapIcon
                      style={{
                        width: "35px",
                        height: "35px",
                        fill: "var(--forest-green)",
                        backgroundColor: "white",
                        padding: "5px",
                        borderRadius: "50%",
                        margin: "10px 0",
                      }}
                    />
                    <h4>I know where I'm going</h4>
                    <p>
                      You’ve already picked the destination. Now let us build
                      your itinerary.
                    </p>
                  </div>
                  <div className="homeBottomHowToContentBox">
                    <DirectionsIcon
                      style={{
                        width: "35px",
                        height: "35px",
                        fill: "var(--forest-green)",
                        backgroundColor: "white",
                        padding: "5px",
                        borderRadius: "50%",
                        margin: "10px 0",
                      }}
                    />
                    <h4>I'm still deciding</h4>
                    <p>
                      Discover tailored destinations based on your travel style
                      and interests.
                    </p>
                  </div>
                </div>
              </div> */}

              {/* <div className="homeBottomHowToContentContainer">
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "-10px",
                    backgroundColor: "var(--forest-green)",
                    padding: "10px",
                    height: "20px",
                    width: "20px",
                    borderRadius: "50%",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  2
                </div>
                <h3>Tell us about yourself</h3>
                <p
                  style={{ color: "var(--brand-slate-light", fontSize: "16px" }}
                >
                  Answer a few questions so we can match you with destinations
                  and experiences you'll love.
                </p>

                <div
                  style={{
                    margin: "15px 0",
                    textAlign: "center",
                    backgroundColor: "var(--back-cream)",
                    padding: "10px",
                    boxShadow: "3px 3px 3px lightgray",
                    borderRadius: "9px",
                    // border: "1px solid var(--ocean-blue)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <p style={{ fontWeight: "bold" }}>Our AI analyzes:</p>
                  <p>
                    Your preferences • Travel style • Budget • Interests •
                    Timeline
                  </p>
                  <AutoFixHighIcon
                    style={{
                      // backgroundColor: "var(--ocean-blue)",
                      fill: "var(--ocean-blue)",
                      height: "40px",
                      width: "40px",
                      margin: "5px",
                      borderRadius: "50%",
                      // border: "1px solid var(--ocean-blue)",
                    }}
                  />
                </div>
              </div>

              <div className="homeBottomHowToContentContainer">
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "-10px",
                    backgroundColor: "var(--forest-green)",
                    padding: "10px",
                    height: "20px",
                    width: "20px",
                    borderRadius: "50%",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  3
                </div>
                <h3>Explore your custom journey</h3>
                <div className="homeBottomItineraryContent">
                  <img src={itineraryExample} alt="" />
                  <div className="homeBottomItineraryBoxContainer">
                    <div className="homeBottomItineraryBox">
                      Personalized destination matching
                    </div>
                    <div className="homeBottomItineraryBox">
                      Day-by-day detailed itineraries
                    </div>
                    <div className="homeBottomItineraryBox">
                      Restaurant and dining recommendations
                    </div>
                    <div className="homeBottomItineraryBox">
                      Accommodation suggestions
                    </div>
                    <div className="homeBottomItineraryBox">
                      Local insights: tips, cultural recommendations
                    </div>
                  </div>
                </div>
              </div> */}
            </div>

            {/* <div className="homeBottomExampleContainer">
              <div className="homeBottomExampleContentContainer"></div>
            </div> */}

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
