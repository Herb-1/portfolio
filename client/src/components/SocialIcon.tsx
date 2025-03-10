import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram, 
  FaGithub 
} from "react-icons/fa";

interface SocialIconProps {
  platform: string;
  url: string;
}

export function SocialIcon({ platform, url }: SocialIconProps) {
  // Define platform specific settings
  const getIconSettings = () => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return { 
          icon: <FaFacebookF />, 
          bgColor: 'bg-[#1877F2]' 
        };
      case 'twitter':
        return { 
          icon: <FaTwitter />, 
          bgColor: 'bg-[#1DA1F2]' 
        };
      case 'linkedin':
        return { 
          icon: <FaLinkedinIn />, 
          bgColor: 'bg-[#0A66C2]' 
        };
      case 'instagram':
        return { 
          icon: <FaInstagram />, 
          bgColor: 'bg-[#E4405F]' 
        };
      case 'github':
        return { 
          icon: <FaGithub />, 
          bgColor: 'bg-[#333333]' 
        };
      default:
        return { 
          icon: <FaLinkedinIn />, 
          bgColor: 'bg-primary' 
        };
    }
  };

  const { icon, bgColor } = getIconSettings();

  return (
    <a 
      href={url} 
      className={`w-10 h-10 flex items-center justify-center ${bgColor} text-white rounded-full hover:opacity-90 transition-opacity duration-200`}
      aria-label={platform}
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  );
}
