import {fileState,chooseFile,saveFile,markUnsaved} from './offline';
export async function offlineApi(path:string,options?:RequestInit):Promise<any>{
 const method=options?.method||'GET';const body=typeof options?.body==='string'?JSON.parse(options.body):null;
 if(path==='/api/content'||path==='/api/draft'){
  if(method==='GET')return {config:structuredClone(fileState[path==='/api/draft'?'draft':'published']),revision:fileState.revision||0,canEdit:true};
  await chooseFile();fileState.draft=structuredClone(body.config);fileState.published=structuredClone(body.config);fileState.revision=(fileState.revision||0)+1;markUnsaved();await saveFile();return {revision:fileState.revision};
 }
 if(path==='/api/publish')return {ok:true};
 if(path==='/api/media'){const src=await new Promise<string>((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(String(r.result));r.onerror=reject;r.readAsDataURL(options!.body as Blob)});return {src};}
 if(path==='/api/actions'){
  const key='actions:'+fileState.published.customer.name;const items=fileState[key]??[];
  if(method==='POST'||method==='DELETE'){
   await chooseFile();const old=structuredClone(items);
   fileState[key]=method==='DELETE'?[]:items.some((i:any)=>i.id===body.id)?items:[...items,{...body,created_at:new Date().toISOString()}];
   try{await saveFile()}catch(e){fileState[key]=old;throw e;}
  }
  return {items:structuredClone(fileState[key]??[])};
 }
 throw Error('Offline operation unavailable.');
}
