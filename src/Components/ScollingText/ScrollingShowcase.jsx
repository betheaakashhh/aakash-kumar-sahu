import React from "react";
import "./scrollcase.css";

const texts = [
  "Innovation Drives Us",
  "Future Ready Solutions",
  "Empowering Digital Growth",
  "Creative Technology Studio",
  "Building With Passion",
  "Crafted for Performance",
  "Seamless User Experience",
  "Driven by Curiosity",
  "Next-Gen Intelligence",
  "Powered by Vision"
];

const ScrollingShowcase = () => {
  return (
    <section className="scrolling-section">
      <div className="scrolling-fade left"></div>
      <div className="scrolling-track">
        {[...texts, ...texts].map((text, i) => (
          <h2 key={i} className={`scrolling-text text-${(i % 5) + 1}`}>
            {text}
          </h2>
        ))}
      </div>
      <div className="scrolling-fade right"></div>
    </section>
  );
};

export default ScrollingShowcase;
