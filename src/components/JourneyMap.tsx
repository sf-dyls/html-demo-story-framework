import {motion,useReducedMotion} from 'framer-motion';
import {useEffect,useLayoutEffect,useRef,useState,type CSSProperties} from 'react';
import type {JourneyTouchpoint} from '../types/presentation';
import {journeyLayout} from '../utils/journeyLayout';
import {JourneyNode} from './JourneyNode';
import './JourneyMap.css';
interface Props {touchpoints:JourneyTouchpoint[];activeIndex:number;onNodeClick?:(index:number)=>void;label?:string;revealSequentially?:boolean}
export function JourneyMap({touchpoints,activeIndex,onNodeClick,label='Journey map',revealSequentially=false}:Props){
 const reduced=useReducedMotion();const container=useRef<HTMLDivElement>(null);const [size,setSize]=useState({width:1000,rem:16});
 useLayoutEffect(()=>{const element=container.current;if(!element)return;const update=()=>setSize({width:element.clientWidth,rem:parseFloat(getComputedStyle(document.documentElement).fontSize)||16});const observer=new ResizeObserver(update);observer.observe(element);observer.observe(document.documentElement);update();return()=>observer.disconnect();},[]);
 const layout=journeyLayout(touchpoints.length,size.width,size.rem);
 const active=Number.isFinite(activeIndex)?Math.max(-1,Math.min(Math.floor(activeIndex),touchpoints.length-1)):-1;
 useEffect(()=>{if(!revealSequentially||active<0||!container.current)return;const element=container.current;const point=layout.points[active];if(!point)return;const margin=size.rem*6;if(point.x-margin<element.scrollLeft||point.x+margin>element.scrollLeft+element.clientWidth)element.scrollTo({left:Math.max(0,Math.min(layout.width-element.clientWidth,point.x-element.clientWidth/2)),behavior:reduced?'instant':'smooth'});},[active,revealSequentially,layout.width,size.rem,size.width,reduced]);
 return <div className="journey-map" ref={container} role="region" aria-label={label} tabIndex={0}>
  {touchpoints.length===0?<p className="journey-map__empty">No touchpoints configured.</p>:<div className="journey-map__track" style={{width:layout.width,gridTemplateColumns:`repeat(${touchpoints.length},minmax(0,1fr))`,'--journey-diameter':`${layout.diameter}px`,'--journey-label-width':`${Math.max(9,13-touchpoints.length*.35)}rem`} as CSSProperties}>
   <svg className="journey-map__path" viewBox={`0 0 ${layout.width} ${layout.height}`} preserveAspectRatio="none" aria-hidden="true" style={{gridColumn:`1 / span ${touchpoints.length}`}}>
    <path className="journey-map__base" d={layout.path}/>
    {touchpoints.length>1&&<motion.path className="journey-map__progress" d={layout.path} initial={false} animate={{pathLength:Math.max(0,active)/(touchpoints.length-1),opacity:active>0?1:0}} transition={{duration:reduced?0:.9,ease:'easeInOut'}}/>}
   </svg>
   <ol className="journey-map__nodes">{touchpoints.map((point,index)=><JourneyNode key={point.id} touchpoint={point} index={index} low={layout.points[index].low} active={index===active} state={revealSequentially?(index>active?'future':index===active?'current':'complete'):undefined} onClick={onNodeClick?()=>onNodeClick(index):undefined}/>)}</ol>
  </div>}
 </div>;
}
