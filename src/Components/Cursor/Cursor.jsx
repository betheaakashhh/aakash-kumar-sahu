import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursor = useRef(null);
  const text = useRef(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setEnabled(false);
      return;
    }

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };

    const move = e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", move);

    gsap.ticker.add(() => {
      pos.x += (mouse.x - pos.x) * 0.15;
      pos.y += (mouse.y - pos.y) * 0.15;

      gsap.set(cursor.current, {
        x: pos.x - 40,
        y: pos.y - 40,
      });
    });

    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={cursor} className="cursor">
        <span ref={text} className="cursor-text"></span>
      </div>

      {/* Noise filter */}
      <svg className="noise">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feDisplacementMap in="SourceGraphic" scale="8" />
        </filter>
      </svg>
    </>
  );
}
