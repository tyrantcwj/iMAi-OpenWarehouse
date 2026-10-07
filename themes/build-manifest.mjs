import {createHash} from 'node:crypto';
import {readFile,writeFile,readdir} from 'node:fs/promises';

const directory=new URL('./',import.meta.url);
const files={};
const ids=[];
const names=['tokens.css'];
for(const entry of await readdir(directory,{withFileTypes:true})){
  if(!entry.isDirectory())continue;
  let manifest;
  try{manifest=JSON.parse(await readFile(new URL(entry.name+'/theme.json',directory),'utf8')))}catch(error){if(error.code==='ENOENT')continue;throw error}
  if(!/^[a-z][a-z0-9-]{0,31}$/.test(entry.name)||manifest.id!==entry.name||manifest.engine!==1){throw Error('Invalid theme manifest: '+entry.name)}
  ids.push(entry.name);
  for(const name of await readdir(new URL(entry.name+'/',directory))){
    if(['theme.json','tokens.json','primevue.json','charts.json','theme.css'].includes(name))names.push(entry.name+'/'+name);
  }
}
if(!ids.includes('classic'))throw Error('classic theme is required');
for(const name of names.sort()){
  const bytes=await readFile(new URL(name,directory));
  files[name]={sha256:createHash('sha256').update(bytes).digest('hex')};
}
await writeFile(new URL('manifest.json',directory),JSON.stringify({schema_version:1,default_appearance:'classic',appearances:ids.sort(),files},null,2)+'\n');
console.log('Theme manifest updated. Commit resources and manifest together.');
