
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Edit, UserCog, Zap, ZapOff, Battery } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { MemberListItem } from '@/types/member';

interface MemberHeaderProps {
  member: MemberListItem;
  onToggleStatus: (isActive: boolean) => void;
}

const MemberHeader = ({ member, onToggleStatus }: MemberHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" asChild>
          <Link to="/admin/members">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">{member.name}</h1>
        {member.memberType === 'prosumer' ? (
          <Badge className="bg-purple-600">
            <Zap className="mr-1 h-4 w-4" />
            Prosumer
          </Badge>
        ) : member.memberType === 'producer' ? (
          <Badge className="bg-green-600">
            <Battery className="mr-1 h-4 w-4" />
            Producer
          </Badge>
        ) : (
          <Badge className="bg-blue-600">
            <ZapOff className="mr-1 h-4 w-4" />
            Consumer
          </Badge>
        )}
      </div>
      <div className="flex gap-2">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">
            {member.isActive ? 'Attivo' : 'Disattivato'}
          </span>
          <Switch 
            checked={member.isActive} 
            onCheckedChange={onToggleStatus}
          />
        </div>
        <Button variant="outline">
          <Edit className="mr-2 h-4 w-4" />
          Modifica
        </Button>
        <Button variant="outline">
          <UserCog className="mr-2 h-4 w-4" />
          Gestisci Accesso
        </Button>
      </div>
    </div>
  );
};

export default MemberHeader;
