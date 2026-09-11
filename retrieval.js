/* Extractive retrieval: responses contain only pre-indexed source passages. No model or network search. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.PortfolioRetrieval=factory();})(typeof window!=='undefined'?window:this,function(){
 'use strict';
 const STOP=new Set('a an the this that these those is are was were be been being do does did has have had how what when where why who which whom whose can could would should will shall may might please tell show find give about for from of in on at to and or with without by as it its i me my you your he him his she they them their we us our any all some information info know knows known much more most also than into through adam silva portfolio resume résumé cv profile work worked working experience experiences professional career history list using use used get want need built build building developed developing designed implemented examples example'.split(' '));
 const synonyms={rag:'rag',retrieval:'rag',retrievalaugmented:'rag',hallucination:'hallucination',hallucinations:'hallucination',llms:'llm',chatbots:'chatbot',agents:'agent',agentic:'agent',years:'year',companies:'company',employers:'company',employer:'company',jobs:'job',technologies:'technology',tools:'tool',frameworks:'framework',certifications:'certification',certificates:'certification',credentials:'certification',certified:'certification',qualifications:'education',degrees:'education',degree:'education',college:'education',university:'education',schools:'education',school:'education',studied:'education',studies:'education',study:'education',languages:'language',idiomas:'language',speak:'language',speaks:'language',fluency:'language',fluent:'language',portuguese:'portuguese',portugues:'portuguese',ingles:'english',espanhol:'spanish',espanol:'spanish',based:'location',located:'location',live:'location',lives:'location',reside:'location',email:'email',contact:'contact',phone:'phone',telephone:'phone',telefone:'phone',mobile:'phone',number:'number',authorization:'authorization',authorisation:'authorization',authorized:'authorization',authorised:'authorization',sponsorship:'authorization',visa:'authorization',education:'education',graduation:'education',schooling:'education',inference:'inference',latency:'latency',performance:'performance',reliability:'uptime',availability:'uptime',uptime:'uptime',memory:'vram',gpu:'gpu',vram:'vram',fine:'fine',finetuning:'finetuning',skills:'skill',skillset:'skill',stack:'stack',years:'year',student:'student',students:'student',projects:'project',products:'product',automation:'automation',automations:'automation'};
 const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/c\+\+/g,'cpp').replace(/c#/g,'csharp').replace(/next\.js/g,'nextjs').replace(/node\.js/g,'nodejs').replace(/fast\s*api/g,'fastapi').replace(/hugging\s*face/g,'huggingface').replace(/scikit[-\s]learn/g,'scikitlearn');
 function tokenize(s){return normalize(s).split(/[^a-z0-9]+/).filter(t=>t.length>1&&!STOP.has(t)).map(t=>synonyms[t]||t);}
 const unique=arr=>[...new Set(arr)];
 function create(records){
  const docs=records.map(record=>{const tokens=tokenize(record.title+' '+record.text+' '+record.keywords),freq=new Map();tokens.forEach(t=>freq.set(t,(freq.get(t)||0)+1));return {record,tokens,freq,title:new Set(tokenize(record.title))};});
  const df=new Map();docs.forEach(d=>unique(d.tokens).forEach(t=>df.set(t,(df.get(t)||0)+1)));
  const avg=docs.reduce((n,d)=>n+d.tokens.length,0)/Math.max(1,docs.length);
  const companies=['estudar ti','city council','santo andre','3xceler','freelancer','f5 themes','promobit','pennacorp'];
  function search(query){
   const q=normalize(String(query).slice(0,400)),terms=unique(tokenize(q));
   if(/\bgpa\b/.test(q)){const wantsMaster=/master|\bms\b/.test(q),wantsBachelor=/bachelor|\bbs\b/.test(q);const ids=wantsMaster&&!wantsBachelor?['education-ms']:wantsBachelor&&!wantsMaster?['education-bs']:['education-ms','education-bs'];return {status:'found',results:records.filter(r=>ids.includes(r.id)),message:'The GPAs listed in the portfolio are:'};}
   const no=()=>({status:'not-found',results:[],message:'I couldn’t find that in Adam’s portfolio or résumé. I can help with his projects, experience, skills, education, or contact information.'});
   if(!q.trim())return no();
   const company=companies.find(c=>q.includes(c));
   const projectName=['ai shopping assistant','upskill','lumina','nexus','mlops','youtube','wp comment'].find(name=>q.includes(name));
   if(/\b(first|earliest) (job|role|position)\b/.test(q))return {status:'found',results:records.filter(r=>r.id==='role-pennacorp'),message:'The earliest role listed in the résumé is:'};
   let category=null;
   if(!company&&!projectName){
    if(/\b(education|degree|degrees|studied|study|university|college|school|diploma)\b/.test(q))category='education';
    else if(/\b(certification|certifications|certificates|certified|credentials|toefl)\b/.test(q))category='certification';
    else if(/\b(speak|speaks|spoken|fluent|fluency|idiomas|portuguese|spanish|english)\b/.test(q)||(/\blanguages\b/.test(q)&&!/programming/.test(q)))category='languages';
    else if(/\b(cpt|authorization|authorisation|visa|sponsorship)\b/.test(q))category='authorization';
    else if(/\b(years|background|biography|introduce)\b/.test(q)||/^who is (adam|he)/.test(q))category='overview';
    else if(/\b(work history|career history|employment|employers|companies|previous roles|past roles|job history)\b/.test(q)||(!terms.length&&/experience|career|worked/.test(q)))category='career';
    else if(/\b(tech stack|skills|technologies|toolkit|programming languages)\b/.test(q))category='skills';
    else if(terms.includes('project')&&terms.every(t=>['project','built','build','developed','featured','selected'].includes(t)))category='project';
   }
   if(category){
    const matches=records.filter(r=>r.category===category);
    if(matches.length)return {status:'found',results:matches.slice(0,category==='career'?7:category==='project'?7:4),message:'Here’s what the sources say:'};
   }
   if(!terms.length)return no();
   let candidates=docs;
   if(company)candidates=docs.filter(d=>normalize(d.record.title).includes(company));
   else if(projectName)candidates=docs.filter(d=>normalize(d.record.title).includes(projectName));
   else if(terms.includes('project'))candidates=docs.filter(d=>d.record.category==='project');
   const focusTerms=terms.filter(t=>!['project','technology','stack','tool','framework','skill','year','job','company'].includes(t));
   if(focusTerms.length)candidates=candidates.filter(d=>focusTerms.some(t=>d.freq.has(t)));
   const timeQuestion=/\b(when|dates|date|long|duration|until|start|started|end|ended)\b/.test(q);
   const scored=candidates.map(d=>{
    let score=0,hits=0;
    for(const term of terms){const tf=d.freq.get(term)||0;if(!tf)continue;hits++;const idf=Math.log(1+(docs.length-(df.get(term)||0)+.5)/((df.get(term)||0)+.5));score+=idf*(tf*2.2)/(tf+1.2*(.25+.75*d.tokens.length/avg));if(d.title.has(term))score+=1.8;}
    if(company&&timeQuestion&&d.record.category==='career')score+=25;
    return {record:d.record,score,hits};
   }).filter(d=>d.hits>0).sort((a,b)=>b.score-a.score);
   if(!scored.length)return no();
   const minimum=Math.max(1.2,scored[0].score*.48);
   const results=scored.filter(d=>d.score>=minimum).slice(0,company&&timeQuestion?1:3).map(d=>d.record);
   return results.length?{status:'found',results,message:'Relevant passages from the sources:'}:no();
  }
  return {search};
 }
 return {create,tokenize};
});
