
import { useAuth } from '@/hooks/useAuthContext';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Logo } from '@/components/Logo';

type AdminHeaderProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  title?: string;
}

export function AdminHeader({ isSidebarOpen, setIsSidebarOpen, title = 'Dashboard Gestore CER' }: AdminHeaderProps) {
  const { authState, logout } = useAuth();
  const user = authState.user;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-white border-b px-4 py-5 flex items-center relative h-20">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu size={20} />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        
        {/* Logo positioned on the left */}
        <Logo size="md" className="transform scale-150" />
      </div>

      {/* User info and logout on the right */}
      <div className="flex items-center gap-3 ml-auto">
        {user && (
          <>
            <span className="text-sm text-muted-foreground">
              {user.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
