import { useEffect, useMemo, useState, type CSSProperties } from "react";
import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import ServicesGrid from "../components/ServicesGrid";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { MessageCircle, Package, Sparkles, Zap } from "lucide-react";
import { fetchDesignAssets, isImageAsset, type DesignAsset } from "@/lib/designs";

const watermarkOverlayStyle: CSSProperties = {
  pointerEvents: "none",
  position: "absolute",
  inset: 0,
  backgroundImage:
    "linear-gradient(45deg, rgba(255, 255, 255, 0.75) 25%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.75) 75%), linear-gradient(45deg, rgba(0, 0, 0, 0.65) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.65) 75%)",
  backgroundSize: "40px 40px",
  backgroundPosition: "0 0, 20px 20px",
  opacity: 0.85,
  mixBlendMode: "overlay",
};

const logoWatermarkStyle: CSSProperties = {
  pointerEvents: "none",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  opacity: 0.85,
  zIndex: 10,
  filter: "drop-shadow(0 0 20px rgba(0, 0, 0, 0.5))",
};

const Index = () => {
  const [featuredDesigns, setFeaturedDesigns] = useState<DesignAsset[]>([]);
  const [isLoadingDesigns, setIsLoadingDesigns] = useState<boolean>(false);
  const [designsError, setDesignsError] = useState<string | null>(null);

  useEffect(() => {
    const loadFeaturedDesigns = async () => {
      try {
        setIsLoadingDesigns(true);
        setDesignsError(null);
        const assets = await fetchDesignAssets();
        const imageAssets = assets.filter(isImageAsset);
        setFeaturedDesigns(imageAssets.slice(0, 24));
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unable to load premade designs.";
        setDesignsError(message);
      } finally {
        setIsLoadingDesigns(false);
      }
    };

    void loadFeaturedDesigns();
  }, []);

  const placeholderBlocks = Array.from({ length: 24 }, (_, index) => index);
  const hasDesigns = featuredDesigns.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
            <div>
              <p className="text-lightning-yellow text-sm font-semibold uppercase tracking-widest">
                Premade Designs
              </p>
              <h2 className="text-3xl font-bold text-lightning-yellow">ADD YOUR LOGO &amp; GO!</h2>
            </div>
            <Button
              asChild
              className="!bg-[hsl(60,100%,50%)] !text-black hover:!bg-[hsl(60,100%,45%)] font-bold"
            >
              <a href="/premadedesigns">Browse All</a>
            </Button>
          </div>

          {designsError ? (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200 text-sm">
              {designsError}.{" "}
              <a href="/premadedesigns" className="underline text-white">
                See the full gallery
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {hasDesigns
                ? featuredDesigns.map((design) => (
                    <div
                      key={design.path}
                      className="relative aspect-[4/5] rounded-xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm group"
                    >
                      <img
                        src={design.publicUrl || "/quickprintz_assets/quickprintz-256.png"}
                        alt={design.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/quickprintz_assets/quickprintz-256.png";
                        }}
                        loading="lazy"
                        draggable={false}
                        onContextMenu={(event) => event.preventDefault()}
                      />
                      <div style={watermarkOverlayStyle} aria-hidden="true" />
                      <img
                        src="/quickprintz_assets/quickprintz-512.png"
                        alt="Quick Printz Watermark"
                        style={logoWatermarkStyle}
                        aria-hidden="true"
                        draggable={false}
                        onContextMenu={(event) => event.preventDefault()}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-3 left-3 right-3 text-sm font-semibold text-white flex items-center justify-between">
                        <span className="truncate">{design.name}</span>
                        <span className="text-lightning-yellow">$20</span>
                      </div>
                    </div>
                  ))
                : placeholderBlocks.map((placeholder) => (
                    <div
                      key={`placeholder-${placeholder}`}
                      className="relative aspect-[4/5] rounded-xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm"
                    >
                      <div className="h-full w-full animate-pulse bg-white/5" />
                    </div>
                  ))}
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <Button
              size="lg"
              className="!bg-[hsl(60,100%,50%)] !text-black hover:!bg-[hsl(60,100%,45%)] font-bold px-10"
              asChild
            >
              <a href="/premadedesigns">SEE ENTIRE COLLECTION</a>
            </Button>
          </div>
        </div>
      </section>
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
              <a href="https://www.instagram.com/quickprintz401/" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                DM TO GET STARTED
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
            <h3 className="text-3xl md:text-4xl font-bold text-lightning-yellow">Mylar Bags</h3>
            <ul className="mt-6 space-y-3 text-white/80 text-base md:text-lg flex-grow">
              {["Matte, gloss, holographic", "Retail-ready compliance layout", "Rush options available"].map(
                (feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="text-lightning-yellow text-xl leading-none">•</span>
                    <span>{feature}</span>
                  </li>
                )
              )}
            </ul>
            <Button
              className="mt-6 !bg-[hsl(60,100%,50%)] !text-black hover:!bg-[hsl(60,100%,45%)] font-bold text-base"
              asChild
            >
              <a href="https://www.instagram.com/quickprintz401/" target="_blank" rel="noopener noreferrer">
                DM TO GET STARTED
              </a>
            </Button>
          </div>
        </div>

        {/* Row 2: image right, text left */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="rounded-3xl p-8 bg-black/70 shadow-[0_0_60px_-20px_rgba(245,231,99,0.6)] order-last lg:order-first h-full flex flex-col">
            <h3 className="text-3xl md:text-4xl font-bold text-lightning-yellow">Custom Boxes</h3>
            <p className="mt-4 text-white/80 text-base md:text-lg">Premium finishes. Factory-level pricing.</p>
            <ul className="mt-6 space-y-3 text-white/80 text-base md:text-lg flex-grow">
              {["Foil, emboss, UV spot", "Fast prototypes", "Color-accurate proofs"].map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="text-lightning-yellow text-xl leading-none">•</span>
                  <span>{feature}</span>
                </li>
              ))}
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
            <h3 className="text-3xl md:text-4xl font-bold text-lightning-yellow">In-House Design</h3>
            <p className="mt-4 text-white/80 text-base md:text-lg flex-grow">
              Custom designs built for your brand, not templates. Fast same-day turnaround and unlimited
              revisions until it’s exactly right. Every file is delivered print-ready, color-accurate, and
              production-verified so your bags come out clean, sharp, and consistent every run.
            </p>
            <ul className="mt-6 space-y-3 text-white/80 text-base md:text-lg">
              {["Same-day turnaround", "Unlimited revisions", "Fully custom designs"].map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="text-lightning-yellow text-xl leading-none">•</span>
                  <span>{feature}</span>
                </li>
              ))}
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

      <Footer />
    </div>
  );
};

export default Index;
