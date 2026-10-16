import {isOffline} from './offline';
import {offlineApi} from './offline-api';
import {createContext,useContext} from 'react';
import {presentation} from '../data/presentation';
export const ContentContext=createContext(presentation);
export const useContent=()=>useContext(ContentContext);
export async function api(path:string,options?:RequestInit){
 if(isOffline)return offlineApi(path,options);
 const response=await fetch(path,{...options,credentials:'same-origin',headers:{Accept:'application/json',...options?.headers}});
 const text=await response.text();let result;
 try{result=JSON.parse(text)}catch{
  throw Error(response.redirected||response.status===401||response.status===403
   ? 'Your sign-in may have expired. Open the presentation in another tab and sign in, then retry here. Keep this editor open to preserve your edits.'
   : `The hosting service returned a page instead of a save response (HTTP ${response.status}). Your edits are still on screen. Please try again.`);
 }
 if(!response.ok)throw Error(result.error||'Unable to save. Try again.');return result;
}
