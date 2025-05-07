
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Configuration } from "@/types/configuration";
import { MemberListItem } from "@/types/member";
import { AddMemberToConfigDialog } from "@/components/admin/configuration/AddMemberToConfigDialog";

// Mock members data - in a real app, this would come from an API
const mockMembers: MemberListItem[] = [
  { id: 1, name: "Mario Rossi", email: "mario.rossi@example.com", type: "person", status: "active", memberType: "consumer", isActive: true },
  { id: 2, name: "Azienda ABC", email: "info@aziendaabc.com", type: "company", status: "active", memberType: "producer", isActive: true },
  { id: 3, name: "Giulia Bianchi", email: "giulia.bianchi@example.com", type: "person", status: "pending", memberType: "consumer", isActive: false },
];

interface ConfigMembersExpanderProps {
  configuration: Configuration;
}

export function ConfigMembersExpander({ configuration }: ConfigMembersExpanderProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [members] = useState<MemberListItem[]>(mockMembers);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <AddMemberToConfigDialog configId={configuration.id} />
      </div>
      
      <Card className="border shadow-sm">
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-2 font-medium">Nome</th>
                  <th className="text-left pb-2 font-medium">Email</th>
                  <th className="text-left pb-2 font-medium">Tipo</th>
                  <th className="text-left pb-2 font-medium">Ruolo</th>
                  <th className="text-left pb-2 font-medium">Stato</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="border-b hover:bg-gray-50">
                    <td className="py-3">{member.name}</td>
                    <td className="py-3">{member.email}</td>
                    <td className="py-3">
                      {member.type === 'person' ? 'Persona' : 'Azienda'}
                    </td>
                    <td className="py-3">
                      {member.memberType === 'consumer' ? 'Consumatore' : 
                       member.memberType === 'producer' ? 'Produttore' : 'Prosumer'}
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${member.isActive ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                        {member.isActive ? 'Attivo' : 'In attesa'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
