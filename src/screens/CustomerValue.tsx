import {AnimatePresence,motion,useReducedMotion} from 'framer-motion';
import {useEffect,useState,type CSSProperties} from 'react';
import type {PresentationConfig} from '../types/presentation';
import './CustomerValue.css';
interface Props {config:PresentationConfig;activeIndex:number}
export function CustomerValue({config,activeIndex}:Props){
 const [flipped,setFlipped]=useState<Record<string,boolean>>({});
 const showAllLogos=activeIndex>=config.valuePoints.length;
 useEffect(()=>{setFlipped(Object.fromEntries(config.valuePoints.map(point=>[point.id,showAllLogos])));},[showAllLogos]);
 const reduced=useReducedMotion();const points=config.valuePoints;const people=config.valueAudience.map(a=>({label:a.label,persona:config.personas.find(p=>p.id===a.personaId)}));
 return <div className="customer-value"><h1 id="screen-title">{config.labels.customerValue}</h1>
  <div className="customer-value__viewport" tabIndex={0} role="region" aria-label={config.labels.customerValue}>
   <div className="customer-value__canvas" style={{minWidth:Math.max(800,points.length*185)} as CSSProperties}>
    {points.length>1&&<svg className="customer-value__arc" viewBox="0 0 1000 480" preserveAspectRatio="none" aria-hidden="true"><path d="M 0 240 Q 500 -40 1000 240"/></svg>}
    <ol className="customer-value__points">{points.map((point,i)=>{
     const x=(i+.5)/points.length;const y=100+140*(2*x-1)**2;const visible=i<=activeIndex;
     return <motion.li key={point.id} className="customer-value__point" aria-hidden={!visible} initial={false} animate={{opacity:visible?1:0,y:visible?0:reduced?0:8}} transition={{duration:reduced?0:.25}} style={{left:`${x*100}%`,top:`${y/480*100}%`,visibility:visible?'visible':'hidden'}}>
      <button type="button" className="customer-value__flip" aria-label={`${point.title}: ${flipped[point.id]?'show value':'show customer logo'}`} aria-pressed={!!flipped[point.id]} onClick={()=>setFlipped(previous=>({...previous,[point.id]:!previous[point.id]}))}>
       <AnimatePresence mode="wait" initial={false}>
        <motion.span key={flipped[point.id]?'logo':'value'} className="customer-value__bubble customer-value__card-face" initial={{rotateY:reduced?0:-90,opacity:0}} animate={{rotateY:0,opacity:1}} exit={{rotateY:reduced?0:90,opacity:0}} transition={{duration:reduced?0:.2,ease:'easeInOut'}}>
         {flipped[point.id]?(point.logo?.src?<img className="customer-value__logo" src={point.logo.src} alt={point.logo.alt||'Customer logo'}/>:<span className="customer-value__description">No customer logo added</span>):<>{point.metric&&<strong className="customer-value__metric">{point.metric}</strong>}<span className="customer-value__title">{point.title}</span>{point.description&&<span className="customer-value__description">{point.description}</span>}</>}
        </motion.span>
       </AnimatePresence>
      </button>
     </motion.li>;
    })}</ol>
    <div className="customer-value__audience">{people.map(({label,persona},i)=>persona&&<figure key={`${persona.id}-${i}`}>{persona.image.src&&<img src={persona.image.src} alt={persona.image.alt} style={{objectFit:persona.image.fit}}/>}<figcaption>{label}</figcaption></figure>)}</div>
   </div>
  </div>
  <p className="sr-only" aria-live="polite">{showAllLogos?'All customer logos revealed':activeIndex>=0?`${config.valuePoints[activeIndex]?.metric??''} ${config.valuePoints[activeIndex]?.title??''}`:''}</p>
 </div>;
}
