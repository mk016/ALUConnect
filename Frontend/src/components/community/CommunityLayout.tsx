import { Link, Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  MessageSquare, 
  Users, 
  UserCircle, 
  BookOpen, 
  Newspaper, 
  MessageCircle
} from 'lucide-react';

import Nabvbar from '@/components/layout/Navbar';
const sidebarItems = [
  { 
    name: 'Discussions', 
    href: '/community/forums', 
    icon: MessageSquare,
  },
  { 
    name: 'Study Groups', 
    href: '/community/study-groups', 
    icon: Users,
  },
  { 
    name: 'Mentorship', 
    href: '/community/mentorship', 
    icon: UserCircle,
  },
  { 
    name: 'Resources', 
    href: '/community/resources', 
    icon: BookOpen,
  },
  { 
    name: 'News & Updates', 
    href: '/community/news', 
    icon: Newspaper,
  },
  { 
    name: 'My Chats', 
    href: '/community/mychats', 
    icon: MessageCircle,
  },
];

export default function CommunityLayout() {
  const location = useLocation();

  return (
    <div className="container mx-auto py-8">
      <Nabvbar />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
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