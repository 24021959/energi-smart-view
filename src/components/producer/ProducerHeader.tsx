
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Logo } from '@/components/Logo';
import { ProducerSidebar } from './ProducerSidebar';
import { toast } from '@/hooks/use-toast';

interface ProducerHeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  title?: string;
}

export function ProducerHeader({ isSidebarOpen, setIsSidebarOpen, title = 'Dashboard Produttore' }: ProducerHeaderProps) {
  const { authState, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logout effettuato",
        description: "Hai effettuato il logout con successo"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Errore",
        description: "Si è verificato un errore durante il logout"
      });
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 sm:max-w-xs">
              <div className="px-4 py-6">
                <Logo size="sm" />
              </div>
              <ProducerSidebar 
                isOpen={true} 
                setIsOpen={() => {}} 
                onNavClick={() => setIsMenuOpen(false)} 
              />
            </SheetContent>
          </Sheet>
          <Link to="/energi-smart-view/producer" className="hidden md:block">
            <Logo size="sm" />
          </Link>
          <div className="text-lg font-semibold">{title}</div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden md:flex"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10">{authState.user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-sm font-medium">{authState.user?.email}</div>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/energi-smart-view/producer/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profilo</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
