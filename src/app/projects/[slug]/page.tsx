'use client';

import { useParams } from "next/navigation";

const projectDetails: Record<string, {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveDemo?: string;
  github?: string;
  features?: string[];
}> = {
  "portfolio-website": {
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio built with Next.js, Tailwind CSS, and Framer Motion. Showcases my work, skills, and contact information with smooth animations.",
    image: "/image/portfolio.png",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    liveDemo: "https://your-portfolio-link.com",
    github: "https://github.com/yourusername/portfolio",
    features: [
      "Animated transitions",
      "Responsive design",
      "Project showcase",
      "Contact form",
    ],
  },
  "dashboard-analytics": {
    title: "Dashboard Analytics",
    description:
      "A real-time analytics dashboard with custom charts, authentication, and live data updates.",
    image: "/image/dashboard.png",
    tags: ["React", "Node.js", "Socket.io"],
    liveDemo: "https://your-dashboard-link.com",
    github: "https://github.com/yourusername/dashboard",
    features: [
      "Live data streaming",
      "User authentication",
      "Custom chart components",
    ],
  },
  "devops-automation": {
    title: "DevOps Automation",
    description:
      "CI/CD pipelines and infrastructure as code for scalable deployments using Docker, Kubernetes, and Jenkins.",
    image: "/image/devops.png",
    tags: ["Docker", "Kubernetes", "Jenkins"],
    features: [
      "Automated deployments",
      "Infrastructure as code",
      "Monitoring and logging",
    ],
  },
};

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = Array.isArray(params?.project) ? params.project[0] : params?.project;
  const project = slug ? projectDetails[slug] : undefined;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A192F] text-white">
        <h1 className="text-3xl font-bold">Project not found</h1>
      </div>
    );
  }

  return (      
<>
    <section className="min-h-screen flex flex-col items-center justify-center bg-[#0A192F] px-4 py-16">
      <div className="max-w-2xl w-full bg-[#112240]/80 rounded-3xl shadow-2xl p-8 border border-[#64FFDA]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-64 object-cover rounded-xl mb-6 shadow-lg"
        />
        <h1 className="text-4xl font-extrabold text-white mb-2">{project.title}</h1>
        <p className="text-[#bfc9d9] mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#64FFDA22] text-[#64FFDA] px-3 py-1 rounded-full text-xs font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
        {project.features && (
          <ul className="list-disc list-inside text-[#bfc9d9] mb-4">
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        )}
        <div className="flex gap-4 mt-6">
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded bg-[#64FFDA] text-[#0A192F] font-bold text-sm shadow hover:bg-[#52e0c4] transition-colors"
            >
              Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded border border-[#64FFDA] text-[#64FFDA] font-bold text-sm hover:bg-[#64FFDA22] transition-colors"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </section>

    </>
  );
}