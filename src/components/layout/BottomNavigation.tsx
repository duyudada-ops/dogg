import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Heart, 
  MessageCircle, 
  BookOpen, 
  User, 
  MoreHorizontal,
  Compass
} from 'lucide-react';

const BottomNavigation = () => {
  const navItems = [
    { to: '/discover', icon: Compass, label: 'Discover' },
    { to: '/matches', icon: Heart, label: 'Matches' },
    { to: '/chat', icon: MessageCircle, label: 'Chat' },
    { to: '/tips-and-tricks', icon: BookOpen, label: 'Tips' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 safe-area-pb">
      <div className="flex items-center justify-around py-2 px-2 max-w-md mx-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center py-2 px-3 rounded-lg transition-colors min-h-[44px] min-w-[44px] ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            <Icon className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;