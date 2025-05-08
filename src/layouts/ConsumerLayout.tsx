
import { ReactNode, useState } from 'react';
import { ConsumerSidebar } from '@/components/consumer/ConsumerSidebar';
import { ConsumerHeader } from '@/components/consumer/ConsumerHeader';
import { toast } from 'sonner';

interface ConsumerLayoutProps {
  children: ReactNode;
  title?: string;
}

export function ConsumerLayout({ children, title = 'Dashboard Consumatore' }: ConsumerLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // We're removing redundant auth checks since ProtectedRoute handles this
  // The Layout just focuses on rendering the UI structure
  
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <ConsumerSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Area principale */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <ConsumerHeader 
          isSidebarOpen={isSidebarOpen} 
          setIsSidebarOpen={setIsSidebarOpen} 
          title={title}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
