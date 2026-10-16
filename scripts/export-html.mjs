import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {build as viteBuild} from 'vite';
import {build as esbuild} from 'esbuild';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import {fileURLToPath} from 'node:url';
const types={'.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.woff':'font/woff','.woff2':'font/woff2'};
export async function exportHtml(root,config,items=[]){
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'demo-html-'));
 try{
 // Build from current source each time so exported behaviour matches the edited project.
 await viteBuild({root,configFile:false,plugins:[react(),tailwindcss()],logLevel:'error',build:{outDir:temp,emptyOutDir:true,copyPublicDir:false}});
 const bundle=await esbuild({absWorkingDir:root,entryPoints:['src/main.tsx'],bundle:true,write:false,format:'iife',minify:true,define:{'process.env.NODE_ENV':'"production"'},loader:{'.css':'empty'},logLevel:'error'});
 const asset=(url)=>{
 if(url.startsWith('data:'))return url;
 if(!url.startsWith('/')||url.startsWith('//'))throw Error('Offline export needs a local uploaded asset: '+url);
 const base=url.startsWith('/media/')?path.join(root,'.local-data/media'):path.join(root,'public');
 const relative=url.startsWith('/media/')?url.slice(7):url.slice(1);const full=path.resolve(base,relative);
 if(!full.startsWith(base+path.sep)||!fs.existsSync(full))throw Error('Cannot embed missing asset: '+url);
 return 'data:'+(types[path.extname(full).toLowerCase()]||'application/octet-stream')+';base64,'+fs.readFileSync(full).toString('base64');
 };
 const embedded=structuredClone(config);
 function walk(value){if(Array.isArray(value))value.forEach(walk);else if(value&&typeof value==='object')for(const [key,v] of Object.entries(value)){if(key==='src'&&typeof v==='string'&&v)value[key]=asset(v);else walk(v)}}walk(embedded);
 const index=fs.readFileSync(path.join(temp,'index.html'),'utf8');
 const cssPaths=[...index.matchAll(/href="([^"]+\.css)"/g)].map(m=>m[1]);
 let css=cssPaths.map(p=>fs.readFileSync(path.join(temp,p.replace(/^\//,'')),'utf8')).join('\n');
 css=css.replace(/url\(\s*(['"]?)([^)'"\s]+)\1\s*\)/g,(match,q,url)=>url.startsWith('data:')?match:'url("'+asset(url)+'")');
 const state={draft:embedded,published:embedded,revision:0};
 for(const n of items){if(n.customer===config.customer.name)(state['actions:'+n.customer]??=[]).push({id:n.id,body:n.body,created_at:n.created_at})}
 const data=JSON.stringify(state).replace(/</g,'\\u003c');
 const js=bundle.outputFiles[0].text.replace(/<\/script/gi,'<\\/script');
 return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Demo Story Framework — Offline</title><style>'+css.replace(/<\/style/gi,'<\\/style')+'</style></head><body><div id="root"></div><script id="offline-data">window.__OFFLINE_STATE__='+data+';</script><script>'+js+'</script></body></html>';
 }finally{fs.rmSync(temp,{recursive:true,force:true})}
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const root=process.cwd(),statePath=path.join(root,'.local-data/state.json');
 const state=fs.existsSync(statePath)?JSON.parse(fs.readFileSync(statePath,'utf8')):null;
 const config=state?.published??JSON.parse(fs.readFileSync('content/initial.json','utf8'));
 fs.mkdirSync('exports',{recursive:true});fs.writeFileSync('exports/Presentation.html',await exportHtml(root,config,state?.items??[]));console.log('Saved exports/Presentation.html (published content).');
}
