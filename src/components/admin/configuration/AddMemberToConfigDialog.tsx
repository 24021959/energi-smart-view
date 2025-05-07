
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { MemberListItem } from "@/types/member";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

// Mock data for available members
const availableMembers: MemberListItem[] = [
  { id: 6, name: "Paolo Verdi", email: "paolo.verdi@example.com", type: "person", status: "active", memberType: "consumer", isActive: true },
  { id: 7, name: "Laura Bianchi", email: "laura.bianchi@example.com", type: "person", status: "active", memberType: "producer", isActive: true },
  { id: 8, name: "Azienda XYZ", email: "info@xyz.com", type: "company", status: "active", memberType: "prosumer", isActive: true },
  { id: 9, name: "Marco Neri", email: "marco.neri@example.com", type: "person", status: "pending", memberType: "consumer", isActive: false },
];

interface AddMemberToConfigDialogProps {
  configId: string;
}

export function AddMemberToConfigDialog({ configId }: AddMemberToConfigDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  
  const filteredMembers = availableMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const toggleMemberSelection = (memberId: number) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter(id => id !== memberId));
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
    }
  };
  
  const handleAddMembers = () => {
    // In a real application, this would make an API call to add members to the configuration
    toast({
      title: "Membri aggiunti",
      description: `${selectedMembers.length} membri sono stati aggiunti alla configurazione.`
    });
    setSelectedMembers([]);
    setIsOpen(false);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Aggiungi Partecipante
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Aggiungi Partecipanti alla Configurazione</DialogTitle>
        </DialogHeader>
        
        <div className="my-4">
          <div className="relative mb-4">
            <Input
              placeholder="Cerca per nome o email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
          </div>
          
          <div className="border rounded-md max-h-[400px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Ruolo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <TableRow 
                      key={member.id}
                      className={selectedMembers.includes(member.id) ? "bg-muted" : ""}
                      onClick={() => toggleMemberSelection(member.id)}
                    >
                      <TableCell>
                        <input 
                          type="checkbox" 
                          checked={selectedMembers.includes(member.id)}
                          onChange={() => toggleMemberSelection(member.id)}
                          className="h-4 w-4"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.type === 'person' ? 'Persona' : 'Azienda'}</TableCell>
                      <TableCell>
                        {member.memberType === 'consumer' ? 'Consumatore' : 
                         member.memberType === 'producer' ? 'Produttore' : 'Prosumer'}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      Nessun risultato trovato
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <DialogFooter>
          <div className="flex justify-between w-full">
            <div>
              <span className="text-sm text-gray-500">
                {selectedMembers.length} membri selezionati
              </span>
            </div>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Annulla
              </Button>
              <Button onClick={handleAddMembers} disabled={selectedMembers.length === 0}>
                Aggiungi
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
