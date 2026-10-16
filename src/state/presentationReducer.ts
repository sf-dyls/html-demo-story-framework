export type Screen = 'contactCenter' | 'takeaways' | 'title' | 'team' | 'discovery' | 'journeyHub' | 'nativeVoice' | 'personaIntro' | 'personaRecap' | 'customerValue' | 'customerStory' | 'closing' | 'actions';
export interface Position {currentScreen:Screen;currentPersonaId:string|null;discoveryState:'challenges'|'benefits';recapIndex:number;recapComplete:boolean;valueIndex:number;voiceIndex?:number}
export interface PresentationState extends Position {completedPersonaIds:string[];navigationOverlayOpen:boolean;history:Position[]}
export type Action={type:'next'}|{type:'previous'}|{type:'toggleOverlay'}|{type:'closeOverlay'}|{type:'go';screen:Screen;personaId?:string;discoveryState?:'challenges'|'benefits'}|{type:'complete';personaId:string}|{type:'voiceJump';index:number}|{type:'recapJump';index:number};
export const initialState:PresentationState={currentScreen:'title',currentPersonaId:null,completedPersonaIds:[],discoveryState:'challenges',navigationOverlayOpen:false,history:[],recapIndex:-1,recapComplete:false,valueIndex:-1};
export function screenKey(screen:Screen,personaId:string|null=null,discoveryState='challenges'){return screen==='discovery'?discoveryState:screen==='personaIntro'?`intro:${personaId}`:screen==='personaRecap'?`recap:${personaId}`:screen==='journeyHub'?'hub':screen==='customerValue'?'value':screen==='customerStory'?'story':screen;}
export function screenSequence(personaIds:string[],order:string[]=[]):Position[]{
 const pos=(currentScreen:Screen,currentPersonaId:string|null=null,discoveryState:'challenges'|'benefits'='challenges'):Position=>({currentScreen,currentPersonaId,discoveryState,recapIndex:-1,recapComplete:false,valueIndex:-1});
 const defaults=[pos('title'),pos('team'),pos('discovery'),pos('discovery',null,'benefits'),pos('contactCenter'),pos('nativeVoice'),pos('journeyHub'),...personaIds.flatMap(id=>[pos('personaIntro',id),pos('personaRecap',id)]),pos('customerValue'),pos('takeaways'),pos('customerStory'),pos('actions'),pos('closing')];
 if(!order.includes('takeaways')&&order.includes('story')){order=[...order];order.splice(order.indexOf('story'),0,'takeaways');}
 if(!order.includes('contactCenter')&&order.includes('nativeVoice')){order=[...order];order.splice(order.indexOf('nativeVoice'),0,'contactCenter');}
 const byKey=new Map(defaults.map(p=>[screenKey(p.currentScreen,p.currentPersonaId,p.discoveryState),p]));
 return [...new Set([...order,...byKey.keys()])].flatMap(key=>byKey.has(key)?[byKey.get(key)!]:[]);
}
export function visibleInitialState(ids:string[],hidden:string[]=[],order:string[]=[]):PresentationState{return {...initialState,...(screenSequence(ids,order).find(p=>!hidden.includes(screenKey(p.currentScreen,p.currentPersonaId,p.discoveryState)))??{})};}
export function createPresentationReducer(personaIds:string[],recapCounts:Record<string,number>={},valueCount=0,hidden:string[]=[],order:string[]=[]){
 const sequence=screenSequence(personaIds,order);const visible=(p:Position)=>!hidden.includes(screenKey(p.currentScreen,p.currentPersonaId,p.discoveryState));
 return (state:PresentationState,action:Action):PresentationState=>{
  const count=state.currentPersonaId?recapCounts[state.currentPersonaId]??0:0;
  const go=(screen:Screen,personaId:string|null=null,discoveryState=state.discoveryState):PresentationState=>{
   if((screen==='personaIntro'||screen==='personaRecap')&&(!personaId||!personaIds.includes(personaId)))return state;
   const start=sequence.findIndex(p=>screenKey(p.currentScreen,p.currentPersonaId,p.discoveryState)===screenKey(screen,personaId,discoveryState));
   const target=sequence.slice(Math.max(0,start)).find(visible);if(!target)return state;
   screen=target.currentScreen;personaId=target.currentPersonaId;discoveryState=target.discoveryState;
   if(screenKey(screen,personaId,discoveryState)===screenKey(state.currentScreen,state.currentPersonaId,state.discoveryState))return {...state,navigationOverlayOpen:false};
   const {currentScreen,currentPersonaId,recapIndex,recapComplete,valueIndex,voiceIndex}=state;
   return {...state,currentScreen:screen,currentPersonaId:personaId,discoveryState,recapIndex:-1,recapComplete:false,valueIndex:-1,voiceIndex:0,navigationOverlayOpen:false,history:[...state.history,{currentScreen,currentPersonaId,discoveryState:state.discoveryState,recapIndex,recapComplete,valueIndex,voiceIndex}]};
  };
  const advance=()=>{const current=sequence.findIndex(p=>screenKey(p.currentScreen,p.currentPersonaId,p.discoveryState)===screenKey(state.currentScreen,state.currentPersonaId,state.discoveryState));const target=sequence.slice(current+1).find(visible);return target?go(target.currentScreen,target.currentPersonaId,target.discoveryState):state;};
  switch(action.type){
   case 'toggleOverlay':return {...state,navigationOverlayOpen:!state.navigationOverlayOpen};
   case 'closeOverlay':return {...state,navigationOverlayOpen:false};
   case 'complete':return personaIds.includes(action.personaId)?{...state,completedPersonaIds:[...new Set([...state.completedPersonaIds,action.personaId])]}:state;
   case 'go':return go(action.screen,action.personaId??null,action.discoveryState??(action.screen==='discovery'?'challenges':state.discoveryState));
   case 'voiceJump':return state.currentScreen==='nativeVoice'&&Number.isInteger(action.index)&&action.index>=0&&action.index<2?{...state,voiceIndex:action.index}:state;
   case 'recapJump':return state.currentScreen==='personaRecap'&&Number.isInteger(action.index)&&action.index>=0&&action.index<count?{...state,recapIndex:action.index,recapComplete:false}:state;
   case 'previous':{
    if(state.navigationOverlayOpen)return state;
    if(state.currentScreen==='nativeVoice'&&(state.voiceIndex??0)>0)return {...state,voiceIndex:(state.voiceIndex??0)-1};
    if(state.currentScreen==='customerValue'&&state.valueIndex>=0)return {...state,valueIndex:state.valueIndex-1};
    if(state.currentScreen==='personaRecap'){
     if(state.recapComplete)return {...state,recapComplete:false};
     if(state.recapIndex>=0)return {...state,recapIndex:state.recapIndex-1};
    }
    const history=state.history.filter(visible);const previous=history.at(-1);return previous?{...state,...previous,navigationOverlayOpen:false,history:history.slice(0,-1)}:state;
   }
   case 'next':
    if(state.navigationOverlayOpen)return state;
    switch(state.currentScreen){
     case 'nativeVoice':return (state.voiceIndex??0)<1?{...state,voiceIndex:(state.voiceIndex??0)+1}:advance();
     case 'journeyHub':{if(order.length)return advance();const next=personaIds.find(id=>!state.completedPersonaIds.includes(id)&&(!hidden.includes(`intro:${id}`)||!hidden.includes(`recap:${id}`)));return next?go('personaIntro',next):go('customerValue');}
     case 'personaIntro':return {...advance(),completedPersonaIds:hidden.includes(`recap:${state.currentPersonaId}`)?[...new Set([...state.completedPersonaIds,state.currentPersonaId!])]:state.completedPersonaIds};
     case 'personaRecap':{
      if(state.recapIndex<count-1)return {...state,recapIndex:state.recapIndex+1};
      return {...advance(),completedPersonaIds:[...new Set([...state.completedPersonaIds,...(state.currentPersonaId?[state.currentPersonaId]:[])])]};
     }
     case 'customerValue':return state.valueIndex<valueCount?{...state,valueIndex:state.valueIndex+1}:advance();
     default:return advance();
    }
  }
 };
}
