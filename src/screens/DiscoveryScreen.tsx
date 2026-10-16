import {AnimatePresence,motion,useReducedMotion} from 'framer-motion';
import type {PresentationConfig} from '../types/presentation';
export function DiscoveryScreen({config,showBenefits,takeaways=false}:{config:PresentationConfig;showBenefits:boolean;takeaways?:boolean}) {
 const reduced=useReducedMotion();
 const transition={duration:reduced?0:0.25};
 return <div className="discovery-screen">
  <div className="discovery-screen__heading"><AnimatePresence mode="wait" initial={false}><motion.h1 id="screen-title" key={showBenefits?'benefits':'challenges'} initial={{opacity:0,y:reduced?0:6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:reduced?0:-6}} transition={transition}>{takeaways?(config.keyTakeaways?.title??'Key takeaways'):showBenefits?config.labels.focus:config.labels.discovery}</motion.h1></AnimatePresence></div>
  <div className="discovery-grid">{config.challenges.map((challenge,index)=>{
   const benefit=(takeaways?config.keyTakeaways?.benefits??config.benefits:config.benefits).find(item=>item.id===challenge.benefitId)!;
   return <article className="discovery-pillar" tabIndex={0} key={challenge.id}>
    <span className="discovery-pillar__number" aria-hidden="true">{String(index+1).padStart(2,'0')}</span>
    <AnimatePresence mode="wait" initial={false}><motion.div key={showBenefits?'benefit':'challenge'} initial={{opacity:0,y:reduced?0:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:reduced?0:-8}} transition={transition}>
     <h2>{showBenefits?benefit.title:challenge.title}</h2>
     {(showBenefits?benefit.shortDescription:challenge.description)&&<p>{showBenefits?benefit.shortDescription:challenge.description}</p>}
    </motion.div></AnimatePresence>
   </article>;
  })}</div>
 </div>;
}
