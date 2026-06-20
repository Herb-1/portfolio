interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
  activeSection: string;
}

export function MobileMenu({ isOpen, onClose, links, activeSection }: MobileMenuProps) {
  return (
    <div
      className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      id="mobile-menu"
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-background/95 backdrop-blur-xl transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Menu Content */}
      <nav className="relative z-10 flex flex-col items-center justify-center h-full gap-2">
        {links.map((link, index) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={`text-2xl font-semibold py-3 px-8 rounded-2xl transition-all duration-500 ${
              isOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            } ${
              activeSection === link.href
                ? "text-foreground glass"
                : "text-muted-foreground hover:text-foreground"
            }`}
            style={{
              transitionDelay: isOpen ? `${index * 80 + 100}ms` : "0ms",
            }}
          >
            {link.label}
          </a>
        ))}

        {/* Decorative gradient orb */}
        <div
          className={`absolute w-64 h-64 rounded-full blur-[100px] transition-all duration-1000 pointer-events-none ${
            isOpen ? "opacity-30 scale-100" : "opacity-0 scale-50"
          }`}
          style={{
            background: "radial-gradient(circle, hsl(250 85% 65%), hsl(330 85% 60%))",
            top: "30%",
            right: "10%",
          }}
        />
      </nav>
    </div>
  );
}
