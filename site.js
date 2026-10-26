(()=>{
const D=document,R=D.documentElement;
const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(rm)R.classList.add('rm');
const $=(s,c=D)=>c.querySelector(s),$$=(s,c=D)=>[...c.querySelectorAll(s)];
/* abertura */
const start=()=>R.classList.add('ld');
rm?start():requestAnimationFrame(()=>requestAnimationFrame(start));
/* header */
const h=$('.hdr');
const onS=()=>{h.classList.toggle('solid',scrollY>40)};onS();addEventListener('scroll',onS,{passive:true});
const bg=$('.burger');
bg&&bg.addEventListener('click',()=>{const o=h.classList.toggle('open');bg.setAttribute('aria-expanded',o)});
$$('.nav a').forEach(a=>a.addEventListener('click',()=>{h.classList.remove('open');bg&&bg.setAttribute('aria-expanded',false)}));
/* barra whatsapp mobile: some quando o formulario esta na tela */
const wa=$('.wa'),ft=$('#contato');
if(wa&&ft&&'IntersectionObserver'in window)new IntersectionObserver(e=>wa.classList.toggle('hide',e[0].isIntersecting),{threshold:.15}).observe(ft);
/* revelacoes */
const rv=$$('.rv,.rule,.rvi');
if(rm||!('IntersectionObserver'in window))rv.forEach(e=>e.classList.add('in'));
else{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});rv.forEach(e=>io.observe(e))}
/* parallax leve */
if(!rm){
 const ps=$$('[data-par]');let vis=new Set(),tk=false;
 const run=()=>{tk=false;const vh=innerHeight;ps.forEach(e=>{if(!vis.has(e))return;const r=e.getBoundingClientRect();const k=(r.top+r.height/2-vh/2)/vh;const a=parseFloat(e.dataset.par)*(innerWidth<960?.5:1);e.style.transform=`translate3d(0,${(-k*a).toFixed(1)}px,0)`})};
 if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>{es.forEach(e=>e.isIntersecting?vis.add(e.target):vis.delete(e.target));run()},{rootMargin:'12% 0px'});ps.forEach(e=>io.observe(e))}
 addEventListener('scroll',()=>{if(!tk){tk=true;requestAnimationFrame(run)}},{passive:true});
}
/* abas */
$$('[data-tabs]').forEach(w=>{
 const bt=$$('.tb',w),sl=$$('.sl',w);
 const sel=i=>{bt.forEach((b,k)=>b.setAttribute('aria-selected',k===i));sl.forEach((s,k)=>s.classList.toggle('on',k===i))};
 bt.forEach((b,i)=>{b.addEventListener('click',()=>sel(i));b.addEventListener('keydown',e=>{if(e.key==='ArrowDown'||e.key==='ArrowRight'){e.preventDefault();const n=bt[(i+1)%bt.length];n.focus();sel((i+1)%bt.length)}if(e.key==='ArrowUp'||e.key==='ArrowLeft'){e.preventDefault();const j=(i-1+bt.length)%bt.length;bt[j].focus();sel(j)}})});
 sel(0);
});
/* sequencia por rolagem */
const st=$$('.step');
if(st.length){
 const im=$$('.seq-i .sl');
 const act=i=>{st.forEach((s,k)=>s.classList.toggle('on',k===i));im.forEach((s,k)=>s.classList.toggle('on',k===i))};
 act(0);
 if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)act(st.indexOf(e.target))}),{rootMargin:'-42% 0px -48% 0px'});st.forEach(s=>io.observe(s))}
}
/* galeria com filtro */
const gal=$('.gal');
if(gal){
 const it=$$('.gi',gal);
 $$('.chip').forEach(c=>c.addEventListener('click',()=>{
  $$('.chip').forEach(x=>x.setAttribute('aria-pressed',x===c));
  const f=c.dataset.f;
  it.forEach(g=>{const m=f==='todos'||g.dataset.c===f;if(m){g.hidden=false;requestAnimationFrame(()=>g.classList.remove('out'))}else{g.classList.add('out');setTimeout(()=>{if(g.classList.contains('out'))g.hidden=true},rm?0:420)}});
 }));
}
/* lightbox */
const lb=$('.lb');let cur=[],ci=0,last=null;
if(lb){
 const im=$('img',lb),cp=$('.cap',lb);
 const show=i=>{ci=(i+cur.length)%cur.length;const g=cur[ci];im.style.opacity=0;const n=new Image();n.onload=()=>{im.src=g.dataset.big;im.alt=g.dataset.alt||'';im.style.opacity=1};n.src=g.dataset.big;cp.textContent=g.dataset.cap||''};
 const open=(list,i)=>{cur=list;last=D.activeElement;lb.classList.add('show');requestAnimationFrame(()=>lb.classList.add('in'));show(i);$('.x',lb).focus();D.body.style.overflow='hidden'};
 const close=()=>{lb.classList.remove('in');setTimeout(()=>lb.classList.remove('show'),rm?0:300);D.body.style.overflow='';last&&last.focus()};
 $$('[data-lb]').forEach(b=>b.addEventListener('click',e=>{const ct=b.closest('.ct');if(ct&&Date.now()-(+ct.dataset.mv||0)<300)return;const grp=$$(`[data-lb="${b.dataset.lb}"]`).filter(x=>!x.hidden);open(grp,grp.indexOf(b))}));
 $('.x',lb).onclick=close;$('.pv',lb).onclick=()=>show(ci-1);$('.nx',lb).onclick=()=>show(ci+1);
 lb.addEventListener('click',e=>{if(e.target===lb)close()});
 D.addEventListener('keydown',e=>{if(!lb.classList.contains('show'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(ci-1);if(e.key==='ArrowRight')show(ci+1);if(e.key==='Tab'){const f=$$('button',lb);const a=D.activeElement;if(e.shiftKey&&a===f[0]){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&a===f[f.length-1]){e.preventDefault();f[0].focus()}}});
 let sx=null;lb.addEventListener('touchstart',e=>{sx=e.touches[0].clientX},{passive:true});lb.addEventListener('touchend',e=>{if(sx===null)return;const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>50)show(ci+(d<0?1:-1));sx=null});
}
/* carrosseis */
$$('.car').forEach(c=>{
 const t=$('.ct',c),pg=$('.pg i',c);
 const upd=()=>{const m=t.scrollWidth-t.clientWidth;const w=Math.max(12,t.clientWidth/t.scrollWidth*100);pg.style.width=w+'%';pg.style.left=(m>0?t.scrollLeft/m*(100-w):0)+'%'};
 t.addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();
 const step=()=>(t.firstElementChild?t.firstElementChild.getBoundingClientRect().width+18:300);
 $('.prev',c).onclick=()=>t.scrollBy({left:-step(),behavior:rm?'auto':'smooth'});
 $('.next',c).onclick=()=>t.scrollBy({left:step(),behavior:rm?'auto':'smooth'});
 /* arrastar com mouse sem abrir a foto por acidente */
 let dn=false,x0=0,s0=0,mv=0;
 t.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;dn=true;x0=e.clientX;s0=t.scrollLeft;mv=0});
 addEventListener('pointermove',e=>{if(!dn)return;const d=e.clientX-x0;mv=Math.max(mv,Math.abs(d));if(mv>6)t.classList.add('drag');t.scrollLeft=s0-d});
 addEventListener('pointerup',()=>{if(!dn)return;dn=false;t.classList.remove('drag');if(mv>6)t.dataset.mv=Date.now()});
});
/* formulario: so prepara a mensagem, nao envia */
$$('form[data-wa]').forEach(f=>f.addEventListener('submit',e=>{
 e.preventDefault();
 if(!f.reportValidity())return;
 const v=Object.fromEntries(new FormData(f));
 let m=f.dataset.intro;
 const parts=[];
 if(v.nome)parts.push('Meu nome é '+v.nome.trim()+'.');
 if(v.empresa&&v.empresa.trim())parts.push('Escritório/empresa: '+v.empresa.trim()+'.');
 if(v.tipo)parts.push((f.dataset.tl||'Interesse')+': '+v.tipo+'.');
 if(v.cidade&&v.cidade.trim())parts.push('Cidade da obra: '+v.cidade.trim()+'.');
 if(v.msg&&v.msg.trim())parts.push(v.msg.trim());
 const url='https://wa.me/'+f.dataset.wa+'?text='+encodeURIComponent(m+' '+parts.join(' '));
 const ok=$('.ok',f);ok.classList.add('show');ok.querySelector('a').href=url;
 window.open(url,'_blank','noopener');
}));
})();
