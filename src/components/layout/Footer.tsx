
import { Link } from "react-router-dom";
import Logo from "../Logo";

const Footer = () => {
  return (
    <footer className="border-t border-border/40">
      <div className="container flex flex-col items-center justify-between gap-6 py-8 px-4 md:h-24 md:flex-row md:py-0 md:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
          <Logo />
          <p className="text-center text-xs md:text-sm leading-loose text-muted-foreground">
            &copy; {new Date().getFullYear()} XtraPrompt. All rights reserved.
          </p>
        </div>
        <nav className="flex items-center gap-4 sm:gap-6 text-xs md:text-sm text-muted-foreground">
          <Link to="/about" className="transition-colors hover:text-foreground">
            About
          </Link>
          <Link to="/terms" className="transition-colors hover:text-foreground">
            Terms
          </Link>
          <Link to="/privacy" className="transition-colors hover:text-foreground">
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
