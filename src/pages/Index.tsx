import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import ServicesGrid from "../components/ServicesGrid";
import Footer from "../components/Footer";
import { BulkImageUploader } from "@/components/BulkImageUploader";
import { Button } from "@/components/ui/button";
import { MessageCircle, Package, Sparkles, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <div id="services">
        <ServicesGrid />
      </div>
      {/* Four Glass Cards Section */}
      <div className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 - Custom Design */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-glow hover:shadow-[0_0_40px_hsl(var(--lightning-yellow)/0.5)] transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-lightning-yellow/20 flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-lightning-yellow" />
              </div>
              <h3 className="text-2xl font-bold text-lightning-yellow mb-2">Custom Design</h3>
              <p className="text-white/80 text-sm">Unique designs tailored to your brand</p>
            </div>

            {/* Card 2 - Fast Turnaround */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-glow hover:shadow-[0_0_40px_hsl(var(--lightning-yellow)/0.5)] transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-lightning-yellow/20 flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-lightning-yellow" />
              </div>
              <h3 className="text-2xl font-bold text-lightning-yellow mb-2">Fast Turnaround</h3>
              <p className="text-white/80 text-sm">Quick delivery without compromising quality</p>
            </div>

            {/* Card 3 - Quality Products */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-glow hover:shadow-[0_0_40px_hsl(var(--lightning-yellow)/0.5)] transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-lightning-yellow/20 flex items-center justify-center mb-4">
                <Package className="w-8 h-8 text-lightning-yellow" />
              </div>
              <h3 className="text-2xl font-bold text-lightning-yellow mb-2">Quality Products</h3>
              <p className="text-white/80 text-sm">Premium materials and expert craftsmanship</p>
            </div>

            {/* Card 4 - Direct Support */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-glow hover:shadow-[0_0_40px_hsl(var(--lightning-yellow)/0.5)] transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-lightning-yellow/20 flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-lightning-yellow" />
              </div>
              <h3 className="text-2xl font-bold text-lightning-yellow mb-2">Direct Support</h3>
              <p className="text-white/80 text-sm">Personal assistance every step of the way</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <Button
              size="lg"
              className="!bg-[hsl(60,100%,50%)] !text-black hover:!bg-[hsl(60,100%,45%)] font-bold text-lg px-8 py-6"
              asChild
            >
              <a href="https://www.instagram.com/quickprintz401/" target="_blank" rel="noopener noreferrer"> // Needs manual verification
                <MessageCircle className="w-5 h-5 mr-2" />
                DM To Get Started
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Alternating 3 rows: image L, image R, image L */}
      <section id="marketing-rows" className="max-w-6xl mx-auto px-4 mt-24 pb-8 space-y-20">
        {/* Row 1: image left, text right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="rounded-3xl overflow-hidden bg-black/40 p-2 h-full">
            <img
              src="/quickprintz_assets/mylar-bags.jpg"
              alt="Mylar Bags"
              className="aspect-square rounded-2xl w-full h-full object-cover"
            />
          </div>
          <div className="rounded-3xl p-8 bg-black/70 shadow-[0_0_60px_-20px_rgba(245,231,99,0.6)] h-full flex flex-col">
            <h3 className="text-3xl md:text-4xl font-bold text-white">Mylar Bags</h3>
            <ul className="mt-6 space-y-3 text-white/80 text-base md:text-lg flex-grow">
              <li>Matte, gloss, holographic</li>
              <li>Retail-ready compliance layout</li>
              <li>Rush options available</li>
            </ul>
            <Button
              className="mt-6 !bg-[hsl(60,100%,50%)] !text-black hover:!bg-[hsl(60,100%,45%)] font-bold text-base"
              asChild
            >
              <a href="https://www.instagram.com/quickprintz401/" target="_blank" rel="noopener noreferrer"> // Needs manual verification
                Get Started
              </a>
            </Button>
          </div>
        </div>

        {/* Row 2: image right, text left */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="rounded-3xl p-8 bg-black/70 shadow-[0_0_60px_-20px_rgba(245,231,99,0.6)] order-last lg:order-first h-full flex flex-col">
            <h3 className="text-3xl md:text-4xl font-bold text-white">Custom Boxes</h3>
            <p className="mt-4 text-white/80 text-base md:text-lg">Premium finishes. Factory-level pricing.</p>
            <ul className="mt-6 space-y-3 text-white/80 text-base md:text-lg flex-grow">
              <li>Foil, emboss, UV spot</li>
              <li>Fast prototypes</li>
              <li>Color-accurate proofs</li>
            </ul>
            <Button
              className="mt-6 !bg-[hsl(60,100%,50%)] !text-black hover:!bg-[hsl(60,100%,45%)] font-bold text-base"
              asChild
            >
              <a href="https://www.instagram.com/quickprintz401/" target="_blank" rel="noopener noreferrer">
                Get Started
              </a>
            </Button>
          </div>
          <div className="rounded-3xl overflow-hidden bg-black/40 p-2 h-full">
            <img
              src="/quickprintz_assets/custom-boxes.jpg"
              alt="Custom Boxes"
              className="aspect-square rounded-2xl w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Row 3: image left, text right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="rounded-3xl overflow-hidden bg-black/40 p-2 h-full">
            <img
              src="/quickprintz_assets/in-house-design.jpg"
              alt="In-House Design"
              className="aspect-square rounded-2xl w-full h-full object-cover"
            />
          </div>
          <div className="rounded-3xl p-8 bg-black/70 shadow-[0_0_60px_-20px_rgba(245,231,99,0.6)] h-full flex flex-col">
            <h3 className="text-3xl md:text-4xl font-bold text-white">In-House Design</h3>
            <ul className="mt-6 space-y-3 text-white/80 text-base md:text-lg flex-grow">
              <li>Brand systems and retail layouts</li>
              <li>Rapid revisions</li>
              <li>Print-perfect exports</li>
            </ul>
            <div className="mt-6 flex gap-4 text-sm">
              <div className="rounded-xl px-4 py-2 bg-white/5 text-white/80">100+ brands</div>
              <div className="rounded-xl px-4 py-2 bg-white/5 text-white/80">24hr turnaround</div>
            </div>
            <Button
              className="mt-6 !bg-[hsl(60,100%,50%)] !text-black hover:!bg-[hsl(60,100%,45%)] font-bold text-base"
              asChild
            >
              <a href="https://wa.me/13474859935" target="_blank" rel="noopener noreferrer">
                Get Started
              </a>
            </Button>
          </div>
        </div>

        {/* Lightning divider */}
        <div className="mt-12 mb-12 max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            {[...Array(8)].map((_, i) => (
              <Zap key={i} className="w-6 h-6 text-[hsl(60,100%,50%)] fill-[hsl(60,100%,50%)]" />
            ))}
          </div>
        </div>
      </section>

      <div id="portfolio" className="px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border-border/50 rounded-[20px] h-96 shadow-glow hover:shadow-[0_0_40px_hsl(var(--lightning-yellow)/0.5)] transition-all duration-300 overflow-hidden">
            <img
              src="/quickprintz_assets/storefront-interior.jpg"
              alt="Quick Printz storefront interior"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="px-6 py-16">
        <BulkImageUploader />
      </div>

      <Footer />
    </div>
  );
};

export default Index;
