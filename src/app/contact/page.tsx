"use client";

import InfiniteMenu from "../InfiniteMenu";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const items = [
  {
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
    link: "https://www.linkedin.com/in/chouchene-med-amine/",
    title: "LinkedIn",
    description: "Connect with me on LinkedIn!",
  },
  {
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    link: "https://github.com/Choucheneeee",
    title: "GitHub",
    description: "Check out my projects on GitHub!",
  },
  {
    title: "Email",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png",
    link: "mailto:chouchene.amine.etud@gmail.com",
    description: "Send me an email!",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
    link: "https://wa.me/21622447059",
    title: "WhatsApp",
    description: "Chat with me on WhatsApp!",
  },
  {
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg",
    link: "https://www.facebook.com/C23HAAA/",
    title: "Facebook",
    description: "Connect with me on Facebook!",
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0A192F] via-[#112240] to-[#233554] px-4 py-24"
    >
      <h1 className="text-4xl font-extrabold text-[#64FFDA] text-center mb-10 tracking-tight">
        Contact Links
      </h1>
      <div
        style={{ height: "600px", position: "relative", background: "transparent" }}
        className="w-full max-w-1x1 mx-auto"
      >
        <InfiniteMenu items={items} />
      </div>
    </section>
  );
}