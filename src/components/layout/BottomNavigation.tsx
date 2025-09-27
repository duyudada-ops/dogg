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
    <nav className="fixed bottom-0 left-0 right-0 glass-morphism border-t border-white/20 z-50 safe-area-pb backdrop-blur-xl shadow-2xl">
      <div className="flex items-center justify-around py-3 px-4 max-w-md mx-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `group flex flex-col items-center py-3 px-4 rounded-2xl transition-all duration-300 min-h-[60px] min-w-[60px] hover:scale-110 ${
                isActive
                  ? 'bg-gradient-primary text-white shadow-lg transform scale-105'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/10'
              }`
            }
          >
            <Icon className={`h-6 w-6 mb-1 transition-all duration-300 ${
              window.location.pathname === to ? 'animate-bounce' : 'group-hover:scale-110'
            }`} />
            <span className="text-xs font-semibold tracking-wide">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;