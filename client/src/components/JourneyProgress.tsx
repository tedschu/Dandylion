import { motion } from "motion/react";
import { useRef, useEffect, useState } from "react";
import airplane from "../assets/images/airplane.png";

function JourneyProgress({ currentStep, totalSteps = 10 }) {
  const progressPercent = (currentStep / totalSteps) * 100;
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const [planePosition, setPlanePosition] = useState({ x: 0, y: 0, angle: 0 });

  const journeyProgressStyle = {
    position: "absolute",
    top: "30px",
    left: "5%",
    right: "5%",
    height: "280px",
    pointerEvents: "none",
    zIndex: 10,
  };

  // Responsive adjustments
  const isMobile = window.innerWidth <= 768;

  const pathData = isMobile
    ? "M 30 200 Q 80 170 130 140 T 230 110 T 350 80 T 400 70"
    : "M 50 250 Q 130 210 210 190 T 370 160 T 530 120 T 770 60";

  const responsiveViewBox = isMobile ? "0 0 420 220" : "0 0 820 300";

  // Calculate milestone positions along the actual path
  const getMilestonePositions = () => {
    if (!pathRef.current) return [];

    const path = pathRef.current;
    const totalLength = path.getTotalLength();
    const positions = [];

    for (let i = 0; i < totalSteps; i++) {
      const distance = (i / (totalSteps - 1)) * totalLength;
      const point = path.getPointAtLength(distance);
      positions.push({ x: point.x, y: point.y });
    }

    return positions;
  };

  // Calculate plane position and rotation
  useEffect(() => {
    if (!pathRef.current) return;

    const path = pathRef.current;
    const totalLength = path.getTotalLength();
    setPathLength(totalLength);

    // Get current position along path
    const currentDistance = (progressPercent / 100) * totalLength;
    const currentPoint = path.getPointAtLength(currentDistance);

    // Get a point slightly ahead to calculate rotation
    const lookAheadDistance = Math.min(currentDistance + 5, totalLength);
    const lookAheadPoint = path.getPointAtLength(lookAheadDistance);

    // Calculate angle
    const deltaX = lookAheadPoint.x - currentPoint.x;
    const deltaY = lookAheadPoint.y - currentPoint.y;
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    setPlanePosition({
      x: currentPoint.x,
      y: currentPoint.y,
      angle: angle,
    });
  }, [progressPercent]);

  const vehicleStyle = {
    width: isMobile ? "60px" : "80px",
    height: isMobile ? "30px" : "40px",
    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
  };

  if (isMobile) {
    journeyProgressStyle.height = "220px";
  }

  const milestonePositions = getMilestonePositions();

  return (
    <div style={journeyProgressStyle}>
      <svg
        width="100%"
        height="100%"
        viewBox={responsiveViewBox}
        style={{ overflow: "visible" }}
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
          strokeWidth="3"
          strokeDasharray="8,8"
          strokeLinecap="round"
        />

        {/* Progress path (completed portion) */}
        <motion.path
          d={pathData}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={pathLength || 800}
          initial={{ strokeDashoffset: pathLength || 800 }}
          animate={{
            strokeDashoffset:
              (pathLength || 800) -
              ((pathLength || 800) * progressPercent) / 100,
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
            r="6"
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
          <foreignObject x="-90" y="-30" width="80" height="40">
            <img src={airplane} alt="Travel progress" style={vehicleStyle} />
          </foreignObject>
        </motion.g>
      </svg>
    </div>
  );
}

export default JourneyProgress;
