export const isOffline=!!(window as any).__OFFLINE_STATE__;
const w=window as any;
export let fileState:any=structuredClone(w.__OFFLINE_STATE__??{draft:w.__OFFLINE_CONTENT__,published:w.__OFFLINE_CONTENT__,revision:0});
const template=document.documentElement.cloneNode(true) as HTMLElement;
if(template.querySelector('#root'))template.querySelector('#root')!.innerHTML='';
let handle:any=null;
let unsaved=false;
window.addEventListener('beforeunload',e=>{if(unsaved){e.preventDefault();e.returnValue=''}});
export async function chooseFile(){
 if(!handle&&w.showSaveFilePicker)handle=await w.showSaveFilePicker({suggestedName:'Presentation.html',types:[{description:'Offline presentation',accept:{'text/html':['.html']}}]});
}
export async function saveFile(){
 const doc=template.cloneNode(true) as HTMLElement;
 doc.querySelector('#offline-data')!.textContent='window.__OFFLINE_STATE__='+JSON.stringify(fileState).replace(/</g,'\\u003c')+';';
 const blob=new Blob(['<!doctype html>'+doc.outerHTML],{type:'text/html'});
 if(handle){const writer=await handle.createWritable();await writer.write(blob);await writer.close();}
 else{const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='Presentation.html';a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);}
 unsaved=false;
}
export function importBackup(value:any){
 const config=value?.draft??value?.published;
 if(config?.schemaVersion!==1||!Array.isArray(config.personas)||!config.presentation?.title)throw Error('Choose a valid Presentation-backup.json file.');
 fileState=structuredClone(value);fileState.published=structuredClone(config);fileState.draft=structuredClone(config);unsaved=true;
}
export function markUnsaved(){unsaved=true}
