(()=>{
const STORIES={
'Tavernen-Stammgast':{img:'assets/stories/tavernen-stammgast.webp',bonus:'+15% Abenteuerlust-Effizienz',desc:'Questkosten verbrauchen 15% weniger Abenteuerlust.'},
'Gefallener Adeliger':{img:'assets/stories/gefallener-adeliger.webp',bonus:'+10% Gold aus allen Quellen',desc:'Jeder positive Goldgewinn wird automatisch um 10% erhöht.'},
'Runenschmied-Lehrling':{img:'assets/stories/runenschmied-lehrling.webp',bonus:'+10% Aufwertungserfolg',desc:'Die Erfolgschance beim Aufwerten in der Ahnen-Schmiede steigt um 10 Prozentpunkte.'},
'Schatten-Ausreißer':{img:'assets/stories/schatten-ausreisser.webp',bonus:'+5% Beute-Glück',desc:'Bei zufällig erzeugter Beute besteht zusätzlich eine 5%-Chance, die Seltenheit um eine Stufe anzuheben.'}
};
window.PERSONAL_STORIES=STORIES;
window.getPersonalStory=()=>STORIES[S?.bg]||null;

/* Gold passive: central hook so quest, arena, dungeon, merchant sales and future gold sources all benefit. */
let lastGold=Number(S?.gold)||0,applyingGold=false;
const baseSave=window.save;
if(baseSave)window.save=function(){
  if(!applyingGold&&S?.bg==='Gefallener Adeliger'){
    const now=Number(S.gold)||0,delta=now-lastGold;
    if(delta>0){
      const bonus=Math.max(1,Math.round(delta*.10));
      applyingGold=true;S.gold=now+bonus;
      if(S.questResult&&Number(S.questResult.gold)===delta)S.questResult.gold+=bonus;
      applyingGold=false;
    }
  }
  lastGold=Number(S?.gold)||0;
  return baseSave.apply(this,arguments);
};

/* Tavern passive: keep the existing quest definitions untouched and refund the 15% efficiency before the original cost check. */
const QUEST_COST={raid:12,event:18,bounty:24,risk:28};
const baseQStart=window.qStart;
if(baseQStart)window.qStart=function(id,e){
  if(S?.bg!=='Tavernen-Stammgast')return baseQStart(id,e);
  const raw=QUEST_COST[id];if(!raw)return baseQStart(id,e);
  const effective=Math.max(1,Math.ceil(raw*.85)),refund=raw-effective;
  S.al=(Number(S.al)||0)+refund;
  const beforeQuest=S.quest;
  const out=baseQStart(id,e);
  if(S.quest===beforeQuest)S.al=Math.max(0,(Number(S.al)||0)-refund);
  return out;
};

/* Loot passive: a clean +5% bonus roll on unforced drops, upgrading one rarity tier. */
const baseCreateLoot=window.createLoot;
if(baseCreateLoot){
  const up={common:'magic',magic:'rare',rare:'mythic',mythic:'mythic'};
  window.createLoot=function(kind='general',forced=null,level=S?.lvl||1){
    const it=baseCreateLoot(kind,forced,level);
    if(S?.bg==='Schatten-Ausreißer'&&!forced&&it&&Math.random()<.05){
      const next=up[it.rarity];
      if(next&&next!==it.rarity){
        const ratio={magic:1.2,rare:1.45,mythic:2.3}[next]/{common:1,magic:1.2,rare:1.45,mythic:2.3}[it.rarity];
        it.rarity=next;it.power=Math.max(1,Math.round((it.power||1)*ratio));
        if(it.bonus)Object.keys(it.bonus).forEach(k=>it.bonus[k]=Math.max(1,Math.round(it.bonus[k]*ratio)));
        it.storyLuck=true;
      }
    }
    return it;
  };
  window.generateLoot=(kind='general')=>window.createLoot(kind,null,S?.lvl||1);
}

function storyCard(){
  const st=STORIES[S?.bg];if(!st)return '';
  return `<section class="ps-card"><img src="${st.img}" alt="${S.bg}"><div><small>PERSÖNLICHE GESCHICHTE</small><b>${S.bg}</b><span>${st.bonus}</span><p>${st.desc}</p></div></section>`;
}
function decorate(){
  /* Remove the duplicate detail panel on editor step 4. */
  const gate=document.getElementById('character-gate');
  if(gate&&/Persönliche Geschichte/.test(gate.textContent||''))gate.querySelector('.cg-detail')?.remove();
  /* Show the selected history in the hero profile. */
  if(S?.screen==='char'){
    const hv=document.querySelector('.hv3');
    if(hv&&!hv.querySelector('.ps-card')){
      const head=hv.querySelector('.hv3-head');
      if(head)head.insertAdjacentHTML('afterend',storyCard());
    }
  }
  /* Show the real effective AL cost in the tavern UI. */
  if(S?.bg==='Tavernen-Stammgast'&&S?.screen==='home'){
    document.querySelectorAll('.quest-card').forEach(card=>{
      const btn=card.querySelector('.start-q');if(!btn)return;
      const m=btn.getAttribute('onclick')?.match(/qStart\('([^']+)'/);const raw=m&&QUEST_COST[m[1]];if(!raw)return;
      const eff=Math.max(1,Math.ceil(raw*.85));btn.innerHTML=`Quest starten · ⚡ ${eff}`;
      card.querySelectorAll('.q-meta span').forEach(x=>{if(x.textContent.trim()===`⚡ ${raw}`)x.textContent=`⚡ ${eff}`});
    });
  }
}
const baseRender=window.render;
if(baseRender)window.render=function(){const out=baseRender.apply(this,arguments);queueMicrotask(decorate);return out};
new MutationObserver(decorate).observe(document.documentElement,{childList:true,subtree:true});

const css=document.createElement('style');css.textContent=`.ps-card{display:grid;grid-template-columns:88px 1fr;gap:12px;align-items:center;margin:8px 0;padding:10px 12px;border-radius:14px;background:linear-gradient(135deg,#261a34,#17111f);border:1px solid #f4c15d33}.ps-card img{width:86px;height:86px;object-fit:contain}.ps-card small,.ps-card b,.ps-card span,.ps-card p{display:block}.ps-card small{font-size:7px;letter-spacing:.9px;color:var(--muted)}.ps-card b{font-size:14px;margin:2px 0}.ps-card span{font-size:10px;color:var(--gold);font-weight:800}.ps-card p{font-size:8px;line-height:1.4;color:var(--muted);margin:3px 0 0}@media(max-width:430px){.ps-card{grid-template-columns:78px 1fr}.ps-card img{width:76px;height:76px}.ps-card b{font-size:13px}.ps-card span{font-size:9px}.ps-card p{font-size:8px}}`;
document.head.appendChild(css);decorate();
})();