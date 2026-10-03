"use client";
import { useEffect, useRef } from "react";

export default function ScrollReveal({ children, className = "", stagger = false, as: Tag = "div" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.07, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const base = stagger ? "stagger-children" : "scroll-reveal";
  return (
    <Tag ref={ref} className={`${base} ${className}`}>
      {children}
    </Tag>
  );
}
