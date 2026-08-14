(()=>{
const NAV=[
  {screen:'home',label:'Taverne',icon:'assets/icons/nav-tavern.webp'},
  {screen:'dungeon',label:'Katakomben',icon:'assets/icons/nav-catacombs.webp'},
  {screen:'char',label:'Held',hero:true},
  {screen:'city',label:'Stadt',icon:'assets/icons/nav-stadt.webp'},
  {screen:'arena',label:'Arena',icon:'assets/icons/nav-arena.webp'}
];
function activeScreen(){
  const s=S?.screen||'home';
  if(['merchant','bank','forge'].includes(s))return 'city';
  return s;
}
function heroPortrait(){
  try{return window.getHeroPortrait?getHeroPortrait({cls:S.cls,gender:S.gender}):'assets/icons/nav-held.webp'}catch(e){return 'assets/icons/nav-held.webp'}
}
function rebuildFooter(){
  const old=document.querySelector('.tabs');if(!old)return;
  old.className='tabs aq-footer';
  const active=activeScreen();
  old.innerHTML=NAV.map(n=>{
    const src=n.hero?heroPortrait():n.icon;
    const blocked=n.screen==='dungeon'&&!!S?.quest;
    return `<button class="aq-nav ${n.hero?'aq-hero':''} ${active===n.screen?'active':''}" ${blocked?'disabled aria-disabled="true" title="Während einer aktiven Quest nicht verfügbar"':''} onclick="aqNav('${n.screen}')"><span class="aq-nav-art"><img ${n.hero?'data-hero-portrait="1"':''} src="${src}" alt="${n.label}"></span><span class="aq-nav-label">${n.label}</span></button>`
  }).join('');
}
window.aqNav=function(screen){
  if(screen==='dungeon'&&S?.quest){if(typeof toast==='function')toast('Die Katakomben können während einer aktiven Quest nicht betreten werden.');return}
  if(typeof tab==='function')tab(screen);
};
function polishHero(){
  if(S?.screen!=='char')return;
  const root=document.querySelector('.hv3');if(!root)return;
  const head=root.querySelector('.hv3-head');
  const name=root.querySelector('.hv3-name');
  const core=root.querySelector('.hv3-core');
  if(head&&name&&core&&!name.contains(core))name.appendChild(core);
  const kicker=root.querySelector('.hv3-name>small');if(kicker)kicker.style.display='none';
  const helper=root.querySelector('.hv3-title>span');if(helper&&/Antippen/i.test(helper.textContent||''))helper.remove();
  const title=root.querySelector('.hv3-title');
  if(title){const b=title.querySelector('b'),s=title.querySelector('small');if(b&&s)b.innerHTML=`${b.textContent} <em class="aq-eq-count">· ${s.textContent.replace(' Slots belegt','')}</em>`;if(s)s.remove()}
}
function apply(){rebuildFooter();polishHero()}
const prev=window.render;if(typeof prev==='function')window.render=function(){const r=prev.apply(this,arguments);queueMicrotask(apply);return r};
const css=document.createElement('style');css.textContent=`
/* Completely rebuilt footer. */
@media(max-width:699px){
  .tabs.aq-footer{position:fixed!important;left:0!important;right:0!important;bottom:0!important;height:66px!important;min-height:66px!important;padding:0 max(8px,env(safe-area-inset-left)) max(4px,env(safe-area-inset-bottom))!important;background:linear-gradient(180deg,#17111fe8,#120e18 72%)!important;border-top:1px solid #ffffff12!important;display:grid!important;grid-template-columns:repeat(5,1fr)!important;align-items:end!important;overflow:visible!important;z-index:30!important;backdrop-filter:blur(12px)!important}
  .tabs.aq-footer .aq-nav{position:relative!important;height:64px!important;min-height:64px!important;min-width:0!important;padding:0 2px 5px!important;margin:0!important;background:transparent!important;border:0!important;box-shadow:none!important;border-radius:0!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:flex-end!important;overflow:visible!important;color:var(--muted)!important}
  .tabs.aq-footer .aq-nav:disabled{opacity:.35!important}
  .tabs.aq-footer .aq-nav-art{position:absolute!important;left:50%!important;bottom:24px!important;transform:translateX(-50%)!important;width:66px!important;height:66px!important;display:grid!important;place-items:center!important;overflow:visible!important;pointer-events:none!important}
  .tabs.aq-footer .aq-nav-art img{position:static!important;top:auto!important;display:block!important;width:62px!important;height:62px!important;max-width:none!important;max-height:none!important;object-fit:contain!important;filter:drop-shadow(0 5px 8px #000b)!important;transform:none!important}
  .tabs.aq-footer .aq-hero .aq-nav-art{width:72px!important;height:72px!important;bottom:23px!important}
  .tabs.aq-footer .aq-hero .aq-nav-art img{width:70px!important;height:70px!important}
  .tabs.aq-footer .aq-nav-label{position:relative!important;z-index:2!important;font-size:10px!important;line-height:1!important;font-weight:800!important;margin:0!important;padding:0 0 2px!important;color:inherit!important}
  .tabs.aq-footer .aq-nav.active{color:var(--text)!important}
  .tabs.aq-footer .aq-nav.active:after{content:'';position:absolute;left:32%;right:32%;bottom:0;height:3px;border-radius:99px;background:linear-gradient(90deg,var(--accent),var(--gold));box-shadow:0 0 10px #a875ff77}
  main{padding-bottom:92px!important}
}
/* Hero screen: compact information hierarchy. */
.hv3{max-width:720px!important;margin:auto!important}
.hv3-head{display:grid!important;grid-template-columns:62px 1fr!important;gap:10px!important;align-items:center!important;padding:4px 2px 6px!important}
.hv3-avatar{width:60px!important;height:60px!important;display:grid!important;place-items:center!important;border:0!important;background:transparent!important;overflow:visible!important}
.hv3-avatar img{width:62px!important;height:62px!important;object-fit:contain!important;filter:drop-shadow(0 4px 7px #0009)!important}
.hv3-name h1{font-size:22px!important;line-height:1.05!important;margin:0 0 3px!important}.hv3-name>span{font-size:11px!important;color:var(--muted)!important}
.hv3-core{display:flex!important;gap:12px!important;margin-top:7px!important;align-items:center!important;flex-wrap:wrap!important}
.hv3-core span{min-width:0!important;padding:0!important;background:transparent!important;border-radius:0!important;text-align:left!important;display:flex!important;align-items:baseline!important;gap:3px!important}
.hv3-core b{font-size:12px!important;display:inline!important}.hv3-core small{font-size:10px!important;display:inline!important;color:var(--muted)!important}
.hv3-stats{display:grid!important;grid-template-columns:repeat(6,1fr)!important;gap:4px!important;margin:4px 0 7px!important}
.hv3-stats span{padding:5px 2px!important;background:#ffffff05!important;border-radius:8px!important}.hv3-stats b{font-size:10px!important}.hv3-stats small{font-size:7px!important}
.hv3-tabs{height:46px!important;display:grid!important;grid-template-columns:repeat(3,1fr)!important;gap:4px!important;margin:5px 0 8px!important;padding:3px!important;border-radius:12px!important;background:#ffffff04!important}
.hv3-tabs button{min-height:40px!important;height:40px!important;padding:5px 7px!important;border:0!important;border-radius:9px!important;background:transparent!important;box-shadow:none!important;gap:5px!important}.hv3-tabs button.on{background:#a875ff1d!important;box-shadow:inset 0 0 0 1px #a875ff66!important}.hv3-tabs span{font-size:11px!important}.hv3-tabs em{font-size:8px!important}
.hv3-panel{padding:9px!important;border-radius:13px!important;background:#181120e8!important;border:1px solid #ffffff0d!important}.hv3-title{margin-bottom:7px!important}.hv3-title b{font-size:14px!important}.aq-eq-count{font-size:10px;font-style:normal;color:var(--muted);font-weight:600}
.hv3-eqgrid{display:grid!important;grid-template-columns:repeat(3,1fr)!important;gap:6px!important}.hv3-slot{height:78px!important;min-height:78px!important;padding:5px!important;border-radius:11px!important;background:#ffffff04!important}.hv3-slot:not(.has){border-color:#ffffff08!important;color:#8f8398!important}.hv3-slot>span{font-size:25px!important;line-height:1!important}.hv3-slot:not(.has)>span{font-size:22px!important;opacity:.55!important}.hv3-slot>small{font-size:9px!important;margin-top:5px!important}.hv3-slot>i{font-size:8px!important;right:5px!important;top:5px!important}
@media(max-width:430px){.hv3-head{grid-template-columns:58px 1fr!important}.hv3-avatar,.hv3-avatar img{width:58px!important;height:58px!important}.hv3-core{gap:8px!important}.hv3-core b{font-size:11px!important}.hv3-core small{font-size:9px!important}.hv3-stats b{font-size:9px!important}.hv3-stats small{font-size:6.5px!important}.hv3-slot{height:74px!important;min-height:74px!important}}
`;document.head.appendChild(css);
apply();
})();