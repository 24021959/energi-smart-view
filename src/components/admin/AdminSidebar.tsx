
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ChevronRight,
  ChevronLeft,
  Settings,
  ChartBar,
  FileText,
  Zap,
  List
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';

type AdminSidebarProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

// Dati di navigazione
const navItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Membri CER',
    href: '/admin/members',
    icon: Users,
  },
  {
    title: 'Impianti',
    href: '/admin/plants',
    icon: Zap,
  },
  {
    title: 'Configurazioni',
    href: '/admin/configurations',
    icon: List,
  },
  {
    title: 'Dati Energetici',
    href: '/admin/energy',
    icon: ChartBar,
  },
  {
    title: 'Report',
    href: '/admin/reports',
    icon: FileText,
  },
  {
    title: 'Impostazioni',
    href: '/admin/settings',
    icon: Settings,
  },
];

export function AdminSidebar({ isOpen, setIsOpen }: AdminSidebarProps) {
  return (
    <aside 
      className={cn(
        "bg-purple-900 text-white transition-all duration-300 ease-in-out flex flex-col border-r border-r-purple-800",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className={cn(
        "flex items-center p-4 mb-2",
        isOpen ? "justify-between" : "justify-center"
      )}>
        {isOpen && <Logo className="h-8" />}
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-purple-800 ml-auto"
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
                      ? "bg-purple-800 text-white" 
                      : "text-purple-100 hover:bg-purple-800/50"
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
          <div className="text-xs text-purple-300">
            <p>EnergiSmart</p>
            <p>v1.0.0</p>
          </div>
        )}
      </div>
    </aside>
  );
}
