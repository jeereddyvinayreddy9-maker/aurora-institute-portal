/* FR-09: Attendance Safe-Bunk Planner */
document.addEventListener('DOMContentLoaded',()=>{
  const form=document.getElementById('plannerForm'),out=document.getElementById('plannerResult');
  const show=(cls,html)=>{out.className='alert show '+cls;out.innerHTML=html};
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const a=Number(attended.value),t=Number(total.value),g=Number(target.value);
    if(![a,t,g].every(Number.isInteger)||a<0||t<1||g<1||g>99)return show('error','Enter whole numbers: total of 1 or more, target between 1 and 99.');
    if(a>t)return show('error','Classes attended cannot be more than total classes held.');
    const r=g/100,pct=(a/t*100).toFixed(1);
    const st=document.getElementById('stAtt');if(st)st.textContent=pct+'%';
    if(a/t>=r){
      const safe=Math.floor(a/r-t+1e-9);
      show(safe>0?'success':'warning',`<b>${pct}%</b>: you are above ${g}%. You can miss <b>${safe}</b> more class${safe===1?'':'es'} in a row and stay at or above ${g}%.`+(safe===0?' You are right on the edge, so do not skip the next class.':''));
    }else{
      const need=Math.ceil((r*t-a)/(1-r)-1e-9);
      show('error',`<b>${pct}%</b>: you are below ${g}%. Attend the next <b>${need}</b> class${need===1?'':'es'} in a row to reach ${g}%.`);
    }
  });
});
