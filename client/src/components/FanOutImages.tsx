import React, { useEffect, useRef, useState } from "react";
import tokyo from "../assets/images/destinations/tokyo.png";
import kyoto from "../assets/images/destinations/kyoto.png";
import marrakesh from "../assets/images/destinations/marrakesh.png";
import mexicoCity from "../assets/images/destinations/mexico-city.png";
import kauai from "../assets/images/destinations/kauai.png";
import spain from "../assets/images/destinations/spain.png";

const FanOutImages = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how much of the component is in view
      const elementTop = rect.top;
      const elementHeight = rect.height;

      // Start animation when element enters viewport, complete when it's centered
      const startPoint = windowHeight;
      const endPoint = windowHeight / 2 - elementHeight / 2;

      if (elementTop <= startPoint && elementTop >= endPoint) {
        const progress = (startPoint - elementTop) / (startPoint - endPoint);
        setScrollProgress(Math.min(Math.max(progress, 0), 1));
      } else if (elementTop < endPoint) {
        setScrollProgress(1);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "60px 0",
    perspective: "1000px",
  };

  const getImageStyle = (index) => {
    const baseStyle = {
      position: "absolute",
      width: "230px",
      height: "350px",
      borderRadius: "5px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
      transition: "all 0.3s ease",
      backgroundSize: "cover",
      backgroundPosition: "center",
    };

    // Calculate transforms based on scroll progress
    let translateX = 0;
    let rotateZ = 0;
    let zIndex = 3;

    if (index === 0) {
      // Left image
      translateX = -150 * scrollProgress;
      rotateZ = -15 * scrollProgress;
      zIndex = 1;
    } else if (index === 1) {
      // Center image
      translateX = 0;
      rotateZ = 0;
      zIndex = 3;
    } else if (index === 2) {
      // Right image
      translateX = 150 * scrollProgress;
      rotateZ = 15 * scrollProgress;
      zIndex = 2;
    }

    return {
      ...baseStyle,
      transform: `translateX(${translateX}px) rotateZ(${rotateZ}deg)`,
      zIndex,
    };
  };

  const images = [tokyo, spain, kauai];

  return (
    <div ref={containerRef} style={containerStyle}>
      {images.map((image, index) => (
        <div
          key={index}
          style={{
            ...getImageStyle(index),
            backgroundImage: `url(${image})`, // Use backgroundImage with the imported image
          }}
          onMouseEnter={(e) => {
            e.target.style.transform += " scale(1.05)";
          }}
          onMouseLeave={(e) => {
            const index = parseInt(e.target.getAttribute("data-index"));
            let translateX = 0;
            let rotateZ = 0;

            if (index === 0) {
              translateX = -120 * scrollProgress;
              rotateZ = -15 * scrollProgress;
            } else if (index === 2) {
              translateX = 120 * scrollProgress;
              rotateZ = 15 * scrollProgress;
            }

            e.target.style.transform = `translateX(${translateX}px) rotateZ(${rotateZ}deg)`;
          }}
          data-index={index}
        >
          {image.content}
        </div>
      ))}
    </div>
  );
};

export default FanOutImages;
