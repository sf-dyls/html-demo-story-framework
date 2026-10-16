import type {PresentationConfig} from '../types/presentation';
export function validatePresentation(config: PresentationConfig): string[] {
 const errors: string[]=[];
 if(config.benefits.length!==3) errors.push('Exactly three benefits are required.');
 if(config.challenges.length!==3) errors.push('Exactly three challenges are required.');
 const benefitIds=new Set(config.benefits.map(b=>b.id));
 if(benefitIds.size!==3) errors.push('Benefit IDs must be unique.');
 for(const c of config.challenges) if(!benefitIds.has(c.benefitId)) errors.push(`Unknown benefit on ${c.id}.`);
 if(new Set(config.personas.map(p=>p.id)).size!==config.personas.length) errors.push('Persona IDs must be unique.');
 for(const p of config.personas) for(const list of [p.overviewTouchpoints,p.recapTouchpoints]) {
  if(new Set(list.map(t=>t.id)).size!==list.length) errors.push(`Duplicate touchpoint IDs on ${p.id}.`);
  for(const t of list) if('benefitId' in t || 'benefitIds' in t) errors.push(`Touchpoint ${t.id} must not reference benefits.`);
 }
 return errors;
}
