(()=>{
'use strict';
function lock(level){return S.lvl>=level?'':'<span class="cv2-lock">🔒</span>'}
function city(){return `<section class="cv2"><div class="cv2-head"><small>STADTVIERTEL</small><h1>🏘️ Die Stadt</h1><p>Alle Wirtschafts- und Verwaltungsbereiche an einem Ort. Wähle ein Gebäude, statt durch zusätzliche Haupttabs zu navigieren.</p></div><div class="cv2-grid">
<button onclick="tab('merchant')"><span>🧺</span><div><b>Händler</b><small>Ausrüstung kaufen und Fundstücke verkaufen.</small><em>Ab Stufe 3</em></div>${lock(3)}</button>
<button onclick="tab('forge')"><span>🔨</span><div><b>Ahnenschmiede</b><small>Items aufwerten, verwerten und legendäre Ahnenwerke erschaffen.</small><em>Ab Stufe 5</em></div>${lock(5)}</button>
<button onclick="tab('bank')"><span>🏦</span><div><b>Bank</b><small>100 Tresorplätze für Ausrüstung außerhalb des Rucksacks.</small><em>Ab Stufe 10</em></div>${lock(10)}</button>
<button onclick="tab('shrine')" class="cv2-shrine"><span>◆</span><div><b>Ahnenschrein</b><small>Reinkarnation, Seelensteine und künftig dein dauerhaftes Vermächtnis.</small><em>Reinkarnation ab Stufe 100</em></div></button>
</div></section>`}
function addBack(){if(!['merchant','bank','forge','shrine'].includes(S.screen))return;const main=document.querySelector('main');if(!main||main.querySelector('.cv2-back,.cux-top'))return;main.insertAdjacentHTML('afterbegin',`<button class="cv2-back" onclick="tab('city')">‹ Zur Stadt</button>`)}
window.cityView=city;
window.Arcane?.on?.('afterRenderSettled',addBack);
const css=document.createElement('style');css.textContent=`
.cv2{max-width:760px;margin:auto}.cv2-head{background:linear-gradient(135deg,#2b1b40,#17111f);border:1px solid #ffffff14;border-radius:17px;padding:15px}.cv2-head h1{margin:3px 0;font-size:22px}.cv2-head p{margin:5px 0 0;font-size:9px;line-height:1.45;color:var(--muted)}.cv2-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-top:9px}.cv2-grid>button{position:relative;display:grid;grid-template-columns:42px 1fr;gap:9px;text-align:left;align-items:center;background:var(--panel);border:1px solid #ffffff10;box-shadow:none;padding:12px}.cv2-grid>button>span:first-child{font-size:27px;text-align:center}.cv2-grid b,.cv2-grid small,.cv2-grid em{display:block}.cv2-grid b{font-size:11px}.cv2-grid small{font-size:8px;line-height:1.4;color:var(--muted);margin-top:2px}.cv2-grid em{font-size:7px;font-style:normal;color:var(--gold);margin-top:5px}.cv2-lock{position:absolute!important;right:8px;top:8px;font-size:11px!important}.cv2-shrine{border-color:#a875ff3d!important;background:radial-gradient(circle at 0 50%,#8f62df16,transparent 42%),var(--panel)!important}.cv2-shrine>span:first-child{color:#c899ff;text-shadow:0 0 16px #a875ff}.cv2-back{margin:0 0 8px;background:#ffffff08;border:1px solid #ffffff10;box-shadow:none;padding:7px 10px;font-size:9px}
@media(max-width:520px){.cv2-grid{grid-template-columns:1fr}}
`;document.head.appendChild(css);
if(S.screen==='city')render();
})();