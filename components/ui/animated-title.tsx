"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedTitleProps {
  text: string;
  className?: string;
}

export default function AnimatedTitle({
  text,
  className = "",
}: AnimatedTitleProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  // Update mask position based on cursor movement
  useEffect(() => {
    if (svgRef.current && cursor.x !== 0 && cursor.y !== 0) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <div className={className}>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${text.length * 100} 120`}
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
        className="w-full select-none">
        <defs>
          {/* Gradient definition */}
          <linearGradient
            id="titleGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%">
            <stop
              offset="0%"
              stopColor="#FF0080"
            />
            <stop
              offset="50%"
              stopColor="#7928CA"
            />
            <stop
              offset="100%"
              stopColor="#FF0080"
            />
          </linearGradient>

          {/* Animated mask for reveal effect */}
          <motion.radialGradient
            id="revealMask"
            cx={maskPosition.cx}
            cy={maskPosition.cy}
            r="20%"
            animate={maskPosition}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}>
            <stop
              offset="0%"
              stopColor="white"
            />
            <stop
              offset="100%"
              stopColor="black"
            />
          </motion.radialGradient>

          <mask id="textMask">
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#revealMask)"
            />
          </mask>
        </defs>

        {/* Background stroke text */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-7xl font-bold fill-transparent stroke-neutral-800"
          strokeWidth="1">
          {text}
        </text>

        {/* Animated outline text */}
        <motion.text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-7xl font-bold fill-transparent stroke-neutral-700"
          strokeWidth="1"
          initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}>
          {text}
        </motion.text>

        {/* Gradient fill text with mask */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className={`text-7xl font-bold transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          fill="url(#titleGradient)"
          mask="url(#textMask)">
          {text}
        </text>
      </svg>
    </div>
  );
}
