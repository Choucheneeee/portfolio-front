import AboutPage from "./about/page";
import ContactSection from "./contact/page";
import Cursor3D from "./Cursor3D";
import FadeInSection from "./FadeInSection";
import FeedbackSection from "./feedback/page";
import HomeSection from "./home/page";
import Navbar from "./navbar";
import ProjectSection from "./projects/page";
import SkillsSection from "./skills/skills";


export default function Home() {
  return (
    <>
      <Cursor3D />
      <Navbar />
      <FadeInSection>
        <HomeSection />
      </FadeInSection>
      <FadeInSection>
        <AboutPage />
      </FadeInSection>
      <FadeInSection>
        <ProjectSection />
      </FadeInSection>
      <FadeInSection>
        <SkillsSection />
      </FadeInSection>
      <FadeInSection>
        <FeedbackSection />
      </FadeInSection>
      <FadeInSection>
        <ContactSection />
      </FadeInSection>
    </>
  );
}
