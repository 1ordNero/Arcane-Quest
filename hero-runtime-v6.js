(()=>{
function skillPicker(slot){
 const list=window.SKILL_DATA?.[S.cls]||[];
 const res={Krieger:'Wut',Magier:'Mana',Druide:'Naturfokus',Waldläufer:'Energie',Hexenmeister:'Seelenfragmente',Totenbeschwörer:'Essenz des Todes'}[S.cls]||'Ressource';
 const active=S.skillSystem?.loadout?.[slot];
 const esc=v=>String(v??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]));
 return `<div class="modal hero-skill-modal" onclick="heroSkillClose()"><div class="sheet hero-skill-sheet" onclick="event.stopPropagation()"><div class="hero-skill-head"><div><small>SLOT ${slot+1} · ${esc(S.cls)}</small><h2>Fertigkeit wählen</h2></div><button onclick="heroSkillClose()">×</button></div><div class="hero-skill-list">${list.map(sk=>`<button class="${active===sk.id?'selected':''}" onclick="heroSkillSet(${slot},'${sk.id}')"><span>${sk.icon}</span><div><b>${esc(sk.name)}</b><small>${sk.type.toUpperCase()} · ${sk.cost} ${res}</small><p>${esc(sk.desc)}</p></div></button>`).join('')}</div></div></div>`;
}
function mountPicker(){
 document.querySelectorAll('.hero-skill-modal').forEach(x=>x.remove());
 if(S.screen==='char'&&S.heroSkillSlot!==undefined)document.body.insertAdjacentHTML('beforeend',skillPicker(Number(S.heroSkillSlot)));
}
window.heroSkillOpen=function(slot){S.heroSkillSlot=Number(slot);save();mountPicker();requestAnimationFrame(mountPicker)};
window.heroSkillClose=function(){delete S.heroSkillSlot;save();document.querySelectorAll('.hero-skill-modal').forEach(x=>x.remove())};
window.heroSkillSet=function(slot,id){
 if(typeof window.skillSetSlot==='function')window.skillSetSlot(Number(slot),id);
 else {S.skillSystem=S.skillSystem||{};S.skillSystem.loadout=S.skillSystem.loadout||[];const arr=S.skillSystem.loadout,other=arr.indexOf(id),old=arr[slot];arr[slot]=id;if(other>=0&&other!==slot)arr[other]=old;save()}
 delete S.heroSkillSlot;save();render();
};
function ensureHero(){
 if(S.screen!=='char')return;
 const main=document.querySelector('main');if(!main||typeof window.char!=='function')return;
 const current=main.firstElementChild;
 if(!current?.classList?.contains('he4'))main.innerHTML=window.char();
 const hero=main.querySelector('.he4');if(hero)hero.classList.add('he5-integrated');
 mountPicker();
}
const prev=window.render;window.render=function(){const r=prev.apply(this,arguments);ensureHero();queueMicrotask(ensureHero);requestAnimationFrame(ensureHero);return r};
const css=document.createElement('style');css.textContent=`body.hero-runtime-loading main{visibility:hidden}.hero-skill-modal{z-index:80!important}.hero-skill-sheet{max-height:86vh}.hero-skill-head{display:flex;align-items:center;justify-content:space-between;gap:10px}.hero-skill-head small{font-size:9px;color:var(--muted)}.hero-skill-head h2{margin:2px 0 8px}.hero-skill-head button{background:#ffffff0b;box-shadow:none;padding:7px 11px}.hero-skill-list{display:grid;gap:7px}.hero-skill-list>button{display:grid;grid-template-columns:44px 1fr;gap:9px;align-items:center;text-align:left;background:#ffffff07;border:1px solid #ffffff10;box-shadow:none;padding:9px}.hero-skill-list>button.selected{border-color:var(--accent);background:#a875ff16}.hero-skill-list>button>span{font-size:25px;text-align:center}.hero-skill-list b,.hero-skill-list small{display:block}.hero-skill-list b{font-size:12px}.hero-skill-list small{font-size:8px;color:var(--gold)}.hero-skill-list p{font-size:9px;color:var(--muted);margin:4px 0 0}`;document.head.appendChild(css);
ensureHero();
})();