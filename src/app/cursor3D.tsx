"use client";
import { useEffect, useRef } from "react";

export default function Cursor3D() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const blurRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let blurX = window.innerWidth / 2;
    let blurY = window.innerHeight / 2;

    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      // Move the 3D cursor instantly
      if (cursorRef.current) {
        cursorRef.current.style.left = `${clientX}px`;
        cursorRef.current.style.top = `${clientY}px`;
        const rotateX = (clientY / window.innerHeight - 0.5) * 30;
        const rotateY = (clientX / window.innerWidth - 0.5) * 30;
        cursorRef.current.style.transform = `translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
      // Animate the blur circle to follow the cursor with more distance and less delay
      if (blurRef.current) {
        // Increase the offset for more distance (e.g., 200px diagonally)
        const targetX = clientX + 200;
        const targetY = clientY + 200;
        // Move the blur circle quickly (less delay)
        blurX += (targetX - blurX) * 0.35;
        blurY += (targetY - blurY) * 0.35;
        blurRef.current.style.left = `${blurX}px`;
        blurRef.current.style.top = `${blurY}px`;
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <>
      {/* Blur effect */}
      <div
        ref={blurRef}
        className="pointer-events-none fixed z-40"
        style={{
          left: "50vw",
          top: "50vh",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, #64FFDA55 0%, transparent 80%)",
          filter: "blur(60px)",
          transform: "translate(-50%, -50%)",
          transition: "left 0.05s, top 0.05s",
          willChange: "left, top",
        }}
      />
      {/* 3D Cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-50"
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #64FFDA 0%, #0A192F 100%)",
          boxShadow: "0 4px 24px 0 #64FFDA55",
          transition: "transform 0.1s cubic-bezier(.23,1.01,.32,1), left 0.1s, top 0.1s",
          willChange: "transform, left, top",
          border: "2px solid #fff",
          opacity: 0.8,
        }}
      />
    </>
  );
}