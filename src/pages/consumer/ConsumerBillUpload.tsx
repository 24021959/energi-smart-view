
import { ConsumerLayout } from '@/layouts/ConsumerLayout';
import { BillUploadComponent } from '@/components/bills/BillUploadComponent';
import { useNavigate } from 'react-router-dom';

export default function ConsumerBillUpload() {
  const navigate = useNavigate();
  
  const handleUploadComplete = () => {
    // Reindirizza alla pagina delle bollette dopo il caricamento
    navigate('/consumer/bills');
  };
  
  return (
    <ConsumerLayout title="Carica Bolletta">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Carica la tua bolletta</h1>
        <BillUploadComponent 
          userRole="consumer" 
          onUploadComplete={handleUploadComplete} 
        />
      </div>
    </ConsumerLayout>
  );
}
