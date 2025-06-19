
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "../Logo";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Badge } from "@/components/ui/badge";
import { Shield, User, Menu } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { useAdminRole } from "@/hooks/useAdminRole";
import { useState } from "react";

const Header = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const { isAdmin } = useAdminRole();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    if (user) {
      await supabase.auth.signOut();
    }
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium text-muted-foreground transition-colors hover:text-foreground ${isActive ? 'text-foreground' : ''}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 md:h-16 items-center px-4">
        <div className="mr-4 flex">
          <Logo />
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/browse" className={navLinkClass}>
            {t('browse')}
          </NavLink>
          <NavLink to="/pricing" className={navLinkClass}>
            {t('pricing')}
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex flex-1 items-center justify-end space-x-2 md:hidden">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="h-9 w-9"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Desktop Right Section */}
        <div className="hidden md:flex flex-1 items-center justify-end space-x-2">
          <LanguageSwitcher />
          {user ? (
            <>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground max-w-[150px] truncate">
                  {user.email}
                </span>
                {isAdmin && (
                  <Badge variant="destructive" className="text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    Admin
                  </Badge>
                )}
                {profile?.subscription_tier === 'unlimited' && !isAdmin && (
                  <Badge variant="default" className="text-xs">
                    <User className="w-3 h-3 mr-1" />
                    Unlimited
                  </Badge>
                )}
              </div>
              <Button variant="ghost" asChild>
                <Link to="/dashboard">{t('header.dashboard')}</Link>
              </Button>
              <Button onClick={handleLogout} size="sm">{t('header.logout')}</Button>
            </>
          ) : (
            <Button variant="ghost" asChild>
              <Link to="/auth">{t('login')}</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
          <div className="container px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-3">
              <NavLink 
                to="/browse" 
                className={navLinkClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('browse')}
              </NavLink>
              <NavLink 
                to="/pricing" 
                className={navLinkClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('pricing')}
              </NavLink>
            </nav>
            
            {user ? (
              <div className="flex flex-col space-y-3 pt-3 border-t border-border/40">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground truncate">
                    {user.email}
                  </span>
                  {isAdmin && (
                    <Badge variant="destructive" className="text-xs">
                      <Shield className="w-3 h-3 mr-1" />
                      Admin
                    </Badge>
                  )}
                  {profile?.subscription_tier === 'unlimited' && !isAdmin && (
                    <Badge variant="default" className="text-xs">
                      <User className="w-3 h-3 mr-1" />
                      Unlimited
                    </Badge>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  asChild 
                  className="justify-start"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link to="/dashboard">{t('header.dashboard')}</Link>
                </Button>
                <Button 
                  onClick={handleLogout} 
                  size="sm" 
                  className="justify-start"
                >
                  {t('header.logout')}
                </Button>
              </div>
            ) : (
              <div className="pt-3 border-t border-border/40">
                <Button 
                  variant="ghost" 
                  asChild 
                  className="justify-start w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link to="/auth">{t('login')}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
