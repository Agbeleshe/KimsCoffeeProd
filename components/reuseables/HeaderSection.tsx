"use client";

import React from "react";
import bgImage from "../../public/coffeeBeans-bg.png";
import { useState, useEffect } from "react";

interface HeaderSectionProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({
  title,
  subtitle,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <div
      className={`relative text-center pt-16 min-h-[300px] overflow-hidden ${className}`}
    >
      {/* Background image layer with smooth zoom-in */}
      <div
        style={{
          backgroundImage: `url(${bgImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "scale(1)",
          animation: "zoomInBg 12s ease-in-out forwards",
        }}
        className="absolute inset-0"
      />

      {/* Overlay for visibility and readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text content */}
      <div
        className={`relative z-10  px-4 transform transition-all duration-1000 ease-ou ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        } `}
      >
        <h2
          className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white ${titleClassName}`}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            className={`text-lg max-w-3xl mx-auto mb-8  text-white ${subtitleClassName}`}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Keyframes for smooth zoom effect */}
      <style jsx>{`
        @keyframes zoomInBg {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.5);
          }
        }
      `}</style>
    </div>
  );
};
