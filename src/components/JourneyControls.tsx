import type {JourneyTouchpoint} from '../types/presentation';
interface Props {touchpoints:JourneyTouchpoint[];activeIndex:number;onNext:()=>void;onPrevious:()=>void;onJump:(index:number)=>void;nextLabel:string;nextDisabled?:boolean;previousDisabled?:boolean}
export function JourneyControls({touchpoints,activeIndex,onNext,onPrevious,onJump,nextLabel,nextDisabled=false,previousDisabled=false}:Props){
 return <div className="journey-stepper__controls"><button onClick={onPrevious} disabled={previousDisabled}>← Back</button>
  <div className="journey-stepper__dots" role="group" aria-label="Journey steps">{touchpoints.map((point,i)=><button key={point.id} className={`journey-stepper__dot ${i<=activeIndex?'journey-stepper__dot--reached':''}`} onClick={()=>onJump(i)} aria-label={`Go to step ${i+1}`} aria-current={i===activeIndex?'step':undefined}><span aria-hidden="true"/></button>)}</div>
  <button onClick={onNext} disabled={nextDisabled}>{nextLabel}</button>
 </div>;
}
