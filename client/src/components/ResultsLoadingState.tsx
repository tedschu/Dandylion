import { useState, useEffect } from "react";
import { Slide } from "@mui/material";
import marrakesh from "../assets/images/destinations/marrakesh.png";
import michigan from "../assets/images/destinations/michigan.png";
import italy from "../assets/images/destinations/italy.png";
import mexico from "../assets/images/destinations/mexico.png";
import kyoto from "../assets/images/destinations/kyoto.png";
import peru from "../assets/images/destinations/peru.png";
import newOrleans from "../assets/images/destinations/new_orleans.png";
import olympic from "../assets/images/destinations/olympic_national_park.png";
import thailand from "../assets/images/destinations/thailand.png";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

type ResultsLoadingStateProps = {
  showAPIErrorMessage: boolean;
  setShowAPIErrorMessage: React.Dispatch<React.SetStateAction<boolean>>;
};

function ResultsLoadingState({
  showAPIErrorMessage,
  setShowAPIErrorMessage,
}: ResultsLoadingStateProps) {
  const images = [
    marrakesh,
    michigan,
    italy,
    mexico,
    kyoto,
    peru,
    newOrleans,
    olympic,
    thailand,
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  // TODO: RE-WRITE TO SIMPLIFY AND ENSURE THAT IMAGES ARE NOT CUT OFF

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
    setShowAPIErrorMessage(false);
  };

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0); // Start at 0

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const increment = 100 / 400;

        const newProgress = oldProgress + increment;

        // Stop at 100%
        if (newProgress >= 100) {
          return 100;
        }

        return newProgress;
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div className="resultLoadingContainer">
        {!showAPIErrorMessage && (
          <>
            {/* @ts-ignore */}
            {/* <CircularProgress color="#f7bc21" /> */}

            <h2 style={{ textAlign: "center" }}>
              It takes a moment to cover the entire world.
            </h2>
            <Box
              sx={{
                width: "80%",
                margin: "10px 0 15px 0",
                backgroundColor: "#e0e0e0",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "var(--brand-blue)",
                },
              }}
            >
              <LinearProgress variant="determinate" value={progress} />
            </Box>

            <h1
              style={{
                color: "var(--action-coral)",
                margin: "0",
                textAlign: "center",
              }}
            >
              Here are some of the places you could go:
            </h1>

            {/* Image carousel container */}
            <div
              style={{
                position: "relative",
                width: "90%",
                maxWidth: "400px",
                aspectRatio: "3/4",
                overflow: "hidden",
                margin: "20px auto",
              }}
            >
              {images.map((image, index) => (
                <Slide
                  key={index}
                  direction="left"
                  in={index === currentIndex}
                  timeout={500}
                  mountOnEnter
                  unmountOnExit
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <img
                      src={image}
                      alt={`Loading image ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </Slide>
              ))}
            </div>
          </>
        )}
        {showAPIErrorMessage && (
          <>
            <h2>Well, this is embarassing.</h2>
            <p>
              Our systems are overloaded and we're currently unable to get your
              travel recommendations. Please try again soon.{" "}
            </p>
            <button type="button" onClick={() => handleClick()}>
              Home
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default ResultsLoadingState;
