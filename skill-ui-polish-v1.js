(()=>{
'use strict';
function syncModalState(){
 const modal=document.querySelector('.hero-skill-modal');
 const open=!!modal;
 document.body.classList.toggle('hero-skill-open',open);
 document.querySelectorAll('.skill-overlay-suppressed').forEach(el=>el.classList.remove('skill-overlay-suppressed'));
 if(!open)return;
 document.querySelectorAll('body button').forEach(btn=>{
  if(btn.closest('.hero-skill-modal'))return;
  const t=(btn.textContent||'').trim().toLowerCase();
  if(t==='grafiken' || t==='reset' || t.startsWith('grafiken '))btn.classList.add('skill-overlay-suppressed');
 });
}
const observer=new MutationObserver(syncModalState);
observer.observe(document.documentElement,{childList:true,subtree:true});
window.Arcane?.on?.('afterRenderSettled',syncModalState);

const css=document.createElement('style');
css.textContent=`
/* Hero skill overview: dense RPG cards with a clear icon/text hierarchy. */
.he5-integrated .he4-panel:has(.he4-skills){padding:10px!important}
.he5-integrated .he4-panel:has(.he4-skills) .he4-title{margin-bottom:10px!important}
.he5-integrated .he4-panel:has(.he4-skills) .he4-title b{font-size:14px!important}
.he5-integrated .he4-panel:has(.he4-skills) .he4-title small{font-size:9px!important;margin-top:2px!important}
.he4-skills{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important}
.he4-skills>button{display:grid!important;grid-template-columns:54px minmax(0,1fr)!important;grid-template-rows:auto 1fr!important;column-gap:10px!important;row-gap:3px!important;align-items:center!important;min-height:88px!important;padding:10px!important;text-align:left!important;background:linear-gradient(145deg,#ffffff075,#ffffff035)!important;border:1px solid #ffffff10!important;border-radius:13px!important;overflow:hidden!important}
.he4-skills>button:active{transform:scale(.985)!important}
.he4-skills>button>span{grid-column:1!important;grid-row:1/3!important;display:grid!important;place-items:center!important;width:54px!important;height:54px!important;margin:0!important;padding:3px!important;border-radius:12px!important;background:#0b0710!important;border:1px solid #a875ff35!important;box-shadow:inset 0 0 16px #a875ff12!important;font-size:0!important;overflow:hidden!important}
.he4-skills>button>span>img.arc-skill-icon{display:block!important;width:48px!important;height:48px!important;min-width:48px!important;min-height:48px!important;max-width:48px!important;max-height:48px!important;margin:0!important;border-radius:9px!important;object-fit:cover!important}
.he4-skills>button>b{grid-column:2!important;grid-row:1!important;display:block!important;align-self:end!important;font-size:11px!important;line-height:1.15!important;color:var(--text)!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
.he4-skills>button>small{grid-column:2!important;grid-row:2!important;display:-webkit-box!important;-webkit-line-clamp:2!important;-webkit-box-orient:vertical!important;overflow:hidden!important;align-self:start!important;font-size:8px!important;line-height:1.35!important;color:var(--muted)!important}

/* True app-level bottom sheet. */
.hero-skill-modal{position:fixed!important;inset:0!important;width:100vw!important;height:100dvh!important;z-index:2147483600!important;margin:0!important;padding:0!important;display:flex!important;align-items:flex-end!important;justify-content:center!important;background:rgba(7,4,11,.78)!important;backdrop-filter:blur(8px)!important;overflow:hidden!important}
.hero-skill-sheet{position:relative!important;inset:auto!important;transform:none!important;width:min(760px,100vw)!important;max-width:760px!important;height:auto!important;max-height:72dvh!important;margin:0!important;padding:10px 12px calc(14px + env(safe-area-inset-bottom))!important;border:1px solid #ffffff16!important;border-bottom:0!important;border-radius:22px 22px 0 0!important;background:linear-gradient(180deg,#21172d 0%,#130e1b 100%)!important;box-shadow:0 -24px 70px #000d!important;overflow:hidden!important}
.hero-skill-sheet:before{content:'';display:block;width:42px;height:4px;margin:0 auto 10px;border-radius:99px;background:#ffffff2b}
.hero-skill-head{position:sticky!important;top:0!important;z-index:2!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:10px!important;margin:0 -2px 8px!important;padding:0 2px 8px!important;background:linear-gradient(180deg,#21172d 78%,transparent)!important}
.hero-skill-head small{font-size:9px!important;letter-spacing:.4px!important;color:var(--muted)!important}
.hero-skill-head h2{font-size:20px!important;line-height:1.1!important;margin:2px 0 0!important}
.hero-skill-head button{width:40px!important;height:40px!important;min-height:40px!important;padding:0!important;border-radius:12px!important;background:#ffffff0b!important;font-size:22px!important}
.hero-skill-list{display:grid!important;gap:7px!important;max-height:calc(72dvh - 88px)!important;padding:1px 1px 4px!important;overflow-y:auto!important;overscroll-behavior:contain!important;scrollbar-width:thin!important}
.hero-skill-list>button{display:grid!important;grid-template-columns:50px minmax(0,1fr)!important;gap:10px!important;align-items:center!important;min-height:76px!important;margin:0!important;padding:8px!important;text-align:left!important;border:1px solid #ffffff10!important;border-radius:13px!important;background:#ffffff055!important;box-shadow:none!important}
.hero-skill-list>button.selected{border-color:#a875ffaa!important;background:linear-gradient(135deg,#a875ff20,#ffffff055)!important;box-shadow:inset 3px 0 #a875ff!important}
.hero-skill-list>button>span{display:grid!important;place-items:center!important;width:50px!important;height:50px!important;margin:0!important;padding:2px!important;border-radius:11px!important;background:#0a0710!important;border:1px solid #ffffff10!important;font-size:0!important;overflow:hidden!important}
.hero-skill-list>button>span>img.arc-skill-icon{display:block!important;width:46px!important;height:46px!important;min-width:46px!important;min-height:46px!important;max-width:46px!important;max-height:46px!important;margin:0!important;border-radius:9px!important;object-fit:cover!important}
.hero-skill-list b{font-size:12px!important;line-height:1.15!important}
.hero-skill-list small{font-size:8px!important;margin-top:2px!important;color:var(--gold)!important}
.hero-skill-list p{display:-webkit-box!important;-webkit-line-clamp:2!important;-webkit-box-orient:vertical!important;overflow:hidden!important;font-size:9px!important;line-height:1.35!important;margin:4px 0 0!important;color:var(--muted)!important}

/* While choosing a skill, the sheet owns the interaction layer. */
body.hero-skill-open{overflow:hidden!important}
body.hero-skill-open .tabs.aq-footer{z-index:60!important;opacity:.12!important;pointer-events:none!important;filter:brightness(.45)!important}
body.hero-skill-open .skill-overlay-suppressed{opacity:0!important;visibility:hidden!important;pointer-events:none!important}

@media(max-width:520px){
 .he4-skills{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:7px!important}
 .he4-skills>button{grid-template-columns:48px minmax(0,1fr)!important;min-height:82px!important;padding:8px!important;column-gap:8px!important}
 .he4-skills>button>span{width:48px!important;height:48px!important}
 .he4-skills>button>span>img.arc-skill-icon{width:42px!important;height:42px!important;min-width:42px!important;min-height:42px!important;max-width:42px!important;max-height:42px!important}
 .he4-skills>button>b{font-size:10px!important}
 .he4-skills>button>small{font-size:7.5px!important}
 .hero-skill-sheet{max-height:74dvh!important;padding-left:10px!important;padding-right:10px!important}
 .hero-skill-list{max-height:calc(74dvh - 88px)!important}
}
@media(max-width:380px){
 .he4-skills{grid-template-columns:1fr!important}
 .he4-skills>button{min-height:72px!important}
 .hero-skill-sheet{max-height:77dvh!important}
 .hero-skill-list{max-height:calc(77dvh - 88px)!important}
}
`;
document.head.appendChild(css);
syncModalState();
})();
