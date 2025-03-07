import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  User, 
  Briefcase, 
  Network, 
  Building2, 
  CalendarDays, 
  Heart, 
  MessageSquare,
  Search,
  Filter,
  GraduationCap,
  Users,
  Globe,
  MessagesSquare,
  UserCircle,
  BookOpen,
  Newspaper
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '../theme/ThemeToggle';

const navigation = [
  { name: 'Home', href: '/' },
  { 
    name: 'Community', 
    href: '/community',
    subItems: [
      { name: 'Discussion Forums', href: '/community/forums', icon: MessageSquare },
      { name: 'Study Groups', href: '/community/study-groups', icon: Users },
      { name: 'Mentorship', href: '/community/mentorship', icon: UserCircle },
      { name: 'Resources', href: '/community/resources', icon: BookOpen },
      { name: 'News & Updates', href: '/community/news', icon: Newspaper },
    ]
  },
  { 
    name: 'Network', 
    href: '/network',
    subItems: [
      { name: 'Alumni Chat', href: '/network/alumni-chat', icon: MessagesSquare },
      { name: 'Student Connect', href: '/network/student-chat', icon: Users },
      { name: 'Global Network', href: '/network/global', icon: Globe },
    ]
  },
  { name: 'Jobs', href: '/jobs' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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

  const handleMouseEnter = (name: string) => {
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "dark:glass-dark glass py-3 shadow-sm" : "bg-transparent py-5"
    )}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2 no-underline">
              <span className="font-bold text-2xl tracking-tight text-primary animate-float">Alumni</span>
              <span className="text-sm py-0.5 px-2 bg-secondary rounded-full">Connect</span>
            </Link>
          </div>
          <div className="flex lg:hidden items-center gap-4">
            <ThemeToggle />
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
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => item.subItems && handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={item.href}
                  className={cn(
                    "relative transition-all duration-300 text-sm font-medium no-underline",
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
                {item.subItems && (
                  <div className="absolute top-full left-0 mt-2 w-60 rounded-md bg-popover shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-secondary/50 no-underline"
                        >
                          <subItem.icon className="h-4 w-4" />
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-3">
            <Button variant="outline" size="sm" className="gap-1.5" asChild>
              <Link to="/directory">
                <Search className="h-4 w-4" />
                <span>Find Alumni</span>
              </Link>
            </Button>
            <ThemeToggle />
            <Button variant="outline" size="sm" className="transition-all duration-300" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button size="sm" className="transition-all duration-300" asChild>
              <Link to="/register">Register</Link>
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
                    <div key={item.name}>
                      <Link
                        to={item.href}
                        className={cn(
                          "block rounded-lg px-3 py-2 text-base font-medium transition-all duration-300 no-underline",
                          location.pathname === item.href 
                            ? "bg-secondary text-foreground" 
                            : "text-foreground hover:bg-secondary"
                        )}
                        onClick={() => !item.subItems && setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                      {item.subItems && (
                        <div className="ml-4 mt-1 space-y-1">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-secondary/50 no-underline"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <subItem.icon className="h-4 w-4" />
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <Link
                    to="/directory" 
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium transition-all duration-300 no-underline text-foreground hover:bg-secondary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Search className="h-4 w-4" />
                    <span>Find Alumni</span>
                  </Link>
                </div>
                <div className="py-6 space-y-3">
                  <Button variant="outline" className="w-full justify-center" asChild>
                    <Link to="/login">Log in</Link>
                  </Button>
                  <Button className="w-full justify-center" asChild>
                    <Link to="/register">Register</Link>
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
