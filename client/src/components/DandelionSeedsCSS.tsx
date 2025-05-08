// DandelionSeedsCSS.jsx
import React from "react";
import "../dandelion-seeds.css"; // Import the CSS

const DandelionSeedsCSS = () => {
  return (
    <div className="seeds-container">
      {/* We'll create 15 seed elements */}
      {Array.from({ length: 15 }).map((_, index) => (
        <div key={index} className="seed">
          <svg viewBox="10 10 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M49 75 L51 75 L51 85 L49 85 Z" fill="#d1c9b0" />

            <path d="M50 65 L50 75" stroke="#f1f1f1" strokeWidth="0.7" />

            <circle cx="50" cy="65" r="1.5" fill="rgba(255,255,255,0.95)" />

            <path
              d="M50 65 L60 50"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.5"
            />
            <path
              d="M50 65 L65 50"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.5"
            />
            <path
              d="M50 65 L70 52"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.5"
            />
            <path
              d="M50 65 L75 55"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.5"
            />
            <path
              d="M50 65 L77 60"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.5"
            />
            <path
              d="M50 65 L79 65"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.5"
            />
            <path
              d="M50 65 L80 70"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.5"
            />
            <path
              d="M50 65 L62 45"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="0.4"
            />
            <path
              d="M50 65 L67 48"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="0.4"
            />
            <path
              d="M50 65 L72 54"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="0.4"
            />
            <path
              d="M50 65 L73 60"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="0.4"
            />
            <path
              d="M50 65 L76 67"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="0.4"
            />

            <path
              d="M50 65 L40 50"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.5"
            />
            <path
              d="M50 65 L35 50"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.5"
            />
            <path
              d="M50 65 L30 52"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.5"
            />
            <path
              d="M50 65 L25 55"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.5"
            />
            <path
              d="M50 65 L23 60"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.5"
            />
            <path
              d="M50 65 L21 65"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.5"
            />
            <path
              d="M50 65 L20 70"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.5"
            />
            <path
              d="M50 65 L38 45"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="0.4"
            />
            <path
              d="M50 65 L33 48"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="0.4"
            />
            <path
              d="M50 65 L28 54"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="0.4"
            />
            <path
              d="M50 65 L27 60"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="0.4"
            />
            <path
              d="M50 65 L24 67"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="0.4"
            />

            <path
              d="M50 65 L50 35"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.5"
            />
            <path
              d="M50 65 L53 37"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.5"
            />
            <path
              d="M50 65 L47 37"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.5"
            />
            <path
              d="M50 65 L55 40"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.5"
            />
            <path
              d="M50 65 L45 40"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.5"
            />
            <path
              d="M50 65 L58 42"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="0.4"
            />
            <path
              d="M50 65 L42 42"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="0.4"
            />
            <path
              d="M50 65 L51 32"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="0.4"
            />
            <path
              d="M50 65 L49 32"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="0.4"
            />

            <path
              d="M50 65 Q63 63, 75 62"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.5"
              fill="none"
            />
            <path
              d="M50 65 Q63 67, 75 68"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.5"
              fill="none"
            />
            <path
              d="M50 65 Q37 63, 25 62"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.5"
              fill="none"
            />
            <path
              d="M50 65 Q37 67, 25 68"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.5"
              fill="none"
            />

            <path
              d="M50 65 L65 55"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="0.3"
            />
            <path
              d="M50 65 L35 55"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="0.3"
            />
            <path
              d="M50 65 L60 60"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="0.3"
            />
            <path
              d="M50 65 L40 60"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="0.3"
            />
            <path
              d="M50 65 L55 50"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="0.3"
            />
            <path
              d="M50 65 L45 50"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="0.3"
            />
            <path
              d="M50 65 L50 45"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="0.3"
            />
            <path
              d="M50 65 L52 45"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="0.3"
            />
            <path
              d="M50 65 L48 45"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="0.3"
            />

            <path
              d="M50 65 L63 59"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="0.2"
            />
            <path
              d="M50 65 L37 59"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="0.2"
            />
            <path
              d="M50 65 L55 47"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="0.2"
            />
            <path
              d="M50 65 L45 47"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="0.2"
            />
            <path
              d="M50 65 L51 40"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="0.2"
            />
            <path
              d="M50 65 L49 40"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="0.2"
            />
            <path
              d="M50 65 L71 58"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="0.2"
            />
            <path
              d="M50 65 L29 58"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="0.2"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default DandelionSeedsCSS;
