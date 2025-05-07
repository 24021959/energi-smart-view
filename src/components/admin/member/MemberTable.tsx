
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Zap, ZapOff, Eye, Check, X, Battery } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { MemberListItem } from '@/types/member';

interface MemberTableProps {
  members: MemberListItem[];
  onToggleStatus: (id: number, isActive: boolean) => void;
  onShowDetails: (member: MemberListItem) => void;
}

const MemberTable = ({ members, onToggleStatus, onShowDetails }: MemberTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Ruolo CER</TableHead>
          <TableHead>Stato</TableHead>
          <TableHead>Attivo</TableHead>
          <TableHead>Azioni</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.length > 0 ? (
          members.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="font-medium">{member.name}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>{member.type}</TableCell>
              <TableCell>
                {member.memberType === 'prosumer' ? (
                  <Badge className="bg-purple-600 hover:bg-purple-700 flex w-fit gap-1 items-center">
                    <Zap size={14} />
                    Prosumer
                  </Badge>
                ) : member.memberType === 'producer' ? (
                  <Badge className="bg-green-600 hover:bg-green-700 flex w-fit gap-1 items-center">
                    <Battery size={14} />
                    Producer
                  </Badge>
                ) : (
                  <Badge className="bg-blue-600 hover:bg-blue-700 flex w-fit gap-1 items-center">
                    <ZapOff size={14} />
                    Consumer
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  member.status === 'Attivo' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {member.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={member.isActive} 
                    onCheckedChange={(checked) => onToggleStatus(member.id, checked)}
                  />
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <span>{member.isActive ? 
                        <Check size={18} className="text-green-500" /> : 
                        <X size={18} className="text-red-500" />}
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      {member.isActive ? 
                        "Membro attivo: può accedere al sistema" : 
                        "Membro disattivato: non può accedere al sistema"}
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => onShowDetails(member)}>
                    <Eye size={16} className="mr-1" />
                    Dettagli
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    asChild
                  >
                    <Link to={`/admin/members/${member.id}`}>
                      Scheda
                    </Link>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
              Nessun membro trovato con i filtri selezionati
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default MemberTable;
