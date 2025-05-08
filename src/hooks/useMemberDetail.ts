
import { useState, useEffect } from 'react';
import { MemberDetailData } from '@/types/member';
import { getMemberById, getMemberDetails } from '@/services/memberService';
import { toast } from '@/hooks/use-toast';

export function useMemberDetail(memberId: number) {
  const [memberDetail, setMemberDetail] = useState<MemberDetailData | null>(null);
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchedMember = getMemberById(memberId);
    
    if (fetchedMember) {
      setMemberDetail(fetchedMember);
      setDetails(getMemberDetails(memberId));
    }
    
    setLoading(false);
  }, [memberId]);

  const toggleMemberStatus = (isActive: boolean) => {
    if (!memberDetail) return;
    
    setMemberDetail({
      ...memberDetail,
      isActive,
      status: isActive ? 'Attivo' : 'In attesa'
    });
    
    toast({
      title: isActive ? "Membro attivato" : "Membro disattivato",
      description: `${memberDetail.name} è stato ${isActive ? 'attivato' : 'disattivato'} con successo.`,
      variant: isActive ? "default" : "destructive",
    });
  };

  return {
    memberDetail,
    details,
    loading,
    toggleMemberStatus
  };
}
