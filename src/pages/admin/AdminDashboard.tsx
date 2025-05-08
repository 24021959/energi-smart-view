
import { AdminLayout } from '@/layouts/AdminLayout';
import { DashboardOverview } from '@/components/admin/dashboard/DashboardOverview';
import { RealtimeMonitoring } from '@/components/admin/dashboard/RealtimeMonitoring';
import { HistoricalData } from '@/components/admin/dashboard/HistoricalData';
import { MembersSummary } from '@/components/admin/dashboard/MembersSummary';
import { NotificationsPanel } from '@/components/admin/dashboard/NotificationsPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/hooks/useAuthContext';

export default function AdminDashboard() {
  const { authState } = useAuth();
  const user = authState.user;
  
  return (
    <AdminLayout title="Dashboard Gestore CER">
      {/* Welcome message */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">
          Benvenuto, {user?.email?.split('@')[0] || 'Gestore'}
        </h2>
        <p className="text-muted-foreground mt-1">
          Ecco la panoramica della tua Comunità Energetica Rinnovabile
        </p>
      </div>
      
      {/* Main dashboard overview cards */}
      <DashboardOverview />
      
      {/* Detailed sections in tabs */}
      <Tabs defaultValue="realtime" className="mt-8">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="realtime">Monitoraggio in Tempo Reale</TabsTrigger>
          <TabsTrigger value="historical">Dati Storici</TabsTrigger>
          <TabsTrigger value="members">Gestione Membri</TabsTrigger>
          <TabsTrigger value="alerts">Alert e Notifiche</TabsTrigger>
        </TabsList>
        
        <TabsContent value="realtime" className="space-y-4 pt-2">
          <RealtimeMonitoring />
        </TabsContent>
        
        <TabsContent value="historical" className="space-y-4 pt-2">
          <HistoricalData />
        </TabsContent>
        
        <TabsContent value="members" className="space-y-4 pt-2">
          <MembersSummary />
        </TabsContent>
        
        <TabsContent value="alerts" className="space-y-4 pt-2">
          <NotificationsPanel />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
