(()=>{
const D=()=>window.S?.dungeonV1;
const esc=v=>String(v??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]));
const defs=[
 {id:'aegis',icon:'⬡',name:'Bollwerk-Resonanz',needs:['wardstone','ward'],desc:'Wächterstein + Wächterpfad',detail:'Nach Kämpfen zusätzliche Heilung. Der Hüter verstärkt dafür sein Phasenschild.'},
 {id:'blood',icon:'◆',name:'Blutpakt',needs:['gravecoin','greed'],desc:'Grabmünze + Blutpfad',detail:'Mehr Gold aus Elite/Boss. Der Hüter schlägt härter.'},
 {id:'arcane',icon:'◇',name:'Arkane Brechung',needs:['runemirror','arcane'],desc:'Runenspiegel + Arkaner Pfad',detail:'Mehr XP und der Hüter verliert einen Teil seines Phasenschilds.'},
 {id:'thorn',icon:'✣',name:'Dornenlicht',needs:['thornidol','lantern'],desc:'Dornenidol + Seelenlaterne',detail:'Gegner starten geschwächt; Siege stellen zusätzlich HP wieder her.'}
];
function ensure(d){if(!d)return null;d.resonanceV1=d.resonanceV1||{appliedStarts:{},appliedRewards:{},bossAdapted:false,bossRewarded:false,announced:[]};return d.resonanceV1}
function relicIds(d){return new Set((d.relicV1?.relics||[]).map(r=>r.id))}
function markIds(d){return new Set((d.depthV1?.marks||[]).map(m=>m.id))}
function active(d){const rs=relicIds(d),ms=markIds(d);return defs.filter(x=>x.needs.every(n=>rs.has(n)||ms.has(n)))}
function has(a,id){return a.some(x=>x.id===id)}
function baseline(d){const rv=ensure(d),k=String(d.room);if(!rv.baseline)rv.baseline={};if(!rv.baseline[k]&&['room','event','combat','rest','treasure'].includes(d.state))rv.baseline[k]={gold:Number(d.gold)||0,xp:Number(d.xp)||0}}
function startEffects(d,a){if(d.state!=='combat'||!d.enemy)return false;const rv=ensure(d),k=String(d.room);if(rv.appliedStarts[k])return false;rv.appliedStarts[k]=true;let changed=false;const e=d.enemy;
 if(has(a,'thorn')){const cut=Math.max(1,Math.round(e.max*.10));e.hp=Math.max(1,e.hp-cut);changed=true}
 if(e.boss&&!rv.bossAdapted){rv.bossAdapted=true;const adaptations=[];
  if(has(a,'aegis')){const add=Math.max(1,Math.round(e.max*.12));e.maxShield=(e.maxShield||0)+add;e.shield=(e.shield||0)+add;adaptations.push(`+${add} Phasenschild`)}
  if(has(a,'blood')){e.damage=Math.max(1,Math.round(e.damage*1.12));adaptations.push('+12% Schaden')}
  if(has(a,'arcane')&&e.shield>0){const cut=Math.max(1,Math.round(e.shield*.35));e.shield=Math.max(0,e.shield-cut);adaptations.push(`−${cut} Phasenschild`)}
  if(a.length>=2){const old=e.max;e.max=Math.max(1,Math.round(e.max*1.10));e.hp+=e.max-old;e.damage=Math.max(1,Math.round(e.damage*1.05));e.resonantBoss=true;adaptations.push('Resonanz: +10% HP · +5% Schaden')}
  if(adaptations.length){d.feedback={good:false,title:'Der Hüter antwortet',text:`Dein Run hat Spuren hinterlassen: ${adaptations.join(' · ')}.`};window.toast?.('Der Hüter passt sich deiner Resonanz an.');changed=true}
 }
 return changed}
function rewardEffects(d,a){if(!['feedback','cleared','complete'].includes(d.state))return false;const rv=ensure(d),k=String(d.room);if(rv.appliedRewards[k])return false;const base=rv.baseline?.[k];if(!base){rv.appliedRewards[k]=true;return false}rv.appliedRewards[k]=true;const combat=!!d.relicV1?.combatStarts?.[k],goldGain=Math.max(0,(Number(d.gold)||0)-base.gold),xpGain=Math.max(0,(Number(d.xp)||0)-base.xp);let gold=0,xp=0,heal=0;
 if(combat&&has(a,'aegis'))heal+=Math.max(1,Math.round(d.maxHp*.04));
 if(combat&&has(a,'thorn'))heal+=Math.max(1,Math.round(d.maxHp*.03));
 if(has(a,'blood')&&combat)gold+=Math.round(goldGain*(d.state==='complete'?.30:.15));
 if(has(a,'arcane'))xp+=Math.round(xpGain*(d.state==='complete'?.30:.15));
 if(d.state==='complete'&&d.enemy==null&&a.length>=2&&!rv.bossRewarded){rv.bossRewarded=true;gold+=Math.max(18,Math.round((Number(S.lvl)||1)*7+20));xp+=Math.max(12,Math.round((Number(S.lvl)||1)*4+14))}
 if(gold)d.gold+=gold;if(xp)d.xp+=xp;if(heal)d.hp=Math.min(d.maxHp,d.hp+heal);if(gold||xp||heal){const p=[];if(gold)p.push(`+${gold} Gold`);if(xp)p.push(`+${xp} XP`);if(heal)p.push(`+${heal} HP`);window.toast?.(`Resonanz: ${p.join(' · ')}`);return true}return false}
function decorate(d,a){document.querySelector('.dres-strip')?.remove();if(!a.length)return;const anchor=document.querySelector('.dr1-strip')||document.querySelector('.dd1-marks')||document.querySelector('.dv7-head');if(!anchor)return;const el=document.createElement('div');el.className='dres-strip';el.innerHTML=a.map(x=>`<span title="${esc(x.detail)}">${x.icon} ${esc(x.name)}</span>`).join('');anchor.insertAdjacentElement('afterend',el);const room=document.querySelector('.dv7-room');if(room&&d.enemy?.boss){let badge=room.querySelector('.dres-boss');if(!badge){badge=document.createElement('div');badge.className='dres-boss';room.insertAdjacentElement('afterbegin',badge)}badge.innerHTML=`<b>REAKTIVE RESONANZ</b><span>${a.length>=2?'Der Hüter erkennt mehrere Run-Synergien und wird stärker.':'Der Hüter reagiert auf deinen gewählten Pfad.'}</span>`}}
let busy=false;
function apply(){if(busy)return;const d=D();if(!d)return;const rv=ensure(d),a=active(d);baseline(d);let changed=false;if(startEffects(d,a))changed=true;if(rewardEffects(d,a))changed=true;decorate(d,a);if(changed){busy=true;save?.();render?.();queueMicrotask(()=>busy=false)}}
const render0=window.render;if(typeof render0==='function')window.render=function(){const out=render0.apply(this,arguments);queueMicrotask(apply);return out};new MutationObserver(()=>queueMicrotask(apply)).observe(document.body,{subtree:true,childList:true});
const st=document.createElement('style');st.textContent=`.dres-strip{display:flex;gap:4px;margin:2px 2px 5px;overflow:hidden}.dres-strip span{padding:3px 6px;border-radius:999px;background:linear-gradient(90deg,#f4c15d0d,#a875ff0d);border:1px solid #f4c15d28;font-size:7px;color:#ead7aa;white-space:nowrap}.dres-boss{margin:0 0 7px;padding:6px 8px;border-radius:9px;text-align:left;background:#e86a7a0b;border:1px solid #e86a7a28}.dres-boss b,.dres-boss span{display:block}.dres-boss b{font-size:7px;letter-spacing:1px;color:#f0a0ad}.dres-boss span{font-size:8px;color:#bfaebf;margin-top:1px}@media(max-height:760px){.dres-strip{margin-bottom:3px}.dres-boss{padding:5px 7px;margin-bottom:5px}}`;document.head.appendChild(st);queueMicrotask(apply)
})();