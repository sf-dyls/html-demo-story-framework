import {useCallback,useState} from 'react';
import type {JourneyTouchpoint} from '../types/presentation';
import {JourneyMap} from './JourneyMap';
import {JourneyControls} from './JourneyControls';
import {journeyStep} from '../utils/journeyStep';
import {useJourneyKeyboard} from '../hooks/useJourneyKeyboard';
interface Props {touchpoints:JourneyTouchpoint[];keyboardEnabled?:boolean;label?:string}
/** Mount with a chapter key to begin a new journey. No presentation-level completion behavior yet. */
export function JourneyStepper({touchpoints,keyboardEnabled=true,label}:Props){
 const [index,setIndex]=useState(-1);const count=touchpoints.length;const active=Math.min(index,count-1);
 const next=useCallback(()=>setIndex(current=>journeyStep(current,count,{type:'next'})),[count]);
 const previous=useCallback(()=>setIndex(current=>journeyStep(current,count,{type:'previous'})),[count]);
 const jump=useCallback((position:number)=>setIndex(journeyStep(-1,count,{type:'jump',index:position})),[count]);
 useJourneyKeyboard({enabled:keyboardEnabled,activeIndex:active,count,next,previous});
 return <div className="journey-stepper">
  <JourneyMap touchpoints={touchpoints} activeIndex={active} onNodeClick={jump} label={label} revealSequentially/>
  {count>0&&<JourneyControls touchpoints={touchpoints} activeIndex={active} onNext={next} onPrevious={previous} onJump={jump} nextLabel={active<0?'Begin':'Next →'} nextDisabled={active===count-1} previousDisabled={active<0}/>}
  <p className="sr-only" aria-live="polite" aria-atomic="true">{count===0?'No touchpoints configured.':active<0?'Journey ready.':`Step ${active+1} of ${count}: ${touchpoints[active].title}`}</p>
 </div>;
}
