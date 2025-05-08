// DandelionSeedsCSS.jsx
import React from "react";
import "../dandelion-seeds.css"; // Import the CSS

const DandelionSeedsCSS = () => {
  return (
    <div className="seeds-container">
      {/* We'll create 15 seed elements */}
      {Array.from({ length: 15 }).map((_, index) => (
        <div key={index} className="seed">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="1.5" fill="white" />
            <path
              d="M12 2 Q16 8, 12 12 Q8 8, 12 2"
              stroke="white"
              strokeWidth="0.7"
              fill="white"
            />
            <path
              d="M12 12 Q16 16, 22 14 Q18 10, 12 12"
              stroke="white"
              strokeWidth="0.7"
              fill="white"
            />
            <path
              d="M12 12 Q8 16, 2 14 Q6 10, 12 12"
              stroke="white"
              strokeWidth="0.7"
              fill="white"
            />
            <path
              d="M12 12 Q16 16, 14 22 Q10 18, 12 12"
              stroke="white"
              strokeWidth="0.7"
              fill="white"
            />
            <path
              d="M12 12 Q8 16, 10 22 Q14 18, 12 12"
              stroke="white"
              strokeWidth="0.7"
              fill="white"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default DandelionSeedsCSS;
