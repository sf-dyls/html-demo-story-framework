import {useLayoutEffect,useRef,useState} from 'react';
import {User,Phone,MessageCircle,MessageSquare,Mail,Workflow,Settings,ChartNoAxesCombined,Bot,Headphones,Eye,Database,Code,Cloud} from 'lucide-react';
import type {LucideIcon} from 'lucide-react';
import type {PresentationConfig} from '../types/presentation';
import {contactCenter} from '../data/contactCenter';
import './ContactCenter.css';
// Explicit relationships transcribed from the supplied diagram. Flows/Prompts has no direct connector.
const connections:[string,string,boolean?][]=[['customer','channels'],['telephony','omniFlow'],['chat','omniFlow'],['messaging','omniFlow'],['email','omniFlow'],['omniFlow','engine',true],['engine','helpAgent'],['engine','assistant'],['analytics','helpAgent'],['analytics','assistant'],['analytics','supervisor'],['helpAgent','customer360'],['helpAgent','apex'],['assistant','customer360'],['assistant','apex']];
function Tile({id,icon:Icon,label,detail,agentic=false}:{id:string;icon:LucideIcon;label:string;detail?:string;agentic?:boolean}){return <div data-cc-node={id} tabIndex={0} className={`cc-tile${agentic?' cc-tile--agentic':''}`}><Icon aria-hidden="true" strokeWidth={1.7}/><div><strong>{label}</strong>{detail&&<small>{detail}</small>}</div></div>}
export function ContactCenterScreen({config}:{config:PresentationConfig}){
 const c={...contactCenter,...config.contactCenter};
 const map=useRef<HTMLDivElement>(null);const [lines,setLines]=useState<{d:string;x1:number;y1:number;x2:number;y2:number}[]>([]);
 useLayoutEffect(()=>{const el=map.current;if(!el)return;
 const measure=()=>{const base=el.getBoundingClientRect();const scale=base.width/el.offsetWidth;
 const anchor=(id:string,side:string)=>{const node=el.querySelector<HTMLElement>(`[data-cc-node="${id}"]`);if(!node)return null;const r=node.getBoundingClientRect();return {x:((side==='left'?r.left:side==='right'?r.right:r.left+r.width/2)-base.left)/scale,y:((side==='top'?r.top:side==='bottom'?r.bottom:r.top+r.height/2)-base.top)/scale}};
 setLines(connections.flatMap(([from,to,vertical])=>{const a=anchor(from,vertical?'bottom':'right'),b=anchor(to,vertical?'top':'left');if(!a||!b)return [];const bend=Math.max(26,Math.abs(b.x-a.x)*.48);return [{x1:a.x,y1:a.y,x2:b.x,y2:b.y,d:vertical?`M ${a.x} ${a.y} L ${b.x} ${b.y}`:`M ${a.x} ${a.y} C ${a.x+bend} ${a.y}, ${b.x-bend} ${b.y}, ${b.x} ${b.y}`}]}));};
 const observer=new ResizeObserver(measure);observer.observe(el);el.querySelectorAll<HTMLElement>('[data-cc-node]').forEach(node=>observer.observe(node));measure();return()=>observer.disconnect();},[config.contactCenter]);
 return <div className="cc-screen"><header><h1 id="screen-title">{c.title}</h1><p>{c.subtitle}</p></header>
 <div className="cc-viewport" tabIndex={0} role="region" aria-label="Contact centre capability diagram — scroll horizontally on smaller screens"><div className="cc-map" ref={map}>
 <svg className="cc-connections" aria-hidden="true">{lines.map((l,i)=><g key={i}><path d={l.d}/><circle cx={l.x1} cy={l.y1} r={4}/><circle cx={l.x2} cy={l.y2} r={4}/></g>)}</svg>
  <div className="cc-customer"><span data-cc-node="customer"><User size={45} strokeWidth={1.7} aria-hidden="true"/></span><strong>{c.customer}</strong></div>
  <section data-cc-node="channels" className="cc-group cc-channels" aria-label={c.channels}><h2>{c.channels}</h2><div className="cc-stack"><Tile id="telephony" icon={Phone} label={c.telephony}/><Tile id="chat" icon={MessageCircle} label={c.chat}/><Tile id="messaging" icon={MessageSquare} label={c.messaging} detail={c.messagingDetail}/><Tile id="email" icon={Mail} label={c.email}/></div></section>
  <section className="cc-group cc-routing" aria-label={c.routing}><h2>{c.routing}</h2><div className="cc-stack"><div className="cc-config"><span>{c.configuration}</span><Tile id="omniFlow" icon={Settings} label={c.omniFlow} detail={c.routingDetail}/></div><Tile id="engine" icon={Workflow} label={c.engine}/><Tile id="analytics" icon={ChartNoAxesCombined} label={c.analytics}/></div></section>
  <div className="cc-column cc-agents"><section className="cc-group"><h2>{c.selfService}</h2><div className="cc-stack"><Tile id="helpAgent" icon={Bot} label={c.helpAgent} agentic/></div></section><section className="cc-group"><h2>{c.console}</h2><div className="cc-stack"><Tile id="assistant" icon={Headphones} label={c.assistant} agentic/><Tile id="supervisor" icon={Eye} label={c.supervisor} agentic/></div></section></div>
  <div className="cc-column cc-foundation"><section className="cc-group"><h2><Cloud aria-hidden="true" size={20}/>{c.platform}</h2><div className="cc-stack"><Tile id="customer360" icon={Database} label={c.customer360}/></div></section><section className="cc-group"><h2>{c.actions}</h2><div className="cc-stack"><Tile id="apex" icon={Code} label={c.apex}/><Tile id="flows" icon={Workflow} label={c.flows}/></div></section></div>
 </div></div><p className="cc-note">{c.note}</p></div>;
}
