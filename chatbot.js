document.addEventListener('DOMContentLoaded',()=>{
  document.body.insertAdjacentHTML('beforeend',
  `<button id="chatFab" aria-label="Open chat">💬</button>
   <div id="chatPanel"><div class="chat-head">Aurora Assistant</div><div id="chatLog"></div><div id="chips"></div>
   <form id="chatForm"><input id="chatInput" placeholder="Ask something…" autocomplete="off"><button class="btn" type="submit">Send</button></form></div>`);
  const fab=chatFab,panel=chatPanel,log=chatLog,form=chatForm,input=chatInput,chips=document.getElementById('chips');
  const KB=[
    [['hello','hi ','hey'],'Hello! I can help with the college, admissions, parent information and this portal.'],
    [['parent','guardian','ward','safe','security'],'Parents can see safety, hostel, fee and mentoring details in the For Parents section, request a callback, or sign in as a Parent to follow attendance.'],
    [['hostel','mess','accommodation'],'Separate boys’ and girls’ hostels with resident wardens, a hygienic mess and 24×7 security.'],
    [['transport','bus'],'College buses run from major parts of the city. The office shares routes during admission.'],
    [['fee','scholarship'],'Fee details are shared during counselling. Merit and need-based scholarships are available.'],
    [['admission','apply','join','eligib'],'Start with the Register page, or use the callback form in For Parents and our office will guide you.'],
    [['department','course','branch','btech','b.tech','cse','ece','mech','civil','bio'],'Aurora has five departments: CSE, ECE, Mechanical, Civil and Biotechnology. See the Departments tabs on the home page.'],
    [['year','2nd','3rd','4th','second','third','fourth','semester','subject','sgpa','gpa','grade'],'Open the Dashboard and pick Year 1 to 4 and odd or even semester. You will see that semester’s subjects, attendance tracker, year roadmap and an SGPA calculator.'],
    [['placement','job','recruit'],'Placement training starts in the first year, with a sample placement rate of 92%.'],
    [['contact','phone','call','email','address','where','location'],'Aurora Hills, Sample City – 600 000. Phone: 1800 000 0000. Email: info@aurora.example (sample details).'],
    [['about','college','aurora','institute','history'],'Aurora Institute of Technology and Sciences is a sample college with engineering and science programmes, labs, mentors and a green campus.'],
    [['attendance','bunk','planner','75'],'Open the Attendance planner on the Dashboard to see how many classes can be missed or must be attended.'],
    [['register','sign up','signup','account'],'Use the Register page. Each field is checked live and the button unlocks when all are valid.'],
    [['sign in','signin','login','log in'],'Choose Student or Parent, enter your email and a password of 8+ characters. The eye icon shows the password.'],
    [['password'],'A password needs 8+ characters with upper case, lower case, a number and a symbol (@$!%*?&).'],
    [['theme','dark','light','mode'],'Use the moon/sun button in the header. Your choice is remembered.'],
    [['calculator'],'The calculator is on the Dashboard. It shows Error for division by zero.'],
    [['project','web tech','25cs208','portal'],'This portal is a Web Technology (25CS208) micro project built with HTML5, CSS3 Grid/Flexbox and JavaScript.'],
    [['bye','thank'],'You are welcome! Have a great day.']
  ];
  const add=(c,t)=>{const d=document.createElement('div');d.className=c;d.textContent=t;log.appendChild(d);log.scrollTop=log.scrollHeight};
  const ask=q=>{add('user-msg',q);const l=' '+q.toLowerCase()+' ';const hit=KB.find(r=>r[0].some(k=>l.includes(k)));
    setTimeout(()=>add('bot-msg',hit?hit[1]:'I am not sure about that. Try a topic button, or use the callback form in For Parents.'),350)};
  ['About the college','For parents','Hostel','Admissions','Departments','Contact'].forEach(t=>{const b=document.createElement('button');b.type='button';b.textContent=t;b.onclick=()=>ask(t);chips.appendChild(b)});
  add('bot-msg','Hi! Ask me about the college, admissions, parent information or this portal.');
  fab.addEventListener('click',()=>panel.classList.toggle('open'));
  form.addEventListener('submit',e=>{e.preventDefault();const q=input.value.trim();if(q){input.value='';ask(q)}});
});
