import {presentation} from '../src/data/presentation';
const reply=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
// Configure OWNER_EMAIL and replace the Sites identity check when hosting elsewhere.
function valid(c:any){return c?.schemaVersion===1&&(!c.team||(Array.isArray(c.team.members)&&c.team.members.length>=1&&c.team.members.length<=4&&c.team.members.every((m:any)=>m.id&&m.name?.trim()&&m.image)))&&c.presentation?.title?.trim()&&c.customer?.name?.trim()&&c.benefits?.length===3&&c.challenges?.length===3&&c.personas?.length>0&&c.personas.length<=12&&c.personas.every((p:any)=>p.id&&p.name?.trim()&&p.image&&p.overviewTouchpoints?.length>0&&p.recapTouchpoints?.length>0&&p.recapTouchpoints.length<=20)&&Array.isArray(c.valuePoints)&&c.valuePoints.length>0&&c.closing&&c.labels&&c.valueAudience;}
export default {async fetch(request:Request,env:any){const url=new URL(request.url);try{
 const editable=request.headers.get('oai-authenticated-user-email')?.toLowerCase()===env.OWNER_EMAIL?.toLowerCase();
 if(url.pathname.startsWith('/api/')){
 if(url.pathname!='/api/content'&&!editable)return reply({error:'Sign in as the site owner to edit this presentation.'},403);
 if(request.method!=='GET'&&request.headers.get('Origin')!==url.origin)return reply({error:'Request origin not allowed.'},403);
 if(url.pathname==='/api/actions'){
 const content=await env.DB.prepare('SELECT published FROM content WHERE id=1').first();
 const customer=(content?JSON.parse(content.published):presentation).customer.name;
 if(request.method==='GET'){const result=await env.DB.prepare('SELECT id,body,created_at FROM followups WHERE customer=? ORDER BY created_at,id').bind(customer).all();return reply({items:result.results});}
 if(request.method==='POST'){const body=await request.json() as any;if(typeof body.body!=='string'||!body.body.trim()||body.body.length>3000||typeof body.id!=='string'||body.id.length>80)return reply({error:'Enter a follow-up question (up to 3,000 characters).'},400);await env.DB.prepare('INSERT OR IGNORE INTO followups (id,customer,body,created_at) VALUES (?,?,?,?)').bind(body.id,customer,body.body.trim(),new Date().toISOString()).run();return reply({ok:true});}
 if(request.method==='DELETE'){await env.DB.prepare('DELETE FROM followups WHERE customer=?').bind(customer).run();return reply({ok:true});}
 }
 if(url.pathname==='/api/content'||url.pathname==='/api/draft'){
 const row=await env.DB.prepare('SELECT * FROM content WHERE id=1').first();
 if(request.method==='GET'){const config=row?JSON.parse(url.pathname==='/api/draft'?row.draft:row.published):structuredClone(presentation);config.team??=structuredClone(presentation.team);const supervisor=config.personas[2];if(supervisor&&!config.valueAudience.some((a:any)=>a.personaId===supervisor.id))config.valueAudience.push({personaId:supervisor.id,label:'Supervisors'});return reply({config,revision:row?.revision??0,updatedAt:row?.updated_at??null,canEdit:editable});}
 if((request.method==='POST'||request.method==='PUT')&&url.pathname==='/api/draft'){
 const raw=await request.text();if(raw.length>300000)return reply({error:'Presentation is too large.'},413);
 const body=JSON.parse(raw);if(!valid(body.config))return reply({error:'Complete the required titles, personas and journey points before saving.'},400);
 const data=JSON.stringify(body.config),now=new Date().toISOString();
 if(!row){const result=await env.DB.prepare('INSERT OR IGNORE INTO content (id,draft,published,revision,updated_at) VALUES (1,?,?,1,?)').bind(data,JSON.stringify(presentation),now).run();if(!result.meta.changes)return reply({error:'A newer draft exists. Reload before saving.'},409);return reply({revision:1,updatedAt:now});}
 const result=await env.DB.prepare('UPDATE content SET draft=?,revision=revision+1,updated_at=? WHERE id=1 AND revision=?').bind(data,now,body.revision).run();if(!result.meta.changes)return reply({error:'A newer draft exists. Reload before saving.'},409);return reply({revision:body.revision+1,updatedAt:now});
 }}
 if(url.pathname==='/api/publish'&&request.method==='POST'){const {revision}=await request.json() as any;const result=await env.DB.prepare('UPDATE content SET published=draft WHERE id=1 AND revision=?').bind(revision).run();return result.meta.changes?reply({ok:true}):reply({error:'The draft changed. Save again before publishing.'},409);}
 if(url.pathname==='/api/media'&&request.method==='POST'){const type=request.headers.get('Content-Type')??'';if(!['image/jpeg','image/png','image/webp'].includes(type))return reply({error:'Choose a JPG, PNG or WebP image.'},400);const data=await request.arrayBuffer();if(data.byteLength>8*1024*1024)return reply({error:'Choose an image smaller than 8 MB.'},413);const id=crypto.randomUUID();await env.MEDIA.put(id,data,{httpMetadata:{contentType:type}});return reply({src:'/media/'+id});}
 return reply({error:'Not found'},404);
 }
 if(url.pathname.startsWith('/media/')){const object=await env.MEDIA.get(url.pathname.slice(7));if(!object)return new Response('Not found',{status:404});return new Response(object.body,{headers:{'Content-Type':object.httpMetadata.contentType,'Cache-Control':'private, max-age=86400','X-Content-Type-Options':'nosniff'}});}
 return env.ASSETS.fetch((url.pathname==='/cms'||url.pathname==='/cms/')?new Request(new URL('/',url),request):request);
 }catch(e){console.error('CMS request failed',e);return reply({error:'Could not load or save content. Your edits are still on screen; try again.'},503);}}};
