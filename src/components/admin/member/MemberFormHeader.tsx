
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function MemberFormHeader() {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center gap-2 mb-6">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate('/admin/members')}
        className="h-8 w-8"
      >
        <ArrowLeft size={18} />
      </Button>
      <h1 className="text-2xl font-bold">Aggiungi Membro CER</h1>
    </div>
  );
}
