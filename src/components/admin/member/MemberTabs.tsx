
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MemberEnergyData from '@/components/admin/member/MemberEnergyData';
import MemberAddressCredentials from '@/components/admin/member/MemberAddressCredentials';
import MemberDocuments from '@/components/admin/member/MemberDocuments';
import PropertyList from '@/components/admin/member/PropertyList';
import MemberDataAnalysis from '@/components/admin/member/MemberDataAnalysis';
import { useMemberDetail } from '@/hooks/useMemberDetail';

interface MemberTabsProps {
  memberDetail: any;
  details: any;
}

const MemberTabs = ({ memberDetail, details }: MemberTabsProps) => {
  // Get the data loading functionality from useMemberDetail hook
  const { dataLoading, loadAnalysisData } = useMemberDetail(memberDetail.id);
  
  return (
    <div className="mt-6">
      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Panoramica</TabsTrigger>
          <TabsTrigger value="energy">Dati Energetici</TabsTrigger>
          <TabsTrigger value="analysis">Analisi</TabsTrigger>
          <TabsTrigger value="documents">Documenti</TabsTrigger>
          {memberDetail.type === 'owner' && <TabsTrigger value="properties">Proprietà</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="overview">
          <MemberAddressCredentials 
            memberInfo={{
              email: memberDetail.email,
              phone: details?.phone || 'Non specificato',
              address: details?.legalAddress || details?.supplyAddress || 'Non specificato',
              fiscalCode: details?.fiscalCode || 'Non specificato',
              vatNumber: details?.vatNumber || 'Non specificato'
            }}
          />
        </TabsContent>
        
        <TabsContent value="energy">
          <MemberEnergyData energyData={details?.energyData || {}} />
        </TabsContent>
        
        <TabsContent value="analysis">
          <MemberDataAnalysis 
            memberId={memberDetail.id} 
            dataLoading={dataLoading} 
            onLoadData={loadAnalysisData} 
          />
        </TabsContent>
        
        <TabsContent value="documents">
          <MemberDocuments 
            documentsList={details?.documents || []}
            memberId={memberDetail.id}
          />
        </TabsContent>
        
        {memberDetail.type === 'owner' && (
          <TabsContent value="properties">
            <PropertyList 
              propertyOwnerId={memberDetail.id} 
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default MemberTabs;
