import type {PresentationConfig} from '../types/presentation';
import './DemoBenefits.css';

interface DemoBenefitsProps {
  benefits: PresentationConfig['benefits'];
}

/** Static strategic pillars. No selection, progress, or touchpoint state. */
export function DemoBenefits({benefits}: DemoBenefitsProps) {
  if (benefits.length !== 3) throw new Error('DemoBenefits requires exactly three benefits.');
  return (
    <div className="demo-benefits">
      {benefits.map(benefit => (
        <div className="demo-benefits__pillar" key={benefit.id}>
          <h2 className="demo-benefits__title">{benefit.title}</h2>
          {benefit.shortDescription && <p className="demo-benefits__description">{benefit.shortDescription}</p>}
        </div>
      ))}
    </div>
  );
}
