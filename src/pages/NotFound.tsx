import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { currentTheme } = useTheme();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div 
      className="flex min-h-screen items-center justify-center"
      style={{ background: currentTheme.colors.background, color: currentTheme.colors.foreground }}
    >
      <div className="text-center px-4">
        <h1 className="mb-4 text-6xl sm:text-8xl font-bold" style={{ color: currentTheme.colors.accent }}>404</h1>
        <p className="mb-8 text-xl sm:text-2xl" style={{ color: currentTheme.colors.muted }}>Oops! Page not found</p>
        <Link to="/">
          <Button 
            size="lg"
            className="gap-2"
            style={{
              background: currentTheme.colors.accent,
              color: currentTheme.colors.background,
            }}
          >
            <Home className="w-4 h-4" />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
