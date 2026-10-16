import {useEffect} from 'react';
interface Options {enabled:boolean;activeIndex:number;count:number;next:()=>void;previous:()=>void}
export function useJourneyKeyboard({enabled,activeIndex,count,next,previous}:Options){
 useEffect(()=>{
  if(!enabled)return;
  const handle=(event:KeyboardEvent)=>{
   if(event.defaultPrevented||event.repeat||event.ctrlKey||event.metaKey||event.altKey||document.querySelector('dialog[open]'))return;
   const target=event.target;
   if(target instanceof HTMLElement&&target.closest('input,textarea,select,[contenteditable="true"]'))return;
   if(event.key===' '&&target instanceof HTMLElement&&target.closest('button,a,[role="button"]'))return;
   const advancing=event.key==='ArrowRight'||event.key===' ';
   const reversing=event.key==='ArrowLeft';
   if((advancing&&activeIndex<count-1)||(reversing&&activeIndex>=0)){
    // Document bubble precedes the presentation's window listener. Consume only local steps.
    event.preventDefault();event.stopPropagation();if(advancing)next();else previous();
   }
  };
  document.addEventListener('keydown',handle);
  return()=>document.removeEventListener('keydown',handle);
 },[enabled,activeIndex,count,next,previous]);
}
