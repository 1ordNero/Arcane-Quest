(()=>{
'use strict';
const api=window.REINCARNATION_SYSTEM;if(!api)return;
const nodes=Object.values(api.legacy||{}).flatMap(b=>b.nodes||[]);
function meta(){return api.meta(S)}
function buy(id){
 const check=api.canBuy?.(id,S);
 if(check&&!check.ok){
  const message=check.reason==='Vorherigen Knoten zuerst freischalten.'
   ?'Diese Vermächtnis-Stufe ist noch gesperrt. Schalte zuerst die vorherige Stufe dieses Zweigs frei.'
   :check.reason;
  toast?.(message||'Diese Vermächtnis-Stufe kann noch nicht freigeschaltet werden.');
  return false;
 }
 return api.buy?.(id,S)??false;
}
function reincarnate(){
 // Reincarnation has exactly one state authority. The canonical implementation
 // owns snapshots, reset rules, permanent progression, keys and onboarding.
 return api.requestReincarnation?.()??false;
}
function applyLegacyStats(){const base=window.getFinalStats;if(typeof base!=='function'||base.__rc2)return;const wrapped=function(){const s=base.apply(this,arguments),l=meta().legacy||{};if(l.power1)s.damage=Math.round((s.damage||0)*1.02);if(l.power2)s.crit=(s.crit||0)+2;if(l.survival1)s.hp=Math.round((s.hp||0)*1.03);if(l.survival2)s.armor=Math.round((s.armor||0)*1.03);if(l.survival3){s.block=(s.block||0)+2;s.dodge=(s.dodge||0)+2}return s};wrapped.__rc2=true;window.getFinalStats=wrapped}
const oldView=window.shrineView;window.shrineView=function(){let html=oldView?oldView():api.view(S),i=0;html=html.replace(/<button disabled class="rc13-node">/g,()=>{const n=nodes[i++];return `<button class="rc13-node" onclick="rc2Buy('${n?.id||''}')">`}).replace('Käufe noch deaktiviert','Seelensteine investieren').replace('Die Knoten sind bereits als Kosten-/Effektmodell definiert, geben aber noch keine Boni und verbrauchen keine Seelensteine. So können wir Balance und Reihenfolge vor der Aktivierung prüfen.','Freigeschaltete Vermächtnisse bleiben über alle zukünftigen Reinkarnationen erhalten.');for(const n of nodes){if(meta().legacy?.[n.id])html=html.replace(`<b>${n.name}</b>`,`<b>${n.name} ✓</b>`)}const p=api.preview(S);const action=p.gain?.eligible?`<button class="rc2-reincarnate" onclick="rc2Reincarnate()">Reinkarnieren · +${p.gain.total} Seelensteine</button>`:`<button class="rc2-reincarnate" disabled>Reinkarnation ab Stufe ${p.unlockLevel}</button>`;return html.replace('</section>',`${action}</section>`)};
window.rc2Buy=buy;window.rc2Reincarnate=reincarnate;applyLegacyStats();const st=document.createElement('style');st.textContent='.rc13-node:disabled{opacity:.45!important}.rc13-node:not(:disabled){cursor:pointer}.rc2-reincarnate{width:100%;min-height:52px;margin-top:12px;font-size:13px;background:linear-gradient(180deg,#8f62df,#6540a4)}';document.head.appendChild(st);
})();