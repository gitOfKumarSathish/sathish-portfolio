import AmbientBackdrop from "@/components/motion/AmbientBackdrop";
import ScrollProgress from "@/components/motion/ScrollProgress";
import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import StatementSection from "@/components/portfolio/StatementSection";
import AboutSection from "@/components/portfolio/AboutSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import EducationSection from "@/components/portfolio/EducationSection";
import AchievementsSection from "@/components/portfolio/AchievementsSection";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";

const Index = () => (
  <div className="relative min-h-screen overflow-x-clip text-foreground">
    <AmbientBackdrop />
    <ScrollProgress />
    <Navbar />
    <HeroSection />
    <StatementSection />
    <AboutSection />
    <SkillsSection />
    <ExperienceSection />
    <ProjectsSection />
    <EducationSection />
    <AchievementsSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
