'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Project = {
	slug: string;
	title: string;
	description: string;
	image: string;
	tags: string[];
	liveDemo?: string;
	github?: string;
	features?: string[];
};

export default function ProjectSection() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [hovered, setHovered] = useState<number | null>(null);
	const router = useRouter();

	useEffect(() => {
		fetch("/database.json")
			.then((res) => res.json())
			.then((data) => setProjects(data));
	}, []);

	return (
		<section
			id="project"
			className="min-h-screen flex flex-col items-center justify-center bg-[#0A192F]/80 backdrop-blur-sm px-4 py-16"
		>
			<h1 className="text-4xl font-extrabold text-white mb-12 tracking-tight">
				My Projects
			</h1>

			{/* NB Section */}
			<div className="mb-8 w-full max-w-4xl">
				<div className="bg-[#112240] border-l-4 border-[#64FFDA] rounded-lg p-4 shadow text-[#bfc9d9]">
					<strong>NB:</strong> It is recommended to{" "}
					<span className="text-[#64FFDA] font-semibold">
						clone or fork
					</span>{" "}
					the project and try them locally because there can be API key issues
					or approval needed. Thank you for your comprehension.
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
				{projects.map((project, idx) => (
					<div
						key={project.slug}
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
								{project.liveDemo && (
									<a
										href={project.liveDemo}
										target="_blank"
										rel="noopener noreferrer"
										className="px-4 py-2 rounded bg-[#64FFDA] text-[#0A192F] font-bold text-sm shadow hover:bg-[#52e0c4] transition-colors"
									>
										Live Demo
									</a>
								)}
								{project.github && (
									<a
										href={project.github}
										target="_blank"
										rel="noopener noreferrer"
										className="px-4 py-2 rounded border border-[#64FFDA] text-[#64FFDA] font-bold text-sm hover:bg-[#64FFDA22] transition-colors"
									>
										GitHub
									</a>
								)}
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

			{/* "See all repos" button */}
			<div className="mt-16">
				<a
					href="https://github.com/Choucheneeee"
					target="_blank"
					rel="noopener noreferrer"
					className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl border-2 border-[#64FFDA] text-[#64FFDA] font-bold text-lg hover:bg-[#64FFDA] hover:text-[#0A192F] transition-all duration-300 hover:shadow-[0_0_30px_#64FFDA44]"
				>
					<span>📦</span>
					<span>+45 other projects available on GitHub</span>
					<span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
				</a>
				<p className="text-[#8892B0] text-sm mt-3 text-center">
					Explore my full portfolio of repositories
				</p>
			</div>
		</section>
	);
}