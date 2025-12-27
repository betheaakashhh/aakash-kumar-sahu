import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MagneticText({ children, label = "View" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;

    const move = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power3.out",
      });

      document.body.classList.add("cursor-active");
      document.querySelector(".cursor-text").innerText = label;
    };

    const leave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.4 });
      document.body.classList.remove("cursor-active");
    };

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);

    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [label]);

  return (
    <span className="magnetic" ref={ref}>
      {children}
    </span>
  );
}
