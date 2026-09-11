import fs from 'node:fs';
import assert from 'node:assert/strict';
import ts from 'typescript';
import { execFileSync } from 'node:child_process';
const source=p=>fs.readFileSync(p,'utf8');
const url=s=>'data:text/javascript;base64,'+Buffer.from(ts.transpileModule(s,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText).toString('base64');
const validationUrl=url(source('src/lib/validation.ts'));
const validation=await import(validationUrl);
const nice=await import(url(source('src/lib/niceExchange.ts').replace("'./validation'",JSON.stringify(validationUrl))));
const registration=await import(url(source('src/lib/registration.ts').replace("'./validation'",JSON.stringify(validationUrl))));
for(const file of ['src/lib/validation.ts','src/lib/niceExchange.ts','src/lib/registration.ts','src/types/registration.ts','src/types/niceExchange.ts'])assert.equal(source(file).replaceAll('\r',''),execFileSync('git',['show','HEAD:'+file],{encoding:'utf8'}).replaceAll('\r',''),file+' changed');
for(const name of ['Անի','Жан-Поль','Éléonore',"O’Connor",'Անի Պետրոսյան'])assert(validation.isValidPersonName(name));
for(const name of ['','123','Ani2','<script>'])assert(!validation.isValidPersonName(name));
for(const age of ['11','99'])assert(validation.isValidAge(age));
for(const age of ['10','100','11.5','abc',''])assert(!validation.isValidAge(age));
for(const phone of ['095123456','+37495123456','(095) 123-456'])assert(validation.isValidPhone(phone));
for(const phone of ['+33600000000','09512345','0951234567','abc'])assert(!validation.isValidPhone(phone));
const form={...nice.createEmptyNiceExchangeForm(),firstName:'Անի',lastName:'Պետրոսյան',age:'11',school:'School',email:'test@example.com',phone:'095123456',country:'Armenia',currentLanguageLevel:'A1',parentName:'Parent Name',parentPhone:'091123456',acceptedTerms:true};
for(const count of [0,299,300,500,501]){const errors=nice.validateNiceExchangeForm({...form,motivationEssay:Array(count).fill('բառ').join(' ')});assert.equal(!!errors.motivationEssay,[299,501].includes(count));}
assert(nice.validateNiceExchangeForm({...form,acceptedTerms:false}).acceptedTerms);
assert(nice.validateNiceExchangeForm({...form,parentName:'2'}).parentName);
assert(nice.validateNiceExchangeForm({...form,currentLanguageLevel:''}).currentLanguageLevel);
const payload=registration.buildRegistrationPayload('nice',form);assert.equal(payload.data.age,11);assert.equal(payload.registrationType,'nice');assert.deepEqual(Object.keys(payload.data).sort(),['firstName','lastName','age','school','email','phone','country','currentLanguageLevel','motivationEssay','parentName','parentPhone','acceptedTerms'].sort());
for(const type of ['smm','language']){const data={fullName:'Անի Պետրոսյան',phone:'095123456',email:'test@example.com',message:'',...(type==='smm'?{smmProgram:'smm-pro'}:{language:'French',level:'All Levels (A1-C2)'})};const result=registration.buildRegistrationPayload(type,data);assert.deepEqual(result.data,data);assert.equal(result.registrationType,type);}
console.log('Registration contracts unchanged; Unicode names, ages, phones, Nice word limits, consent, parent fields and all three payload shapes passed. No network requests made.');
