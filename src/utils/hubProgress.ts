/** Ignore unknown/duplicate IDs; completion follows the configured persona set. */
export function hubProgress(personaIds:string[],completedIds:string[]){
 const completed=new Set(completedIds);
 const completedCount=personaIds.filter(id=>completed.has(id)).length;
 return {completedCount,allComplete:personaIds.length>0&&completedCount===personaIds.length};
}
