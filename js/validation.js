const RULES={
  name:[/^[a-zA-Z\s]{2,50}$/,'Use letters and spaces only (2–50 characters).'],
  empId:[/^[A-Z0-9]{6,12}$/i,'Enter 6–12 letters or digits.'],
  email:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'Enter a valid email, like name@example.com.'],
  mobile:[/^[6-9]\d{9}$/,'Enter 10 digits starting with 6, 7, 8 or 9.'],
  password:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,'Use 8+ characters with upper, lower, number and a symbol (@$!%*?&).'],
  loginpass:[/^.{8,}$/,'Password must be at least 8 characters.']
};
function check(el){
  const r=el.dataset.rule;
  if(r==='year')return{ok:['1','2','3','4'].includes(el.value),msg:'Select your year of study.'};
  if(r==='dept')return{ok:el.value!=='',msg:'Select your division.'};
  if(r==='terms')return{ok:el.checked,msg:'Accept the Terms of Service to continue.'};
  if(r==='confirm')return{ok:el.value!==''&&el.value===document.getElementById('password').value,msg:'Passwords do not match.'};
  return{ok:RULES[r][0].test(el.value),msg:RULES[r][1]};
}
function show(el){
  const{ok,msg}=check(el);
  el.classList.toggle('invalid',!ok);el.classList.toggle('valid',ok);
  el.closest('.field').querySelector('.error-msg').textContent=ok?'':msg;
  return ok;
}
function banner(type,text){const a=document.getElementById('alert');a.className='alert show '+type;a.textContent=text}
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.eye').forEach(b=>b.addEventListener('click',()=>{
    const i=document.getElementById(b.dataset.target);i.type=i.type==='password'?'text':'password';
  }));
  document.querySelectorAll('form').forEach(form=>{
    const fields=[...form.querySelectorAll('[data-rule]')];
    const btn=form.querySelector('button[type=submit]');
    const keep=form.hasAttribute('data-keep');
    const update=()=>{if(!keep)btn.disabled=!fields.every(f=>check(f).ok)};
    fields.forEach(f=>{
      f.addEventListener('blur',()=>{show(f);update()});
      const live=()=>{if(f.classList.contains('invalid')||f.classList.contains('valid'))show(f);
        const c=form.querySelector('[data-rule=confirm]');if(c&&f.id==='password'&&c.value)show(c);update()};
      f.addEventListener('input',live);f.addEventListener('change',live);
    });
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const allOk=fields.map(show).every(Boolean);
      if(!allOk){banner('error','Please fix the highlighted fields and try again.');return}
      if(form.id==='regForm'){try{localStorage.setItem('profile',JSON.stringify({name:fullName.value.trim(),empId:empId.value.toUpperCase(),dept:dept.value,year:year.value}))}catch(x){}}
      const rl=document.getElementById('role');if(rl){try{localStorage.setItem('role',rl.value)}catch(x){}}
      banner('success',form.dataset.msg||'Success! Redirecting…');
      if(!form.dataset.next){form.reset();fields.forEach(f=>f.classList.remove('valid','invalid'));if(!keep)btn.disabled=true;return}
      setTimeout(()=>location.href=form.dataset.next,900);
    });
  });
});
