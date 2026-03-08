import ParticleBackground from '@/components/ParticleBackground';
import SplashCursor from '@/components/SplashCursor';
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
    <div className="relative min-h-screen bg-background">
      <ParticleBackground />
      <SplashCursor
        SIM_RESOLUTION={128}
        DYE_RESOLUTION={1024}
        DENSITY_DISSIPATION={3}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.15}
        SPLAT_FORCE={5000}
        COLOR_UPDATE_SPEED={8}
        BACK_COLOR={{ r: 0.1, g: 0, b: 0.15 }}
        TRANSPARENT={true}
      />
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
