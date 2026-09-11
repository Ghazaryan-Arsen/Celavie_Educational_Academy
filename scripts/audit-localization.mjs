import fs from 'node:fs';
import ts from 'typescript';
import assert from 'node:assert/strict';
const catalog=JSON.parse(fs.readFileSync('src/i18n/catalog.json','utf8'));
const missing=new Set();
const exempt = value => !/[a-zA-Z]/.test(value) || /^(SMM(?: (?:starter|pro|expert|STARTER|PRO|EXPERT))?|HSK [1-6]|JLPT N[1-5]|Google Analytics 4|[A-C][1-2])$/.test(value);
const check=value=>{if(value&&!catalog[value]&&!exempt(value))missing.add(value);};
for(const file of fs.readdirSync('src',{recursive:true}).filter(p=>p.endsWith('.tsx')&&!p.startsWith('i18n'))){
 const p='src/'+file,ast=ts.createSourceFile(p,fs.readFileSync(p,'utf8'),99,true);
 const walk=n=>{if(ts.isCallExpression(n)&&n.expression.getText(ast)==='t'&&n.arguments[0]&&ts.isStringLiteral(n.arguments[0]))check(n.arguments[0].text);ts.forEachChild(n,walk);};walk(ast);
}
const {LANGUAGE_COURSES,SMM_COURSES,FAQS,SERVICES,GALLERY_IMAGES,TESTIMONIALS}=await import('data:text/javascript;base64,'+Buffer.from(ts.transpileModule(fs.readFileSync('src/data/mockData.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText).toString('base64'));
function walk(value,key=''){
 if(['id','slug','category','tier','language','image','icon','url','avatar','name','flagEmoji'].includes(key))return;
 if(typeof value==='string')check(value);
 else if(Array.isArray(value))value.forEach(v=>walk(v,key));
 else if(value&&typeof value==='object')Object.entries(value).forEach(([k,v])=>walk(v,k));
}
[LANGUAGE_COURSES,SMM_COURSES,FAQS,SERVICES,GALLERY_IMAGES,TESTIMONIALS].forEach(v=>walk(v));
for(const [key,values]of Object.entries(catalog))assert(values.length===3&&values.every(v=>typeof v==='string'&&v.trim()),key);
console.log(JSON.stringify({entries:Object.keys(catalog).length,missing:[...missing]},null,2));
assert.equal(missing.size,0,'Untranslated display content');
