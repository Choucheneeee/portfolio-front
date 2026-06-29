"use client";
import { useRef, useEffect } from "react";
import {
  SiHtml5, SiCss3, SiJavascript, SiReact, SiAngular, SiBootstrap, SiTailwindcss,
  SiNextdotjs,
  SiExpress, SiDjango, SiNodedotjs, SiFastapi, SiSpringboot,
  SiMysql, SiMongodb, SiSqlite,
  SiDocker, SiJenkins, SiGithubactions, SiNginx,
  SiGit, SiGithub
} from "react-icons/si";

import { VscAzure } from "react-icons/vsc";
import { FaAws } from "react-icons/fa";

const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { icon: SiHtml5, label: "HTML" },
      { icon: SiCss3, label: "CSS" },
      { icon: SiJavascript, label: "JavaScript" },
      { icon: SiReact, label: "React" },
      { icon: SiAngular, label: "Angular" },
      { icon: SiNextdotjs, label: "Next.js" },
      { icon: SiBootstrap, label: "Bootstrap" },
      { icon: SiTailwindcss, label: "Tailwind" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { icon: SiNodedotjs, label: "Node.js" },
      { icon: SiExpress, label: "Express" },
      { icon: SiDjango, label: "Django" },
    ],
  },
  {
    name: "Database",
    skills: [
      { icon: SiMysql, label: "MySQL" },
      { icon: SiMongodb, label: "MongoDB" },
      { icon: SiSqlite, label: "SQLite" },
    ],
  },
  {
    name: "DevOps & Cloud",
    skills: [
      { icon: SiDocker, label: "Docker" },
      { icon: SiDocker, label: "Docker Compose" }, // reusing Docker icon
      { icon: SiJenkins, label: "Jenkins" },
      { icon: SiGithubactions, label: "GitHub Actions" },
      { icon: SiNginx, label: "Nginx" },
      { icon: VscAzure, label: "Azure" },
    ],
  },
  {
    name: "Version Control",
    skills: [
      { icon: SiGit, label: "Git" },
      { icon: SiGithub, label: "GitHub" },
    ],
  },
];

// Fade-in animation on scroll for each skill
function FadeInSkill({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("opacity-100", "translate-y-0");
          node.classList.remove("opacity-0", "translate-y-8");
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="min-h-screen flex flex-col items-center justify-center bg-[#0A192F]/80 backdrop-blur-sm px-4 py-16">
      <h1 className="text-4xl font-extrabold text-white mb-10 tracking-tight animate-fade-in">
        Skills
      </h1>
      <div className="w-full max-w-4xl space-y-10">
        {skillCategories.map((cat, catIdx) => (
          <div key={cat.name}>
            <h2 className="text-2xl font-bold text-[#64FFDA] mb-4">{cat.name}</h2>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-6">
              {cat.skills.map((skill, idx) => (
                <FadeInSkill key={skill.label} delay={idx * 80 + catIdx * 200}>
                  <div
                    className="bg-gradient-to-br from-[#112240]/80 to-[#233554]/80 border border-[#233554] rounded-xl shadow-md flex flex-col items-center justify-center py-6 px-4 hover:scale-110 hover:shadow-2xl hover:bg-[#64FFDA22] transition-all duration-300 cursor-pointer group"
                  >
                    <skill.icon className="text-5xl text-[#64FFDA] group-hover:text-white transition-colors duration-300" />
                  </div>
                </FadeInSkill>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}