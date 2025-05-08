
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ChevronRight,
  ChevronLeft,
  Receipt,
  LineChart,
  Zap,
  Settings,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type ProsumerSidebarProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

// Dati di navigazione
const navItems = [
  {
    title: 'Dashboard',
    href: '/prosumer',
    icon: LayoutDashboard,
  },
  {
    title: 'Bollette',
    href: '/prosumer/bills',
    icon: Receipt,
  },
  {
    title: 'Produzione',
    href: '/prosumer/production',
    icon: Zap,
  },
  {
    title: 'Consumi',
    href: '/prosumer/consumption',
    icon: LineChart,
  },
  {
    title: 'Impostazioni',
    href: '/prosumer/settings',
    icon: Settings,
  },
  {
    title: 'Supporto',
    href: '/prosumer/help',
    icon: HelpCircle,
  },
];

export function ProsumerSidebar({ isOpen, setIsOpen }: ProsumerSidebarProps) {
  return (
    <aside 
      className={cn(
        "bg-green-800 text-white transition-all duration-300 ease-in-out flex flex-col border-r border-r-green-900",
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
          className="text-white hover:bg-green-700"
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
                      ? "bg-green-700 text-white" 
                      : "text-green-100 hover:bg-green-700/50"
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
          <div className="text-xs text-green-300">
            <p>EnergiSmart</p>
            <p>Prosumer</p>
          </div>
        )}
      </div>
    </aside>
  );
}
