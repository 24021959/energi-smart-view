
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type MemberType = 'all' | 'consumer' | 'prosumer' | 'producer';

interface MemberFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  memberTypeFilter: string;
  onFilterChange: (value: string) => void;
}

const MemberFilterBar = ({ 
  searchTerm, 
  onSearchChange, 
  memberTypeFilter, 
  onFilterChange 
}: MemberFilterBarProps) => {
  return (
    <div className="mt-4 flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cerca membri..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="w-full md:w-64">
        <Select
          value={memberTypeFilter}
          onValueChange={onFilterChange}
        >
          <SelectTrigger className="w-full">
            <div className="flex items-center gap-2">
              <Filter size={16} />
              <SelectValue placeholder="Filtra per ruolo" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutti i membri</SelectItem>
            <SelectItem value="consumer">Consumer</SelectItem>
            <SelectItem value="prosumer">Prosumer</SelectItem>
            <SelectItem value="producer">Producer</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MemberFilterBar;
