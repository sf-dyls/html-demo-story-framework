import type {Persona,PresentationConfig} from '../types/presentation';
import {JourneyMap} from '../components/JourneyMap';
import {JourneyControls} from '../components/JourneyControls';
import {DemoBenefits} from '../components/DemoBenefits';
import './PersonaRecap.css';
interface Props {persona:Persona;benefits:PresentationConfig['benefits'];activeIndex:number;complete:boolean;completionLabel:string;continueLabel?:string;onNext:()=>void;onPrevious:()=>void;onJump:(index:number)=>void;canGoBack:boolean}
export function PersonaRecap({persona,benefits,activeIndex,complete,completionLabel,continueLabel='Continue →',onNext,onPrevious,onJump,canGoBack}:Props){
 const points=persona.recapTouchpoints;
 return <div className="persona-recap">
  <header><h1 id="screen-title">{persona.chapterTitle}</h1></header>
  <JourneyMap touchpoints={points} activeIndex={activeIndex} onNodeClick={onJump} label={persona.chapterTitle} revealSequentially/>
  <JourneyControls touchpoints={points} activeIndex={activeIndex} onNext={onNext} onPrevious={onPrevious} onJump={onJump} nextLabel="Next →" previousDisabled={!canGoBack&&activeIndex<0&&!complete}/>
  <div className="persona-recap__benefits"><DemoBenefits benefits={benefits}/></div>
  <p className="sr-only" aria-live="polite">{!complete&&activeIndex>=0?`Step ${activeIndex+1} of ${points.length}: ${points[activeIndex]?.title}`:''}</p>
 </div>;
}
