
import { ProsumerLayout } from '@/layouts/ProsumerLayout';
import { BillUploadComponent } from '@/components/bills/BillUploadComponent';
import { useNavigate } from 'react-router-dom';

export default function ProsumerBillUpload() {
  const navigate = useNavigate();
  
  const handleUploadComplete = () => {
    // Reindirizza alla pagina delle bollette dopo il caricamento
    navigate('/prosumer/bills');
  };
  
  return (
    <ProsumerLayout title="Carica Bolletta">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Carica la tua bolletta</h1>
        <BillUploadComponent 
          userRole="prosumer" 
          onUploadComplete={handleUploadComplete} 
        />
      </div>
    </ProsumerLayout>
  );
}
