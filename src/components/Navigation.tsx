import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Palette } from "lucide-react";
import bagIcon from "@/assets/bag-icon.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "POD Orders", href: "#configurator" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-lightning-yellow/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="font-bold text-2xl text-lightning-yellow">
              BAGMAN
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <Palette className="w-4 h-4 mr-2" />
              Custom Design
            </Button>
            <Button variant="premium" size="sm">
              Order Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden h-10 w-10 bg-lightning-yellow border border-lightning-yellow rounded-md"
          >
            {isOpen ? <X className="w-5 h-5 text-black" /> : <Menu className="w-5 h-5 text-black" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-card/50 backdrop-blur-sm border-t border-border/20 py-4">
            <div className="space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border/20">
                <Button variant="ghost" size="sm" className="w-full">
                  <Palette className="w-4 h-4 mr-2" />
                  Custom Design
                </Button>
                <Button variant="premium" size="sm" className="w-full">
                  Order Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;