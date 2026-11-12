/* Four-year programme: journey (index.html) + year dashboard (home.html) */
(function(){
const T7=['Open Elective','Professional Elective II','Internship & Seminar'],T8=['Major Project','Professional Elective III','Ethics & IPR'];
const D={
CSE:{n:'Computer Science & Engineering',x:['Deep Learning','Distributed Systems'],s:[
'Engineering Maths I|Engineering Physics|Programming in C|Web Technology|Communication Skills',
'Engineering Maths II|Engineering Chemistry|Python Programming|Engineering Graphics|Environmental Science',
'Discrete Mathematics|Data Structures|Digital Logic Design|Object Oriented Programming|Computer Architecture',
'Design & Analysis of Algorithms|Database Management Systems|Operating Systems|Probability & Statistics|Software Engineering',
'Computer Networks|Theory of Computation|Machine Learning|Full Stack Development|Professional Elective I',
'Compiler Design|Cloud Computing|Data Mining|Cyber Security|Mini Project']},
ECE:{n:'Electronics & Communication',x:['Wireless Communication','Optical Communication'],s:[
'Engineering Maths I|Engineering Physics|Basic Electrical Engg|Programming in C|Communication Skills',
'Engineering Maths II|Engineering Chemistry|Circuit Theory|Engineering Graphics|Environmental Science',
'Electronic Devices|Signals & Systems|Digital Electronics|Network Analysis|Random Processes',
'Analog Circuits|Linear Integrated Circuits|Electromagnetic Fields|Microcontrollers|Control Systems',
'Digital Signal Processing|Analog Communication|VLSI Design|Transmission Lines|Professional Elective I',
'Digital Communication|Embedded Systems|Antenna & Wave Propagation|IoT Systems|Mini Project']},
MECH:{n:'Mechanical Engineering',x:['Power Plant Engineering','Robotics'],s:[
'Engineering Maths I|Engineering Physics|Basic Electrical Engg|Engineering Graphics|Communication Skills',
'Engineering Maths II|Engineering Chemistry|Engineering Mechanics|Workshop Practice|Environmental Science',
'Thermodynamics|Fluid Mechanics|Strength of Materials|Manufacturing Processes I|Material Science',
'Kinematics of Machinery|Heat Transfer|Manufacturing Processes II|Fluid Machinery|Metrology',
'Dynamics of Machinery|Design of Machine Elements|IC Engines|CAD/CAM|Professional Elective I',
'Refrigeration & AC|Finite Element Analysis|Mechatronics|Industrial Engineering|Mini Project']},
CIVIL:{n:'Civil Engineering',x:['Construction Management','Earthquake Engineering'],s:[
'Engineering Maths I|Engineering Physics|Basic Electrical Engg|Engineering Graphics|Communication Skills',
'Engineering Maths II|Engineering Chemistry|Engineering Mechanics|Workshop Practice|Environmental Science',
'Strength of Materials|Fluid Mechanics|Surveying|Building Materials|Engineering Geology',
'Structural Analysis I|Hydraulics|Concrete Technology|Soil Mechanics|Transportation Engineering',
'Structural Analysis II|Design of RC Structures|Foundation Engineering|Water Supply Engineering|Professional Elective I',
'Design of Steel Structures|Wastewater Engineering|Estimation & Costing|Highway Engineering|Mini Project']},
BIO:{n:'Biotechnology',x:['Pharmaceutical Biotechnology','Bioethics & Biosafety'],s:[
'Engineering Maths I|Engineering Physics|Biology for Engineers|Python Programming|Communication Skills',
'Engineering Maths II|Engineering Chemistry|Biochemistry|Cell Biology|Environmental Science',
'Microbiology|Genetics|Biotech Thermodynamics|Fluid Mechanics|Biostatistics',
'Molecular Biology|Immunology|Bioprocess Principles|Enzyme Technology|Bioinformatics I',
'Genetic Engineering|Mass Transfer|Bioreactor Design|Downstream Processing|Professional Elective I',
'Animal Biotechnology|Plant Biotechnology|Bioinformatics II|Medical Biotechnology|Mini Project']}
};
const Y=[
{t:'Foundation',f:'Maths, science and programming basics, plus learning how to learn at college level.',
 ms:['Attend orientation and meet your faculty mentor','Build a small personal web page','Join one club or sports team','Keep every subject at 75% attendance or above'],
 ev:['Orientation week','Tech fest','Parent–mentor meeting']},
{t:'Core & Skills',f:'Core subjects of your department, with labs that turn theory into working things.',
 ms:['Finish a core-subject mini project','Solve 50 aptitude or coding problems','Apply for a summer internship','Earn one online certification'],
 ev:['Hackathon','Internship fair','Skill-lab certification week']},
{t:'Specialise & Intern',f:'Pick a direction, work in industry and build projects you can show.',
 ms:['Complete an internship','Choose your elective track','Present a project at the tech fest','Attend resume and mock interview workshops'],
 ev:['Industrial visit','Project expo','Placement training kickoff']},
{t:'Launch',f:'Major project, placements and the decision between a job and higher studies.',
 ms:['Finish the major project','Register for campus placement drives','Give the final-year seminar','Plan your first job or higher studies'],
 ev:['Campus placement drives','Major project review','Convocation preparation']}];
const ord=['1st','2nd','3rd','4th'],GP={O:10,'A+':9,A:8,'B+':7,B:6,C:5,F:0};
const $=id=>document.getElementById(id);
const subjects=(d,s)=>s===7?D[d].x.concat(T7):s===8?T8:D[d].s[s-1].split('|');
let S={};try{S=JSON.parse(localStorage.getItem('aurora_v2'))||{}}catch(e){}
['att','ms','gr'].forEach(k=>S[k]=S[k]||{});
const save=()=>{try{localStorage.setItem('aurora_v2',JSON.stringify(S))}catch(e){}};
const fade=el=>{el.classList.remove('fade');void el.offsetWidth;el.classList.add('fade')};

/* ---------- Home: four-year journey ---------- */
const J=$('journey');
if(J){
  J.innerHTML='<div class="rail"><i id="railFill"></i></div><div class="jgrid">'+Y.map((y,i)=>
   `<div class="jc card lift" data-i="${i}"><button type="button" class="jhead" aria-expanded="false" aria-controls="jp${i}"><span class="jnum">${i+1}</span><span><b>${ord[i]} year · ${y.t}</b><small>${y.f}</small></span></button>
    <div class="jpanel" id="jp${i}"><div><ul>${y.ms.map(m=>'<li>'+m+'</li>').join('')}</ul><a class="btn" href="home.html#y${i+1}">Open year ${i+1} dashboard</a></div></div></div>`).join('')+'</div>';
  const cards=[...J.querySelectorAll('.jc')];
  cards.forEach((c,i)=>c.querySelector('.jhead').addEventListener('click',()=>{
    const open=!c.classList.contains('open');
    cards.forEach(x=>{x.classList.remove('open');x.querySelector('.jhead').setAttribute('aria-expanded','false')});
    if(open){c.classList.add('open');c.querySelector('.jhead').setAttribute('aria-expanded','true')}
    $('railFill').style.width=(open?(i+1)*25:0)+'%';
  }));
}

/* ---------- Dashboard: year explorer ---------- */
if(!$('yearCard'))return;
let p=null;try{p=JSON.parse(localStorage.getItem('profile'))}catch(e){}
const map={CSE:'CSE',ECE:'ECE',Mechanical:'MECH',Civil:'CIVIL',Biotechnology:'BIO'};
let y=+(p&&p.year)||1,term='odd',d=(p&&map[p.dept])||'CSE';
const h=location.hash.match(/^#y([1-4])$/);if(h)y=+h[1];
$('deptSel').innerHTML=Object.keys(D).map(k=>`<option value="${k}">${D[k].n}</option>`).join('');
$('deptSel').value=d;

function sem(){return (y-1)*2+(term==='odd'?1:2)}
function renderAll(){
  const s=sem(),key=d+'-'+s,subs=subjects(d,s),Yd=Y[y-1];
  document.querySelectorAll('#yearTabs .tab').forEach(b=>b.classList.toggle('active',+b.dataset.y===y));
  document.querySelectorAll('#termTabs .tab').forEach(b=>b.classList.toggle('active',b.dataset.t===term));
  $('stYear').textContent=ord[y-1];$('stSem').textContent='Year, '+term+' semester';
  $('yearTitle').textContent=`Year ${y} · Semester ${s}: ${Yd.t}`;$('yearDesc').textContent=Yd.f;
  $('events').innerHTML=Yd.ev.map(e=>'<li>'+e+'</li>').join('');
  $('gpaSems').textContent='Semester '+s;
  renderSubjects(key,subs);renderRoadmap();renderGpa(key,subs);
  fade($('yearBody'));
}
function renderSubjects(key,subs,focus){
  const A=S.att[key]||{};let P=0,T=0;
  $('subjList').innerHTML=subs.map((n,i)=>{
    const a=A[i]||[0,0],pc=a[1]?Math.round(a[0]/a[1]*100):null;P+=a[0];T+=a[1];
    const c=pc==null?'':pc>=75?'ok':pc>=65?'warn':'bad';
    return `<div class="subj"><div class="sn">${n}</div><div class="bar"><i class="${c}" style="width:${pc||0}%"></i></div>
    <div class="sp">${pc==null?'–':pc+'%'} <small>${a[0]}/${a[1]}</small></div>
    <div class="sb"><button type="button" data-a="p" data-i="${i}" aria-label="Mark present in ${n}">✔</button><button type="button" data-a="a" data-i="${i}" aria-label="Mark absent in ${n}">✖</button></div></div>`}).join('');
  $('stAtt').textContent=T?Math.round(P/T*100)+'%':'–';
  $('overall').textContent=T?`Overall ${Math.round(P/T*100)}% (${P}/${T} classes)`:'Tap ✔ or ✖ after each class to track attendance.';
  if(focus){const b=document.querySelector(`#subjList [data-a="${focus[0]}"][data-i="${focus[1]}"]`);if(b)b.focus()}
}
function renderRoadmap(){
  const Yd=Y[y-1],M=S.ms[y]||[];const done=Yd.ms.filter((_,i)=>M[i]).length;
  $('msList').innerHTML=Yd.ms.map((m,i)=>`<li><label><input type="checkbox" data-m="${i}" ${M[i]?'checked':''}>${m}</label></li>`).join('');
  $('msBar').style.width=done/Yd.ms.length*100+'%';
  $('msText').textContent=done===Yd.ms.length?`🎉 Year ${y} complete. Well done!`:`${done} of ${Yd.ms.length} milestones done`;
}
function renderGpa(key,subs){
  const G=S.gr[key]||{};
  $('gpaList').innerHTML=subs.map((n,i)=>`<div class="grow"><label for="g${i}">${n}</label><select id="g${i}" data-g="${i}"><option value="">Grade</option>${Object.keys(GP).map(g=>`<option ${G[i]===g?'selected':''}>${g}</option>`).join('')}</select></div>`).join('');
  calcGpa(subs,G);
}
function calcGpa(subs,G){
  let pts=0,cr=0;subs.forEach((n,i)=>{if(G[i]){const c=/Project|Maths/.test(n)?4:3;pts+=GP[G[i]]*c;cr+=c}});
  const v=cr?(pts/cr).toFixed(2):null;
  $('sgpa').textContent=v||'–';
  $('gpaMsg').textContent=!v?'Pick a grade for each subject to see your SGPA (O=10, A+=9, A=8, B+=7, B=6, C=5, F=0).':v>=8.5?'Excellent. Keep it up!':v>=7?'Good progress.':v>=5?'You are passing. Aim a little higher next time.':'Talk to your mentor for support.';
}

/* events */
$('yearTabs').addEventListener('click',e=>{const b=e.target.closest('[data-y]');if(!b)return;y=+b.dataset.y;history.replaceState(null,'','#y'+y);renderAll()});
$('termTabs').addEventListener('click',e=>{const b=e.target.closest('[data-t]');if(!b)return;term=b.dataset.t;renderAll()});
$('deptSel').addEventListener('change',e=>{d=e.target.value;renderAll()});
$('subjList').addEventListener('click',e=>{
  const b=e.target.closest('[data-a]');if(!b)return;
  const s=sem(),key=d+'-'+s,i=+b.dataset.i,A=S.att[key]=S.att[key]||{},a=A[i]=A[i]||[0,0];
  if(b.dataset.a==='p')a[0]++;a[1]++;save();renderSubjects(key,subjects(d,s),[b.dataset.a,i]);
});
$('resetAtt').addEventListener('click',()=>{const s=sem(),key=d+'-'+s;delete S.att[key];save();renderSubjects(key,subjects(d,s))});
$('msList').addEventListener('change',e=>{const c=e.target.closest('[data-m]');if(!c)return;(S.ms[y]=S.ms[y]||[])[+c.dataset.m]=c.checked;save();renderRoadmap()});
$('gpaList').addEventListener('change',e=>{
  const g=e.target.closest('[data-g]');if(!g)return;const s=sem(),key=d+'-'+s,G=S.gr[key]=S.gr[key]||{};
  if(g.value)G[g.dataset.g]=g.value;else delete G[g.dataset.g];save();calcGpa(subjects(d,s),G);
});
window.addEventListener('hashchange',()=>{const m=location.hash.match(/^#y([1-4])$/);if(m){y=+m[1];renderAll()}});
renderAll();
})();
