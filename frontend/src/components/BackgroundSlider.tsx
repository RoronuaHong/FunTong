"use client";

import React, { useEffect, useState } from "react";
import "./BackgroundSlider.css";

const backgrounds = [
  "/backgrounds/am.jpg",
  "/backgrounds/dr.jpg",
  "/backgrounds/pom.jpg",
  "/backgrounds/wr.jpg",
];

export default function BackgroundSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
    }, 8000); // 每8秒切换一次

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="background-slider">
      {backgrounds.map((bg, index) => (
        <div
          key={bg}
          className={`background-slide ${
            index === currentIndex ? "active" : ""
          }`}
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      ))}
      <div className="background-overlay" />
    </div>
  );
}
