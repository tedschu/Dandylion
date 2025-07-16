import React, { useEffect, useRef, useState } from "react";

import MapIcon from "@mui/icons-material/Map";
import DirectionsIcon from "@mui/icons-material/Directions";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import itineraryExample from "../assets/images/itinerary-example.png";

const ScrollRevealSteps = () => {
  const [visibleSteps, setVisibleSteps] = useState(new Set());
  const stepsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = parseInt(entry.target.dataset.stepIndex);
            // Add delay based on step index for staggered animation
            setTimeout(() => {
              setVisibleSteps((prev) => new Set([...prev, stepIndex]));
            }, stepIndex * 200); // 200ms delay between each step
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    stepsRef.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => observer.disconnect();
  }, []);

  const getStepStyle = (stepIndex, isVisible) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(30px)",
    transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    transitionDelay: isVisible ? "0ms" : "0ms",
  });

  return (
    <div className="homeBottomHowToContainer">
      <h3>Here's how it works:</h3>

      {/* Step 1 */}
      <div
        className="homeBottomHowToContentContainer"
        ref={(el) => (stepsRef.current[0] = el)}
        data-step-index="0"
        style={getStepStyle(0, visibleSteps.has(0))}
      >
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
              You've already picked the destination. Now let us build your
              itinerary.
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
              Discover tailored destinations based on your travel style and
              interests.
            </p>
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <div
        className="homeBottomHowToContentContainer"
        ref={(el) => (stepsRef.current[1] = el)}
        data-step-index="1"
        style={getStepStyle(1, visibleSteps.has(1))}
      >
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
        <p style={{ color: "var(--brand-slate-light)", fontSize: "16px" }}>
          Answer a few questions so we can match you with destinations and
          experiences you'll love.
        </p>

        <div
          style={{
            margin: "15px 0",
            textAlign: "center",
            backgroundColor: "var(--back-cream)",
            padding: "10px",
            boxShadow: "3px 3px 3px lightgray",
            borderRadius: "9px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p style={{ fontWeight: "bold" }}>Our AI analyzes:</p>
          <p>Your preferences • Travel style • Budget • Interests • Timeline</p>
          <AutoFixHighIcon
            style={{
              fill: "var(--ocean-blue)",
              height: "40px",
              width: "40px",
              margin: "5px",
              borderRadius: "50%",
            }}
          />
        </div>
      </div>

      {/* Step 3 */}
      <div
        className="homeBottomHowToContentContainer"
        ref={(el) => (stepsRef.current[2] = el)}
        data-step-index="2"
        style={getStepStyle(2, visibleSteps.has(2))}
      >
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
      </div>
    </div>
  );
};

export default ScrollRevealSteps;
