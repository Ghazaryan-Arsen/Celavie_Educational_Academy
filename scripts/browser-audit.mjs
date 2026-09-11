import fs from 'node:fs';
import assert from 'node:assert/strict';
let targets;
for(let attempt=0;attempt<40;attempt++) { try { targets=await (await fetch('http://127.0.0.1:9222/json')).json(); break; } catch { await new Promise(r=>setTimeout(r,250)); } }
assert(targets,'Browser debugging endpoint unavailable');
const ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);
await new Promise(resolve=>ws.addEventListener('open',resolve,{once:true}));
let sequence=0;const pending=new Map();const events=[];
let submissionMode='success',posts=[];
ws.addEventListener('message',async event=>{
 const message=JSON.parse(event.data);
 if(message.id){const entry=pending.get(message.id);pending.delete(message.id);if(message.error)entry.reject(message.error);else entry.resolve(message.result);}
 else {
  events.push(message);
  if(message.method==='Fetch.requestPaused') {
   const {request,requestId}=message.params;
   if(request.method==='POST'){
    posts.push(JSON.parse(request.postData));
    await send('Fetch.fulfillRequest',{requestId,responseCode:submissionMode==='success'?200:500,responseHeaders:[{name:'Access-Control-Allow-Origin',value:'*'},{name:'Content-Type',value:'application/json'}],body:Buffer.from('{}').toString('base64')});
   }else if(request.method==='OPTIONS')await send('Fetch.fulfillRequest',{requestId,responseCode:200,responseHeaders:[{name:'Access-Control-Allow-Origin',value:'*'},{name:'Access-Control-Allow-Methods',value:'POST, OPTIONS'},{name:'Access-Control-Allow-Headers',value:'content-type'}]});
   else await send('Fetch.continueRequest',{requestId});
  }
 }
});
function send(method,params={}) {return new Promise((resolve,reject)=>{const id=++sequence;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});}
async function evaluate(expression){const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw new Error(r.exceptionDetails.text);return r.result.value;}
async function pause(){await new Promise(resolve=>setTimeout(resolve,150));}
async function navigate(path){await send('Page.navigate',{url:'http://127.0.0.1:5173'+path});for(let i=0;i<80;i++){await pause();if(await evaluate("!!document.querySelector('h1') && !!document.querySelector('footer')"))return;}throw new Error('Page did not render: '+path);}
async function language(lang){await evaluate(`localStorage.setItem('celavie.language',${JSON.stringify(lang)})`);await navigate('/');assert.equal(await evaluate('document.documentElement.lang'),lang);}
async function clickText(text){assert(await evaluate(`(()=>{const b=[...document.querySelectorAll('button')].find(b=>b.textContent.trim()===${JSON.stringify(text)} && b.getBoundingClientRect().width);if(!b)return false;b.click();return true})()`),'Missing button '+text);await pause();}
async function fill(label,value,scope='main'){assert(await evaluate(`(()=>{const label=[...document.querySelectorAll(${JSON.stringify(scope+' label')})].find(l=>l.textContent.replace('*','').trim()===${JSON.stringify(label)});const e=label&&document.getElementById(label.htmlFor);if(!e)return false;const proto=e.tagName==='SELECT'?HTMLSelectElement.prototype:e.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(e,${JSON.stringify(value)});e.dispatchEvent(new Event(e.tagName==='SELECT'?'change':'input',{bubbles:true}));return true})()`),'Missing field '+label);await pause();}
await send('Page.enable');await send('Runtime.enable');await send('Fetch.enable',{patterns:[{urlPattern:'*'}]});
const catalog=JSON.parse(fs.readFileSync('src/i18n/catalog.json','utf8'));
const routes=[...fs.readFileSync('public/sitemap.xml','utf8').matchAll(/<loc>https:\/\/[^/]+([^<]+)<\/loc>/g)].map(m=>m[1]);
fs.mkdirSync('.audit',{recursive:true});const findings=[];
await navigate('/');
for(const lang of ['hy','en','ru','fr']){
 await language(lang);
 for(const route of routes){
  await navigate(route);
  const result=await evaluate(`(()=>{const walker=document.createTreeWalker(document.querySelector('main'),NodeFilter.SHOW_TEXT);const texts=[];while(walker.nextNode()){const n=walker.currentNode;if(n.parentElement.closest('script,style'))continue;const v=n.textContent.trim();if(v)texts.push(v);}return {h1:document.querySelectorAll('main h1').length,title:document.title,canonical:document.querySelector('link[rel=canonical]')?.href,texts}})()`);
  assert.equal(result.h1,1,lang+route+' h1');
  assert(result.canonical.endsWith(route),lang+route+' canonical');
  const untranslated=lang==='en'?[]:result.texts.filter(v=>catalog[v]&&catalog[v][{hy:0,ru:1,fr:2}[lang]]!==v);
  if(untranslated.length)findings.push({lang,route,untranslated});
 }
 for(const width of [360,390,430,768,1440]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<500});
  for(const route of ['/','/register','/nice-exchange']) {
   await navigate(route);
   const overflow=await evaluate('document.documentElement.scrollWidth > innerWidth + 1');
   if(overflow)findings.push({lang,route,width,overflow});
  }
 }
 await send('Emulation.setDeviceMetricsOverride',{width:390,height:900,deviceScaleFactor:1,mobile:true});await navigate('/');
 fs.writeFileSync('.audit/home-'+lang+'.png',Buffer.from((await send('Page.captureScreenshot',{format:'png'})).data,'base64'));
}
await language('en');await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
await navigate('/register');
await fill('Program Category','smm');
await fill('Select Course','smm-pro');
await clickText('Continue to Personal Information');
await fill('First Name','Անի');await fill('Last Name','Պետրոսյան');await fill('Email Address','test@example.com');await fill('Phone Number','095123456');await fill('Student Age','22');
// Switch languages through the actual selector without remounting the form.
await evaluate("document.querySelector('button[aria-label=\"Select Language Desktop\"]').click()");await pause();await clickText('🇫🇷Français');
assert.equal(await evaluate('document.documentElement.lang'),'fr');assert(await evaluate("[...document.querySelectorAll('input')].some(e=>e.value==='Անի')"));
await evaluate("document.querySelector('button[aria-label=\"Choisir la langue\"]').click()");await pause();await clickText('🇬🇧English');
await clickText('Continue to Review');await evaluate("document.querySelector('input[type=checkbox]').click()");await pause();
submissionMode='failure';await clickText('Submit Registration');await pause();assert(await evaluate("document.body.textContent.includes('could not be submitted')"));
submissionMode='success';await clickText('Submit Registration');await pause();assert(await evaluate("document.body.textContent.includes('Registration Successful!')"));assert.equal(posts.at(-1).registrationType,'smm');assert.equal(posts.at(-1).data.smmProgram,'smm-pro');
// Category reset preserves the applicant and requires explicit course selection.
await navigate('/register');await fill('Program Category','smm');
assert.equal(await evaluate("document.querySelectorAll('select')[1].options.length"),4);
assert.equal(await evaluate("document.querySelectorAll('select')[1].value"),'');
await fill('Select Course','smm-starter');await clickText('Continue to Personal Information');await fill('First Name','Անի');await clickText('Back');
await fill('Program Category','language');assert.equal(await evaluate("document.querySelectorAll('select')[1].value"),'');assert.equal(await evaluate("document.querySelectorAll('select')[1].options.length"),11);
await fill('Select Course','lang-french');await clickText('Continue to Personal Information');assert(await evaluate("[...document.querySelectorAll('input')].some(e=>e.value==='Անի')"));
await fill('Last Name','Պետրոսյան');await fill('Email Address','test@example.com');await fill('Phone Number','095123456');await fill('Student Age','99');await clickText('Continue to Review');await evaluate("document.querySelector('input[type=checkbox]').click()");await pause();await clickText('Submit Registration');assert.equal(posts.at(-1).registrationType,'language');assert.equal(posts.at(-1).data.language,'French');
// Both Nice experiences: optional essay, dynamic errors, double submission and reset.
for(const route of ['/nice-exchange','/']){
 await navigate(route);const scope=route==='/'?'#nice-register':'main';
 for(const [label,value]of Object.entries({'First Name':'Անի','Last Name':'Պետրոսյան','Age':'11','School / University / Organization':'School','Email Address':'test@example.com','Phone Number':'095123456','Country of Residence':'Armenia','Current French/English Level':'A1','Parent Name':'Parent Name','Parent Phone Number':'091123456'}))await fill(label,value,scope);
 await fill('Motivation Essay (300-500 words, Optional)','short essay',scope);await evaluate(`document.querySelector('${scope} input[type=checkbox]').click()`);await pause();
 await clickText(route==='/'?'Submit Nice Application':'Submit Official Application');assert(await evaluate("document.body.textContent.includes('Current word count: 2')"));
 await fill('Motivation Essay (300-500 words, Optional)','',scope);const before=posts.length;
 await evaluate(`(()=>{const f=document.querySelector('${scope} form');f.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));f.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));})()`);await pause();await pause();
 assert.equal(posts.length,before+1,'Duplicate Nice submission');assert.equal(posts.at(-1).registrationType,'nice');assert.equal(posts.at(-1).data.motivationEssay,'');
 await clickText('Submit Another Application');assert.equal(await evaluate(`document.querySelector('${scope} input').value`),'');
}
// Home course registration reset and applicant retention through category switching.
await navigate('/');await clickText('Foreign Languages10+ Available →');await fill('Select Specific Course Batch','lang-english','#register');await clickText('Continue to Personal Info');
for(const [label,value]of Object.entries({'First Name':'Անի','Last Name':'Պետրոսյան','Age':'22','Email Address':'test@example.com','Phone Number':'095123456'}))await fill(label,value,'#register');
await clickText('Continue to Review');await evaluate("document.querySelector('#register input[type=checkbox]').click()");await pause();await clickText('Submit Registration');assert.equal(posts.at(-1).registrationType,'language');await clickText('Register Another Student');assert.equal(await evaluate("document.querySelector('#register select').value"),'');
await send('Emulation.setDeviceMetricsOverride',{width:360,height:900,deviceScaleFactor:1,mobile:true});await evaluate("document.querySelector('button[aria-label=\"Select Language Mobile\"]').click()");await pause();await clickText('🇷🇺Русский');assert.equal(await evaluate('document.documentElement.lang'),'ru');await navigate('/about');assert.equal(await evaluate('document.documentElement.lang'),'ru');
// First visit and storage-denied startup still render Armenian.
await evaluate("localStorage.removeItem('celavie.language')");await navigate('/');assert.equal(await evaluate('document.documentElement.lang'),'hy');
await send('Page.addScriptToEvaluateOnNewDocument',{source:"Storage.prototype.getItem=function(){throw new Error('storage blocked')};Storage.prototype.setItem=function(){throw new Error('storage blocked')};"});await navigate('/');assert.equal(await evaluate('document.documentElement.lang'),'hy');
await navigate('/not-a-page');assert.equal(await evaluate("document.querySelector('meta[name=robots]').content"),'noindex, follow');
fs.writeFileSync('.audit/browser-results.json',JSON.stringify({routes:routes.length,languages:4,widths:[360,390,430,768,1440],findings,interceptedSubmissions:posts.length,runtimeErrors:events.filter(e=>e.method==='Runtime.exceptionThrown').map(e=>e.params.exceptionDetails.text)},null,2));
console.log(JSON.stringify({routes:routes.length,findings,interceptedSubmissions:posts.length},null,2));ws.close();
