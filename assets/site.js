(function(){
var d=document,w=window;w.dataLayer=w.dataLayer||[];
var hdr=d.getElementById('hdr'),mbar=d.getElementById('mbar');
function onS(){var y=w.scrollY;hdr.classList.toggle('scrolled',y>30);if(mbar)mbar.classList.toggle('show',y>420)}
w.addEventListener('scroll',onS,{passive:true});onS();
var bg=d.getElementById('burger'),sh=d.getElementById('sheet');
function closeSheet(){sh.classList.remove('open');bg.classList.remove('on');bg.setAttribute('aria-expanded','false')}
bg.addEventListener('click',function(){var o=sh.classList.toggle('open');bg.classList.toggle('on',o);bg.setAttribute('aria-expanded',o)});
sh.querySelectorAll('a').forEach(function(a){a.addEventListener('click',closeSheet)});
var dds=[].slice.call(d.querySelectorAll('.dd')),hov=w.matchMedia('(hover:hover)').matches;
function setDD(o,x){dds.forEach(function(k){var on=(x?k===x:false)&&o;k.classList.toggle('open',on);k.querySelector('.dd-btn').setAttribute('aria-expanded',on)})}
dds.forEach(function(k){var b=k.querySelector('.dd-btn'),tmo;
 b.addEventListener('click',function(e){e.stopPropagation();setDD(!k.classList.contains('open'),k)});
 if(hov){k.addEventListener('mouseenter',function(){clearTimeout(tmo);setDD(true,k)});k.addEventListener('mouseleave',function(){tmo=setTimeout(function(){if(k.classList.contains('open'))setDD(false)},160)})}
});
d.addEventListener('click',function(e){if(!dds.some(function(k){return k.contains(e.target)}))setDD(false)});
d.addEventListener('keydown',function(e){if(e.key==='Escape'){setDD(false);closeSheet()}});
d.querySelectorAll('.fq button').forEach(function(b){b.addEventListener('click',function(){var f=b.parentNode,o=!f.classList.contains('open');d.querySelectorAll('.fq.open').forEach(function(x){x.classList.remove('open');x.querySelector('button').setAttribute('aria-expanded','false')});f.classList.toggle('open',o);b.setAttribute('aria-expanded',o)})});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target)}})},{threshold:.1,rootMargin:'0px 0px -40px 0px'});
d.querySelectorAll('.rv').forEach(function(el){io.observe(el)});
d.addEventListener('click',function(e){var a=e.target.closest('a[data-wa]');if(!a)return;w.dataLayer.push({event:'whatsapp_click',wa_origen:a.dataset.wa,wa_url:a.href,page_path:location.pathname})});
})();
(function(){var d=document,w=window,rm=w.matchMedia('(prefers-reduced-motion:reduce)').matches;
d.querySelectorAll('[data-demo]').forEach(function(box){
 var data;try{data=JSON.parse(box.querySelector('script[type="application/json"]').textContent)}catch(e){return}
 var sts=[].slice.call(box.querySelectorAll('.demo-st')),pn=box.querySelector('.demo-pn'),tr=box.querySelector('.demo-track'),pb=box.querySelector('[data-play]'),i=0,tm=null,play=!rm;
 function show(k){i=k;var s=data[k];sts.forEach(function(b,j){b.classList.toggle('on',j===k);b.classList.toggle('done',j<k);b.setAttribute('aria-selected',j===k)});
  tr.style.setProperty('--prog',(sts.length>1?k/(sts.length-1)*84:0)+'%');
  pn.querySelector('.n').textContent='0'+(k+1);pn.querySelector('h3').textContent=s[0];pn.querySelector('p').textContent=s[1];pn.querySelector('.tag').textContent=s[2];
  pn.classList.remove('swap');void pn.offsetWidth;pn.classList.add('swap')}
 function loop(){clearInterval(tm);if(play)tm=setInterval(function(){show((i+1)%sts.length)},3200);if(pb)pb.textContent=play?'Pausar':'Reproducir'}
 sts.forEach(function(b,j){b.addEventListener('click',function(){play=false;show(j);loop()})});
 if(pb)pb.addEventListener('click',function(){play=!play;loop()});
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){show(0);loop();io.disconnect()}})},{threshold:.35});io.observe(box);
});
})();
