
import React from 'react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Skeleton } from "@/components/ui/skeleton";

export default function MemberLoadingState() {
  return (
    <AdminLayout title="Caricamento...">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-10 w-28" />
        </div>
        
        <div className="border rounded-lg p-6 space-y-6">
          <div className="flex gap-4 items-center">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
          </div>
          
          <div className="pt-6">
            <Skeleton className="h-8 w-full max-w-md" />
            <div className="mt-6">
              <Skeleton className="h-72 w-full" />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
