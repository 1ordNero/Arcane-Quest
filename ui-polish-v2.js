(()=>{
function removeMerchantBankTab(){
 if(S?.screen!=='merchant')return;
 document.querySelectorAll('.mb2-tabs button').forEach(b=>{if(/^Bank\b/i.test((b.textContent||'').trim()))b.remove()});
 const tabs=document.querySelector('.mb2-tabs');if(tabs)tabs.style.gridTemplateColumns='repeat(2,1fr)';
}
function forgeArtFallback(){
 if(S?.screen!=='forge'||typeof window.itemAssetTag!=='function')return;
 document.querySelectorAll('.fv4-item').forEach(row=>{const host=row.querySelector('.fv4-artbox');if(!host||host.querySelector('img'))return;const name=row.querySelector('.fv4-info b')?.textContent.replace(/\s+\+\d+$/,'').trim();const it=[...(S.items||[]),...Object.values(S.eq||{}).filter(Boolean)].find(x=>x.name===name);if(it)host.innerHTML=itemAssetTag(it,null,'fv4-art')});
 const detail=document.querySelector('.fv4-detail');if(detail){const host=detail.querySelector('.fv4-big');if(host&&!host.querySelector('img')){const name=detail.querySelector('h2')?.textContent.replace(/\s+\+\d+$/,'').trim();const it=[...(S.items||[]),...Object.values(S.eq||{}).filter(Boolean)].find(x=>x.name===name);if(it)host.innerHTML=itemAssetTag(it,null,'fv4-art')}}
}
function polish(){removeMerchantBankTab();forgeArtFallback()}
const prev=window.render;if(typeof prev==='function')window.render=function(){const r=prev.apply(this,arguments);polish();queueMicrotask(polish);return r};
const css=document.createElement('style');css.textContent=`
/* Footer: the whole visual icon area belongs to the button hit target. */
@media(max-width:699px){.tabs.aq-footer .aq-nav{height:76px!important;min-height:76px!important;padding:0 2px 5px!important;margin-top:-12px!important;justify-content:flex-end!important}.tabs.aq-footer .aq-nav-art{bottom:19px!important}.tabs.aq-footer .aq-hero .aq-nav-art{bottom:18px!important}.tabs.aq-footer .aq-nav-label{transform:translateY(0)!important}.tabs.aq-footer{pointer-events:auto!important}.tabs.aq-footer .aq-nav{pointer-events:auto!important}}
/* Hero equipment labels: overlay them inside the lower third instead of hugging the frame. */
.he4-slot,.hv3-slot{position:relative!important}.he4-slot>small,.hv3-slot>small{position:absolute!important;left:5px!important;right:5px!important;bottom:7px!important;z-index:4!important;margin:0!important;padding:3px 4px!important;border-radius:6px!important;text-align:center!important;line-height:1.05!important;background:linear-gradient(180deg,transparent,#0d0912d9 35%,#0d0912ed)!important;color:var(--text)!important;text-shadow:0 1px 3px #000!important;pointer-events:none!important}.he4-slot.has>span,.hv3-slot.has>span{transform:translateY(-5px)!important}
/* Current item artwork is also used consistently by Forge v4. */
.fv4-artbox,.fv4-big{display:grid!important;place-items:center!important;overflow:hidden!important}.fv4-art{display:block!important;width:100%!important;height:100%!important;object-fit:contain!important;transform:scale(1.32)!important;transform-origin:center!important;pointer-events:none!important}
/* Merchant has only Buy/Sell. Bank remains its own city destination. */
.mb2-tabs{grid-template-columns:repeat(2,1fr)!important}
`;document.head.appendChild(css);polish();
})();