import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesGrid from "@/components/ServicesGrid";
import PortfolioSlideshow from "@/components/PortfolioSlideshow";
import PODConfigurator from "@/components/PODConfigurator";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <div id="services">
        <ServicesGrid />
      </div>
      <div id="portfolio" className="px-6 py-[22px]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border-border/50 rounded-[20px] h-96 shadow-[0_0_40px_hsl(var(--lightning-yellow)/0.4)] overflow-hidden">
            <img 
              src="/lovable-uploads/71f8525c-c036-4ccb-b2ac-15e26de96a2d.png" 
              alt="BAGMAN Logo" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
