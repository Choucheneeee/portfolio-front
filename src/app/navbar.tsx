"use client";

import { useState } from "react";
import GooeyNav from "./GooeyNav";

const items = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#project" },
  { label: "Certifications", href: "#certif" },
  { label: "Skills", href: "#skills" },
  { label: "Feedback", href: "#feed" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 right-0 z-50 flex flex-row-reverse items-start w-full pointer-events-none">
      {/* Download CV Button */}
      <div className="absolute top-24 right-8 z-40 pointer-events-auto">
        <a
          href="cv.pdf"
          download
          className="bg-[#64FFDA] text-[#0A192F] font-bold px-10 py-2 rounded-lg shadow hover:bg-[#52e0c4] transition-colors duration-300 border border-[#233554]"
        >
          Download CV
        </a>
      </div>
      {/* Desktop Nav */}
      <div
        style={{ height: "96px", position: "relative", zIndex: 150 }}
        className="hidden sm:flex pointer-events-auto mt-4 mr-8"
      >
        <GooeyNav
          items={items}
          particleCount={15}
          particleDistances={[90, 10]}
          particleR={100}
          initialActiveIndex={0}
          animationTime={600}
          timeVariance={300}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        />
      </div>

      {/* Mobile Hamburger */}
      <div className="block sm:hidden absolute top-4 right-4 pointer-events-auto z-50">
        <button
          className="bg-[#112240] rounded-lg p-2 shadow text-[#64FFDA] focus:outline-none"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open menu"
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <rect y="5" width="24" height="2" rx="1" fill="currentColor" />
            <rect y="11" width="24" height="2" rx="1" fill="currentColor" />
            <rect y="17" width="24" height="2" rx="1" fill="currentColor" />
          </svg>
        </button>
        {/* Mobile Drawer */}
        {open && (
          <div className="fixed inset-0 bg-black/60 z-50 flex flex-col items-end">
            <div className="w-3/4 max-w-xs bg-[#112240] h-full shadow-lg p-6 flex flex-col gap-6">
              <button
                className="self-end mb-4 text-[#64FFDA] text-3xl"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                &times;
              </button>
              <ul className="flex flex-col gap-6 mt-8">
                {items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-lg font-bold text-[#64FFDA] hover:text-white transition"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Click outside to close */}
            <div className="flex-1 w-full" onClick={() => setOpen(false)} />
          </div>
        )}
      </div>
    </nav>
  );
}