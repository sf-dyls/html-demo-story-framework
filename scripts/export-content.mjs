import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd(),state=path.join(root,'.local-data/state.json');
if(!fs.existsSync(state))throw Error('Save and publish locally before exporting.');
const config=JSON.parse(fs.readFileSync(state,'utf8')).published;
function walk(value){if(Array.isArray(value))value.forEach(walk);else if(value&&typeof value==='object')for(const [key,v] of Object.entries(value)){if(key==='src'&&typeof v==='string'&&v.startsWith('/media/')){const name=path.basename(v);fs.mkdirSync('public/team-media',{recursive:true});fs.copyFileSync(path.join('.local-data/media',name),path.join('public/team-media',name));value[key]='/team-media/'+name}else walk(v)}}
walk(config);fs.writeFileSync('content/initial.json',JSON.stringify(config,null,2)+'\n');console.log('Published content exported to content/initial.json. Review and commit it with public/team-media. Notes excluded.');
