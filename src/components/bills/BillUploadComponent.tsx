
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Upload, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface BillUploadComponentProps {
  userRole: 'consumer' | 'prosumer';
  onUploadComplete?: (imageData: string) => void;
}

export function BillUploadComponent({ userRole, onUploadComplete }: BillUploadComponentProps) {
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  // Funzione per caricare un'immagine dal dispositivo
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };
  
  // Funzione per attivare la fotocamera
  const activateCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
        setIsCameraActive(true);
        setStream(mediaStream);
      }
    } catch (error) {
      console.error('Errore nell\'accesso alla fotocamera:', error);
      toast({
        variant: "destructive",
        title: "Errore fotocamera",
        description: "Non è stato possibile accedere alla fotocamera. Verifica i permessi."
      });
    }
  };
  
  // Funzione per scattare una foto
  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');
        setImage(imageData);
        stopCamera();
      }
    }
  };
  
  // Funzione per fermare la fotocamera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
  };
  
  // Funzione per rimuovere l'immagine
  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Funzione per caricare l'immagine e analizzarla con l'IA
  const processBill = async () => {
    if (!image) return;
    
    setIsLoading(true);
    
    // Qui andrebbe implementata la chiamata a ChatGPT per l'analisi
    // Per ora simuliamo un caricamento
    try {
      // Simulazione del caricamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Notifica l'utente
      toast({
        title: "Bolletta caricata",
        description: "La bolletta è stata caricata con successo e verrà analizzata."
      });
      
      // Callback al componente genitore
      if (onUploadComplete) {
        onUploadComplete(image);
      }
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Errore",
        description: "Si è verificato un errore durante l'analisi della bolletta."
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Carica bolletta</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isCameraActive ? (
          <div className="relative">
            <video 
              ref={videoRef}
              className="w-full h-auto rounded-md border"
              autoPlay
              playsInline
            />
            <div className="absolute bottom-2 left-0 right-0 flex justify-center">
              <Button onClick={capturePhoto} className="mx-2">Scatta foto</Button>
              <Button variant="outline" onClick={stopCamera} className="mx-2">Annulla</Button>
            </div>
          </div>
        ) : image ? (
          <div className="relative">
            <img 
              src={image} 
              alt="Bolletta" 
              className="w-full h-auto rounded-md border" 
            />
            <Button 
              variant="destructive" 
              size="icon" 
              className="absolute top-2 right-2"
              onClick={removeImage}
            >
              <X size={16} />
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="bill-upload"
              />
              <Button 
                variant="outline" 
                className="w-full h-24 flex flex-col items-center justify-center"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-6 w-6 mb-1" />
                <span>Carica immagine</span>
              </Button>
            </div>
            <Button 
              variant="outline" 
              className="w-full h-24 flex flex-col items-center justify-center"
              onClick={activateCamera}
            >
              <Camera className="h-6 w-6 mb-1" />
              <span>Scatta foto</span>
            </Button>
          </div>
        )}
        
        <div className="text-sm text-muted-foreground">
          <p>Carica una foto della tua bolletta per l'analisi automatica.</p>
          <p className="mt-1">Formati supportati: JPG, PNG, GIF</p>
        </div>
      </CardContent>
      {image && (
        <CardFooter>
          <Button 
            onClick={processBill} 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Elaborazione in corso..." : "Analizza bolletta"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
