export interface JourneyPoint {x:number;y:number;low:boolean}
/** Pixel geometry derived only from count and measured viewport; no content coordinates. */
export function journeyLayout(count:number,availableWidth:number,rem=16){
 const safeCount=Math.max(0,Math.floor(count));
 const density=Math.min(1,Math.max(0,(safeCount-3)/7));
 const diameter=(4.5-density*1.5)*rem;
 const minCell=(11-density*3)*rem;
 const width=Math.max(availableWidth,safeCount*minCell,rem*16);
 const height=12*rem;
 const inset=diameter/2+.75*rem;
 const points:JourneyPoint[]=Array.from({length:safeCount},(_,i)=>({x:width*(i+.5)/safeCount,y:i%2===0?height-inset:inset,low:i%2===0}));
 const segments=points.slice(1).map((point,i)=>{const from=points[i];const mid=(from.x+point.x)/2;return `C ${mid} ${from.y}, ${mid} ${point.y}, ${point.x} ${point.y}`;});
 const pathTo=(index:number)=>points.length?`M ${points[0].x} ${points[0].y} ${segments.slice(0,Math.max(0,Math.min(Math.floor(index),segments.length))).join(' ')}`:'';
 return {width,height,diameter,minCell,points,path:pathTo(safeCount-1),pathTo};
}
