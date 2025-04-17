import { personalInfo } from "@/lib/data";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-secondary py-8">
      <div className="container mx-auto px-4">
        <div className="text-center text-secondary-foreground">
          <p>&copy; 2024 Your Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
