'use client';
import { useRef, useEffect, useState } from "react";

// imorts css file
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
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline

        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src="image/background.mp4"
         type="video/mp4" />
      </video>
      {/* Gradient Fade at Bottom */}
      <div
        className="absolute bottom-0 left-0 w-full h-32 z-20 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #0A192F 90%)",
        }}
      />
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-[#0A192F]/80 z-10 transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      ></div>
      {/* Profile Image - perfectly centered in a circle */}
      <div className="absolute top-1/8 left-1/5 transform -translate-x-1/2 z-30 flex justify-center">
  
</div>
      {/* Content */}
      <div className="relative z-30 flex flex-col items-center text-center mt-48">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-4 flex flex-wrap justify-center items-center gap-4">
          Hello, I'm
          <span className="text-[#64FFDA] cursor typewriter-animation ml-2">
            Chouchene Mohamed Amine,
          </span>
        </h1>
        <p className="text-2xl md:text-3xl font-semibold text-[#64FFDA] drop-shadow">
          Full Stack &amp; DevOps Developer
        </p>
        <div className="tags">

        <p className="text-shadow text-lg md:text-xl text-[#8892B0] mt-4 max-w-2xl">
          <small>I'm a passionate Full Stack Developer with hands-on experience in building secure, scalable, and dynamic web applications using modern technologies like React, Angular, Node.js, Django, and Docker.

I bring a strong DevOps mindset to development, integrating tools such as Jenkins, AWS, and Azure to streamline CI/CD pipelines and automate deployments.

        </small>
        </p>
        	</div>

      </div>
    </section>
  );
}