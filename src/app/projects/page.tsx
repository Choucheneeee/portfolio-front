'use client';

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

const projects = [
	{
		title: "Portfolio Website",
		description:
			"Built a secure Portail Rh platform with JWT role-based access, automated PDF generation, and workflows for leave, training, and loans.",
		image: "/image/portfolio.png",
		link: "https://your-portfolio-link.com",
		tags: ["Next.js", "Tailwind", "Framer Motion"],
		slug: "portfolio-website",
	},
	{
		title: "Dashboard Analytics",
		description:
			"A real-time analytics dashboard with custom charts and authentication.",
		image: "/image/dashboard.png",
		link: "https://your-dashboard-link.com",
		tags: ["React", "Node.js", "Socket.io"],
		slug: "dashboard-analytics",
	},
	{
		title: "DevOps Automation",
		description:
			"CI/CD pipelines and infrastructure as code for scalable deployments.",
		image: "/image/devops.png",
		link: "https://your-devops-link.com",
		tags: ["Docker", "Kubernetes", "Jenkins"],
		slug: "devops-automation",
	},
];

export default function ProjectSection() {
	const [hovered, setHovered] = useState<number | null>(null);
	const router = useRouter();

	return (
		<section
			id="project"
			className="min-h-screen flex flex-col items-center justify-center bg-[#0A192F] px-4 py-16"
		>
			<h1 className="text-4xl font-extrabold text-white mb-12 tracking-tight">
				My Projects
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
				{projects.map((project, idx) => (
					<div
						key={project.title}
						className="group relative rounded-2xl overflow-hidden shadow-xl bg-[#112240] border border-[#233554] hover:border-[#64FFDA] transition-all duration-300"
						onMouseEnter={() => setHovered(idx)}
						onMouseLeave={() => setHovered(null)}
						style={{
							boxShadow:
								hovered === idx
									? "0 8px 32px 0 #64FFDA44"
									: "0 4px 16px 0 #0004",
							transform: hovered === idx ? "scale(1.03)" : "scale(1)",
							transition: "all 0.4s cubic-bezier(.23,1.01,.32,1)",
						}}
					>
						<div className="overflow-hidden">
							<img
								src={project.image}
								alt={project.title}
								className={`w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0`}
								style={{
									filter: hovered === idx ? "none" : "grayscale(1)",
								}}
							/>
						</div>
						<div className="p-6">
							<h2 className="text-2xl font-bold text-white mb-2 group-hover:text-[#64FFDA] transition-colors duration-300">
								{project.title}
							</h2>
							<p className="text-[#8892B0] mb-4">
								{project.description}
							</p>
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
							<div className="flex gap-2">
								<a
									href={project.link}
									target="_blank"
									rel="noopener noreferrer"
									className="px-4 py-2 rounded bg-[#64FFDA] text-[#0A192F] font-bold text-sm shadow hover:bg-[#52e0c4] transition-colors"
								>
									Live Demo
								</a>
								<button
									onClick={() => router.push(`/projects/${project.slug}`)}
									className="px-4 py-2 rounded border border-[#64FFDA] text-[#64FFDA] font-bold text-sm hover:bg-[#64FFDA22] transition-colors"
								>
									View Details
                  
								</button>
							</div>
						</div>
						{/* Animated overlay */}
						<div
							className={`absolute inset-0 bg-[#64FFDA]/10 pointer-events-none transition-opacity duration-700 ${
								hovered === idx ? "opacity-100" : "opacity-0"
							}`}
						/>
					</div>
				))}
			</div>
		</section>
	);
}