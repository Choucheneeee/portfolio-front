"use client";

type Certif = {
  title: string;
  issuer: string;
  date: string;
  link?: string;
  image?: string;
};

const certificates: Certif[] = [
  {
    title: "Introduction to Serverless Development",
    issuer: "Amazon Web Services",
    date: "Sep 2024",
    link: "https://aws.amazon.com/training/classroom/developing-serverless-solutions-on-aws/",
    image: "image/1.webp",
  },
  {
    title: "Amazon EKS Primer",
    issuer: "Amazon Web Services",
    date: "Aug 2024",
    link: "https://aws.amazon.com/fr/training/classroom/running-containers-on-amazon-elastic-kubernetes-service-amazon-eks/",
    image: "image/eks.webp",
  },
  {
    title: "Introduction to Containers",
    issuer: "Amazon Web Services",
    date: "Nov 2024",
    link: "https://aws.amazon.com/containers/getting-started/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc&containers.sort-by=item.additionalFields.createdDate&containers.sort-order=desc",
    image: "image/intro.webp",
  },
  // Add more certificates as needed
];

export default function CertifPage() {
  return (
    // <section id="certif" className="min-h-screen flex flex-col items-center justify-center bg-[#0A192F]/80 backdrop-blur-sm px-4 py-24">
    //   <h1 className="text-5xl font-extrabold text-white mb-14 tracking-tight">My Certificates</h1>
    //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 w-full max-w-6xl">
    //     {certificates.map((cert, idx) => (
    //       <div
    //         key={cert.title + idx}
    //         className="bg-[#112240]/90 border-2 border-[#64FFDA] rounded-3xl shadow-2xl p-10 flex flex-col items-center transition-transform hover:scale-105"
    //       >
    //         {cert.image && (
    //           <img
    //             src={cert.image}
    //             alt={cert.title}
    //             loading="lazy"
    //             className="w-32 h-32 object-contain mb-6 rounded-xl border border-[#233554] bg-white"
    //           />
    //         )}
    //         <h2 className="text-2xl font-bold text-[#64FFDA] mb-4 text-center">{cert.title}</h2>
    //         <div className="text-lg text-[#bfc9d9] mb-2 text-center font-semibold">{cert.issuer}</div>
    //         <div className="text-base text-[#bfc9d9] mb-4 text-center">{cert.date}</div>
    //         {cert.link && (
    //           <a
    //             href={cert.link}
    //             target="_blank"
    //             rel="noopener noreferrer"
    //             className="text-[#64FFDA] underline text-lg mt-2 font-bold"
    //           >
    //             View Certificate
    //           </a>
    //         )}
    //       </div>
    //     ))}
    //   </div>
    // </section>
    <></>
  );
}