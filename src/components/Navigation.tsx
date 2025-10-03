import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Palette, Zap } from "lucide-react";
import BrandMark from "@/components/BrandMark";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Premade Designs", href: "/premadedesigns" },
    { name: "Mylar Bags", href: "https://instagram.com/quickprintz401", external: true },
    { name: "Custom Designs", href: "https://tdstudioshq.com/mylars", external: true },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-lightning-yellow/30 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Desktop Layout */}
        <div className="hidden lg:block">
          {/* Logo centered on top */}
          <div className="flex justify-center pt-6 pb-4">
            <BrandMark className="h-32 w-32" />
          </div>

          {/* Menu items and CTAs below logo */}
          <div className="flex items-center justify-between pb-6">
            {/* Left spacer */}
            <div className="flex-1"></div>

            {/* Centered Navigation */}
            <div className="flex items-center gap-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Right CTAs */}
            <div className="flex-1 flex items-center justify-end gap-3">
              <Button
                size="sm"
                className="!bg-[hsl(60,100%,50%)] !text-black hover:!bg-[hsl(60,100%,45%)] font-bold"
                asChild
              >
                <a href="https://tdstudioshq.com/mylars" target="_blank" rel="noopener noreferrer">
                  <Palette className="w-4 h-4 mr-2" />
                  Custom Design
                </a>
              </Button>
              <Button size="sm" className="!bg-[hsl(60,100%,50%)] !text-black hover:!bg-[hsl(60,100%,45%)] font-bold">
                <Zap className="w-4 h-4 mr-2 fill-black" />
                Order Now
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="flex items-center justify-center relative h-20">
            {/* Centered Logo */}
            <BrandMark className="h-16 w-16" />

            {/* Mobile Menu Button - Top Right */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="absolute right-0 h-10 w-10 !bg-[hsl(60,100%,50%)] hover:!bg-[hsl(60,100%,45%)] border-none rounded-md"
            >
              <Zap className="w-5 h-5 text-black fill-black" />
            </Button>
          </div>

          {/* Mobile Menu - Yellow Card */}
          {isOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setIsOpen(false)}
              />

              {/* Menu Card */}
              <div className="fixed left-0 right-0 top-20 bottom-0 z-50 bg-[hsl(60,100%,50%)] overflow-y-auto">
                <div className="p-6 min-h-full">
                  {/* Close X button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center text-black hover:bg-black/10 rounded-md transition-colors z-10"
                  >
                    <X className="w-8 h-8 stroke-[3]" />
                  </button>

                  <div className="space-y-6 mt-12">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block text-2xl font-bold text-black hover:underline transition-colors py-3"
                        onClick={() => setIsOpen(false)}
                        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {item.name}
                      </a>
                    ))}

                    <div className="flex flex-col gap-4 pt-8 border-t-2 border-black/20">
                      <Button
                        size="lg"
                        className="w-full !bg-black !text-[hsl(60,100%,50%)] hover:!bg-black/90 font-bold text-lg py-6"
                        asChild
                      >
                        <a href="https://tdstudioshq.com/mylars" target="_blank" rel="noopener noreferrer">
                          <Palette className="w-5 h-5 mr-2" />
                          Custom Design
                        </a>
                      </Button>
                      <Button
                        size="lg"
                        className="w-full !bg-black !text-[hsl(60,100%,50%)] hover:!bg-black/90 font-bold text-lg py-6"
                      >
                        <Zap className="w-5 h-5 mr-2 fill-[hsl(60,100%,50%)]" />
                        Order Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;