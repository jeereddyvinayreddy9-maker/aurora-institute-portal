document.addEventListener('DOMContentLoaded',()=>{
  let p=null,r='student';try{p=JSON.parse(localStorage.getItem('profile'));r=localStorage.getItem('role')||'student'}catch(e){}
  const n=document.getElementById('uName'),i=document.getElementById('uInfo');
  if(r==='parent'){n.textContent='Parent';i.textContent='Parent view: check your ward\'s attendance with the planner below, or use the contact details on this page.';return}
  if(!p)return;
  n.textContent=p.name.split(' ')[0];document.getElementById('stReg').textContent=p.empId;
  i.textContent=`${p.name} · Year ${p.year||1} · Division: ${p.dept} · Course: 25CS208 Web Technology`;
});
