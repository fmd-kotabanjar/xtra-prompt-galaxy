
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "../Logo";
import { useAuth } from "@/context/AuthContext";
import { useDummyAuth } from "@/components/DummyAuth";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Header = () => {
  const { user } = useAuth();
  const { user: dummyUser, logout: dummyLogout } = useDummyAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const currentUser = user || dummyUser;

  const handleLogout = async () => {
    if (user) {
      await supabase.auth.signOut();
    }
    if (dummyUser) {
      dummyLogout();
    }
    navigate('/');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium text-muted-foreground transition-colors hover:text-foreground ${isActive ? 'text-foreground' : ''}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Logo />
        </div>
        <nav className="flex items-center space-x-6">
          <NavLink to="/browse" className={navLinkClass}>
            {t('browse')}
          </NavLink>
          <NavLink to="/pricing" className={navLinkClass}>
            {t('pricing')}
          </NavLink>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <LanguageSwitcher />
          {currentUser ? (
            <>
              <Button variant="ghost" asChild>
                <Link to="/dashboard">{t('header.dashboard')}</Link>
              </Button>
              <Button onClick={handleLogout}>{t('header.logout')}</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/auth">{t('login')}</Link>
              </Button>
              <Button asChild>
                <Link to="/demo-auth">Demo Login</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
