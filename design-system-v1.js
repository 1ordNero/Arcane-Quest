(()=>{
const SCREEN_META={
 home:{icon:'assets/icons/nav-tavern.webp',title:'Taverne',sub:'Quests & Abenteuer'},
 dungeon:{icon:'assets/icons/nav-catacombs.webp',title:'Katakomben',sub:'Expedition & Beute'},
 char:{icon:'assets/icons/nav-held.webp',title:'Held',sub:'Ausrüstung & Fertigkeiten'},
 city:{icon:'assets/icons/nav-stadt.webp',title:'Stadt',sub:'Handel & Handwerk'},
 merchant:{icon:'assets/icons/ui/location_merchant.webp',title:'Händler',sub:'Kaufen & Verkaufen'},
 bank:{icon:'assets/icons/ui/location_bank.webp',title:'Bank',sub:'Tresor & Lager'},
 forge:{icon:'assets/icons/ui/location_forge.webp',title:'Ahnen-Schmiede',sub:'Aufwerten & Verwerten'},
 arena:{icon:'assets/icons/nav-arena.webp',title:'Arena',sub:'Ruhm & Kämpfe'}
};
const esc=v=>String(v??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]));
function icon(src){return `<span class="ds-icon"><img src="${src}" alt="" aria-hidden="true"></span>`}
function resources(){
 const parts=[`<span class="ds-chip ds-level">Lv ${Number(S.lvl)||1}</span>`,`<span class="ds-chip ds-gold"><img src="assets/icons/ui/resource_gold.webp" alt="Gold">${Number(S.gold)||0}</span>`];
 if(S.screen==='home')parts.push(`<span class="ds-chip"><img src="assets/icons/ui/resource_energy.webp" alt="Abenteuerlust">${Number(S.al)||0}/${Number(S.maxAl)||100}</span>`);
 else if(S.screen==='city'||S.screen==='merchant'||S.screen==='bank'||S.screen==='forge')parts.push(`<span class="ds-chip ds-bag">${(S.items||[]).length}/${Number(S.invCap)||15}</span>`);
 else if(S.screen==='arena')parts.push(`<span class="ds-chip">Ruhm ${Number(S.arena)||0}</span>`);
 return parts.join('');
}
function header(){
 const h=document.querySelector('header');if(!h)return;
 const m=SCREEN_META[S.screen]||{icon:'assets/icons/app-icon-192.webp',title:'Arcane Quest',sub:''};
 h.className='ds-header';
 h.innerHTML=`<div class="ds-top"><div class="ds-screen">${icon(m.icon)}<div><b>${esc(m.title)}</b><small>${esc(m.sub)}</small></div></div><div class="ds-res">${resources()}</div></div>${S.screen==='char'?'':xpBar()}`;
}
function xpBar(){
 if(typeof window.xpNeed!=='function')return '';
 const need=Math.max(1,Number(xpNeed())||1),xp=Math.max(0,Number(S.xp)||0),pct=Math.max(0,Math.min(100,xp/need*100));
 return `<div class="ds-xp"><span>XP</span><i><u style="width:${pct}%"></u></i><b>${xp} / ${need}</b></div>`;
}
function removeRedundancy(){
 document.body.dataset.screen=S.screen||'';
 if(S.screen==='city')document.querySelectorAll('.cv2-head,.compact-city-status').forEach(x=>x.classList.add('ds-hide-duplicate'));
 if(['merchant','bank','forge'].includes(S.screen)){
  document.querySelectorAll('.cux-top').forEach(x=>x.classList.add('ds-subnav'));
  const head=document.querySelector(S.screen==='forge'?'.fv4-head':'.mb2-head');
  if(head)head.classList.add('ds-secondary-head');
 }
}
function polish(){header();removeRedundancy();document.querySelectorAll('.card').forEach(x=>x.classList.add('ds-card'))}
const previous=window.render;if(typeof previous==='function')window.render=function(){const r=previous.apply(this,arguments);polish();return r};
const css=document.createElement('style');css.textContent=`
:root{--ds-radius-sm:10px;--ds-radius:14px;--ds-radius-lg:18px;--ds-gap-xs:5px;--ds-gap-sm:8px;--ds-gap:12px;--ds-line:#ffffff10;--ds-surface:#1c1526;--ds-surface-2:#241a31;--ds-text-dim:#b8a9c4}
body{background:radial-gradient(circle at 50% -8%,#2c1b40 0,#110d17 38%,#0e0b13 100%)!important;font-size:15px;line-height:1.45}.ds-header{position:sticky;top:0;z-index:40;padding:9px 12px 8px!important;background:#15101df2!important;border-bottom:1px solid var(--ds-line)!important;backdrop-filter:blur(14px)}.ds-top{max-width:900px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:10px}.ds-screen{display:flex;align-items:center;gap:9px;min-width:0}.ds-icon{width:42px;height:42px;display:grid;place-items:center;flex:0 0 42px}.ds-icon img{display:block;width:100%;height:100%;object-fit:contain}.ds-screen b,.ds-screen small{display:block}.ds-screen b{font-size:17px;line-height:1.1}.ds-screen small{font-size:11px;color:var(--ds-text-dim);margin-top:3px}.ds-res{display:flex;gap:5px;align-items:center;justify-content:flex-end;flex-wrap:wrap}.ds-chip{display:inline-flex;align-items:center;gap:4px;min-height:32px;padding:5px 8px;border-radius:999px;background:#ffffff09;font-size:11px;white-space:nowrap}.ds-chip img{width:22px;height:22px;object-fit:contain}.ds-gold{color:#e8c46e}.ds-bag:before{content:'🎒';font-size:14px}.ds-xp{max-width:900px;margin:7px auto 0;display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;font-size:10px;color:var(--muted)}.ds-xp span{font-weight:800;letter-spacing:.5px}.ds-xp i{height:6px;border-radius:99px;background:#ffffff0c;overflow:hidden}.ds-xp u{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,var(--accent),#e6b85d);text-decoration:none}.ds-xp b{font-size:10px;color:#d8ccdf}
main{padding:12px 12px 92px!important}.hero{padding:14px!important;border-radius:var(--ds-radius-lg)!important;box-shadow:none!important;background:linear-gradient(135deg,#261936,#17111f)!important;border-color:var(--ds-line)!important}.hero h1{font-size:23px!important;line-height:1.15!important}.card,.ds-card{border-radius:var(--ds-radius)!important;padding:12px!important;background:var(--ds-surface)!important;box-shadow:none!important;border-color:var(--ds-line)!important}.grid{gap:9px!important;margin-top:10px!important}.row,.actions{gap:8px!important}.actions{margin-top:10px!important}button{border-radius:11px!important;box-shadow:none!important;min-height:44px}.small{font-size:12px!important;line-height:1.45}.notice{padding:9px!important;border-radius:var(--ds-radius-sm)!important;font-size:12px}.sheet{background:#1b1425!important}.ds-hide-duplicate{display:none!important}.ds-subnav{margin-top:-3px!important;margin-bottom:8px!important}.ds-secondary-head{margin-bottom:8px!important}.ds-secondary-head h1{font-size:16px!important;margin:0!important}.ds-secondary-head>div:first-child>small{display:none!important}
.cv2-grid{margin-top:0!important}.cux-building{min-height:74px!important;border-radius:var(--ds-radius)!important}.cux-building b{font-size:15px!important}.cux-building small{font-size:11px!important;line-height:1.35!important}.cux-building em{font-size:10px!important}.mb2-tabs,.fv4-tabs{gap:6px!important}.mb2-tabs button,.fv4-tabs button{min-height:42px!important;font-size:11px!important}.mb2-item,.fv4-item{border-radius:12px!important}.mb2-info b,.fv4-info b{font-size:11px!important}.mb2-info small,.mb2-info em,.fv4-info small,.fv4-info em{font-size:9px!important;line-height:1.35!important}
@media(max-width:520px){.ds-header{padding:8px 10px 7px!important}.ds-icon{width:38px;height:38px;flex-basis:38px}.ds-screen b{font-size:16px}.ds-screen small{font-size:10px}.ds-chip{min-height:29px;padding:4px 6px;font-size:10px}.ds-chip img{width:19px;height:19px}.ds-xp{margin-top:6px;gap:6px}.ds-xp b{font-size:9px}main{padding-left:10px!important;padding-right:10px!important}.cux-building{min-height:72px!important;padding:10px!important}}
@media(max-width:380px){.ds-screen small{display:none}.ds-level{display:none}.ds-chip{font-size:9px}}
`;document.head.appendChild(css);polish();
})();