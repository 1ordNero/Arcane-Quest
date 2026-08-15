(()=>{
let pendingConfirm=null;
function esc(v){return String(v??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]))}
function close(result=false){const el=document.querySelector('.aq-dialog-layer');if(el)el.remove();const cb=pendingConfirm;pendingConfirm=null;if(cb)cb(result)}
function show({icon='✦',title='Hinweis',message='',confirmText='Verstanden',cancelText='',danger=false,onConfirm=null}={}){
 document.querySelector('.aq-dialog-layer')?.remove();pendingConfirm=onConfirm;
 const layer=document.createElement('div');layer.className='aq-dialog-layer';layer.innerHTML=`<div class="aq-dialog" role="dialog" aria-modal="true"><div class="aq-dialog-icon">${icon}</div><h2>${esc(title)}</h2><p>${esc(message)}</p><div class="aq-dialog-actions">${cancelText?`<button class="aq-dialog-secondary" data-aq-cancel>${esc(cancelText)}</button>`:''}<button class="${danger?'aq-dialog-danger':''}" data-aq-ok>${esc(confirmText)}</button></div></div>`;
 layer.querySelector('[data-aq-ok]').onclick=()=>close(true);layer.querySelector('[data-aq-cancel]')?.addEventListener('click',()=>close(false));document.body.appendChild(layer);
}
window.aqDialog=show;window.aqConfirm=(opts,cb)=>show({...opts,onConfirm:ok=>{if(ok)cb?.()}});
const nativeAlert=window.alert;window.alert=(message)=>show({title:'Hinweis',message:String(message),confirmText:'Verstanden'});
const nativeConfirm=window.confirm;window.confirm=(message)=>{show({title:'Bestätigen',message:String(message),confirmText:'Bestätigen',cancelText:'Abbrechen'});return false};
const css=document.createElement('style');css.textContent=`.aq-dialog-layer{position:fixed;inset:0;z-index:9999;background:#08060dcc;backdrop-filter:blur(7px);display:grid;place-items:center;padding:22px}.aq-dialog{width:min(390px,100%);background:linear-gradient(180deg,#251a31,#17111f);border:1px solid #ffffff18;border-radius:22px;padding:22px;box-shadow:0 24px 70px #000a;text-align:center}.aq-dialog-icon{width:58px;height:58px;border-radius:18px;margin:0 auto 12px;display:grid;place-items:center;font-size:30px;background:#ffffff0a;border:1px solid #f4c15d33}.aq-dialog h2{margin:0 0 8px;font-size:22px}.aq-dialog p{margin:0;color:var(--muted);font-size:15px;line-height:1.5;white-space:pre-line}.aq-dialog-actions{display:flex;gap:9px;margin-top:20px}.aq-dialog-actions button{flex:1;min-height:48px}.aq-dialog-secondary{background:#ffffff0b!important;color:var(--text)!important;box-shadow:none!important}.aq-dialog-danger{background:linear-gradient(135deg,#b74358,#e86a7a)!important}`;document.head.appendChild(css);
})();