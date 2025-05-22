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

function ResultsLoadingState() {
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      {/* @ts-ignore */}
      <CircularProgress color="#f7bc21" />

      <h2>It takes a moment to cover the entire world...</h2>

      {/* Image carousel container */}
      <div
        style={{
          position: "relative",
          maxWidth: "400px",
          maxHeight: "600px",
          width: "80%",
          height: "80%",
          margin: "20px auto",
          borderRadius: "8px",
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
                  objectFit: "cover",
                }}
              />
            </div>
          </Slide>
        ))}
      </div>
    </>
  );
}

export default ResultsLoadingState;
