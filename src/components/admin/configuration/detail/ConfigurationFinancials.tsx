
import { FinancialBenefits } from '@/components/admin/configuration/FinancialBenefits';

export function ConfigurationFinancials() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <FinancialBenefits
        title="Convenienza totale"
        subtitle="Valore compreso tra:"
        value="€40 / €50"
        change="+0%"
        changeLabel="Rispetto al periodo precedente"
        color="bg-orange-400"
        hasTooltip={true}
      />
      <FinancialBenefits
        title="Risparmio in bolletta"
        subtitle="Valore compreso tra:"
        value="€0 / €0"
        change="+0%"
        changeLabel="Rispetto al periodo precedente"
        color="bg-blue-400"
        hasTooltip={true}
      />
      <FinancialBenefits
        title="Valore della vendita dell'energia immessa"
        subtitle="Valore compreso tra:"
        value="€40 / €50"
        change="+0%"
        changeLabel="Rispetto al periodo precedente"
        color="bg-yellow-400"
        hasTooltip={true}
      />
      <FinancialBenefits
        title="Incentivi per l'energia condivisa e consumata dalla comunità"
        subtitle="Valore per acconti compreso tra:"
        value="€0 / €0"
        change="+0%"
        changeLabel="Rispetto al periodo precedente"
        color="bg-green-400"
        hasTooltip={true}
      />
    </div>
  );
}
