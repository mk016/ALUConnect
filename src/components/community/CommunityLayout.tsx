import { Link, Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  MessageSquare, 
  Users, 
  UserCircle, 
  BookOpen, 
  Newspaper 
} from 'lucide-react';

const sidebarItems = [
  { 
    name: 'Discussion Forums', 
    href: '/community/forums', 
    icon: MessageSquare,
    description: 'Engage in discussions with alumni and students'
  },
  { 
    name: 'Study Groups', 
    href: '/community/study-groups', 
    icon: Users,
    description: 'Join or create study groups'
  },
  { 
    name: 'Mentorship', 
    href: '/community/mentorship', 
    icon: UserCircle,
    description: 'Connect with mentors and mentees'
  },
  { 
    name: 'Resources', 
    href: '/community/resources', 
    icon: BookOpen,
    description: 'Access educational resources and materials'
  },
  { 
    name: 'News & Updates', 
    href: '/community/news', 
    icon: Newspaper,
    description: 'Stay updated with the latest community news'
  },
];

export default function CommunityLayout() {
  const location = useLocation();

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-4">
          <div className="sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Community</h2>
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg transition-all duration-200 no-underline group",
                    location.pathname === item.href 
                      ? "bg-secondary text-foreground" 
                      : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">{item.name}</div>
                    <p className="text-xs text-muted-foreground group-hover:text-foreground/70">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
} 