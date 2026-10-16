import {Check} from 'lucide-react';
import type {CSSProperties} from 'react';
import type {PresentationConfig} from '../types/presentation';
import {hubProgress} from '../utils/hubProgress';
import './JourneyHub.css';
interface Props {config:PresentationConfig;completedPersonaIds:string[];onSelectPersona:(id:string)=>void;onContinue:()=>void}
export function JourneyHub({config,completedPersonaIds,onSelectPersona,onContinue}:Props){
 const {allComplete}=hubProgress(config.personas.map(p=>p.id),completedPersonaIds);
 const nextId=config.personas.find(p=>!completedPersonaIds.includes(p.id))?.id;
 return <div className="journey-hub">
  <div className="journey-hub__heading"><h1 id="screen-title">{config.labels.journeyHub}</h1>{allComplete&&<button className="journey-hub__continue" onClick={onContinue}>{config.labels.continue} →</button>}</div>
  <ol className="journey-hub__chapters" style={{'--chapter-count':Math.min(3,Math.max(1,config.personas.length))} as CSSProperties}>
   {config.personas.map((persona,index)=>{const complete=completedPersonaIds.includes(persona.id);const next=persona.id===nextId;
    return <li key={persona.id} className="journey-hub__chapter"><button className={`journey-hub__card ${next?'journey-hub__card--next':''}`} onClick={()=>onSelectPersona(persona.id)} aria-label={`${persona.name}, ${persona.role}${complete?', completed':next?', next chapter':''}`}>
     <span className="journey-hub__card-top"><span className="journey-hub__number">{String(index+1).padStart(2,'0')}</span>{complete?<span className="journey-hub__status"><Check size={14}/> Completed</span>:next?<span className="journey-hub__status">Up next</span>:null}</span>
     <span className="journey-hub__identity"><span className="journey-hub__portrait" aria-hidden="true">{persona.image.src?<img src={persona.image.src} alt="" style={{objectFit:persona.image.fit}}/>:persona.name.slice(0,1)}</span><span className="journey-hub__person"><span className="journey-hub__role">{persona.role}</span><span className="journey-hub__name">{persona.name}</span></span></span>
     <span className="journey-hub__touchpoints">{persona.overviewTouchpoints.map(point=><span className="journey-hub__touchpoint" key={point.id}>{point.title}</span>)}</span>
    </button></li>;
   })}
  </ol>
 </div>;
}
