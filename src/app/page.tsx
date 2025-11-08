// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Cursor3D from "./cursor3D";
import Navbar from "./navbar";

// Dynamically import sections with better loading
const HomeSection = dynamic(() => import("./home/page"), {
  loading: () => <div className="min-h-screen bg-[#0A192F]" />
});

const AboutPage = dynamic(() => import("./about/page"), {
  loading: () => <div className="min-h-screen bg-[#0A192F]" />
});

const ExperienceSection = dynamic(() => import("./experience/page"), {
  loading: () => <div className="min-h-screen bg-[#0A192F]" />
});

const ProjectSection = dynamic(() => import("./projects/page"), {
  loading: () => <div className="min-h-screen bg-[#0A192F]" />
});

const CertifPage = dynamic(() => import("./certif/page"), {
  loading: () => <div className="min-h-screen bg-[#0A192F]" />
});

const SkillsSection = dynamic(() => import("./skills/page"), {
  loading: () => <div className="min-h-screen bg-[#0A192F]" />
});

const FeedbackSection = dynamic(() => import("./feedback/page"), {
  loading: () => <div className="min-h-screen bg-[#0A192F]" />
});

const ContactSection = dynamic(() => import("./contact/page"), {
  loading: () => <div className="min-h-screen bg-[#0A192F]" />
});

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Much shorter loading time - don't wait for everything
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // Reduced from full page load

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0A192F] z-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-2 border-[#64FFDA] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Mohamed Amine Chouchene - Portfolio</title>
        <meta name="description" content="Full Stack Developer specializing in React, Next.js, and modern web technologies" />
        <meta property="og:image" content="/image/h1.webp" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/image/h1.webp" as="image" type="image/webp" />
      </Head>
      
      <Cursor3D />
      <Navbar />
      
      {/* Remove FadeInSection wrappers for critical content */}
      <HomeSection />
      <AboutPage />
      <ExperienceSection />
      <ProjectSection />
      <CertifPage />
      <SkillsSection />
      <FeedbackSection />
      <ContactSection />
    </>
  );
}