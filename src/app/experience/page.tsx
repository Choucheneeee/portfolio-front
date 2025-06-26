'use client';
import Orb from '../Orb';

import { useRef, useEffect } from "react";

const experiences = [

    {
		company: 'ArabSoft',
		role: 'Intern – Full Stack Developer',
		location: 'ArabSoft [Tunisia] (Hybrid)',
		period: '02/2025 - 05/2025',
		highlights: [
			'Built a secure Portail RH platform with JWT role-based access, automated PDF generation, and workflows for leave, training, and loans.',
			'Designed dashboards and real-time communication tools to boost HR efficiency.',
		],
		technologies: [
			'Angular',
			'Node',
			'Express',
			'MongoDb',
			'GIT',
			'Docker',
			'Tailwind CSS',
			'Jenkins',
			'Azure',
		],
	},
	{
		company: 'Confledis',
		role: 'Intern – Web Developer',
		location: 'Confledis [France] (Remote)',
		period: '09/2024 - 11/2024',
		highlights: [
			'Developed robust test data models to rigorously test APIs and backend code, enhancing system reliability and functionality validation.',
			'Engineered a dynamic UI for the Patient-App, transforming the doctor detail page by integrating real-time data from backend APIs.',
			'Refactored critical APIs, achieving improved performance, scalability, and maintainable code architecture.',
		],
		technologies: ['Ionic', 'AWS', 'React', 'Django'],
	},
	{
		company: 'DigiKa',
		role: 'Intern – Web Developer',
		location: 'DIGIKA [Tunisia] (Onsite)',
		period: '07/2024 - 08/2024',
		highlights: [
			'Designed and implemented advanced visualization features, such as shape addition and export functionality, using FabricJS to enhance user interaction and streamline design processes.',
			'Developed a fully functional guest house website utilizing FabricJS, HTML, CSS, and Canvas, providing seamless booking integrations to improve user experience and attract more visitors.',
		],
		technologies: ['FabricJS', 'HTML', 'CSS', 'Canvas'],
	},
	{
		company: 'MegaTel',
		role: 'Intern – Web Developer',
		location: 'MagaTel [Germany] (Remote)',
		period: '01/2024 - 03/2024',
		highlights: [
			'Proposed a real-time call center dashboard to enhance operational workflows and improve team coordination.',
			'Developed and implemented secure employee management tools to safeguard data and ensure system integrity.',
			'Built an interactive ecommerce platform using Django, SQLite, and RESTful APIs, automating client reservations and simplifying data management processes for greater efficiency.',
		],
		technologies: ['Django', 'SQLite', 'RESTful APIs'],
	},
	{
		company: 'Designet',
		role: 'Intern – Web Developer',
		location: 'VibraCom [Tunisia] (Onsite)',
		period: '07/2023 - 08/2023',
		highlights: [
			'Designed and developed an interactive guest house website with integrated booking and administrative tools, enhancing usability and streamlining reservation processes.',
			'Automated manual data handling workflows, significantly improving efficiency and reducing repetitive tasks.',
			'Built optimized backend integrations using Angular and Spring Boot, ensuring seamless booking management and faster system response times.',
		],
		technologies: ['Angular', 'Spring Boot',"MySQL"],
	},
];

// Fade-in animation on scroll for each card
function FadeInOnScroll({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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
			className={`opacity-0 translate-y-8 transition-all duration-1000 ease-out`}
			style={{ transitionDelay: `${delay}ms` }}
		>
			{children}
		</div>
	);
}

export default function ExperienceSection() {
	return (
		<section
			id="experience"
			className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#0A192F] px-4 py-16"
		>
			<div className="w-full md:w-2/3 max-w-3xl space-y-8">
				<h1 className="text-4xl font-extrabold text-white mb-12 tracking-tight">
					Experience
				</h1>
				{experiences.map((exp, idx) => (
					<FadeInOnScroll key={exp.company} delay={idx * 120}>
						<div
							className="relative bg-[#112240]/80 border-l-4 border-[#64FFDA] rounded-xl shadow-lg p-6 transition-transform duration-500 hover:scale-[1.035] hover:shadow-2xl group"
						>
							<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
								<div>
									<span className="text-xl font-bold text-[#64FFDA]">
										{exp.company}
									</span>
									<span className="ml-2 text-base text-[#bfc9d9] font-medium">
										{exp.role}
									</span>
								</div>
								<div className="text-sm text-[#bfc9d9] mt-2 md:mt-0">
									{exp.location} |{' '}
									<span className="font-semibold">{exp.period}</span>
								</div>
							</div>
							<ul className="list-disc list-inside text-[#bfc9d9] mb-2 space-y-1 pl-2">
								{exp.highlights.map((h, i) => (
									<li key={i}>{h}</li>
								))}
							</ul>
							<div className="flex flex-wrap gap-2 mt-2">
								{exp.technologies.map((tech) => (
									<span
										key={tech}
										className="bg-[#64FFDA22] text-[#64FFDA] px-3 py-1 rounded-full text-xs font-semibold"
									>
										{tech}
									</span>
								))}
							</div>
						</div>
					</FadeInOnScroll>
				))}
			</div>
			<div className="hidden md:flex w-1/3 h-full items-center justify-center">
				<div style={{ width: '90%', height: '320px', position: 'relative' }}>
					<Orb
						hoverIntensity={0.5}
						rotateOnHover={true}
						hue={0}
						forceHoverState={false}
					/>
				</div>
			</div>
		</section>

	);
}