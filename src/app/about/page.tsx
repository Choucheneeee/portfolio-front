'use client';
import { useRef, useEffect, useState } from "react";
import RotatingShape from "../RotatingShape";
import ProfileCard from '../ProfileCard';

// FadeInParagraph component for animation on scroll
function FadeInParagraph({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <p
      ref={ref}
      className={`transition-opacity duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </p>
  );
}

// ParallaxShape for moving shapes on scroll
function ParallaxShape({
  className,
  style,
  speed = 0.2,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  speed?: number;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const y = window.scrollY * speed;
        ref.current.style.transform = `translateY(${y}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

export default function AboutPage() {
  // Parallax for image
  const imgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (imgRef.current) {
        const y = window.scrollY * 0.12;
        imgRef.current.style.transform = `translateY(${y}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-16 px-6 bg-transparent relative overflow-hidden"
    >
      {/* Decorative rotating shape */}
      <RotatingShape src="image/helm.svg" size={320} speed={3}  className="left-0 top-1/2 -translate-y-1/2 opacity-30" />

      {/* Animated background shapes with parallax */}
      <ParallaxShape
        className="absolute top-10 left-10 w-32 h-32 bg-[#64FFDA]/20 rounded-full blur-2xl z-0"
        speed={0.18}
      />
      <ParallaxShape
        className="absolute bottom-10 right-10 w-40 h-40 bg-[#64FFDA]/10 rounded-full blur-3xl z-0"
        speed={0.25}
      />
      <ParallaxShape
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#64FFDA]/30 rounded-full blur-xl z-0"
        speed={0.35}
      />
      <ParallaxShape
        className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-[#64FFDA]/15 rounded-full blur-2xl z-0"
        speed={0.12}
      />

      {/* About content and ProfileCard side by side */}
      <div className="z-10 max-w-xl flex-1 bg-[#112240]/80 rounded-3xl shadow-2xl p-10 backdrop-blur-md border border-[#233554]">
        <h2 className="text-4xl font-extrabold text-white mb-6 tracking-tight">About Me</h2>
        <FadeInParagraph className="text-lg text-[#bfc9d9] mb-4 leading-relaxed">
          I'm <span className="text-white font-bold">Med Amine Chouchene</span>, a
          dedicated Full Stack Developer with a background in{" "}
          <span className="text-[#64FFDA] font-semibold">
            automation and industrial computing
          </span>
          . Over the years, I’ve worked on diverse projects ranging from custom
          dashboards to scalable APIs, using both frontend and backend
          technologies.
        </FadeInParagraph>
        <FadeInParagraph className="text-lg text-[#bfc9d9] mb-4 leading-relaxed">
          My core stack includes{" "}
          <span className="text-[#64FFDA] font-semibold">React</span>,{" "}
          <span className="text-[#64FFDA] font-semibold">Angular</span>,{" "}
          <span className="text-[#64FFDA] font-semibold">Node.js</span>, and{" "}
          <span className="text-[#64FFDA] font-semibold">Django</span>, and I'm
          experienced in containerized environments with{" "}
          <span className="text-[#64FFDA] font-semibold">Docker</span> and{" "}
          <span className="text-[#64FFDA] font-semibold">Kubernetes</span>. I’m
          also skilled in DevOps practices, using tools like{" "}
          <span className="text-[#64FFDA] font-semibold">Jenkins</span>,{" "}
          <span className="text-[#64FFDA] font-semibold">AWS</span>, and{" "}
          <span className="text-[#64FFDA] font-semibold">Azure</span> to deliver
          continuous integration and smooth deployment pipelines.
        </FadeInParagraph>
        <FadeInParagraph className="text-lg text-[#bfc9d9] mb-4 leading-relaxed">
          I thrive on solving complex problems and turning ideas into functional
          digital products. Whether it's streamlining business processes or
          building intuitive user interfaces, I love the challenge of building
          impactful tech solutions.
        </FadeInParagraph>
        <FadeInParagraph className="text-lg text-[#bfc9d9] leading-relaxed">
          Beyond development, I enjoy learning new technologies, mentoring peers,
          and designing tools that make a real-world difference.
        </FadeInParagraph>
      </div>
      
          <ProfileCard
            name="Chouchene Mohamed Amine"
            title="Full Stack & DevOps Developer"
            handle="@chouchene_mohamed_amine"
            status="Online"
            contactText="Contact Me"
            avatarUrl="image/h.png"
            showUserInfo={true}
            enableTilt={true}
            onContactClick={() => console.log('Contact clicked')}
          />
       
    </section>
  );
}