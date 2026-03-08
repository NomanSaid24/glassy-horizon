import ParticleBackground from '@/components/ParticleBackground';
import SmoothCursor from '@/components/SmoothCursor';
import FloatingMusicIcons from '@/components/FloatingMusicIcons';
import MusicPlayer from '@/components/MusicPlayer';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import SubmissionForm from '@/components/SubmissionForm';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background cursor-none">
      <ParticleBackground />
      <FloatingMusicIcons />
      <SmoothCursor />
      <MusicPlayer />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <FAQSection />
        <SubmissionForm />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
