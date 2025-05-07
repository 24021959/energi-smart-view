
import { useAuth } from '@/hooks/useAuthContext';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

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
    <header className="bg-white border-b px-4 py-3 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu size={20} />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <h1 className="text-xl font-bold text-purple-900">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        {user && (
          <>
            <span className="text-sm text-muted-foreground hidden md:inline-block">
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
