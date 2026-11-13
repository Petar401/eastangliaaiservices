/* East Anglia AI Services — homepage scripts (moved out of index.html so browsers can cache them).
 * Loaded as a classic, non-module script at the end of <body>, so the functions
 * referenced by inline onclick="" handlers stay global and the DOM is already parsed. */
// CURSOR
const cur=document.getElementById('cursor'),rng=document.getElementById('cursorRing');
if(cur){let mx=0,my=0,rx=0,ry=0;document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx-5+'px';cur.style.top=my-5+'px';});(function ar(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;if(rng){rng.style.left=rx-18+'px';rng.style.top=ry-18+'px';}requestAnimationFrame(ar);})();document.querySelectorAll('a,button,.service-card,.demo-tab,.chip').forEach(el=>{el.addEventListener('mouseenter',()=>{cur.style.transform='scale(2.2)';if(rng)rng.style.transform='scale(1.4)';});el.addEventListener('mouseleave',()=>{cur.style.transform='scale(1)';if(rng)rng.style.transform='scale(1)';});});}

// HAMBURGER
function toggleMenu(){document.getElementById('hamburger').classList.toggle('open');document.getElementById('mobileNav').classList.toggle('open');document.body.style.overflow=document.getElementById('mobileNav').classList.contains('open')?'hidden':'';}

// THREE.JS — loaded on demand. Phones, Save-Data connections and reduced-motion
// visitors never download the ~600 KB library; they get the static CSS backdrop.
function wants3D(){var c=navigator.connection;return window.innerWidth>=680&&!(c&&c.saveData)&&!document.documentElement.classList.contains('reduce-motion');}
var threeState=0;
function loadThree(){if(threeState)return;threeState=1;var s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';s.integrity='sha384-CI3ELBVUz9XQO+97x6nwMDPosPR5XvsxW2ua7N1Xeygeh1IxtgqtCkGfQY9WWdHu';s.crossOrigin='anonymous';s.onload=function(){document.documentElement.classList.remove('no-3d');initHeroScene();};s.onerror=function(){threeState=0;};document.head.appendChild(s);}
// Placeholder until initHeroScene() installs the real start/stop handlers
// (the accessibility panel calls this when motion is switched back on).
window.__heroStart=function(){if(wants3D())loadThree();};
if(!wants3D())document.documentElement.classList.add('no-3d');
function bootThree(){if(!wants3D())return;(window.requestIdleCallback||function(f){setTimeout(f,200);})(loadThree);}
if(document.readyState==='complete'){bootThree();}else{window.addEventListener('load',bootThree);}
function initHeroScene(){
if(typeof THREE==='undefined')return;
const cv=document.getElementById('hero-canvas');
let ren;try{ren=new THREE.WebGLRenderer({canvas:cv,antialias:false,alpha:true});}catch(e){cv.style.display='none';return;}
ren.setPixelRatio(Math.min(window.devicePixelRatio,2));
const ww=window.innerWidth,wh=window.innerHeight;
ren.setSize(ww,wh);
const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(60,ww/wh,.1,1000);
cam.position.set(0,0,18);
const mob=ww<680;
const PC=mob?600:2200,pp=new Float32Array(PC*3),pc=new Float32Array(PC*3);
const N1=new THREE.Color(0x00ffe7),N2=new THREE.Color(0xbf00ff);
for(let i=0;i<PC;i++){pp[i*3]=(Math.random()-.5)*80;pp[i*3+1]=(Math.random()-.5)*60;pp[i*3+2]=(Math.random()-.5)*40;const c=Math.random()>.6?N1:N2;pc[i*3]=c.r;pc[i*3+1]=c.g;pc[i*3+2]=c.b;}
const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pp,3));pg.setAttribute('color',new THREE.BufferAttribute(pc,3));
const pts=new THREE.Points(pg,new THREE.PointsMaterial({size:.08,vertexColors:true,transparent:true,opacity:.6}));sc.add(pts);
const FRAME_MS=32;
if(!mob){
  const ng=new THREE.Group(),np=[];
  for(let i=0;i<22;i++){const phi=Math.acos(-1+(2*i)/22);const th=Math.sqrt(22*Math.PI)*phi;const r=5+Math.random()*3;const x=r*Math.sin(phi)*Math.cos(th);const y=r*Math.sin(phi)*Math.sin(th);const z=r*Math.cos(phi);np.push(new THREE.Vector3(x,y,z));const m=new THREE.Mesh(new THREE.SphereGeometry(.06+Math.random()*.07,8,8),new THREE.MeshBasicMaterial({color:Math.random()>.5?0x00ffe7:0xbf00ff}));m.position.set(x,y,z);ng.add(m);}
  const lm=new THREE.LineBasicMaterial({color:0x00ffe7,transparent:true,opacity:.09});
  for(let i=0;i<np.length;i++)for(let j=i+1;j<np.length;j++){if(np[i].distanceTo(np[j])<5.5){ng.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([np[i],np[j]]),lm));}}
  ng.position.set(5,0,-5);sc.add(ng);
  const tor=new THREE.Mesh(new THREE.TorusGeometry(7,.015,8,100),new THREE.MeshBasicMaterial({color:0x00ffe7,transparent:true,opacity:.12}));tor.rotation.x=Math.PI/4;tor.position.set(4,0,-8);sc.add(tor);
  const ic=new THREE.Mesh(new THREE.IcosahedronGeometry(2.5,1),new THREE.MeshBasicMaterial({color:0x00ffe7,wireframe:true,transparent:true,opacity:.07}));ic.position.set(-8,3,-4);sc.add(ic);
  let mx3=0,my3=0;window.addEventListener('mousemove',e=>{mx3=(e.clientX/window.innerWidth-.5)*2;my3=-(e.clientY/window.innerHeight-.5)*2;});
  let t3=0,heroRAF=null,heroPlaying=false,lastT=0;
  function an(now){heroRAF=requestAnimationFrame(an);if(now-lastT<FRAME_MS)return;lastT=now;t3+=.005;pts.rotation.y+=.0004;ng.rotation.y=t3*.2+mx3*.1;ng.rotation.x=Math.sin(t3*.3)*.2+my3*.05;tor.rotation.z=t3*.15;ic.rotation.y=t3*.4;ic.rotation.x=t3*.2;cam.position.x+=(mx3*1.5-cam.position.x)*.03;cam.position.y+=(my3-cam.position.y)*.03;cam.lookAt(sc.position);ren.render(sc,cam);}
  window.__heroStart=function(){if(heroPlaying||document.documentElement.classList.contains('reduce-motion'))return;heroPlaying=true;heroRAF=requestAnimationFrame(an);};
  window.__heroStop=function(){heroPlaying=false;if(heroRAF)cancelAnimationFrame(heroRAF);};
  window.__heroStart();
}else{let t3=0,heroRAF=null,heroPlaying=false,lastT=0;function an(now){heroRAF=requestAnimationFrame(an);if(now-lastT<FRAME_MS)return;lastT=now;t3+=.003;pts.rotation.y+=.0003;cam.lookAt(sc.position);ren.render(sc,cam);}window.__heroStart=function(){if(heroPlaying||document.documentElement.classList.contains('reduce-motion'))return;heroPlaying=true;heroRAF=requestAnimationFrame(an);};window.__heroStop=function(){heroPlaying=false;if(heroRAF)cancelAnimationFrame(heroRAF);};window.__heroStart();}
document.addEventListener('visibilitychange',()=>{if(document.hidden){if(window.__heroStop)window.__heroStop();}else{if(window.__heroStart)window.__heroStart();}});
window.addEventListener('resize',()=>{const rw=window.innerWidth,rh=window.innerHeight;cam.aspect=rw/rh;cam.updateProjectionMatrix();ren.setSize(rw,rh);});
}

// HEX GRID
const hg=document.getElementById('hexGrid'),he=['🤖','⚡','🧠','🔮','💡','🛡️','🔗','📊','🌐'];
for(let i=0;i<20;i++){const h=document.createElement('div');h.className='hex'+(Math.random()>.6?' active':'');h.style.setProperty('--delay',(2+Math.random()*4)+'s');h.style.animationDelay=Math.random()*3+'s';if(Math.random()>.5)h.textContent=he[Math.floor(Math.random()*he.length)];hg.appendChild(h);}
// Pulse a few random hexes; paused while the tab is hidden or reduced motion is on.
let hexTimer=null;
function hexTick(){const hexes=hg.querySelectorAll('.hex');hexes.forEach(h=>h.classList.remove('active'));for(let i=0;i<5;i++)hexes[Math.floor(Math.random()*hexes.length)].classList.add('active');}
window.__hexStop=function(){if(hexTimer){clearInterval(hexTimer);hexTimer=null;}};
window.__hexStart=function(){if(hexTimer||document.hidden||document.documentElement.classList.contains('reduce-motion'))return;hexTimer=setInterval(hexTick,1200);};
document.addEventListener('visibilitychange',()=>{if(document.hidden)window.__hexStop();else window.__hexStart();});
window.__hexStart();

// SCROLL REVEAL
const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// DEMO TABS
function switchDemo(i,btn){document.querySelectorAll('.demo-tab').forEach(t=>t.classList.remove('active'));document.querySelectorAll('.demo-panel').forEach(p=>p.classList.remove('active'));if(btn)btn.classList.add('active');else{const tabs=document.querySelectorAll('.demo-tab');if(tabs[i])tabs[i].classList.add('active');}document.getElementById('demo-'+i).classList.add('active');if(i===0)runLeadDemo();if(i===1)runInvoiceDemo();if(i===2)runSupportDemo();if(i===3)runForecastDemo();if(i===4)runPipelineDemo();if(i===5)runOpsDemo();}
function goToDemo(i){switchDemo(i,null);const el=document.getElementById('demos');if(el)el.scrollIntoView({behavior:'smooth',block:'start'});}

// LEAD DEMO
function runLeadDemo(){const steps=document.querySelectorAll('#flow0 .flow-step');steps.forEach(s=>{s.classList.remove('active','done');s.querySelector('.fs-status').textContent='⏳';});steps[0].classList.add('active');steps[0].querySelector('.fs-status').textContent='🟢';steps.forEach((s,i)=>{if(i===0)return;setTimeout(()=>{steps[i-1].classList.remove('active');steps[i-1].classList.add('done');steps[i-1].querySelector('.fs-status').textContent='✅';steps[i].classList.add('active');steps[i].querySelector('.fs-status').textContent='🟢';if(i===steps.length-1){setTimeout(()=>{steps[i].classList.remove('active');steps[i].classList.add('done');steps[i].querySelector('.fs-status').textContent='✅';},1100);}},i*1200);});}
runLeadDemo();

// INVOICE DEMO
function runInvoiceDemo(){const bar=document.getElementById('invBar');const bs=document.querySelectorAll('#demo-1 .inv-badge');bs.forEach(b=>{b.className='inv-badge pending';b.textContent='SCANNING...';});bar.style.width='0';setTimeout(()=>{bar.style.width='100%';},80);const lbls=['EXTRACTED','EXTRACTED','EXTRACTED','EXTRACTED','EXTRACTED','APPROVED','CLEAR','PENDING'];const cls=['extracted','extracted','extracted','extracted','extracted','approved','approved','pending'];bs.forEach((b,i)=>{setTimeout(()=>{b.className='inv-badge '+cls[i];b.textContent=lbls[i];},500+(i*320));});setTimeout(()=>{bs[7].className='inv-badge approved';bs[7].textContent='POSTED ✓';},500+7*320+700);}

// SUPPORT DEMO
const conv=[{r:'user',t:"Hi, I placed an order 3 days ago and it still hasn't arrived. Order #4892."},{r:'bot',t:"Hi there! I can see order #4892 placed on 9th May. It's currently with DPD — estimated delivery is today by 6pm. Tracking ref: DPD1234567. Would you like me to send you the tracking link?"},{r:'user',t:"Yes please, and can I change the delivery address?"},{r:'bot',t:"I've sent the DPD tracking link to your email! Regarding the address change — your order is already out for delivery today so I'm unable to reroute it. DPD will attempt redelivery tomorrow if missed. Shall I set a redelivery preference now?"},{r:'user',t:"Yes please, that would be great."},{r:'bot',t:"Done! I've set preferred redelivery for tomorrow 9am–1pm. You'll get a confirmation text from DPD shortly. Is there anything else I can help with? 😊"}];
function runSupportDemo(){const c=document.getElementById('suppChat');c.innerHTML='';conv.forEach((msg,i)=>{setTimeout(()=>{if(msg.r==='bot'){const ty=document.createElement('div');ty.className='sm bot';ty.id='cd-ty';ty.innerHTML='<div class="sm-av">🤖</div><div class="sm-bub"><div class="typi"><span></span><span></span><span></span></div></div>';c.appendChild(ty);c.scrollTop=c.scrollHeight;setTimeout(()=>{document.getElementById('cd-ty')?.remove();const d=document.createElement('div');d.className='sm bot';d.innerHTML=`<div class="sm-av">🤖</div><div class="sm-bub">${msg.t}</div>`;c.appendChild(d);c.scrollTop=c.scrollHeight;},850);}else{const d=document.createElement('div');d.className='sm user';d.innerHTML=`<div class="sm-bub">${msg.t}</div><div class="sm-av">👤</div>`;c.appendChild(d);c.scrollTop=c.scrollHeight;}},i*2000);});}

function runForecastDemo(){const chart=document.getElementById('fcChart');if(!chart)return;const days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun','Mon','Tue','Wed','Thu','Fri','Sat','Sun'];const vals=[42,55,48,61,72,88,79,null,null,null,null,null,null,null];const preds=[null,null,null,null,null,null,null,52,64,58,71,84,96,90];const alertIdx=12;chart.innerHTML='';days.forEach((d,i)=>{const bar=document.createElement('div');const isPred=preds[i]!==null;const isAlert=i===alertIdx;bar.className='fc-bar'+(isAlert?' alert':isPred?' pred':'');bar.style.height='0';const lbl=document.createElement('span');lbl.className='fc-label';lbl.textContent=d;bar.appendChild(lbl);chart.appendChild(bar);const v=isPred?preds[i]:vals[i];setTimeout(()=>{bar.style.height=(v*1.1)+'px';},100+i*70);});const fcRows=document.getElementById('fcRows');if(fcRows){const rev=(38000+Math.floor(Math.random()*8000)).toLocaleString();const ci=(5+Math.random()*3).toFixed(1);fcRows.children[0].querySelector('.fc-val').textContent='£'+rev;fcRows.children[1].querySelector('.fc-val').textContent='±'+ci+'%';}}

function runPipelineDemo(){const stages=document.querySelectorAll('#pipeStages .pipe-stage');if(!stages.length)return;stages.forEach(s=>s.classList.remove('active'));stages.forEach((s,i)=>{setTimeout(()=>{stages.forEach(x=>x.classList.remove('active'));s.classList.add('active');if(i===stages.length-1)setTimeout(()=>s.classList.remove('active'),900);},i*700);});const ev=document.getElementById('pipeEv');const lat=document.getElementById('pipeLat');const err=document.getElementById('pipeErr');if(ev)ev.textContent=(12000+Math.floor(Math.random()*1500)).toLocaleString();if(lat)lat.textContent=(2+Math.random()*1.4).toFixed(1)+'s';if(err)err.textContent=(0.01+Math.random()*0.04).toFixed(2)+'%';}

function runOpsDemo(){const rows=document.querySelectorAll('#opsRows .ops-row');if(!rows.length)return;rows.forEach(r=>{const bar=r.querySelector('.ops-meter b');if(!bar)return;const w=bar.style.width;bar.style.width='0';setTimeout(()=>{bar.style.width=w;},120);});const h=document.getElementById('opsHealth');const c=document.getElementById('opsCost');const rt=document.getElementById('opsRetrain');if(h)h.textContent=(82+Math.floor(Math.random()*8))+'%';if(c)c.textContent='£'+(0.009+Math.random()*0.006).toFixed(3);if(rt)rt.textContent=String(1+Math.floor(Math.random()*3));}

// Keyboard accessibility — let Enter/Space trigger the service-card click
document.querySelectorAll('.service-card[onclick]').forEach(card=>{card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();card.click();}});});

// MODALS

// COOKIE CONSENT — banner + GA gate live in /assets/consent.js (window.EAAISConsent)

// CHATBOT
let chatOpen=false,chatStarted=false,loading=false;
showChatUI();
function openChat(){if(!chatOpen)toggleChat();}
function toggleChat(){chatOpen=!chatOpen;const tg=document.getElementById('chat-toggle');tg.classList.toggle('open',chatOpen);tg.setAttribute('aria-expanded',chatOpen?'true':'false');tg.setAttribute('aria-label',chatOpen?'Close AI chat assistant':'Open AI chat assistant');document.getElementById('chat-window').classList.toggle('open',chatOpen);if(chatOpen){document.getElementById('chatNotif').style.display='none';if(!chatStarted)greet();}}
function showChatUI(){document.getElementById('chatMsgs').classList.add('active');document.getElementById('chatChips').classList.add('active');document.getElementById('chatInputRow').classList.add('active');}
function greet(){addMsg('ai',"Hi! I'm **ARIA**, your East Anglia AI Services assistant 🤖\n\nI can answer questions about our services, pricing, and how AI automation could benefit your business. How can I help?");}
function addMsg(role,text){const c=document.getElementById('chatMsgs');const d=document.createElement('div');d.className='cmsg '+(role==='ai'?'ai':'user');const av=document.createElement('div');av.className='cmsg-av';av.textContent=role==='ai'?'🤖':'👤';const b=document.createElement('div');b.className='cmsg-bub';const safe=role==='ai'?text:String(text).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));b.innerHTML=safe.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>');d.appendChild(av);d.appendChild(b);c.appendChild(d);c.scrollTop=c.scrollHeight;chatStarted=true;}
function showTyping(){const c=document.getElementById('chatMsgs');const d=document.createElement('div');d.className='cmsg ai';d.id='ty-msg';d.innerHTML='<div class="cmsg-av" style="background:rgba(0,255,231,.07);border:1px solid rgba(0,255,231,.17);clip-path:polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)">🤖</div><div class="cmsg-bub" style="background:rgba(0,255,231,.04);border:1px solid rgba(0,255,231,.1)"><div class="typing-ind"><span></span><span></span><span></span></div></div>';c.appendChild(d);c.scrollTop=c.scrollHeight;}
function removeTyping(){document.getElementById('ty-msg')?.remove();}
function sendChip(el){document.getElementById('chat-input').value=el.textContent;document.getElementById('chatChips').style.display='none';sendMsg();}
function autoResize(el){el.style.height='auto';el.style.height=el.scrollHeight+'px';}
function handleKey(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMsg();}}
const replyRules=[
  {p:['training','train','trained','workshop','workshops','course','courses','upskill','upskilling','teach','teaching'],r:"Yes, we offer **AI Training for Businesses** 🎓\n\n• **Hands-on team workshops** on everyday tools like ChatGPT, Claude and Copilot\n• **Leadership briefings** for owners and managers\n• **Role-specific sessions** built around your team's real tasks\n\nWe deliver on-site across Norfolk, Suffolk, Cambridgeshire and Essex, or remotely UK-wide. Every programme covers safe data handling and checking AI output.\n\nTeam workshops start from **£595** (half-day, up to 8 people) and leadership briefings from **£295** (two hours), ex-VAT. Full details are on our <a href=\"/ai-training.html\">AI training page</a>, or book a **free strategy call** to plan it."},
  {p:['voice','voice agent','voice agents','receptionist','phone agent','answer calls','answering calls','answer my phone','answer the phone','phone calls','calls','missed call','missed calls','miss calls','missing calls','call answering','phone answering'],r:"Yes — we build **AI voice agents** that answer your business phone 24/7 📞\n\n• Answer every call in natural speech\n• Book appointments and take messages\n• Hand urgent calls straight to a human\n\nPricing starts from **£1,200** set-up plus **£149/month** (ex-VAT). See our <a href=\"/ai-voice-agents.html\">AI voice agents page</a> for details, or book a **free strategy call**."},
  {p:['price','prices','cost','costs','pricing','how much','budget','fee','fees','quote','charge','charges'],r:"Typical starting points (all **ex-VAT**):\n\n• **AI training** — from **£595** (half-day team workshop)\n• **AI Opportunity Review** — from **£395**\n• **Workflow automation pilot** — from **£1,500**\n• **AI voice agent** — from **£1,200** set-up + **£149/month**\n• **Custom AI agent or LLM integration** — from **£3,000**\n• **AI Ops & Monitoring** — from **£199/month**\n\nThe final figure depends on complexity, the systems we integrate with and volume, so every project gets a **fixed written quote** after a **free strategy call** — no surprise bills."},
  {p:['service','services','offer','what do you','do you do','what can you'],r:"We offer eight core services:\n\n• **Custom AI Agents**\n• **Workflow Automation**\n• **AI Voice Agents** (24/7 phone answering)\n• **Predictive Intelligence**\n• **LLM Integration**\n• **Data Pipeline Architecture**\n• **AI Ops & Monitoring**\n• **AI Training for Businesses**\n\nHappy to dig into any of these on a free strategy call."},
  {p:['deploy','fast','how long','timeline','quick','when can','speed','turnaround'],r:"We can usually **start scoping within 48 hours**, and most projects go from discovery to a **live system in a matter of weeks**, not months."},
  {p:['sme','smes','small business','startup','enterprise','enterprises','who do you work','clients','customer','customers'],r:"Yes — we work with **SMEs and enterprises** across Norfolk, Suffolk, Cambridgeshire, and Essex. From solo operators to multi-site teams."},
  {p:['book','call','meeting','strategy','consult','talk','schedule','demo'],r:"Absolutely — we offer a **free strategy call**. Tap the *Book a Strategy Call* CTA on this page and we'll line up a time."},
  {p:['contact','email','phone','reach','get in touch'],r:"You can reach us via the **contact section** at the bottom of this page, or book a free strategy call directly from the CTA."},
  {p:['location','where','based','area','region','anglia','norfolk','suffolk','cambridge','essex'],r:"We're based in **East Anglia** — serving Norfolk, Suffolk, Cambridgeshire, and Essex. Remote-friendly for the rest of the UK."},
  {p:['hi','hello','hey','morning','evening','afternoon','hiya'],r:"Hi there! 👋 I'm **ARIA**. Ask me about our **services**, **pricing**, **deployment timeline**, or who we work with."},
  {p:['thank','thanks','thx','cheers','appreciate','appreciated'],r:"You're very welcome! Anything else I can help with?"},
  {p:['bye','goodbye','later'],r:"Thanks for stopping by — book a free strategy call whenever you're ready. 👋"}
];
function localReply(text){
  const t=' '+text.toLowerCase().replace(/[^\w\s']/g,' ')+' ';
  const hit=k=>new RegExp('\\b'+k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\b').test(t);
  for(const rule of replyRules){if(rule.p.some(hit))return rule.r;}
  return "Great question — that's best answered on a **free strategy call**. In the meantime I can tell you about our **services**, **pricing**, **deployment timeline**, or **who we work with**.";
}
function sendMsg(){if(loading)return;const inp=document.getElementById('chat-input');const text=inp.value.trim();if(!text)return;inp.value='';inp.style.height='auto';addMsg('user',text);loading=true;document.getElementById('chat-send').disabled=true;showTyping();const delay=600+Math.random()*500;setTimeout(()=>{removeTyping();addMsg('ai',localReply(text));loading=false;document.getElementById('chat-send').disabled=false;},delay);}
setTimeout(()=>{if(!chatOpen)document.getElementById('chatNotif').style.display='flex';},3000);

// CONTACT FORM (Web3Forms, AJAX submit — no page redirect)
(function(){
  const form=document.getElementById('contactForm');
  if(!form)return;
  const status=document.getElementById('formStatus');
  const btn=document.getElementById('cfSubmit');
  form.addEventListener('submit',async function(e){
    e.preventDefault();
    status.className='form-status';
    btn.disabled=true;const orig=btn.textContent;btn.textContent='Sending…';
    try{
      const res=await fetch('https://api.web3forms.com/submit',{
        method:'POST',
        headers:{'Accept':'application/json'},
        body:new FormData(form)
      });
      const data=await res.json();
      if(res.ok&&data.success){
        status.textContent="Thanks — your message is on its way. We'll be in touch within 1 business day.";
        status.className='form-status ok show';
        form.reset();
        if(window.EAAISTrack)window.EAAISTrack('form_submit',{form_id:'contact'});
      }else{
        status.textContent=(data&&data.message)?data.message:'Something went wrong. Please email info@eastangliaaiservices.co.uk instead.';
        status.className='form-status err show';
        if(window.EAAISTrack)window.EAAISTrack('form_submit_failed',{form_id:'contact'});
      }
    }catch(err){
      status.textContent='Network error — please email info@eastangliaaiservices.co.uk or call 07466 951175.';
      status.className='form-status err show';
    }finally{
      btn.disabled=false;btn.textContent=orig;
    }
  });
})();

// ACCESSIBILITY PANEL
function toggleA11y(){const p=document.getElementById('a11y-panel');const t=document.getElementById('a11y-toggle');const open=!p.classList.contains('open');p.classList.toggle('open',open);p.setAttribute('aria-hidden',open?'false':'true');t.setAttribute('aria-expanded',open?'true':'false');}
(function(){
  const root=document.documentElement;
  const KEYS={motion:'eaais_a11y_motion',contrast:'eaais_a11y_contrast',text:'eaais_a11y_text'};
  const CLS={motion:'reduce-motion',contrast:'high-contrast',text:'large-text'};
  function save(k,v){try{localStorage.setItem(k,v);}catch(e){}}
  function apply(opt,on,persist){
    root.classList.toggle(CLS[opt],on);
    const btn=document.querySelector('.a11y-switch[data-opt="'+opt+'"]');
    if(btn)btn.setAttribute('aria-pressed',on?'true':'false');
    if(persist)save(KEYS[opt],on?'1':'0');
    if(opt==='motion'){if(on){if(window.__heroStop)window.__heroStop();window.__hexStop();}else{if(window.__heroStart)window.__heroStart();window.__hexStart();}}
  }
  ['motion','contrast','text'].forEach(function(opt){
    const btn=document.querySelector('.a11y-switch[data-opt="'+opt+'"]');
    if(!btn)return;
    btn.setAttribute('aria-pressed',root.classList.contains(CLS[opt])?'true':'false');
    btn.addEventListener('click',function(){apply(opt,!root.classList.contains(CLS[opt]),true);});
  });
  const reset=document.getElementById('a11y-reset');
  if(reset)reset.addEventListener('click',function(){['motion','contrast','text'].forEach(function(opt){apply(opt,false,false);try{localStorage.removeItem(KEYS[opt]);}catch(e){}});});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){const p=document.getElementById('a11y-panel');if(p&&p.classList.contains('open'))toggleA11y();}});
})();

// BLOG CAROUSEL
(function(){
  var root=document.getElementById('blogCarousel');
  if(!root)return;
  var track=document.getElementById('blogTrack');
  var slides=track?Array.prototype.slice.call(track.querySelectorAll('.blog-slide')):[];
  if(!track||slides.length===0)return;
  var viewport=root.querySelector('.blog-viewport');
  var prevBtn=document.getElementById('blogPrev');
  var nextBtn=document.getElementById('blogNext');
  var dotsWrap=document.getElementById('blogDots');
  var AUTO=6000;
  var idx=0,timer=null,dots=[];
  if(dotsWrap){
    for(var s=0;s<slides.length;s++){
      var d=document.createElement('button');
      d.type='button';d.className='blog-dot';
      d.setAttribute('aria-label','Go to article '+(s+1)+' of '+slides.length);
      d.addEventListener('click',(function(n){return function(){go(n);restart();};})(s));
      dotsWrap.appendChild(d);dots.push(d);
    }
  }
  function go(n){
    idx=(n+slides.length)%slides.length;
    if(viewport){
      var reduce=document.documentElement.classList.contains('reduce-motion');
      var left=slides[idx].offsetLeft-track.offsetLeft;
      viewport.scrollTo({left:left,behavior:reduce?'auto':'smooth'});
    }
    for(var s=0;s<slides.length;s++){
      slides[s].setAttribute('aria-hidden',s===idx?'false':'true');
      if(dots[s])dots[s].classList.toggle('active',s===idx);
    }
  }
  function nextSlide(){go(idx+1);}
  function prevSlide(){go(idx-1);}
  function stop(){if(timer){clearInterval(timer);timer=null;}}
  function start(){
    stop();
    if(slides.length<2)return;
    if(document.documentElement.classList.contains('reduce-motion'))return;
    timer=setInterval(nextSlide,AUTO);
  }
  function restart(){stop();start();}
  if(nextBtn)nextBtn.addEventListener('click',function(){nextSlide();restart();});
  if(prevBtn)prevBtn.addEventListener('click',function(){prevSlide();restart();});
  root.addEventListener('mouseenter',stop);
  root.addEventListener('mouseleave',start);
  root.addEventListener('focusin',stop);
  root.addEventListener('focusout',start);
  root.addEventListener('keydown',function(e){
    if(e.key==='ArrowLeft'){e.preventDefault();prevSlide();restart();}
    else if(e.key==='ArrowRight'){e.preventDefault();nextSlide();restart();}
  });
  go(0);
  start();
})();
