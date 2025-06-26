"use client";
import AboutPage from "./about/page";
import ContactSection from "./contact/page";
import Cursor3D from "./cursor3D";
import ExperienceSection from "./experience/page";
import FadeInSection from "./fadeInsection";
import FeedbackSection from "./feedback/page";
import HomeSection from "./home/page";
import Navbar from "./navbar";
import ProjectSection from "./projects/page";
import SkillsSection from "./skills/page";
import { useEffect, useState } from "react";


export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading or wait for window load event
    const handleLoad = () => setLoading(false);
    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0A192F] z-[9999]">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-[#64FFDA] border-t-transparent rounded-full animate-spin mb-4"></div>
          <span className="text-[#64FFDA] text-xl font-semibold">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Cursor3D />
      <Navbar />
      <FadeInSection>
        <HomeSection />
      </FadeInSection>
      <FadeInSection>
        <AboutPage />
      </FadeInSection>
      <FadeInSection>
        <ExperienceSection />
      </FadeInSection>
      <FadeInSection>
        <ProjectSection />
      </FadeInSection>
      <FadeInSection>
        <SkillsSection />
      </FadeInSection>
      <FadeInSection>
        <FeedbackSection />
      </FadeInSection>
      <FadeInSection>
        <ContactSection />
      </FadeInSection>
    </>
  );
}
