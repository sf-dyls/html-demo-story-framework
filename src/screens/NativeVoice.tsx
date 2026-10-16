import {useEffect,useRef,useState} from 'react';
import {User,Headphones,Phone,MessageCircle,Mail,FileText,Workflow,Bot,Database,BookOpen,StickyNote,Users,MessageSquare,FolderOpen,Cloud,Settings,Receipt,Calendar,Eye,ThumbsUp} from 'lucide-react';
import {motion,AnimatePresence,useReducedMotion,useAnimationFrame,useMotionValue} from 'framer-motion';
import {resolveNativeVoice,type NativeVoiceConfig} from '../data/nativeVoice';
import './NativeVoice.css';
export function NativeVoiceScreen({step,onJump,config,active=true}:{step:number;onNext:()=>void;onPrevious:()=>void;onJump:(step:number)=>void;config?:NativeVoiceConfig;active?:boolean}){
 const content=resolveNativeVoice(config),connected=step>0,l=content.labels,s=content.steps[connected?1:0];
 const reduce=useReducedMotion();
 useEffect(()=>{if(!active)return;const key=(e:KeyboardEvent)=>{if(e.defaultPrevented||e.repeat||e.ctrlKey||e.metaKey||e.altKey||(e.target instanceof HTMLElement&&e.target.closest('input,textarea,select,[contenteditable="true"]'))||document.querySelector('dialog[open]'))return;if(e.key==='Home'||e.key==='End'){e.preventDefault();e.stopImmediatePropagation();onJump(e.key==='Home'?0:1)}};window.addEventListener('keydown',key,true);return()=>window.removeEventListener('keydown',key,true)},[active,onJump]);
 const duration=reduce?0:.45;

 const toolNodes=[
 {x:606,y:66,Icon:Database,label:l.tools[0]},
 {x:777,y:260,Icon:Users,label:l.teams[0]},
 {x:951,y:62,Icon:BookOpen,label:l.tools[2]},
 {x:644,y:319,Icon:Workflow,label:l.tools[1]},
 {x:1080,y:189,Icon:Users,label:l.teams[1]},
 {x:799,y:39,Icon:StickyNote,label:l.tools[3]},
 {x:914,y:341,Icon:FileText,label:l.record},
 {x:690,y:180,Icon:FolderOpen,label:'Files'},
 {x:1152,y:83,Icon:Cloud,label:'External systems'},
 {x:831,y:155,Icon:Settings,label:'Processes'},
 {x:1047,y:356,Icon:Receipt,label:'Billing'},
 {x:969,y:218,Icon:Calendar,label:'Scheduling'},
 {x:1163,y:304,Icon:Users,label:l.teams[2]}
 ].map(node=>({...node,x:node.x+150}));
 const route=[[85,219],[270,264],[545,219],[690,219],...toolNodes.map(n=>[n.x+32,n.y+32])];
 // Repeated agent visits show coordination and rework; repeated team stops show waiting.
 const visits=[0,1,2,3,4,11,9,6,3,2,3,5,5,7,13,12,3,2,3,8,8,15,14,10,16,16,3,2];
 const legs=visits.slice(1).map((node,i)=>({from:route[visits[i]],to:route[node],duration:node===visits[i]?1300:Math.hypot(route[node][0]-route[visits[i]][0],route[node][1]-route[visits[i]][1])/260*1000}));
 const cycleDuration=legs.reduce((total,leg)=>total+leg.duration,0)+450;
 const edges=new Map<string,string>();
 const addEdges=(indices:number[])=>indices.slice(1).forEach((node,i)=>{const previous=indices[i];if(previous===node)return;const key=[previous,node].sort((a,b)=>a-b).join('-');edges.set(key,`M${route[previous].join(' ')} L${route[node].join(' ')}`)});
 addEdges(route.map((_,i)=>i));addEdges(visits);
 const routePath=[...edges.values()].join(' ');
 const [hit,setHit]=useState(-1);const clock=useRef(0);const ballX=useMotionValue(85),ballY=useMotionValue(219);
 useEffect(()=>{clock.current=0;setHit(-1);ballX.set(85);ballY.set(219)},[connected,reduce,ballX,ballY]);
 useAnimationFrame((_,delta)=>{
  if(connected||reduce)return;
  clock.current+=Math.min(delta,50);let elapsed=clock.current%cycleDuration;let x=route[2][0],y=route[2][1];
  for(const leg of legs){if(elapsed<=leg.duration){const fraction=elapsed/leg.duration;x=leg.from[0]+(leg.to[0]-leg.from[0])*fraction;y=leg.from[1]+(leg.to[1]-leg.from[1])*fraction;break}elapsed-=leg.duration}
  ballX.set(x);ballY.set(y);
  const nearest=route.findIndex(([nx,ny],index)=>index!==3&&Math.hypot(nx-x,ny-y)<28);
  setHit(previous=>previous===nearest?previous:nearest);
 });
 const afterJourney=(()=>{
  const points=[{x:134,y:219,time:0},{x:545,y:219,time:2},{x:545,y:219,time:3.6}];
  const curve=(p:number[][],start:number,duration:number)=>{for(let i=1;i<=30;i++){const t=i/30,u=1-t;points.push({x:u*u*u*p[0][0]+3*u*u*t*p[1][0]+3*u*t*t*p[2][0]+t*t*t*p[3][0],y:u*u*u*p[0][1]+3*u*u*t*p[1][1]+3*u*t*t*p[2][1]+t*t*t*p[3][1],time:start+t*duration})}};
  curve([[545,219],[545,285],[584,343],[657.5,343]],3.6,1.8);
  points.push({x:657.5,y:343,time:6.2});
  curve([[657.5,343],[731,343],[770,285],[770,219]],6.2,1.8);
  points.push({x:1370,y:219,time:11});
  return {x:points.map(p=>p.x),y:points.map(p=>p.y),times:points.map(p=>p.time/11)};
 })();
 const iconCard=(x:number,y:number,Icon:typeof User,label:string,channel=false,index=-1)=><motion.g animate={{scale:!connected&&hit===index&&index>=0?1.16:1}} transition={{duration:reduce?0:.14}} style={{transformOrigin:`${x+32}px ${y+32}px`}} className={`nv-icon-card ${channel?'nv-icon-channel':''}`}><title>{label}</title><circle cx={x+32} cy={y+32} r={28}/><Icon x={x+16} y={y+16} width={32} height={32}/></motion.g>;
 return <div className={`native-voice ${connected?'nv-connected':'nv-fragmented'}`}>
 <header><h1 id="screen-title">{s.headline}</h1><p>{s.support}</p></header>
 <svg className="nv-story-diagram" viewBox="0 0 1440 450" role="img" aria-label={connected?'Customer engagement channels connect through a routing engine to an AI agent, with a dotted escalation path to a human. A supervisor monitors both AI and human agents through dotted monitoring links. A Customer 360 control tower coordinates connected tools and teams toward resolution.':'Customer channels connect separately to a human agent, who navigates CRM, processes, knowledge and notes, then manually triages work across departments.'}>
 <defs><linearGradient id="nv-data-light"><stop offset="0" stopColor="white" stopOpacity="0"/><stop offset=".5" stopColor="white" stopOpacity=".85"/><stop offset="1" stopColor="white" stopOpacity="0"/></linearGradient><clipPath id="nv-data-band"><path d="M325 205 H1235 L1255 219 L1235 233 H325 Z"/></clipPath><marker id="nv-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto-start-reverse"><path d="M0 0 L7 3.5 L0 7" fill="#7393b5"/></marker></defs>
 <AnimatePresence mode="wait" initial={false}><motion.g key={connected?'after':'before'} initial={{opacity:0,y:reduce?0:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:reduce?0:-8}} transition={{duration}}>
 {connected?<>
 <rect className="nv-channel-group" x="215" y="51" width="110" height="336" rx="24"/>
 <rect className="nv-control-tower nv-channel-group" x="770" y="51" width="500" height="336" rx="24"/>
 <path className="nv-stream-band" d="M325 205 H1235 L1255 219 L1235 233 H325 Z"/>
 <g className="nv-data-glow" clipPath="url(#nv-data-band)" aria-hidden="true"><rect x="325" y="205" width="170" height="28" fill="url(#nv-data-light)"/></g>
 <g className="nv-paths nv-stream-lines"><path d="M134 219 H215 M325 219 H501 M589 219 H770 M1270 219 H1330"/>
 {[840,955,1070,1185].map(x=><path key={x} d={`M${x} 155 V199 M${x} 239 V283`}/>)}</g>
 <path className="nv-escalation" d="M545 219 C545 285 584 343 657.5 343"/><path className="nv-human-continuation" d="M657.5 343 C731 343 770 285 770 219"/>
 <path className="nv-monitoring" d="M545 219 C545 153 584 95 657.5 95 M657.5 127 V311"/>
 <g className="nv-tower-eye nv-routing-node"><title>{l.routingEngine}</title><circle cx="325" cy="219" r="27"/><Workflow x="308" y="202" width="34" height="34"/></g>
 <g className="nv-shared-agent nv-supervisor-node"><title>{l.supervisor}: monitors AI and human agents</title><g className="nv-static-medallion"><circle cx="657.5" cy="95" r="32"/><Users x="640.5" y="78" width="34" height="34"/></g><text x="657.5" y="37" textAnchor="middle">{l.supervisor}</text></g>
 <g className="nv-shared-agent"><g className="nv-focus-icon nv-focus-ai"><circle cx="545" cy="219" r="44"/><Bot x="524" y="198" width="42" height="42"/></g><text x="500" y="164" textAnchor="end">{l.ai}</text></g>
 <g className="nv-shared-agent"><g className="nv-focus-icon nv-focus-human"><circle cx="657.5" cy="343" r="32"/><Headphones x="640.5" y="326" width="34" height="34"/></g><text x="657.5" y="405" textAnchor="middle">{l.human}</text></g>
 {[FileText,Workflow,Database,Users,Cloud,BookOpen,Receipt,Settings].map((Icon,i)=><g key={i} className="nv-focus-icon nv-focus-tower">{iconCard(808+(i%4)*115,i<4?91:283,Icon,[l.record,l.tools[1],l.tools[0],l.teams[0],'Systems',l.tools[2],'Billing','Rules'][i])}</g>)}
 <g className="nv-tower-eye"><circle cx="770" cy="219" r="27"/><Eye x="753" y="202" width="34" height="34"/></g>
 <text className="nv-customer360" x="1020" y="227" textAnchor="middle">{l.customer360}</text>
 <g className="nv-completion nv-focus-icon nv-focus-complete"><circle cx="1370" cy="219" r="40"/><ThumbsUp x="1349" y="198" width="42" height="42"/></g>
 {l.channels.map((label,i)=><g key={label}>{iconCard(238,64+i*84,[MessageCircle,MessageSquare,Phone,Mail][i],label,true)}</g>)}
 {!reduce&&<motion.g className="nv-traveller" aria-hidden="true" initial={{x:134,y:219}} animate={{x:afterJourney.x,y:afterJourney.y}} transition={{duration:11,ease:'linear',times:afterJourney.times}}><circle r="12" className="nv-traveller-halo"/><circle r="5" className="nv-traveller-core"/></motion.g>}
 </>:<>
 <g className="nv-paths nv-messy">
 {[96,180,264,348].filter(y=>y!==264).map(y=><path key={y} d={`M85 219 L270 ${y} L545 219`}/>)}
 <path d={routePath}/>
 <path d="M690 219 L788 98 L872 212 L991 187 M959 71 L1133 94 L1262 221 L1229 388 M959 292 L826 351 L1096 373 L1345 336 M1334 115 L1151 250"/>
 </g>
 <motion.g className="nv-customer-node nv-agent-node" animate={{scale:hit===2?1.12:1}} transition={{duration:reduce?0:.14}} style={{transformOrigin:'545px 219px'}}><circle cx="545" cy="219" r="49"/><Headphones x="526" y="200" width="38" height="38"/><text x="545" y="297" textAnchor="middle">Agent</text></motion.g>
 {toolNodes.map(({x,y,Icon,label},i)=><g key={i}>{iconCard(x,y,Icon,label,false,i+4)}</g>)}

 </>}
 </motion.g></AnimatePresence>
 <motion.g className="nv-customer-node" animate={{scale:!connected&&hit===0?1.12:1}} transition={{duration:reduce?0:.14}} style={{transformOrigin:"85px 219px"}}><circle cx="85" cy="219" r="49"/><User x="66" y="196" width="38" height="38"/><text x="85" y="297" textAnchor="middle">{l.customer}</text></motion.g>
 {!connected&&l.channels.map((label,i)=><g key={label}>{iconCard(238,64+i*84,[MessageCircle,MessageSquare,Phone,Mail][i],label,true,i===2?1:-1)}</g>)}

 {!connected&&!reduce&&<motion.g className="nv-traveller" style={{x:ballX,y:ballY}} aria-hidden="true"><circle r="13" className="nv-traveller-halo"/><circle r="5" className="nv-traveller-core"/></motion.g>}

 </svg>
 <footer className="nv-controls"><div className="nv-state-switch" aria-label="Diagram state"><button aria-pressed={!connected} onClick={()=>onJump(0)}>Before</button><button aria-pressed={connected} onClick={()=>onJump(1)}>After</button></div></footer>
 </div>
}
