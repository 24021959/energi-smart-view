
import { ReactNode } from 'react';
import { ProducerHeader } from '@/components/producer/ProducerHeader';
import { ProducerSidebar } from '@/components/producer/ProducerSidebar';

interface ProducerLayoutProps {
  children: ReactNode;
  title?: string;
}

export function ProducerLayout({ children, title }: ProducerLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <ProducerHeader title={title} />
      <div className="flex flex-1">
        <ProducerSidebar />
        <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
