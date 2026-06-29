'use client';
import { useRef, useEffect, useState } from "react";
import "./home.css";

export default function HomeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Bottom fade gradient – semi‑transparent to let background through */}
      <div
        className="absolute bottom-0 left-0 w-full h-32 z-20 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(10, 25, 47, 0.7) 90%)",
        }}
      />

      {/* Overlay – reduced opacity to let background shine */}
      <div
        className={`absolute inset-0 bg-[#0A192F]/60 backdrop-blur-sm z-10 transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Content */}
      <div className="relative z-30 flex flex-col items-center text-center mt-48">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-4 flex flex-wrap justify-center items-center gap-4">
          Hello, I'm
          <span className="text-[#64FFDA] cursor typewriter-animation ml-2">
            Chouchene Mohamed Amine,
          </span>
        </h1>
        {/* 👇 Updated title – only the new role */}
        <p className="text-2xl md:text-3xl font-semibold text-[#64FFDA] drop-shadow">
          Cloud &amp; CI/CD Administrator
        </p>
        <div className="tags">
          <p className="text-shadow text-lg md:text-xl text-[#8892B0] mt-4 max-w-2xl">
            <small>
              I specialise in managing Azure cloud infrastructure, automating CI/CD pipelines,
              and ensuring reliable, scalable deployments. With a strong background in full‑stack
              development, I bridge the gap between development and operations to deliver
              secure, high‑performance solutions.
              <br /><br />
              My expertise includes Azure VM, App Services, Docker, GitHub Actions, and
              infrastructure monitoring – helping teams ship faster with fewer errors.
            </small>
          </p>
        </div>
      </div>
    </section>
  );
}