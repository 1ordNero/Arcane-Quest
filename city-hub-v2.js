(()=>{
'use strict';
const UI='assets/icons/ui/';
function icon(file,alt){const src=UI+file;return `<span class="cv2-icon"><img src="${src}" data-arcane-asset-source="${src}" alt="${alt}" decoding="async"></span>`}
function lock(level){return S.lvl>=level?'':`<span class="cv2-lock" aria-label="Gesperrt bis Stufe ${level}">Stufe ${level}</span>`}
function card(screen,file,title,description,requirement,level,extra=''){const locked=Number.isFinite(level)&&S.lvl<level;return `<button type="button" onclick="tab('${screen}')" class="cux-building${extra?` ${extra}`:''}${locked?' is-locked':''}" aria-label="${title}: ${description}">${icon(file,title)}<div class="cv2-copy"><b>${title}</b><small>${description}</small><span class="cv2-rule" aria-hidden="true"></span><em>${requirement}</em></div><span class="cv2-chevron" aria-hidden="true">›</span>${Number.isFinite(level)?lock(level):''}</button>`}
function city(){return `<section class="cv2" aria-label="Stadt"><div class="cv2-grid">
${card('merchant','location_merchant.webp','Händler','Ausrüstung kaufen und Fundstücke verkaufen.','Ab Stufe 3',3)}
${card('forge','location_forge.webp','Ahnenschmiede','Items aufwerten, verwerten und legendäre Ahnenwerke erschaffen.','Ab Stufe 5',5)}
${card('shrine','location_shrine.webp','Ahnenschrein','Reinkarnation, Seelensteine und dauerhaftes Vermächtnis.','Reinkarnation ab Stufe 50',null,'cv2-shrine')}
</div></section>`}
function addBack(){if(!['merchant','forge','shrine'].includes(S.screen))return;const main=document.querySelector('main');if(!main||main.querySelector('.cv2-back,.cux-top'))return;main.insertAdjacentHTML('afterbegin',`<button class="cv2-back" onclick="tab('city')">‹ Zur Stadt</button>`)}
window.cityView=city;
window.Arcane?.on?.('afterRenderSettled',addBack);
const css=document.createElement('style');css.textContent=`
/* Structural fallback only. Final city-card geometry belongs to city-ux-v3.js. */
.cv2{max-width:760px;margin:auto}.cv2-grid{display:grid;grid-template-columns:1fr;gap:10px}.cv2-grid>button{position:relative;display:grid;grid-template-columns:76px 1fr auto;gap:12px;text-align:left;align-items:center;background:var(--panel);border:1px solid #ffffff10;box-shadow:none;padding:13px}.cv2-icon{width:72px;height:72px;display:flex;align-items:center;justify-content:center;overflow:visible}.cv2-icon img{display:block;width:100%;height:100%;object-fit:contain}.cv2-copy{min-width:0}.cv2-grid b,.cv2-grid small,.cv2-grid em{display:block}.cv2-grid b{font-size:15px}.cv2-grid small{font-size:10px;line-height:1.4;color:var(--muted);margin-top:3px}.cv2-grid em{font-size:9px;font-style:normal;color:var(--gold);margin-top:7px}.cv2-chevron{font-size:28px;line-height:1;color:var(--gold)}.cv2-lock{position:absolute;right:10px;top:8px;padding:3px 6px;border-radius:999px;background:#0f0a16d9;border:1px solid #ffffff12;color:var(--muted);font-size:8px;font-weight:800}.cv2-shrine{border-color:#a875ff52!important;background:radial-gradient(circle at 12% 50%,#8f62df20,transparent 45%),var(--panel)!important}.cv2-back{margin:0 0 8px;background:#ffffff08;border:1px solid #ffffff10;box-shadow:none;padding:7px 10px;font-size:9px}
`;document.head.appendChild(css);
})();