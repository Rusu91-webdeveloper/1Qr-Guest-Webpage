"use client";

import React, { useRef, useEffect, useState } from "react";

interface CustomAnimatedTitleProps {
  text: string;
  className?: string;
}

export default function CustomAnimatedTitle({
  text,
  className = "",
}: CustomAnimatedTitleProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateMaskPosition = () => {
      if (svgRef.current && cursor.x !== 0 && cursor.y !== 0) {
        const svgRect = svgRef.current.getBoundingClientRect();
        const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
        const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;

        const mask = svgRef.current.querySelector(
          "#revealMask"
        ) as SVGRadialGradientElement;
        if (mask) {
          mask.setAttribute("cx", `${cxPercentage}%`);
          mask.setAttribute("cy", `${cyPercentage}%`);
        }
      }
    };

    updateMaskPosition();
  }, [cursor]);

  return (
    <div className={className}>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${text.length * 150} 300`}
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
        className="w-full select-none">
        <defs>
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

          <radialGradient
            id="revealMask"
            cx="50%"
            cy="50%"
            r="35%">
            <stop
              offset="0%"
              stopColor="white"
            />
            <stop
              offset="100%"
              stopColor="black"
            />
          </radialGradient>

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

        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-[12rem] font-bold fill-transparent stroke-neutral-800"
          strokeWidth="2">
          {text}
        </text>

        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-[12rem] font-bold fill-transparent stroke-neutral-700 animate-draw"
          strokeWidth="2">
          {text}
        </text>

        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className={`text-[12rem] font-bold transition-opacity duration-300 ${
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
