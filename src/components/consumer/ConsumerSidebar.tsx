
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ChevronRight,
  ChevronLeft,
  Receipt,
  LineChart,
  Settings,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { APP_CONFIG } from '@/lib/config';

type ConsumerSidebarProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function ConsumerSidebar({ isOpen, setIsOpen }: ConsumerSidebarProps) {
  // Use paths from central config
  const navItems = [
    {
      title: 'Dashboard',
      href: APP_CONFIG.paths.consumer.root,
      icon: LayoutDashboard,
    },
    {
      title: 'Bollette',
      href: APP_CONFIG.paths.consumer.bills,
      icon: Receipt,
    },
    {
      title: 'Consumi',
      href: APP_CONFIG.paths.consumer.consumption,
      icon: LineChart,
    },
    {
      title: 'Impostazioni',
      href: APP_CONFIG.paths.consumer.settings,
      icon: Settings,
    },
    {
      title: 'Supporto',
      href: APP_CONFIG.paths.consumer.help,
      icon: HelpCircle,
    },
  ];

  return (
    <aside 
      className={cn(
        "bg-blue-800 text-white transition-all duration-300 ease-in-out flex flex-col border-r border-r-blue-900",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className={cn(
        "flex items-center p-4 mb-2",
        isOpen ? "justify-end" : "justify-center"
      )}>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-blue-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </Button>
      </div>
      
      <nav className="flex-1 px-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <NavLink 
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    isActive 
                      ? "bg-blue-700 text-white" 
                      : "text-blue-100 hover:bg-blue-700/50"
                  )
                }
              >
                <item.icon size={20} />
                {isOpen && <span>{item.title}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 mt-auto">
        {isOpen && (
          <div className="text-xs text-blue-300">
            <p>EnergiSmart</p>
            <p>Consumatore</p>
          </div>
        )}
      </div>
    </aside>
  );
}
