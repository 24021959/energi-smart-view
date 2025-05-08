
import { useParams } from 'react-router-dom';
import { AdminLayout } from '@/layouts/AdminLayout';
import MemberHeader from '@/components/admin/member/MemberHeader';
import MemberTabs from '@/components/admin/member/MemberTabs';
import MemberNotFound from '@/components/admin/member/MemberNotFound';
import { useMemberDetail } from '@/hooks/useMemberDetail';

export default function MemberDetail() {
  const { id } = useParams();
  const memberId = id ? parseInt(id) : 0;
  const { memberDetail, details, loading, toggleMemberStatus } = useMemberDetail(memberId);

  if (loading) {
    return (
      <AdminLayout title="Caricamento...">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Caricamento dati membro...</p>
        </div>
      </AdminLayout>
    );
  }

  if (!memberDetail || !details) {
    return <MemberNotFound />;
  }

  return (
    <AdminLayout title={`Dettaglio: ${memberDetail.name}`}>
      <MemberHeader 
        member={{
          id: memberDetail.id,
          name: memberDetail.name,
          email: memberDetail.email,
          type: memberDetail.type,
          status: memberDetail.status,
          memberType: memberDetail.memberType,
          isActive: memberDetail.isActive
        }} 
        onToggleStatus={toggleMemberStatus} 
      />

      <MemberTabs memberDetail={memberDetail} details={details} />
    </AdminLayout>
  );
}
