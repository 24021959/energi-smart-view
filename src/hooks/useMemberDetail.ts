
import { useState, useEffect } from 'react';
import { MemberDetailData } from '@/types/member';
import { getMemberById, getMemberDetails } from '@/services/memberService';
import { toast } from '@/hooks/use-toast';

export function useMemberDetail(memberId: number) {
  const [memberDetail, setMemberDetail] = useState<MemberDetailData | null>(null);
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    const fetchMemberData = async () => {
      setLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real app, this would be an API call
        const fetchedMember = getMemberById(memberId);
        
        if (fetchedMember) {
          setMemberDetail(fetchedMember);
          setDetails(getMemberDetails(memberId));
        }
      } catch (error) {
        console.error("Error fetching member data:", error);
        toast({
          title: "Errore",
          description: "Si è verificato un errore durante il caricamento dei dati.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMemberData();
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

  const loadAnalysisData = async (period: string) => {
    setDataLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Dati caricati",
        description: `I dati di analisi per il periodo ${period} sono stati caricati con successo.`,
      });
    } catch (error) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante il caricamento dei dati di analisi.",
        variant: "destructive",
      });
    } finally {
      setDataLoading(false);
    }
  };

  return {
    memberDetail,
    details,
    loading,
    dataLoading,
    toggleMemberStatus,
    loadAnalysisData
  };
}
