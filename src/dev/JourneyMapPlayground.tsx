import {useState} from 'react';
import {JourneyStepper} from '../components/JourneyStepper';
import {DemoBenefits} from '../components/DemoBenefits';
import {presentation} from '../data/presentation';
export function JourneyMapPlayground(){
 const [count,setCount]=useState(5);const [run,setRun]=useState(0);
 const source=presentation.personas[0].recapTouchpoints;
 const touchpoints=Array.from({length:count},(_,i)=>({...source[i%source.length],id:`sample-${i}`,personaLabel:presentation.personas[0].name}));
 const changeCount=(value:number)=>{setCount(value);setRun(current=>current+1);};
 return <main className="map-playground opening-shell"><header><span className="eyebrow">PHASE 06 · JOURNEY STEPPING REVIEW</span><h1>One point at a time</h1><p>Begin, then use ← / → or Space. Click a revealed node or any dot to jump.</p></header>
 <div className="map-playground__controls"><label>Touchpoints <select value={count} onChange={event=>changeCount(Number(event.target.value))}>{[0,1,2,3,5,8,10,12,20].map(n=><option value={n} key={n}>{n}</option>)}</select></label><button onClick={()=>setRun(current=>current+1)}>Restart journey</button></div>
 <div className="map-playground__canvas"><JourneyStepper key={`${count}-${run}`} touchpoints={touchpoints}/></div>
 <DemoBenefits benefits={presentation.benefits}/><footer><a href="/">Return to presentation</a><p>Sample labels repeat for layout testing. Wide maps scroll to preserve readable labels.</p></footer></main>;
}
