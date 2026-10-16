import {useEffect} from 'react';
export function usePresentationKeyboard({next,previous,hub,toggleOverlay,fullscreen,overlayOpen,notes,notesOpen}:{next:()=>void;previous:()=>void;hub:()=>void;toggleOverlay:()=>void;fullscreen:()=>void;overlayOpen:boolean;notes:()=>void;notesOpen:boolean}){
 useEffect(()=>{
  const handle=(event:KeyboardEvent)=>{
   if(event.defaultPrevented||event.repeat||event.ctrlKey||event.metaKey||event.altKey)return;
   if(notesOpen)return;
   const target=event.target;
   if(target instanceof HTMLElement&&target.closest('input,textarea,select,[contenteditable="true"]'))return;
   if(event.key==='Escape'){event.preventDefault();toggleOverlay();return;}
   if(overlayOpen)return;
   if(event.key===' '&&target instanceof HTMLElement&&target.closest('button,a,[role="button"]'))return;
   const action=event.key==='ArrowRight'||event.key===' '?next:event.key==='ArrowLeft'?previous:event.key.toLowerCase()==='h'?hub:event.key.toLowerCase()==='f'?fullscreen:event.key.toLowerCase()==='n'?notes:null;
   if(action){event.preventDefault();action();}
  };
  // Bubble phase lets future journey controls consume arrow keys first.
  window.addEventListener('keydown',handle);
  return ()=>window.removeEventListener('keydown',handle);
 },[next,previous,hub,toggleOverlay,fullscreen,overlayOpen,notes,notesOpen]);
}
