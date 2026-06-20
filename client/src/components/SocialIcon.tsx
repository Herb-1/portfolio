import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
  FaPhone,
  FaCommentDots
} from "react-icons/fa";

interface SocialIconProps {
  platform: string;
  url: string;
}

export function SocialIcon({ platform, url }: SocialIconProps) {
  const getIconSettings = () => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return { icon: <FaFacebookF />, color: "#1877F2" };
      case "twitter":
        return { icon: <FaTwitter />, color: "#1DA1F2" };
      case "linkedin":
        return { icon: <FaLinkedinIn />, color: "#0A66C2" };
      case "instagram":
        return { icon: <FaInstagram />, color: "#E4405F" };
      case "github":
        return { icon: <FaGithub />, color: "#8B5CF6" };
      case "zalo":
        return { icon: <FaCommentDots />, color: "#0068FF" };
      case "phone":
        return { icon: <FaPhone />, color: "#25D366" };
      default:
        return { icon: <FaLinkedinIn />, color: "#8B5CF6" };
    }
  };

  const { icon, color } = getIconSettings();

  return (
    <a
      href={url}
      className="group relative w-10 h-10 flex items-center justify-center glass rounded-full text-muted-foreground hover:text-white transition-all duration-300 hover:scale-110"
      aria-label={platform}
      title={platform}
      target="_blank"
      rel="noopener noreferrer"
      style={
        {
          "--icon-color": color,
        } as React.CSSProperties
      }
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `${color}20`,
          boxShadow: `0 0 20px ${color}30`,
        }}
      />
      <span className="relative z-10 text-sm group-hover:text-white transition-colors duration-300">
        {icon}
      </span>
    </a>
  );
}
