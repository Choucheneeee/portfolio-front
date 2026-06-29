'use client';
import Orb from '../Orb';
import { useRef, useEffect } from "react";

const experiences = [
  {
    company: 'Wic Doctor',
    role: 'Cloud & CI/CD Administrator',
    location: 'Wic Doctor [Nabeul] (Onsite)',
    period: '03/2026 - Present',
    highlights: [
      'Managed Azure virtual machines for production and test environments (creation, scaling, monitoring).',
      'Designed and deployed CI/CD pipelines with GitHub Actions, ensuring automated and reliable deliveries.',
      'Administered Azure account: resource management, security implementation, cost tracking and optimisation.',
      'Automated deployment processes using Docker Compose and GitHub Actions, reducing manual errors.',
      'Managed DNS records, configured Nginx reverse proxies, and maintained firewall rules for multiple domains.',
      'Deployed and customised Rocket.Chat (Wic Link) for internal HR and attendance tracking.',
      'Orchestrated multi-container applications using Docker Compose on Azure VMs.',
    ],
    technologies: [
      'Azure VM',
      'App Services',
      'Monitoring',
      'Docker',
      'Docker Compose',
      'GitHub Actions',
      'Nginx',
      'DNS',
      'Firewall',
      'Rocket.Chat',
    ],
  },
  {
    company: 'Wic Doctor',
    role: 'Full Stack Developer',
    location: 'Wic Doctor [Nabeul] (Onsite)',
    period: '09/2025 - 02/2026',
    highlights: [
      'Developed the main Wic Doctor platform (wic-doctor.com) with Next.js, Node.js, Express, and MySQL, featuring digital medical records and responsive dashboards.',
      'Built Wic Talk (wic-talk.com) – an AI-powered voice communication platform with real-time translation using Azure OpenAI Realtime API and WebRTC.',
      'Created Sage AI Agent (contact.wic-talk.com) – a 24/7 multilingual healthcare assistant with browser and phone call integration.',
      'Designed robust RESTful APIs and optimised relational database queries for high performance.',
      'Collaborated with cross-functional teams to deliver features for digital medical records and patient management.',
      'Containerised all applications using Docker and orchestrated with Docker Compose.',
      'Set up CI/CD pipelines (GitHub Actions) for automated builds and deployments to Azure.',
    ],
    technologies: [
      'Next.js',
      'Node.js',
      'Express.js',
      'MySQL',
      'Docker',
      'Docker Compose',
      'Azure',
      'GitHub Actions',
      'WebRTC',
      'OpenAI',
    ],
  },
  {
    company: 'ArabSoft',
    role: 'Intern – Full Stack Developer',
    location: 'ArabSoft [Tunisia] (Hybrid)',
    period: '02/2025 - 05/2025',
    highlights: [
      'Built a secure HR platform with JWT authentication, automated PDF generation, and workflows for leave, training, and loans.',
      'Designed dashboards that improved HR team efficiency by approximately 30%.',
    ],
    technologies: [
      'Angular',
      'Node.js',
      'MongoDB',
      'Docker',
      'Tailwind',
      'Jenkins',
      'Azure',
    ],
  },
  {
    company: 'Confiedis',
    role: 'Intern – Full Stack Developer',
    location: 'Confiedis [France] (Remote)',
    period: '09/2024 - 11/2024',
    highlights: [
      'Generated test data for API validation and backend integrity maintenance.',
      'Designed dynamic UI components integrating real-time data.',
    ],
    technologies: ['React', 'Django', 'Docker', 'Ionic', 'AWS', 'Python'],
  },
  {
    company: 'DIGIKA',
    role: 'Intern – Frontend Developer',
    location: 'DIGIKA [Tunisia] (Onsite)',
    period: '07/2024 - 08/2024',
    highlights: [
      'Developed data visualisation features using FabricJS.',
      'Implemented shape creation and content export functionality.',
    ],
    technologies: ['FabricJS', 'HTML5', 'CSS3', 'Canvas API', 'JavaScript'],
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
      className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#0A192F]/80 backdrop-blur-sm px-4 py-16"
    >
      <div className="w-full md:w-2/3 max-w-3xl space-y-8">
        <h1 className="text-4xl font-extrabold text-white mb-12 tracking-tight">
          Experience
        </h1>
        {experiences.map((exp, idx) => (
          <FadeInOnScroll key={exp.company + exp.period} delay={idx * 120}>
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