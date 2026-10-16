import fs from 'node:fs';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
export function localCms(){
 return {name:'local-file-cms',configureServer:install,configurePreviewServer:install};
}
function install(server){
 const root=server.config.root,dir=path.join(root,'.local-data'),file=path.join(dir,'state.json');
 fs.mkdirSync(path.join(dir,'media'),{recursive:true});
 const read=()=>fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):{draft:JSON.parse(fs.readFileSync(path.join(root,'content/initial.json'),'utf8')),published:JSON.parse(fs.readFileSync(path.join(root,'content/initial.json'),'utf8')),revision:0,items:[]};
 const save=s=>{fs.writeFileSync(file+'.tmp',JSON.stringify(s,null,2));fs.renameSync(file+'.tmp',file)};
 server.middlewares.use(async(req,res,next)=>{
 const url=new URL(req.url,'http://localhost');
 if(!url.pathname.startsWith('/api/')&&!url.pathname.startsWith('/media/'))return next();
 const reply=(data,status=200)=>{res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(data))};
 try{
 if(!/^(localhost|127\.0\.0\.1)(:\d+)?$/.test(req.headers.host||''))return reply({error:'Local development only.'},403);
 if(req.headers.origin&&new URL(req.headers.origin).host!==req.headers.host)return reply({error:'Origin not allowed'},403);
 let chunks=[],length=0;for await(const chunk of req){length+=chunk.length;if(length>9*1024*1024)return reply({error:'Upload too large'},413);chunks.push(chunk)}
 const raw=Buffer.concat(chunks),body=raw.length&&req.headers['content-type']?.includes('application/json')?JSON.parse(raw):{};
 const s=read(),p=url.pathname,m=req.method;
 if(p.startsWith('/media/')){
 const id=p.slice(7);if(!/^[a-f0-9-]+\.(png|jpg|webp)$/.test(id))return reply({error:'Not found'},404);
 const f=path.join(dir,'media',id);if(!fs.existsSync(f))return reply({error:'Not found'},404);
 res.writeHead(200,{'Content-Type':id.endsWith('png')?'image/png':id.endsWith('webp')?'image/webp':'image/jpeg'});return res.end(fs.readFileSync(f));
 }
 if(m==='GET'&&(p==='/api/content'||p==='/api/draft'))return reply({config:p==='/api/content'?s.published:s.draft,revision:s.revision,updatedAt:s.updatedAt||null,canEdit:true});
 if(p==='/api/draft'&&(m==='POST'||m==='PUT')){
 if(body.revision!==s.revision)return reply({error:'A newer draft exists. Reload before saving.'},409);
 if(body.config?.schemaVersion!==1||!body.config?.presentation?.title)return reply({error:'Invalid presentation'},400);
 s.draft=body.config;s.revision++;s.updatedAt=new Date().toISOString();save(s);return reply({revision:s.revision,updatedAt:s.updatedAt});
 }
 if(p==='/api/publish'&&m==='POST'){
 if(body.revision!==s.revision)return reply({error:'Draft changed. Save again.'},409);s.published=s.draft;save(s);return reply({ok:true});
 }
 if(p==='/api/media'&&m==='POST'){
 const ext={'image/png':'png','image/jpeg':'jpg','image/webp':'webp'}[req.headers['content-type']];if(!ext||raw.length>8*1024*1024)return reply({error:'Use JPG, PNG or WebP under 8 MB.'},400);
 const id=randomUUID()+'.'+ext;fs.writeFileSync(path.join(dir,'media',id),raw);return reply({src:'/media/'+id});
 }
 if(p==='/api/actions'){
 const customer=s.published.customer.name;s.items??=[];
 if(m==='GET')return reply({items:s.items.filter(x=>x.customer===customer)});
 if(m==='POST'){
 if(typeof body.body!=='string'||!body.body.trim()||body.body.length>3000||typeof body.id!=='string')return reply({error:'Enter a note up to 3,000 characters.'},400);
 if(!s.items.some(x=>x.id===body.id))s.items.push({id:body.id,body:body.body.trim(),customer,created_at:new Date().toISOString()});save(s);return reply({ok:true});
 }
 if(m==='DELETE'){s.items=s.items.filter(x=>x.customer!==customer);save(s);return reply({ok:true})}
 }
 return reply({error:'Not found'},404);
 }catch(e){console.error(e);reply({error:'Could not read or save local content.'},500)}
 });
}
