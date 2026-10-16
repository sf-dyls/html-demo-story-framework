import {useState,type CSSProperties} from 'react';
import type {JourneyTouchpoint} from '../types/presentation';
interface Props {touchpoint:JourneyTouchpoint;index:number;low:boolean;active:boolean;state?:'future'|'current'|'complete';onClick?:()=>void}
export function JourneyNode({touchpoint,index,low,active,state,onClick}:Props){
 const [failedSrc,setFailedSrc]=useState<string|null>(null);
 const src=touchpoint.iconImage?.src;
 const content=src&&src!==failedSrc?<img className="journey-node__icon-image" src={src} alt="" aria-hidden="true" onError={()=>setFailedSrc(src)}/>:<span className="journey-node__number" aria-hidden="true">{index+1}</span>;
 return <li className={`journey-node ${low?'journey-node--low':'journey-node--high'} ${state?`journey-node--${state}`:''}`} style={{gridColumn:index+1} as CSSProperties} aria-current={active?'step':undefined} aria-hidden={state==='future'?true:undefined}>
  <div className="journey-node__circle-wrap">{onClick?<button className="journey-node__circle" onClick={onClick} disabled={state==='future'} tabIndex={state==='future'?-1:undefined} aria-label={`${index+1}. ${touchpoint.title}`} aria-current={active?'step':undefined}>{content}</button>:<div className="journey-node__circle">{content}</div>}</div>
  <div className="journey-node__label"><span className="sr-only">Step {index+1}: </span><h3>{touchpoint.title}</h3>{touchpoint.tag&&<span className="journey-node__tag">{touchpoint.tag}</span>}</div>
 </li>;
}
