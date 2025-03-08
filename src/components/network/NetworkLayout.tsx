import { Link, Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  MessagesSquare, 
  Users, 
  Globe 
} from 'lucide-react';

const sidebarItems = [
  { 
    name: 'Alumni Chat', 
    href: '/network/alumni-chat', 
    icon: MessagesSquare,
    description: 'Connect and chat with fellow alumni'
  },
  { 
    name: 'Student Connect', 
    href: '/network/student-chat', 
    icon: Users,
    description: 'Interact with current students'
  },
  { 
    name: 'Global Network', 
    href: '/network/global', 
    icon: Globe,
    description: 'Connect with alumni worldwide'
  },
];

export default function NetworkLayout() {
  const location = useLocation();

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-4">
          <div className="sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Network</h2>
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