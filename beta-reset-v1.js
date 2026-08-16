(()=>{
function confirmReset(){return confirm('Beta-Test vollständig zurücksetzen?\n\nSpielstand, Charakter, Sicherungen und lokaler Arcane-Quest-Cache werden gelöscht. Der Vorgang kann nicht rückgängig gemacht werden.')}
function resetUrl(){return './reset.html?ts='+Date.now()}
window.arcaneBetaReset=function(){if(!confirmReset())return;window.__ARCANE_INTENTIONAL_RESET=true;location.replace(resetUrl())};
window.reset=window.arcaneBetaReset;
async function refreshAssets(){
 if(window.Arcane?.assets?.forceRefresh){await window.Arcane.assets.forceRefresh();return}
 try{sessionStorage.setItem('arcaneAssetRefreshToken',String(Date.now()));navigator.serviceWorker?.controller?.postMessage('PURGE_IMAGES')}catch{}
 location.reload();
}
window.arcaneBetaRefreshAssets=refreshAssets;
function addControl(){let box=document.querySelector('.beta-reset-control');if(!box){box=document.createElement('div');box.className='beta-reset-control';
 const assets=document.createElement('button');assets.type='button';assets.className='beta-assets-link';assets.textContent='Grafiken ↻';assets.setAttribute('aria-label','Grafiken neu laden, Spielstand behalten');assets.addEventListener('click',refreshAssets);
 const link=document.createElement('button');link.type='button';link.className='beta-reset-link';link.textContent='Reset';link.setAttribute('aria-label','Beta-Test vollständig zurücksetzen');link.addEventListener('click',()=>window.arcaneBetaReset());
 const note=document.createElement('small');note.textContent='Beta-Werkzeuge';box.append(assets,link,note);document.body.appendChild(box)}return box}
if(window.Arcane?.on){Arcane.on('afterRenderSettled',addControl);Arcane.on('bootReady',addControl)}
const st=document.createElement('style');st.textContent=`.beta-reset-control{position:fixed;right:10px;bottom:calc(92px + env(safe-area-inset-bottom));z-index:10000;display:flex;align-items:center;gap:5px;padding:5px 6px;border-radius:10px;background:#17111fe8;border:1px solid #e86a7a38;box-shadow:0 4px 16px #0008;opacity:.72;pointer-events:auto!important}.beta-reset-control:hover,.beta-reset-control:focus-within{opacity:1}.beta-reset-link,.beta-assets-link{display:inline-block;padding:6px 8px!important;min-height:0!important;box-shadow:none!important;font-size:9px!important;font-weight:700;border-radius:8px!important;pointer-events:auto!important;touch-action:manipulation}.beta-reset-link{background:#e86a7a18!important;border:1px solid #e86a7a44!important;color:#f1c8cf!important}.beta-assets-link{background:#a875ff18!important;border:1px solid #a875ff44!important;color:#d9c6ff!important}.beta-reset-control small{font-size:8px;color:#a99bad;line-height:1.1}@media(max-width:520px){.beta-reset-control{right:8px;bottom:calc(84px + env(safe-area-inset-bottom))}.beta-reset-control small{display:none}.beta-reset-link,.beta-assets-link{font-size:9px!important;padding:6px 7px!important}}`;document.head.appendChild(st);queueMicrotask(addControl)
})();