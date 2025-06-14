
import { Bot } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <Bot className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold text-foreground">XtraPrompt</span>
    </Link>
  );
};

export default Logo;
