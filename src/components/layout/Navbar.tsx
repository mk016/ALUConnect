
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, UserCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Directory', href: '/directory' },
  { name: 'Network', href: '/network' },
  { name: 'Jobs', href: '/jobs' },
  { name: 'Events', href: '/events' },
  { name: 'Donate', href: '/donate' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "glass py-3 shadow-sm" : "bg-transparent py-5"
    )}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2 no-underline">
              <span className="font-bold text-2xl tracking-tight text-primary animate-float">Alumni</span>
              <span className="text-sm py-0.5 px-2 bg-secondary rounded-full">Connect</span>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "relative transition-all duration-300 text-sm font-medium no-underline group",
                  location.pathname === item.href ? "text-primary" : "text-foreground hover:text-primary"
                )}
              >
                {item.name}
                <span 
                  className={cn(
                    "absolute left-0 -bottom-1 h-0.5 bg-primary transition-all duration-300",
                    location.pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-2">
            <Button variant="outline" size="sm" className="transition-all duration-300">
              Log in
            </Button>
            <Button size="sm" className="transition-all duration-300">
              Register
            </Button>
          </div>
        </nav>
        
        {/* Mobile menu */}
        <div className={cn(
          "fixed inset-0 z-50 glass-dark lg:hidden",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )} style={{ transition: "opacity 0.3s ease-in-out" }}>
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2 no-underline" onClick={() => setMobileMenuOpen(false)}>
                <span className="font-bold text-2xl tracking-tight text-primary">Alumni</span>
                <span className="text-sm py-0.5 px-2 bg-secondary rounded-full">Connect</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-border">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        "block rounded-lg px-3 py-2 text-base font-medium transition-all duration-300 no-underline",
                        location.pathname === item.href 
                          ? "bg-secondary text-foreground" 
                          : "text-foreground hover:bg-secondary"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6 space-y-3">
                  <Button variant="outline" className="w-full justify-center">
                    Log in
                  </Button>
                  <Button className="w-full justify-center">
                    Register
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
