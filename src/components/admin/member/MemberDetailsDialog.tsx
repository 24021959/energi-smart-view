
import React from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MemberListItem } from '@/types/member';

interface MemberDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  member: MemberListItem | null;
}

const MemberDetailsDialog = ({ isOpen, onOpenChange, member }: MemberDetailsDialogProps) => {
  if (!member) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Dettagli Membro</DialogTitle>
          <DialogDescription>
            Informazioni sul membro selezionato
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="font-semibold">Nome:</div>
            <div>{member.name}</div>
            
            <div className="font-semibold">Email:</div>
            <div>{member.email}</div>
            
            <div className="font-semibold">Tipo:</div>
            <div>{member.type}</div>
            
            <div className="font-semibold">Ruolo CER:</div>
            <div>
              {member.memberType === 'prosumer' ? 'Prosumer' : 
               member.memberType === 'producer' ? 'Producer' : 'Consumer'}
            </div>
            
            <div className="font-semibold">Stato:</div>
            <div>{member.status}</div>
            
            <div className="font-semibold">Attivo:</div>
            <div>{member.isActive ? 'Sì' : 'No'}</div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Chiudi
            </Button>
            <Button 
              asChild
            >
              <Link to={`/admin/members/${member.id}`}>
                Vai alla Scheda
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MemberDetailsDialog;
