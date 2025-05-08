
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
  onNavClick?: () => void;
}

export function ProducerSidebar({ onNavClick }: ProducerSidebarProps) {
  const location = useLocation();
  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(`${href}/`);

  const navItems: NavItem[] = [
    { title: 'Dashboard', href: '/producer', icon: Home },
    { title: 'Produzione', href: '/producer/production', icon: Zap },
    { title: 'Statistiche', href: '/producer/statistics', icon: Activity },
    { title: 'Impianti', href: '/producer/plants', icon: Activity },
    { title: 'Fatture', href: '/producer/bills', icon: Receipt },
    { title: 'Impostazioni', href: '/producer/settings', icon: Settings },
    { title: 'Aiuto', href: '/producer/help', icon: HelpCircle },
  ];

  return (
    <div className="flex flex-col min-h-screen h-full px-3 py-2 border-r md:w-64">
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
          >
            <Link to={item.href} onClick={onNavClick}>
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          </Button>
        ))}
      </nav>
    </div>
  );
}
