import {DemoBenefits} from '../components/DemoBenefits';
import {presentation} from '../data/presentation';

/** Isolated phase checkpoint; not a logical presentation screen. */
export function BenefitsReview() {
  return <main className="benefits-review">
    <header>
      <span className="eyebrow">PHASE 03 · COMPONENT REVIEW</span>
      <h1>Three consistent benefits</h1>
      <p>Static content for the journey hub and recap screens.</p>
    </header>
    <div className="benefits-review__sample">
      <DemoBenefits benefits={presentation.benefits}/>
    </div>
    <footer><a href="/">Return to presentation</a></footer>
  </main>;
}
