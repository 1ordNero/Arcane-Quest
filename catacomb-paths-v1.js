(()=>{
'use strict';
const UI='assets/icons/ui/';
const CAT='assets/icons/catacombs/';
const PATHS=[
 {id:1,name:'Die Gruft des Vergessenen Hüters',level:10,key:'Katakombenschlüssel',status:'active',art:'catacombs_path_1.webp',keyIcon:'ui_key_catacombs.webp',desc:'Steige durch zehn versiegelte Kammern hinab und stelle dich dem Hüter der Katakomben.'},
 {id:2,name:'Die Krypta der Aschenkönige',level:20,key:'Runenverzierter Schlüssel',status:'development',art:'catacombs_path_2.webp',keyIcon:'ui_key_catacombs_runic.webp',desc:'Verbrannte Königsgräber, zerbrochene Runen und uralte Mächte warten jenseits des zweiten Siegels.'},
 {id:3,name:'Der Abgrund der Seelen',level:30,key:'Verfluchter Schlüssel',status:'development',art:'catacombs_path_3.webp',keyIcon:'ui_key_catacombs_cursed.webp',desc:'Ein tiefer, verfluchter Pfad, in dem gefangene Seelen und vergessene Schrecken erwachen.'}
];
const oldView=window.dungeonV1;
const oldStart=window.d1Start;
function migrate(){
 if(!S.catacombKeys||typeof S.catacombKeys!=='object')S.catacombKeys={path1:Number(S.keys)||0,path2:0,path3:0};
 if(!Number.isFinite(Number(S.catacombKeys.path1)))S.catacombKeys.path1=Number(S.keys)||0;
 if(!Number.isFinite(Number(S.catacombKeys.path2)))S.catacombKeys.path2=0;
 if(!Number.isFinite(Number(S.catacombKeys.path3)))S.catacombKeys.path3=0;
 S.catacombKeys.path1=Math.max(Number(S.catacombKeys.path1)||0,Number(S.keys)||0);
 S.keys=S.catacombKeys.path1;
}
function keyCount(id){migrate();return Number(S.catacombKeys?.['path'+id])||0}
function startPath(id){
 migrate();
 const path=PATHS.find(p=>p.id===Number(id));if(!path)return;
 if(path.status!=='active'){toast?.(`${path.name} befindet sich noch in Arbeit.`);return}
 if((Number(S.lvl)||1)<path.level){toast?.(`${path.name} wird ab Stufe ${path.level} freigeschaltet.`);return}
 if(keyCount(1)<1){toast?.(`Du benötigst einen ${path.key}.`);return}
 S.selectedCatacombPath=1;
 S.keys=S.catacombKeys.path1;
 const before=S.keys;
 oldStart?.();
 if(S.dungeonV1&&S.keys<before){S.catacombKeys.path1=S.keys;S.dungeonV1.pathId=1;S.dungeonV1.pathName=path.name;save?.()}
}
function card(p){
 const active=p.status==='active',lvl=(Number(S.lvl)||1),enough=lvl>=p.level,keys=keyCount(p.id);
 const state=active?(enough?'Spielbar':`Ab Stufe ${p.level}`):'In Arbeit';
 const button=active?`<button class="cp1-enter" onclick="catacombSelectPath(${p.id})" ${(!enough||keys<1)?'disabled':''}>${!enough?`Ab Stufe ${p.level}`:keys<1?'Schlüssel benötigt':'Pfad betreten'}</button>`:`<button class="cp1-enter" disabled>In Arbeit</button>`;
 return `<article class="cp1-card ${active?'is-active':'is-dev'}"><div class="cp1-art"><img src="${CAT}${p.art}?v=2" alt="${p.name}" decoding="async"><div class="cp1-shade"></div><span class="cp1-index">PFAD ${p.id}</span><em>${state}</em></div><div class="cp1-copy"><small>10 RÄUME · ENDBOSS · STUFE ${p.level}+</small><h2>${p.name}</h2><p>${p.desc}</p><div class="cp1-key"><img src="${UI}${p.keyIcon}?v=2" alt="${p.key}" decoding="async"><div><b>${p.key}</b><span>${active?`${keys} verfügbar`:'Noch nicht erhältlich'}</span></div></div>${button}</div></article>`
}
function selection(){
 migrate();
 return `<section class="cp1"><div class="cp1-head"><small>KATAKOMBEN · DREI VERLORENE PFADE</small><h1>Wähle deinen Abstieg</h1><p>Jeder Pfad besteht aus zehn Räumen und endet mit einem eigenen Hüter. Seltenere Schlüssel öffnen später gefährlichere Tiefen.</p></div><div class="cp1-grid">${PATHS.map(card).join('')}</div></section>`
}
function view(){migrate();if(S.dungeonV1)return oldView?.()||'';return selection()}
window.catacombSelectPath=startPath;
window.dungeonV1=view;
window.ARCANE_CATACOMB_PATHS=Object.freeze(PATHS.map(p=>({...p})));
window.Arcane?.on?.('bootReady',()=>{migrate();save?.()});
migrate();
const css=document.createElement('style');css.textContent=`
.cp1{max-width:720px;margin:auto}.cp1-head{padding:4px 3px 12px}.cp1-head small{font-size:9px;letter-spacing:.13em;color:#c49be9;font-weight:900}.cp1-head h1{font-size:25px;margin:5px 0 4px}.cp1-head p{margin:0;color:var(--muted);font-size:11px;line-height:1.45}.cp1-grid{display:grid;gap:11px}.cp1-card{overflow:hidden;border-radius:19px;border:1px solid #ffffff14;background:linear-gradient(145deg,#21172d,#130f19);box-shadow:0 12px 32px #0005}.cp1-card.is-active{border-color:#a875ff55}.cp1-card.is-dev{opacity:.78}.cp1-art{height:162px;position:relative;overflow:hidden;background:#0e0b13}.cp1-art>img{display:block;width:100%;height:100%;object-fit:cover;object-position:center}.cp1-shade{position:absolute;inset:0;background:linear-gradient(180deg,#08060c10 35%,#0a0711c9 100%);pointer-events:none}.cp1-index,.cp1-art>em{position:absolute;top:10px;padding:4px 7px;border-radius:999px;background:#0d0912df;border:1px solid #ffffff20;font-size:8px;font-weight:900;font-style:normal;backdrop-filter:blur(4px)}.cp1-index{left:10px;color:#eee3f6}.cp1-art>em{right:10px;color:var(--gold)}.cp1-copy{padding:13px 14px 14px}.cp1-copy>small{font-size:8px;color:#bda9c9;font-weight:900;letter-spacing:.07em}.cp1-copy h2{font-size:19px;line-height:1.08;margin:5px 0}.cp1-copy p{font-size:10px;line-height:1.4;color:var(--muted);margin:0 0 10px}.cp1-key{display:flex;align-items:center;gap:9px;padding:8px 9px;border-radius:12px;background:#ffffff08;border:1px solid #ffffff0d;margin-bottom:9px}.cp1-key img{width:44px;height:44px;object-fit:contain;flex:0 0 44px}.cp1-key b,.cp1-key span{display:block}.cp1-key b{font-size:11px}.cp1-key span{font-size:9px;color:var(--muted);margin-top:1px}.cp1-enter{width:100%;min-height:45px}.cp1-enter:disabled{background:#ffffff0b!important;color:#8d8196!important;opacity:.8}.cp1-card.is-active .cp1-enter:not(:disabled){background:linear-gradient(135deg,#8f5cff,#b276ff)}
@media(min-width:700px){.cp1-grid{grid-template-columns:repeat(3,1fr);align-items:stretch}.cp1-card{display:flex;flex-direction:column}.cp1-copy{display:flex;flex-direction:column;flex:1}.cp1-copy p{flex:1}.cp1-art{height:150px}.cp1-copy h2{font-size:17px}}
@media(max-width:520px){.cp1-head h1{font-size:22px}.cp1-art{height:148px}.cp1-copy{padding:11px 12px 12px}.cp1-copy h2{font-size:18px}.cp1-copy p{font-size:9.5px}.cp1-key img{width:40px;height:40px;flex-basis:40px}}
`;document.head.appendChild(css);
})();