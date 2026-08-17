(()=>{
'use strict';
function state(){try{return typeof S!=='undefined'&&S?S:null}catch{return null}}
function apply(){
 const s=state(),active=s?.screen==='dungeon'&&!!s?.dungeonV1;
 document.body.classList.toggle('aq-catacomb-run',active);
 if(!active)return;
 const room=document.querySelector('.dv7-room.dv7-combat');
 if(room){
  room.classList.add('aq-combat-compact');
  const type=room.querySelector(':scope>small');
  const risk=room.querySelector('.dv7-risk');
  if(risk&&type&&!type.parentElement?.classList.contains('aq-encounter-meta')){
   const meta=document.createElement('div');meta.className='aq-encounter-meta';type.before(meta);meta.append(type,risk);
  }
  const auto=room.querySelector('.dv7-auto');if(auto){auto.textContent='⚔ AUTO-KAMPF AKTIV';auto.setAttribute('role','status')}
 }
}
const css=document.createElement('style');css.textContent=`
/* Catacombs v2: den laufenden Run auf Encounter und Kampf fokussieren. */
body.aq-catacomb-run main{padding-bottom:190px!important}
body.aq-catacomb-run .dv7{padding-bottom:20px}
body.aq-catacomb-run .dv7-head{grid-template-columns:minmax(0,1fr) auto auto!important;padding:8px 10px!important;gap:7px!important;border-radius:13px!important}
body.aq-catacomb-run .dv7-head>div{display:flex!important;align-items:center!important;gap:10px!important;min-width:0}
body.aq-catacomb-run .dv7-head small{font-size:9px!important;white-space:nowrap}
body.aq-catacomb-run .dv7-head b{font-size:13px!important;white-space:nowrap}
body.aq-catacomb-run .dv7-head>span{font-size:10px!important;white-space:nowrap}
body.aq-catacomb-run .dv7-head button{min-height:30px!important;padding:5px 8px!important}
body.aq-catacomb-run .dv7-head>i{display:none!important}
body.aq-catacomb-run .dv7-track{margin:6px 2px 9px!important;gap:5px!important}
body.aq-catacomb-run .dv7-track i{height:5px!important}
body.aq-catacomb-run .aq-combat-compact{padding:10px 13px 12px!important;border-radius:18px!important;overflow:hidden}
body.aq-catacomb-run .aq-combat-compact>.aq-encounter-meta{display:flex;align-items:center;justify-content:center;gap:7px;flex-wrap:wrap;margin:0 0 2px}
body.aq-catacomb-run .aq-combat-compact>small{display:inline-flex!important;margin:0!important;font-size:10px!important;letter-spacing:.08em;color:var(--gold)!important;font-weight:800}
body.aq-catacomb-run .aq-combat-compact .dv7-risk{display:inline-flex!important;width:auto!important;margin:0!important;padding:4px 8px!important;border-radius:999px!important;font-size:9px!important;line-height:1.15!important;text-align:center!important}
body.aq-catacomb-run .aq-combat-compact .catacomb-art-host{width:126px!important;height:126px!important;min-width:126px!important;margin:1px auto 0!important}
body.aq-catacomb-run .aq-combat-compact .catacomb-room-art{width:126px!important;height:126px!important;max-width:126px!important;max-height:126px!important}
body.aq-catacomb-run .aq-combat-compact h2{font-size:24px!important;line-height:1.05!important;margin:0 0 8px!important}
body.aq-catacomb-run .aq-combat-compact .dv7-bars{display:grid!important;gap:7px!important;margin:0!important;text-align:left!important}
body.aq-catacomb-run .aq-combat-compact .dv7-bars>div{margin:0!important}
body.aq-catacomb-run .aq-combat-compact .dv7-bars span{font-size:11px!important;margin-bottom:3px!important;display:flex!important;justify-content:space-between!important}
body.aq-catacomb-run .aq-combat-compact .dv7-bars i{height:8px!important}
body.aq-catacomb-run .aq-combat-compact .dv7-action{margin:9px 0 6px!important;padding:8px 10px!important;min-height:0!important;border-radius:12px!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:7px!important;flex-wrap:wrap}
body.aq-catacomb-run .aq-combat-compact .dv7-action b{font-size:12px!important;margin:0!important}
body.aq-catacomb-run .aq-combat-compact .dv7-action span{font-size:10px!important;line-height:1.2!important;margin:0!important}
body.aq-catacomb-run .aq-combat-compact .dv7-auto{display:inline-flex!important;align-items:center!important;justify-content:center!important;margin:2px auto 5px!important;padding:5px 10px!important;border:1px solid #f4c15d35!important;border-radius:999px!important;background:#f4c15d0c!important;color:var(--gold)!important;font-size:9px!important;font-weight:900!important;letter-spacing:.06em!important}
body.aq-catacomb-run .aq-combat-compact .dv7-logbtn{width:auto!important;min-height:32px!important;margin:0 auto!important;padding:5px 11px!important;background:#ffffff08!important;border:1px solid #ffffff0d!important;border-radius:10px!important;font-size:10px!important;box-shadow:none!important}
body.aq-catacomb-run .aq-combat-compact .dv7-log{margin-top:6px!important;padding:7px 9px!important;max-height:94px!important;overflow:auto!important;text-align:left!important;border-radius:10px!important}
body.aq-catacomb-run .aq-combat-compact .dv7-log p{font-size:9px!important;line-height:1.25!important;margin:2px 0!important}
body.aq-catacomb-run .aq-combat-compact .dv7-shield{margin:0 0 7px!important;padding:6px 8px!important}
/* Der Schlüssel ist während eines bereits gestarteten Runs keine Primärinformation. */
body.aq-catacomb-run header [class*="key"],body.aq-catacomb-run header [data-resource="keys"]{display:none!important}
@media(max-width:520px){
 body.aq-catacomb-run .dv7-head{grid-template-columns:1fr auto!important}
 body.aq-catacomb-run .dv7-head>span{grid-column:1/2;grid-row:2;font-size:9px!important}
 body.aq-catacomb-run .dv7-head button{grid-column:2;grid-row:1/3}
 body.aq-catacomb-run .aq-combat-compact .catacomb-art-host{width:116px!important;height:116px!important;min-width:116px!important}
 body.aq-catacomb-run .aq-combat-compact .catacomb-room-art{width:116px!important;height:116px!important;max-width:116px!important;max-height:116px!important}
 body.aq-catacomb-run .aq-combat-compact h2{font-size:22px!important;margin-bottom:7px!important}
}
@media(max-width:380px), (max-height:760px){
 body.aq-catacomb-run .aq-combat-compact .catacomb-art-host{width:98px!important;height:98px!important;min-width:98px!important}
 body.aq-catacomb-run .aq-combat-compact .catacomb-room-art{width:98px!important;height:98px!important;max-width:98px!important;max-height:98px!important}
 body.aq-catacomb-run .aq-combat-compact h2{font-size:20px!important}
}
`;document.head.appendChild(css);
window.Arcane?.on?.('afterRenderSettled',apply);window.Arcane?.on?.('screenChange',apply);window.Arcane?.on?.('bootReady',apply);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else requestAnimationFrame(apply);
})();