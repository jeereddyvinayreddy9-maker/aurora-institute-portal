(function(){
  const root=document.documentElement;
  let t='light';try{t=localStorage.getItem('theme')||'light'}catch(e){}
  root.setAttribute('data-theme',t);
  document.addEventListener('DOMContentLoaded',()=>{
    const btn=document.getElementById('themeToggle');
    const set=v=>{root.setAttribute('data-theme',v);btn.textContent=v==='dark'?'☀️':'🌙';try{localStorage.setItem('theme',v)}catch(e){}};
    if(btn)btn.textContent=t==='dark'?'☀️':'🌙';
    if(btn)btn.addEventListener('click',()=>set(root.getAttribute('data-theme')==='dark'?'light':'dark'));
    const mb=document.getElementById('menuBtn'),menu=document.getElementById('menu');
    if(mb&&menu)mb.addEventListener('click',()=>{const open=menu.classList.toggle('open');mb.setAttribute('aria-expanded',String(open));});
  });
})();
