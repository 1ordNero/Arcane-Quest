(()=>{
'use strict';
const MILESTONES=[1,5,10,15,20,25];
const esc=v=>String(v??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]));
function skills(){return window.SKILL_DATA?.[S.cls]||[]}
function earnedCount(){const lvl=Math.max(1,Number(S.lvl)||1);return Math.min(6,1+Math.floor(lvl/5))}
function ensure(){
 const all=skills(),ids=all.map(x=>x.id);if(!ids.length)return null;
 S.skillProgression=S.skillProgression||{};
 let p=S.skillProgression,dirty=false;
 if(p.cls!==S.cls||!Array.isArray(p.unlocked)){
  const entitlement=earnedCount();
  const previous=[...(S.skillSystem?.loadout||[])].filter((id,i,a)=>ids.includes(id)&&a.indexOf(id)===i).slice(0,entitlement);
  p={cls:S.cls,unlocked:previous.length?previous:[ids[0]],seenLevel:Number(S.lvl)||1};
  S.skillProgression=p;dirty=true;
 }
 const clean=p.unlocked.filter((id,i,a)=>ids.includes(id)&&a.indexOf(id)===i);
 if(clean.length!==p.unlocked.length){p.unlocked=clean;dirty=true}
 if(!p.unlocked.length){p.unlocked=[ids[0]];dirty=true}
 const entitlement=earnedCount();
 if(p.unlocked.length>entitlement){p.unlocked=p.unlocked.slice(0,entitlement);dirty=true}
 S.skillSystem=S.skillSystem||{cls:S.cls,loadout:[],resource:100,maxResource:100,rotation:0};
 const oldLoad=(S.skillSystem.loadout||[]).join('|');
 S.skillSystem.loadout=(S.skillSystem.loadout||[]).filter(id=>p.unlocked.includes(id)).slice(0,4);
 for(const id of p.unlocked){if(S.skillSystem.loadout.length>=Math.min(4,p.unlocked.length))break;if(!S.skillSystem.loadout.includes(id))S.skillSystem.loadout.push(id)}
 if(oldLoad!==S.skillSystem.loadout.join('|'))dirty=true;
 if(dirty)queueMicrotask(()=>{try{save()}catch{}});
 return p;
}
function pending(){const p=ensure();return p?Math.max(0,earnedCount()-p.unlocked.length):0}
function unlockedIds(){const p=ensure();return p?[...p.unlocked]:[]}
function unlockedSkills(){const set=new Set(unlockedIds());return skills().filter(x=>set.has(x.id))}
function lockedSkills(){const set=new Set(unlockedIds());return skills().filter(x=>!set.has(x.id))}
function nextMilestone(){const e=earnedCount();return MILESTONES[e]||null}
function unlock(id){
 const p=ensure(),sk=skills().find(x=>x.id===id);if(!p||!sk||p.unlocked.includes(id)||pending()<=0)return false;
 p.unlocked.push(id);
 if((S.skillSystem?.loadout||[]).length<4&&!S.skillSystem.loadout.includes(id))S.skillSystem.loadout.push(id);
 save();return true;
}
function unlockModal(){
 const list=lockedSkills();
 return `<div class="modal hero-skill-modal skill-unlock-modal" onclick="heroSkillUnlockClose()"><div class="sheet hero-skill-sheet" onclick="event.stopPropagation()"><div class="hero-skill-head"><div><small>LEVEL ${Number(S.lvl)||1} · ${esc(S.cls)}</small><h2>Neue Fertigkeit wählen</h2></div><button onclick="heroSkillUnlockClose()">×</button></div><div class="skill-unlock-intro">Du hast einen neuen Fertigkeitspunkt erreicht. Wähle eine Fähigkeit, die dauerhaft für diese Klassenlaufbahn freigeschaltet wird.</div><div class="hero-skill-list">${list.map(sk=>`<button onclick="heroSkillUnlockSet('${sk.id}')"><span>${sk.icon}</span><div><b>${esc(sk.name)}</b><small>${sk.type.toUpperCase()} · ${sk.cost}</small><p>${esc(sk.desc)}</p></div></button>`).join('')}</div></div></div>`;
}
function mountUnlockModal(){
 document.querySelectorAll('.skill-unlock-modal').forEach(x=>x.remove());
 if(S.screen==='char'&&S.heroSkillUnlockOpen&&pending()>0)document.body.insertAdjacentHTML('beforeend',unlockModal());
}
function injectHeaderNotice(){
 document.querySelectorAll('.skill-header-notice').forEach(x=>x.remove());
 const p=pending();if(!p)return;
 const header=document.querySelector('header')||document.querySelector('.topbar')||document.querySelector('.app-header');if(!header)return;
 const btn=document.createElement('button');btn.className='skill-header-notice';btn.type='button';btn.setAttribute('aria-label',p>1?`${p} neue Fertigkeiten wählen`:'Neue Fertigkeit wählen');
 btn.innerHTML=`<span class="shn-rune">✦</span><span class="shn-copy"><b>${p>1?`${p} Skills wählen`:'Neuen Skill wählen'}</b><small>Level ${Number(S.lvl)||1}</small></span><strong>${p}</strong>`;
 btn.onclick=()=>{S.screen='char';S.heroView='skills';save();render();requestAnimationFrame(()=>window.heroSkillUnlockOpen?.())};
 header.appendChild(btn);
}
function injectProgress(){
 ensure();injectHeaderNotice();
 if(S.screen!=='char'||(S.heroView||'equipment')!=='skills')return mountUnlockModal();
 const panel=document.querySelector('.he4-skills')?.closest('.he4-panel');if(!panel)return mountUnlockModal();
 panel.querySelector('.skill-progress-card')?.remove();
 const p=pending(),next=nextMilestone(),count=unlockedIds().length,total=skills().length;
 const el=document.createElement(p?'button':'div');el.className=`skill-progress-card ${p?'ready':'status'}`;
 if(p){el.innerHTML=`<span class="spc-rune">✦</span><div><b>${p>1?`${p} neue Fertigkeiten wählen`:'Neue Fertigkeit wählen'}</b><small>${count}/${total} freigeschaltet · neue Wahl alle 5 Level</small></div><strong>Wählen</strong>`;el.onclick=()=>window.heroSkillUnlockOpen?.()}
 else if(next){el.innerHTML=`<span class="spc-rune">◇</span><div><b>Nächste Fertigkeit auf Level ${next}</b><small>${count}/${total} freigeschaltet · alle 5 Level eine neue Wahl</small></div>`}
 else{el.innerHTML=`<span class="spc-rune">◆</span><div><b>Alle Fertigkeiten freigeschaltet</b><small>${count}/${total} Klassenskills verfügbar</small></div>`}
 panel.querySelector('.he4-title')?.insertAdjacentElement('afterend',el);
 mountUnlockModal();
}
window.getUnlockedSkillIds=unlockedIds;
window.getUnlockedSkills=unlockedSkills;
window.getLockedSkills=lockedSkills;
window.getPendingSkillChoices=pending;
window.getNextSkillMilestone=nextMilestone;
window.unlockClassSkill=unlock;
window.getSkillProgression=()=>({unlocked:unlockedSkills(),locked:lockedSkills(),pending:pending(),earned:earnedCount(),nextLevel:nextMilestone(),milestones:[...MILESTONES]});
const baseSet=window.skillSetSlot;
window.skillSetSlot=function(slot,id){if(!unlockedIds().includes(id)){toast?.('Diese Fertigkeit ist noch nicht freigeschaltet.');return}return baseSet?.(slot,id)};
window.heroSkillUnlockOpen=function(){if(pending()<=0)return;S.heroSkillUnlockOpen=true;save();mountUnlockModal();requestAnimationFrame(mountUnlockModal)};
window.heroSkillUnlockClose=function(){delete S.heroSkillUnlockOpen;save();document.querySelectorAll('.skill-unlock-modal').forEach(x=>x.remove())};
window.heroSkillUnlockSet=function(id){if(!unlock(id))return;delete S.heroSkillUnlockOpen;save();document.querySelectorAll('.skill-unlock-modal').forEach(x=>x.remove());render()};
window.Arcane?.on?.('afterRenderSettled',injectProgress);
window.Arcane?.on?.('bootReady',injectProgress);
const css=document.createElement('style');css.textContent=`
.skill-progress-card{width:100%;margin:0 0 9px!important;padding:9px 10px!important;display:grid!important;grid-template-columns:34px 1fr auto!important;gap:9px!important;align-items:center!important;text-align:left!important;border:1px solid #ffffff10!important;border-radius:12px!important;background:#ffffff045!important;color:var(--text)!important;box-shadow:none!important}
.skill-progress-card.ready{border-color:#a875ff66!important;background:linear-gradient(135deg,#a875ff1f,#f4c15d0b)!important;box-shadow:inset 3px 0 #a875ff!important}
.skill-progress-card .spc-rune{width:32px;height:32px;display:grid;place-items:center;border-radius:9px;background:#0c0812;border:1px solid #a875ff44;color:#c59cff;font-size:17px}
.skill-progress-card b,.skill-progress-card small{display:block}.skill-progress-card b{font-size:10px}.skill-progress-card small{margin-top:2px;font-size:7px;color:var(--muted)}.skill-progress-card strong{font-size:8px;color:var(--gold)}
.skill-unlock-intro{margin:0 0 9px;padding:8px 9px;border:1px solid #ffffff0d;border-radius:10px;background:#ffffff045;color:var(--muted);font-size:9px;line-height:1.4}
.skill-header-notice{position:absolute!important;right:76px!important;top:50%!important;transform:translateY(-50%)!important;z-index:8!important;display:flex!important;align-items:center!important;gap:6px!important;min-height:38px!important;padding:5px 8px!important;border:1px solid #a875ff70!important;border-radius:12px!important;background:linear-gradient(135deg,#3a2157f2,#24152ff2)!important;color:var(--text)!important;box-shadow:0 0 18px #a875ff24!important;animation:skillHeaderPulse 2.2s ease-in-out infinite!important}
.skill-header-notice .shn-rune{display:grid;place-items:center;width:25px;height:25px;border-radius:8px;background:#0d0813;border:1px solid #c59cff55;color:#d8b6ff;font-size:14px}.skill-header-notice .shn-copy{text-align:left;line-height:1.05}.skill-header-notice .shn-copy b,.skill-header-notice .shn-copy small{display:block;white-space:nowrap}.skill-header-notice .shn-copy b{font-size:9px}.skill-header-notice .shn-copy small{margin-top:3px;font-size:6px;color:var(--gold)}.skill-header-notice strong{display:grid;place-items:center;min-width:18px;height:18px;padding:0 4px;border-radius:99px;background:var(--gold);color:#211322;font-size:8px}
@keyframes skillHeaderPulse{0%,100%{box-shadow:0 0 10px #a875ff18}50%{box-shadow:0 0 22px #a875ff55}}
@media(max-width:430px){.skill-header-notice{right:68px!important;padding:5px 6px!important}.skill-header-notice .shn-copy{display:none}.skill-header-notice strong{position:absolute;right:-5px;top:-5px}}
`;document.head.appendChild(css);
ensure();
})();