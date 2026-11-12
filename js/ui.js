document.addEventListener('DOMContentLoaded',()=>{
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);
    const el=e.target,to=+el.dataset.count,suf=el.dataset.suffix||'';let n=0;const step=Math.max(1,Math.ceil(to/60));
    const t=setInterval(()=>{n=Math.min(to,n+step);el.textContent=n+suf;if(n>=to)clearInterval(t)},25)}));
  document.querySelectorAll('[data-count]').forEach(el=>io.observe(el));
  document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('.tab,.panel').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');document.getElementById(b.dataset.tab).classList.add('active')}));
  const slides=[...document.querySelectorAll('.slide')],dots=document.querySelector('.dots');let k=0,timer;
  if(slides.length){
    const go=i=>{k=i;slides.forEach((s,j)=>s.classList.toggle('active',j===i));[...dots.children].forEach((d,j)=>d.classList.toggle('active',j===i))};
    slides.forEach((_,i)=>{const d=document.createElement('button');d.setAttribute('aria-label','Show testimonial '+(i+1));d.onclick=()=>{go(i);start()};dots.appendChild(d)});
    const start=()=>{clearInterval(timer);timer=setInterval(()=>go((k+1)%slides.length),5000)};go(0);start();
  }
});
