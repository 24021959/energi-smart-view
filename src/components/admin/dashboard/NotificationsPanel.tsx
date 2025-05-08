
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertTriangle, CheckCircle, Info } from "lucide-react";

export function NotificationsPanel() {
  // Dati di esempio per le notifiche e gli alert
  const notifications = [
    {
      id: 1,
      type: "alert",
      title: "Anomalia Produzione Fotovoltaico",
      message: "L'impianto di Via Roma 123 ha registrato una produzione inferiore del 25% rispetto alla media degli ultimi 7 giorni.",
      date: "Oggi, 14:32",
      severity: "high"
    },
    {
      id: 2,
      type: "info",
      title: "Nuovo Membro Aggiunto",
      message: "Bianchi Lucia si è unita alla comunità energetica come consumatore.",
      date: "Oggi, 10:15",
      severity: "info"
    },
    {
      id: 3,
      type: "success",
      title: "Report Mensile Generato",
      message: "Il report mensile di Aprile 2023 è stato generato con successo ed è disponibile per il download.",
      date: "Ieri, 18:45",
      severity: "info"
    },
    {
      id: 4,
      type: "alert",
      title: "Manutenzione Programmata",
      message: "L'impianto di Via Garibaldi 45 sarà sottoposto a manutenzione programmata il 15/05/2023.",
      date: "Ieri, 12:20",
      severity: "medium"
    },
    {
      id: 5,
      type: "info",
      title: "Aggiornamento Sistema",
      message: "Il sistema di monitoraggio è stato aggiornato alla versione 2.3.0.",
      date: "2 giorni fa",
      severity: "info"
    }
  ];

  // Funzione per determinare l'icona della notifica in base al tipo
  const getNotificationIcon = (type: string, severity?: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className={`h-5 w-5 ${severity === "high" ? "text-red-500" : "text-amber-500"}`} />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  // Funzione per determinare la classe di colore del badge in base alla severità
  const getBadgeClass = (severity?: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-amber-500";
      case "low":
        return "bg-blue-500";
      default:
        return "bg-green-500";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Alert e Notifiche</CardTitle>
            <Badge className="bg-red-500">2 Nuovi</Badge>
          </div>
          <CardDescription>
            Mantieniti aggiornato sugli eventi importanti della tua comunità energetica
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="mt-0.5">
                  {getNotificationIcon(notification.type, notification.severity)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{notification.title}</h4>
                    {notification.severity && notification.type === "alert" && (
                      <Badge className={getBadgeClass(notification.severity)}>
                        {notification.severity === "high" ? "Alta" : notification.severity === "medium" ? "Media" : "Bassa"}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{notification.date}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <a href="#" className="text-sm text-primary hover:underline">
              Visualizza tutte le notifiche
            </a>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>KPI Principali</CardTitle>
          <CardDescription>
            Indicatori chiave di performance della comunità energetica
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium text-muted-foreground">Indice di Autoconsumo</h3>
              <p className="text-2xl font-bold mt-1">65.3%</p>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '65.3%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Target: 75%
              </p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium text-muted-foreground">Risparmio CO₂</h3>
              <p className="text-2xl font-bold mt-1">42.7 t</p>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '78.5%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Target: 55 t
              </p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium text-muted-foreground">Risparmio Economico</h3>
              <p className="text-2xl font-bold mt-1">€12,450</p>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div className="bg-amber-600 h-1.5 rounded-full" style={{ width: '62.3%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Target: €20,000
              </p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium text-muted-foreground">Efficienza Energetica</h3>
              <p className="text-2xl font-bold mt-1">82.4%</p>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '82.4%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Target: 85%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
