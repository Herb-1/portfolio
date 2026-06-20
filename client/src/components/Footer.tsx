import { FaGithub, FaFacebookF, FaInstagram, FaHeart } from "react-icons/fa";
import { ArrowUp } from "lucide-react";
import { personalInfo } from "@/lib/data";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/5">
      {/* Gradient line */}
      <div
        className="absolute top-0 left-0 w-full h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(250 85% 65% / 0.3), hsl(200 90% 55% / 0.3), hsl(330 85% 60% / 0.3), transparent)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold gradient-text mb-1">
              {personalInfo.name}
            </h3>
            <p className="text-sm text-muted-foreground">{personalInfo.role}</p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {personalInfo.socialLinks.map((social, index) => {
              const getIcon = () => {
                switch (social.platform.toLowerCase()) {
                  case "facebook": return <FaFacebookF className="w-4 h-4" />;
                  case "instagram": return <FaInstagram className="w-4 h-4" />;
                  case "github": return <FaGithub className="w-4 h-4" />;
                  default: return <FaGithub className="w-4 h-4" />;
                }
              };

              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full glass text-muted-foreground hover:text-foreground hover:bg-white/[0.08] transition-all duration-300 hover:scale-110"
                  aria-label={social.platform}
                >
                  {getIcon()}
                </a>
              );
            })}
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 flex items-center justify-center rounded-full glass text-muted-foreground hover:text-foreground hover:bg-white/[0.08] transition-all duration-300 hover:-translate-y-1 group"
            aria-label="Back to top"
            id="back-to-top"
          >
            <ArrowUp className="w-4 h-4 group-hover:animate-bounce" />
          </button>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-sm text-muted-foreground/60">
            © {new Date().getFullYear()} {personalInfo.name}. Made with{" "}
            <FaHeart className="inline-block w-3 h-3 text-accent mx-1 animate-pulse" />{" "}
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;