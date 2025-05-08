
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MemberOverview from '@/components/admin/member/MemberOverview';
import MemberAddressCredentials from '@/components/admin/member/MemberAddressCredentials';
import MemberEnergyData from '@/components/admin/member/MemberEnergyData';
import MemberDocuments from '@/components/admin/member/MemberDocuments';
import PropertyList from '@/components/admin/member/PropertyList';
import { MemberDetailData } from '@/types/member';

interface MemberTabsProps {
  memberDetail: MemberDetailData;
  details: any;
}

export default function MemberTabs({ memberDetail, details }: MemberTabsProps) {
  const canManageProperties = memberDetail.memberType === 'prosumer';
  const hasConsumerRole = memberDetail.memberType === 'consumer' || memberDetail.memberType === 'prosumer';

  return (
    <Tabs defaultValue="overview">
      <TabsList className="mb-4">
        <TabsTrigger value="overview">Panoramica</TabsTrigger>
        <TabsTrigger value="energy">Dati Energetici</TabsTrigger>
        <TabsTrigger value="properties">Proprietà</TabsTrigger>
        <TabsTrigger value="documents">Documenti</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <MemberOverview 
          personalInfo={{
            name: memberDetail.name,
            email: memberDetail.email,
            type: memberDetail.type,
            status: memberDetail.status,
            fiscalCode: details.fiscalCode,
            vatNumber: details.vatNumber,
            idType: details.idType,
            idNumber: details.idNumber,
            registrationDate: details.registrationDate
          }} 
        />

        <MemberAddressCredentials 
          addresses={{
            legalAddress: details.legalAddress,
            supplyAddress: details.supplyAddress
          }}
          credentials={{
            username: details.username
          }}
        />
      </TabsContent>

      <TabsContent value="energy">
        <MemberEnergyData 
          energyData={{
            podCode: details.podCode,
            supplyAddress: details.supplyAddress,
            hasConsumptionData: details.consumptionData.length > 0,
            hasProductionData: details.productionData.length > 0,
            memberType: memberDetail.memberType
          }}
        />
      </TabsContent>

      <TabsContent value="properties" className="space-y-4">
        {canManageProperties && (
          <PropertyList 
            properties={memberDetail.properties.filter(p => p.ownerId === memberDetail.id)} 
            memberId={memberDetail.id}
            isOwner={true}
          />
        )}
        
        {hasConsumerRole && (
          <PropertyList 
            properties={memberDetail.properties.filter(p => p.consumerId === memberDetail.id)} 
            memberId={memberDetail.id}
            isOwner={false}
          />
        )}
        
        {!canManageProperties && !hasConsumerRole && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Questo membro non può gestire proprietà in quanto è di tipo {memberDetail.memberType}.
            </p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="documents">
        <MemberDocuments 
          documentInfo={{
            idNumber: details.idNumber,
            registrationDate: details.registrationDate
          }}
        />
      </TabsContent>
    </Tabs>
  );
}
