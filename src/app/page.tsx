// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Cursor3D from "./cursor3D";
import Navbar from "./navbar";
import FadeInSection from "./fadeInsection";

// Dynamically import the sections
const AboutPage = dynamic(() => import("./about/page"));
const CertifPage = dynamic(() => import("./certif/page"));
const ContactSection = dynamic(() => import("./contact/page"));
const ExperienceSection = dynamic(() => import("./experience/page"));
const FeedbackSection = dynamic(() => import("./feedback/page"));
const HomeSection = dynamic(() => import("./home/page"));
const ProjectSection = dynamic(() => import("./projects/page"));
const SkillsSection = dynamic(() => import("./skills/page"));

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      <Head>
        <title>Mohamed Amine Chouchene - Portfolio</title>
        <meta name="description" content="Mohamed Amine Chouchene's personal portfolio showcasing web development projects, skills, and contact information." />
        <meta name="keywords" content="Mohamed Amine Chouchene, portfolio, web development, full-stack, developer, projects, React, Next.js, JavaScript" />
        <meta name="author" content="Mohamed Amine Chouchene" />
        <meta property="og:title" content="Mohamed Amine Chouchene - Portfolio" />
        <meta property="og:description" content="Web development portfolio of Mohamed Amine Chouchene." />
        <meta property="og:image" content="https://chouchene.azurewebsites.net/image/h.png" />
        <meta property="og:url" content="https://chouchene.azurewebsites.net" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
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
        <CertifPage />
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