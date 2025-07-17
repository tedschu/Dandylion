import { motion } from "motion/react";
import { useRef, useEffect, useState } from "react";
import airplane from "../assets/images/airplane.png";

function JourneyProgress({ currentStep, totalSteps }) {
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const [planePosition, setPlanePosition] = useState({ x: 0, y: 0, angle: 0 });
  const [milestonePositions, setMilestonePositions] = useState([]);

  const journeyProgressStyle = {
    position: "absolute",
    top: "40px",
    left: "2%",
    right: "2%",
    height: "300px",
    pointerEvents: "none",
    zIndex: 2,
  };

  // Responsive adjustments
  const isMobile = window.innerWidth <= 768;

  // Expanded path data to use more screen width
  const pathData = isMobile
    ? "M 20 200 Q 100 170 180 140 T 340 110 T 480 80 T 560 70"
    : "M 40 250 Q 200 210 360 190 T 680 160 T 1000 120 T 1400 60";

  // Expanded viewBox to accommodate wider path
  const responsiveViewBox = isMobile ? "0 0 580 220" : "0 0 1440 300";

  // Calculate milestone positions and current progress distance
  useEffect(() => {
    if (!pathRef.current) return;

    const path = pathRef.current;
    const totalLength = path.getTotalLength();
    setPathLength(totalLength);

    // Calculate milestone positions
    const positions = [];
    const distances = [];

    for (let i = 0; i < totalSteps; i++) {
      const distance = (i / (totalSteps - 1)) * totalLength;
      const point = path.getPointAtLength(distance);
      positions.push({ x: point.x, y: point.y });
      distances.push(distance);
    }

    setMilestonePositions(positions);

    // Calculate current progress distance (to current step's milestone)
    const currentStepIndex = Math.min(currentStep - 1, totalSteps - 1);
    const currentDistance =
      currentStepIndex >= 0 ? distances[currentStepIndex] : 0;

    // Get current position along path
    const currentPoint = path.getPointAtLength(currentDistance);

    // Get a point slightly ahead to calculate rotation
    const lookAheadDistance = Math.min(currentDistance + 10, totalLength);
    const lookAheadPoint = path.getPointAtLength(lookAheadDistance);

    // Calculate angle
    const deltaX = lookAheadPoint.x - currentPoint.x;
    const deltaY = lookAheadPoint.y - currentPoint.y;
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    setPlanePosition({
      x: currentPoint.x,
      y: currentPoint.y,
      angle: angle,
      distance: currentDistance, // Store the distance for progress line
    });
  }, [currentStep, totalSteps]);

  // Responsive vehicle sizing
  const vehicleStyle = {
    width: isMobile ? "56px" : "100px",
    height: isMobile ? "28px" : "50px",
    filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.4))",
  };

  // Calculate airplane centering offsets
  const airplaneWidth = isMobile ? 56 : 100;
  const airplaneHeight = isMobile ? 28 : 50;

  if (isMobile) {
    journeyProgressStyle.height = "220px";
  }

  return (
    <div style={journeyProgressStyle}>
      <svg
        width="100%"
        height="100%"
        viewBox={responsiveViewBox}
        style={{ overflow: "visible" }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Hidden reference path for calculations */}
        <path
          ref={pathRef}
          d={pathData}
          fill="none"
          stroke="transparent"
          strokeWidth="0"
        />

        {/* Background path (full route) */}
        <path
          d={pathData}
          fill="none"
          stroke="rgba(123, 160, 91, 0.3)"
          strokeWidth={isMobile ? "3" : "4"}
          strokeDasharray="8,8"
          strokeLinecap="round"
        />

        {/* Progress path (completed portion) */}
        <motion.path
          d={pathData}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={isMobile ? "4" : "6"}
          strokeLinecap="round"
          strokeDasharray={pathLength}
          initial={{ strokeDashoffset: pathLength }}
          animate={{
            strokeDashoffset: pathLength - (planePosition.distance || 0),
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient
            id="progressGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#d4b24f" />
            <stop offset="100%" stopColor="#c17c3a" />
          </linearGradient>
        </defs>

        {/* Milestone dots at exact path positions */}
        {milestonePositions.map((position, index) => (
          <motion.circle
            key={index}
            cx={position.x}
            cy={position.y}
            r={isMobile ? "6" : "8"}
            fill={
              index + 1 <= currentStep ? "#d4b24f" : "rgba(123, 160, 91, 0.3)"
            }
            stroke="#f7f4ef"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{
              scale: index + 1 <= currentStep ? 1.2 : 1,
              filter:
                index + 1 <= currentStep
                  ? "drop-shadow(0 0 8px rgba(212, 178, 79, 0.5))"
                  : "none",
            }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          />
        ))}

        {/* Moving airplane */}
        <motion.g
          animate={{
            x: planePosition.x,
            y: planePosition.y,
            rotate: planePosition.angle,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ transformOrigin: "center" }}
        >
          <foreignObject
            x={-airplaneWidth / 2}
            y={-airplaneHeight / 2}
            width={airplaneWidth}
            height={airplaneHeight}
          >
            <img src={airplane} alt="Travel progress" style={vehicleStyle} />
          </foreignObject>
        </motion.g>
      </svg>
    </div>
  );
}

export default JourneyProgress;
