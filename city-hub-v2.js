(()=>{
'use strict';
const UI='assets/icons/ui/';
function icon(file,alt){const src=UI+file;return `<span class="cv2-icon"><img src="${src}" data-arcane-asset-source="${src}" alt="${alt}" decoding="async"></span>`}
function lock(level){return S.lvl>=level?'':'<span class="cv2-lock">🔒</span>'}
function city(){return `<section class="cv2"><div class="cv2-grid">
<button onclick="tab('merchant')">${icon('location_merchant.webp','Händler')}<div><b>Händler</b><small>Ausrüstung kaufen und Fundstücke verkaufen.</small><em>Ab Stufe 3</em></div>${lock(3)}</button>
<button onclick="tab('forge')">${icon('location_forge.webp','Ahnenschmiede')}<div><b>Ahnenschmiede</b><small>Items aufwerten, verwerten und legendäre Ahnenwerke erschaffen.</small><em>Ab Stufe 5</em></div>${lock(5)}</button>
<button onclick="tab('shrine')" class="cv2-shrine">${icon('location_shrine.webp','Ahnenschrein')}<div><b>Ahnenschrein</b><small>Reinkarnation, Seelensteine und dauerhaftes Vermächtnis.</small><em>Reinkarnation ab Stufe 50</em></div></button>
</div></section>`}
function addBack(){if(!['merchant','forge','shrine'].includes(S.screen))return;const main=document.querySelector('main');if(!main||main.querySelector('.cv2-back,.cux-top'))return;main.insertAdjacentHTML('afterbegin',`<button class="cv2-back" onclick="tab('city')">‹ Zur Stadt</button>`)}
window.cityView=city;
window.Arcane?.on?.('afterRenderSettled',addBack);
const css=document.createElement('style');css.textContent=`
/* Structural fallback only. Final city-card/icon sizing belongs to city-ux-v3.js. */
.cv2{max-width:760px;margin:auto}.cv2-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.cv2-grid>button{position:relative;display:grid;grid-template-columns:64px 1fr;gap:12px;text-align:left;align-items:center;background:var(--panel);border:1px solid #ffffff10;box-shadow:none;padding:13px}.cv2-icon{width:64px;height:64px;display:flex;align-items:center;justify-content:center;overflow:visible}.cv2-icon img{display:block;width:100%;height:100%;object-fit:contain}.cv2-grid b,.cv2-grid small,.cv2-grid em{display:block}.cv2-grid b{font-size:12px}.cv2-grid small{font-size:8px;line-height:1.4;color:var(--muted);margin-top:2px}.cv2-grid em{font-size:7px;font-style:normal;color:var(--gold);margin-top:5px}.cv2-lock{position:absolute!important;right:8px;top:8px;font-size:11px!important}.cv2-shrine{border-color:#a875ff3d!important;background:radial-gradient(circle at 0 50%,#8f62df16,transparent 42%),var(--panel)!important}.cv2-back{margin:0 0 8px;background:#ffffff08;border:1px solid #ffffff10;box-shadow:none;padding:7px 10px;font-size:9px}
@media(max-width:620px){.cv2-grid{grid-template-columns:1fr}.cv2-grid>button{grid-template-columns:78px 1fr;min-height:118px;padding:13px 15px;gap:14px}.cv2-icon{width:74px;height:74px}.cv2-grid b{font-size:15px}.cv2-grid small{font-size:10px}.cv2-grid em{font-size:9px}}
`;document.head.appendChild(css);
})();