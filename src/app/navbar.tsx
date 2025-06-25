"use client";

import GooeyNav from "./GooeyNav";

const items = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#project" },
  { label: "Skills", href: "#skills" },
  { label: "Feedback", href: "#feed" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-5 right-0 w-auto z-150 bg-red">
      <div style={{ height: "96px", position: "relative", zIndex: 150 }}>
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
    </nav>
  );
}