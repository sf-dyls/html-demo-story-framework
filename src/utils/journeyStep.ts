export type JourneyStepAction={type:'next'}|{type:'previous'}|{type:'jump';index:number}|{type:'reset'};
export function journeyStep(index:number,count:number,action:JourneyStepAction):number {
 const last=Math.max(-1,count-1);
 const clamp=(value:number)=>Number.isFinite(value)?Math.max(-1,Math.min(last,Math.floor(value))):-1;
 switch(action.type){case 'next':return clamp(index+1);case 'previous':return clamp(index-1);case 'jump':return clamp(action.index);case 'reset':return -1;}
}
