import { useRef } from "react";
import gsap from "gsap";

export default function HoverImage({ src, children }) {
  const img = useRef(null);

  const move = (e) => {
    gsap.to(img.current, {
      x: e.clientX + 20,
      y: e.clientY + 20,
      opacity: 1,
      duration: 0.3,
    });
  };

  const leave = () => {
    gsap.to(img.current, { opacity: 0 });
  };

  return (
    <>
      <span onMouseMove={move} onMouseLeave={leave}>
        {children}
      </span>
      <img ref={img} src={src} className="hover-image" />
    </>
  );
}
