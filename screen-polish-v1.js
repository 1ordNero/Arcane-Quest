(()=>{
function qs(s,r=document){return r.querySelector(s)}
function qsa(s,r=document){return [...r.querySelectorAll(s)]}
function text(el){return (el?.textContent||'').trim()}
function tavern(){
 if(S.screen!=='home')return;
 const root=qs('.tavern-focus')||qs('main');if(!root)return;
 const head=qs('.section-head',root);if(head){head.classList.add('sp-head');const small=qs(':scope > span.small',head);if(small&&/1 gleichzeitig/i.test(text(small)))small.textContent='1 aktive Quest';}
 qsa('.quest-card',root).forEach(card=>{
  card.classList.add('sp-quest');
  const meta=qs('.q-meta',card);if(meta)meta.classList.add('sp-meta');
  const btn=qs('.start-q',card);if(btn)btn.classList.add('sp-primary');
 });
 const active=qs('.active-quest',root);if(active)active.classList.add('sp-focus-card');
}
function hero(){
 if(S.screen!=='char')return;
 const root=qs('.he4,.hv3');if(!root)return;
 root.classList.add('sp-hero');
 qsa('.he4-tabs button,.hv3-tabs button',root).forEach(b=>b.classList.add('sp-tab'));
 qsa('.he4-item,.hv3-item',root).forEach(x=>x.classList.add('sp-item-row'));
 const stats=qs('.he4-stats,.hv3-stats',root);if(stats)stats.setAttribute('aria-label','Charakterwerte');
}
function city(){
 if(S.screen!=='city')return;
 const grid=qs('.cv2-grid');if(!grid)return;
 qsa(':scope > button',grid).forEach(b=>{b.classList.add('sp-location');const em=qs('em',b);if(em&&/Ab Stufe/i.test(text(em)))em.classList.add('sp-unlock')});
}
function merchantBank(){
 if(!['merchant','bank'].includes(S.screen))return;
 const root=qs('.mb2');if(!root)return;
 qsa('.mb2-item',root).forEach(x=>x.classList.add('sp-economy-row'));
 qsa('.mb2-act button',root).forEach(x=>x.classList.add('sp-inline-action'));
 const empty=qs('.mb2-list',root);if(empty&&!text(empty))empty.innerHTML='<div class="sp-empty">Noch keine Gegenstände in diesem Bereich.</div>';
}
function forge(){
 if(S.screen!=='forge')return;
 const root=qs('.fv4');if(!root)return;
 qsa('.fv4-item',root).forEach(x=>x.classList.add('sp-forge-row'));
 const tabs=qs('.fv4-tabs',root);if(tabs)tabs.setAttribute('aria-label','Schmiedebereiche');
}
function dungeon(){
 if(S.screen!=='dungeon')return;
 const root=qs('.dv7,.d1');if(!root)return;
 const room=qs('.dv7-room',root);if(room)room.classList.add('sp-dungeon-room');
 const head=qs('.dv7-head',root);if(head)head.classList.add('sp-run-head');
 qsa('.dv7-choices button',root).forEach(x=>x.classList.add('sp-choice'));
 qsa('.dv7-combat button',root).forEach(x=>x.classList.add('sp-combat-action'));
}
function arena(){
 if(S.screen!=='arena')return;
 const root=qs('.av2');if(!root)return;
 const overview=qs('.av3-overview',root);if(overview)overview.classList.add('sp-arena-overview');
 qsa('.av2-ops>button',root).forEach(x=>x.classList.add('sp-opponent'));
 qsa('.av2-stances button',root).forEach(x=>x.classList.add('sp-stance'));
}
function accessibility(){
 qsa('button').forEach(b=>{if(!b.getAttribute('type'))b.setAttribute('type','button')});
 qsa('img[alt=""]').forEach(i=>i.setAttribute('aria-hidden','true'));
}
function polish(){tavern();hero();city();merchantBank();forge();dungeon();arena();accessibility()}
const prev=window.render;if(typeof prev==='function')window.render=function(){const out=prev.apply(this,arguments);polish();queueMicrotask(polish);return out};
const css=document.createElement('style');css.textContent=`
/* Shared screen polish. Presentation only; gameplay state and handlers remain untouched. */
.sp-head{align-items:flex-end!important;margin-bottom:8px!important}.sp-head h1{font-size:22px!important;line-height:1.1!important}.sp-head .small{font-size:10px!important;color:var(--muted)!important}.sp-quest{border:1px solid #ffffff0d!important;background:linear-gradient(180deg,#1d1627,#181120)!important}.sp-quest.open{border-color:#a875ff55!important;background:linear-gradient(180deg,#241934,#181120)!important}.sp-quest .quest-summary{padding:10px!important;gap:10px!important}.sp-quest .q-title b{font-size:13px!important}.sp-quest .q-cat{font-size:8px!important}.sp-meta{gap:8px!important;margin-top:5px!important}.sp-meta span{font-size:9px!important;color:#c9bdd1!important}.sp-primary{min-height:46px!important;font-size:12px!important}.sp-focus-card{border:1px solid #a875ff44!important;border-radius:14px!important;background:linear-gradient(145deg,#241733,#17111f)!important}.event-choices button,.sp-choice{min-height:58px!important;text-align:left!important}.event-choices small,.sp-choice small{font-size:10px!important;line-height:1.35!important}
.sp-hero .he4-panel,.sp-hero .hv3-panel{background:linear-gradient(180deg,#1b1424,#17111f)!important}.sp-hero .sp-tab{font-size:11px!important}.sp-item-row{min-height:62px!important}.sp-item-row b{font-size:11px!important}.sp-item-row small{font-size:9px!important;line-height:1.35!important}.he4-detail,.hv3-detail{box-shadow:0 12px 28px #0003!important}.he4-actions button,.hv3-actions button{min-height:44px!important}
.sp-location{min-height:76px!important;border:1px solid #ffffff0d!important;background:linear-gradient(180deg,#1d1627,#181120)!important}.sp-location:not(:disabled):active{transform:translateY(1px)}.sp-location b{font-size:14px!important}.sp-location small{font-size:10px!important;line-height:1.35!important}.sp-unlock{display:inline-block!important;width:max-content;padding:3px 6px!important;border-radius:999px!important;background:#f4c15d0e!important;border:1px solid #f4c15d20!important}
.sp-economy-row,.sp-forge-row{min-height:68px!important;background:linear-gradient(180deg,#1d1627,#181120)!important}.sp-economy-row b,.sp-forge-row b{font-size:11px!important}.sp-economy-row small,.sp-forge-row small{font-size:9px!important;line-height:1.35!important}.sp-inline-action{min-height:38px!important;padding:7px 10px!important}.sp-empty{padding:22px 12px;text-align:center;color:var(--muted);font-size:11px;border:1px dashed #ffffff12;border-radius:12px}
.sp-run-head{position:sticky!important;top:64px!important;z-index:4!important;backdrop-filter:blur(10px)!important;background:#17111fed!important;border:1px solid #ffffff0d!important;border-radius:12px!important;padding:9px!important}.sp-dungeon-room{padding:14px!important;border-radius:15px!important;background:linear-gradient(180deg,#20162b,#15101c)!important;border:1px solid #ffffff0d!important}.sp-dungeon-room h2{font-size:20px!important}.sp-dungeon-room p{font-size:11px!important;line-height:1.45!important}.sp-combat-action{min-height:46px!important;font-size:11px!important}.dv7-bars span{font-size:10px!important}.dv7-auto-log{font-size:10px!important;line-height:1.45!important}
.sp-arena-overview{box-shadow:none!important}.sp-opponent{transition:border-color .15s ease,transform .15s ease!important}.sp-opponent:active{transform:translateY(1px)!important}.sp-stance{min-height:62px!important}.av3-section>span{max-width:45%!important}.av3-log{scrollbar-width:thin}
button:focus-visible{outline:2px solid var(--gold)!important;outline-offset:2px!important}button:disabled{cursor:not-allowed!important}.gai-inline-img,.gai-stat,.gai-semantic-img{object-fit:contain!important}
@media(max-width:520px){.sp-quest .quest-summary{padding:9px!important}.sp-quest .q-title b{font-size:12px!important}.sp-location{min-height:72px!important}.sp-economy-row,.sp-forge-row{min-height:64px!important}.sp-run-head{top:60px!important}.sp-dungeon-room{padding:11px!important}.av3-section>span{display:none!important}}
@media(prefers-reduced-motion:reduce){*,*:before,*:after{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
`;document.head.appendChild(css);polish();
})();