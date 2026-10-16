import {useEffect,useState} from 'react';
import type {Persona} from '../types/presentation';
import './PersonaIntro.css';
interface Props {persona:Persona;beginLabel:string;onBegin:()=>void}
/** One image-led introduction for every configured persona. */
export function PersonaIntro({persona,beginLabel,onBegin}:Props){
 const [imageFailed,setImageFailed]=useState(false);
 useEffect(()=>setImageFailed(false),[persona.image.src]);
 return <div className="persona-intro">
  <div className="persona-intro__copy">
   <p className="persona-intro__role">{persona.role}</p>
   <h1 id="screen-title">{persona.name}</h1>
   {persona.quote&&<blockquote className="persona-intro__quote">“{persona.quote}”</blockquote>}
   <button className="persona-intro__begin" onClick={onBegin}>{beginLabel}<span aria-hidden="true"> →</span></button>
  </div>
  <div className="persona-intro__image">
   {persona.image.src&&!imageFailed?<img src={persona.image.src} alt={persona.image.alt} onError={()=>setImageFailed(true)} style={{objectFit:persona.image.fit}}/>:<div className="persona-intro__placeholder" role="img" aria-label={persona.image.alt}><span aria-hidden="true">{Array.from(persona.name)[0]}</span><p>{persona.image.recommendedWidth} × {persona.image.recommendedHeight} px</p></div>}
  </div>
 </div>;
}
