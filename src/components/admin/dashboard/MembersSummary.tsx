
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

export function MembersSummary() {
  // Dati di esempio per i membri
  const members = [
    {
      id: 1,
      name: "Rossi Mario",
      email: "mario.rossi@example.com",
      type: "Produttore",
      joinDate: "12/01/2023",
      status: "Attivo",
      pod: "IT001E12345678"
    },
    {
      id: 2,
      name: "Bianchi Lucia",
      email: "lucia.bianchi@example.com",
      type: "Consumatore",
      joinDate: "15/01/2023",
      status: "Attivo",
      pod: "IT001E87654321"
    },
    {
      id: 3,
      name: "Verdi Giuseppe",
      email: "giuseppe.verdi@example.com",
      type: "Produttore",
      joinDate: "20/01/2023",
      status: "Attivo",
      pod: "IT001E23456789"
    },
    {
      id: 4,
      name: "Neri Anna",
      email: "anna.neri@example.com",
      type: "Consumatore",
      joinDate: "25/01/2023",
      status: "Attivo",
      pod: "IT001E98765432"
    },
    {
      id: 5,
      name: "Gialli Marco",
      email: "marco.gialli@example.com",
      type: "Produttore",
      joinDate: "01/02/2023",
      status: "Inattivo",
      pod: "IT001E34567890"
    },
  ];

  // Statistiche sui membri
  const memberStats = {
    total: 24,
    active: 22,
    inactive: 2,
    producers: 8,
    consumers: 16,
    newThisMonth: 2
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Membri della Comunità</h3>
        <Button asChild>
          <Link to="/admin/members/add" className="flex items-center gap-1">
            <UserPlus className="h-4 w-4" />
            <span>Nuovo Membro</span>
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="h-4 w-4 mr-2" /> Membri Totali
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{memberStats.total}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {memberStats.active} attivi, {memberStats.inactive} inattivi
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Produttori</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{memberStats.producers}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {Math.round(memberStats.producers/memberStats.total*100)}% dei membri totali
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Consumatori</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{memberStats.consumers}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {Math.round(memberStats.consumers/memberStats.total*100)}% dei membri totali
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Nuovi Membri</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+{memberStats.newThisMonth}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Nell'ultimo mese
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ultimi membri attivi</CardTitle>
          <CardDescription>
            Visualizza i membri recentemente attivi nella comunità
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Data Adesione</TableHead>
                <TableHead>Codice POD</TableHead>
                <TableHead>Stato</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-xs text-muted-foreground">{member.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{member.type}</TableCell>
                  <TableCell>{member.joinDate}</TableCell>
                  <TableCell>
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">
                      {member.pod}
                    </code>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={member.status === "Attivo" ? "default" : "secondary"}
                      className={member.status === "Attivo" ? "bg-green-500" : "bg-gray-500"}
                    >
                      {member.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-center mt-4">
            <Button variant="outline" asChild>
              <Link to="/admin/members">Visualizza tutti i membri</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
