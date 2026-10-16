import {useEffect,useRef} from 'react';
import {useContent} from '../cms/content';
import {usePresentation} from '../state/PresentationContext';
import {screenSequence,screenKey} from '../state/presentationReducer';
export function NavigationOverlay(){
 const config=useContent();const {state,dispatch}=usePresentation();const dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{const element=dialog.current;if(!element)return;const previous=document.activeElement as HTMLElement|null;if(state.navigationOverlayOpen)element.showModal();else element.close();return ()=>{element.close();previous?.focus();};},[state.navigationOverlayOpen]);
 const labels:Record<string,string>={contactCenter:'Contact centre capabilities',takeaways:config.keyTakeaways?.title??'Key takeaways',nativeVoice:'Why native voice matters',title:'Introduction',team:'Team introductions',challenges:config.labels.discovery,benefits:config.labels.focus,hub:config.labels.journeyHub,value:'Customer Value',story:'Customer story',actions:'Actions',closing:'Closing'};
 const screens=screenSequence(config.personas.map(p=>p.id),config.slideOrder).filter(p=>!config.hiddenScreens?.includes(screenKey(p.currentScreen,p.currentPersonaId,p.discoveryState)));
 return <dialog ref={dialog} onCancel={e=>{e.preventDefault();dispatch({type:'closeOverlay'});}} aria-labelledby="navigation-title"><div className="overlay-heading"><h2 id="navigation-title">Navigation</h2><button onClick={()=>dispatch({type:'closeOverlay'})}>Close · Esc</button></div><nav aria-label="Presentation screens">{screens.map(p=>{const key=screenKey(p.currentScreen,p.currentPersonaId,p.discoveryState);const persona=config.personas.find(x=>x.id===p.currentPersonaId);return <button key={key} onClick={()=>dispatch({type:'go',screen:p.currentScreen,personaId:p.currentPersonaId??undefined,discoveryState:p.discoveryState})}>{persona?`${persona.name} · ${p.currentScreen==='personaIntro'?'Introduction':'Journey'}`:labels[key]}</button>})}</nav></dialog>;
}
