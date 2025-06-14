
import { Link } from "react-router-dom";
import Logo from "../Logo";

const Footer = () => {
  return (
    <footer className="border-t border-border/40">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} XtraPrompt. All rights reserved.
          </p>
        </div>
        <nav className="flex items-center gap-4 sm:gap-6 text-sm text-muted-foreground">
          <Link to="/about" className="transition-colors hover:text-foreground">About</Link>
          <Link to="/terms" className="transition-colors hover:text-foreground">Terms</Link>
          <Link to="/privacy" className="transition-colors hover:text-foreground">Privacy</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
