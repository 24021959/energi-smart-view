
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Home, Receipt, Settings, HelpCircle, Activity, Zap } from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

interface ProducerSidebarProps {
  isOpen: boolean; 
  setIsOpen: (isOpen: boolean) => void;
  onNavClick?: () => void;
}

export function ProducerSidebar({ isOpen, setIsOpen, onNavClick }: ProducerSidebarProps) {
  const location = useLocation();
  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(`${href}/`);

  // Update links to include the basename
  const navItems: NavItem[] = [
    { title: 'Dashboard', href: '/energi-smart-view/producer', icon: Home },
    { title: 'Produzione', href: '/energi-smart-view/producer/production', icon: Zap },
    { title: 'Statistiche', href: '/energi-smart-view/producer/statistics', icon: Activity },
    { title: 'Impianti', href: '/energi-smart-view/producer/plants', icon: Activity },
    { title: 'Fatture', href: '/energi-smart-view/producer/bills', icon: Receipt },
    { title: 'Impostazioni', href: '/energi-smart-view/producer/settings', icon: Settings },
    { title: 'Aiuto', href: '/energi-smart-view/producer/help', icon: HelpCircle },
  ];

  return (
    <div className={cn(
      "flex flex-col min-h-screen h-full px-3 py-2 border-r",
      isOpen ? "md:w-64" : "md:w-16"
    )}>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 text-sm",
              isActive(item.href) ? "bg-muted text-primary" : "hover:bg-transparent hover:text-primary"
            )}
            asChild
            onClick={onNavClick}
          >
            <Link to={item.href}>
              <item.icon className="h-4 w-4" />
              <span>{isOpen ? item.title : ""}</span>
            </Link>
          </Button>
        ))}
      </nav>
    </div>
  );
}
