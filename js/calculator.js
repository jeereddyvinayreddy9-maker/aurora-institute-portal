document.addEventListener('DOMContentLoaded',()=>{
  const keys=document.getElementById('keys'),disp=document.getElementById('calcDisplay');
  let expr='';
  const layout=['7','8','9','/','4','5','6','*','1','2','3','-','C','0','=','+'];
  layout.forEach(k=>{
    const b=document.createElement('button');b.textContent=k;
    if('/*-+'.includes(k))b.className='op';if(k==='=')b.className='eq';
    b.addEventListener('click',()=>press(k));keys.appendChild(b);
  });
  function evaluateExpression(source){
    if(source.startsWith('-'))source='0'+source;
    const tokens=source.match(/\d+(?:\.\d+)?|[+\-*/]/g)||[];
    if(tokens.join('')!==source||tokens.length%2===0)throw new Error('invalid');
    const values=[];let i=0;
    while(i<tokens.length){let n=Number(tokens[i++]);if(!Number.isFinite(n))throw new Error('invalid');while(i<tokens.length&&(tokens[i]==='*'||tokens[i]==='/')){const op=tokens[i++],rhs=Number(tokens[i++]);n=op==='*'?n*rhs:n/rhs;}values.push(n);if(i<tokens.length)values.push(tokens[i++]);}
    let result=values[0];for(let j=1;j<values.length;j+=2)result=values[j]==='+'?result+values[j+1]:result-values[j+1];return result;
  }
  function press(k){
    if(disp.textContent==='Error'){expr='';}
    if(k==='C'){expr='';disp.textContent='0';return}
    if(k==='='){
      if(!/^-?\d+(\.\d+)?([+\-*/]\d+(\.\d+)?)+$/.test(expr)){disp.textContent=expr?'Error':'0';expr='';return}
      try{
        const r=evaluateExpression(expr);
        if(!isFinite(r))throw new Error('div0');
        expr=String(+r.toFixed(8));disp.textContent=expr;
      }catch(e){disp.textContent='Error';expr=''}
      return;
    }
    if('+-*/'.includes(k)&&/[+\-*/]$/.test(expr)&&expr.length>1)expr=expr.slice(0,-1);
    expr+=k;disp.textContent=expr;
  }
});
