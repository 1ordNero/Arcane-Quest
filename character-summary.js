(()=>{
const storage=window.ARCANE_STORAGE||window.Arcane?.storage||null;
const readSave=()=>storage?.read?.()||(()=>{try{return JSON.parse(localStorage.getItem('arcaneBeta')||'null')||{}}catch{return{}}})();
const writeSave=s=>storage?.writeObject?storage.writeObject(s,{backup:true}):(()=>{try{localStorage.setItem('arcaneBeta',JSON.stringify(s));return true}catch{return false}})();
let o=readSave(),draft={name:o.name||'',race:o.race||'Mensch',gender:o.gender==='female'?'female':'male',cls:o.cls||'Krieger',bg:o.bg||'Tavernen-Stammgast'};
const oldName=window.cgName,oldGender=window.cgGender,oldClass=window.cgClass,oldBg=window.cgBg,oldNext=window.cgNext;
if(!oldNext)return;
function sync(){if(window.getCharacterDraft)draft={...draft,...getCharacterDraft()}}
window.cgName=v=>{draft.name=v;oldName?.(v)};
if(oldGender)window.cgGender=g=>{draft.gender=g==='female'?'female':'male';oldGender(g)};
if(oldClass)window.cgClass=n=>{draft.cls=n;oldClass(n)};
if(oldBg)window.cgBg=n=>{draft.bg=n;oldBg(n)};
const strengths={Mensch:['Anpassungsfähigkeit','vielseitigen Proben','kaum ausgeprägten Schwächen']};
const classes={Krieger:['entschlossener Frontkämpfer','STR','Blocken, Standhalten und direkte Konfrontationen'],Magier:['Meister arkaner Kräfte','INT','Runen, Resonanz und magische Lösungen'],Druide:['anpassungsfähiger Grenzgänger','Hybrid','flexible Entscheidungen zwischen Kraft, Instinkt und Wissen'],Hexenmeister:['berechnender Nutzer dunkler Magie','INT','arkane Manipulation und ungewöhnliche Lösungen']};
const stories={
'Tavernen-Stammgast':'Durch deine Zeit in der Taverne weißt du, wie man aus begrenzter Abenteuerlust möglichst viel herausholt.',
'Gefallener Adeliger':'Deine Vergangenheit im Adel hat dir ein Gespür für Wert, Handel und Gold eingebracht.',
'Runenschmied-Lehrling':'Deine Ausbildung an der Schmiede wird dir später beim Verbessern deiner Ausrüstung helfen.',
'Schatten-Ausreißer':'Dein Leben abseits sicherer Wege schärfte deinen Blick für seltene Beute und verborgene Chancen.'
};
function portrait(){sync();return window.getHeroPortrait?getHeroPortrait({cls:draft.cls,gender:draft.gender}):'assets/icons/nav-held.webp'}
function story(){sync();let r=strengths.Mensch,c=classes[draft.cls]||classes.Krieger,n=draft.name||'Dein Held';return `${n} beginnt die Reise als Mensch und ${c[0]}. Besonders prägend ist ${r[0]}. Dadurch liegen dir ${r[1]} sowie ${c[2]} besonders gut. In Ereignisquests und später auch in Dungeons werden diese Eigenschaften deine Möglichkeiten direkt beeinflussen: Manche Wege werden sicherer, andere riskanter und gelegentlich öffnen sich Lösungen, die für andere Helden kaum erreichbar sind.\n\nDein wichtigster Klassenfokus ist ${c[1]}. Das bedeutet nicht, dass andere Wege unmöglich sind – Zufall und Ausrüstung bleiben wichtig –, aber dein Charakter besitzt klare natürliche Stärken. Vorsicht ist vor allem bei ${r[2]} geboten. Dort können Fehlschläge wahrscheinlicher werden und eine alternative Herangehensweise kann klüger sein.\n\n${stories[draft.bg]||''} ${n} ist damit kein austauschbarer Abenteurer: Deine Entscheidungen bei der Charaktererschaffung bestimmen, wie du Gefahren einschätzt, welche Risiken du eingehst und welche Geschichten sich auf deiner Reise entwickeln.`}
function showSummary(){sync();const gate=document.getElementById('character-gate');if(!gate)return;let r=strengths.Mensch,c=classes[draft.cls]||classes.Krieger;gate.innerHTML=`<div class="cg cg-final"><div class="cg-step">CHARAKTEREDITOR · ABSCHLUSS</div><h1>Dein Held ist bereit</h1><div class="final-head"><img class="final-avatar" src="${portrait()}" alt="${draft.cls}"><div><b>${draft.name||'Aventurier'}</b><small>Mensch · ${draft.gender==='female'?'weiblich':'männlich'} · ${draft.cls}</small><small>Persönliche Geschichte: ${draft.bg}</small></div></div><div class="final-tags"><span>Stark: ${r[1]}</span><span>Klassenfokus: ${c[1]}</span><span>Vorsicht: ${r[2]}</span></div><div class="final-story">${story().split('\n\n').map(p=>`<p>${p}</p>`).join('')}</div><div class="cg-actions"><button class="back" onclick="cgSummaryBack()">Zurück</button><button onclick="cgConfirmHero()">Charakter bestätigen</button></div></div>`}
function commitDraftToLiveState(){
 sync();
 const chosen={name:draft.name||'Aventurier',race:draft.race||'Mensch',gender:draft.gender==='female'?'female':'male',cls:classes[draft.cls]?draft.cls:'Krieger',bg:stories[draft.bg]?draft.bg:'Tavernen-Stammgast',screen:'home'};
 try{
  if(typeof S!=='undefined'&&S&&typeof S==='object')Object.assign(S,chosen);
 }catch(e){console.warn('[Character Summary] live state sync',e)}
 try{
  const stored=readSave();
  if(!writeSave({...stored,...chosen}))console.warn('[Character Summary] storage sync failed');
 }catch(e){console.warn('[Character Summary] storage sync',e)}
}
let confirming=false;
window.cgNext=()=>{sync();const btn=[...document.querySelectorAll('#character-gate .cg-actions button')].at(-1);if(!confirming&&btn?.textContent.includes('Held erschaffen'))return showSummary();oldNext()};
window.cgSummaryBack=()=>location.reload();
window.cgConfirmHero=()=>{commitDraftToLiveState();confirming=true;oldNext()};
const s=document.createElement('style');s.textContent=`.cg-final{min-height:100dvh;overflow:visible;padding-bottom:max(18px,env(safe-area-inset-bottom))}.final-head{display:grid;grid-template-columns:100px 1fr;gap:14px;align-items:center;background:#20182b;border:1px solid #ffffff12;border-radius:16px;padding:12px}.final-head b,.final-head small{display:block}.final-head b{font-size:21px}.final-head small{font-size:13px;color:#b8a9c4;margin-top:4px;line-height:1.4}.final-avatar{width:100px;height:100px;object-fit:contain;object-position:center;background:transparent}.final-tags{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}.final-tags span{background:#ffffff08;border-radius:10px;padding:10px;font-size:13px;line-height:1.35;color:#d8cde0}.final-story{background:#120e18;border:1px solid #f4c15d22;border-radius:16px;padding:16px}.final-story p{font-size:16px!important;line-height:1.62!important;margin:0 0 18px!important;color:#d7ccdf}.final-story p:last-child{margin-bottom:0!important}@media(max-width:430px){.final-head{grid-template-columns:92px 1fr}.final-avatar{width:92px;height:92px}.final-head b{font-size:19px}.final-head small{font-size:12px}.final-tags{grid-template-columns:1fr}.final-tags span{font-size:13px}.final-story{padding:15px}.final-story p{font-size:15px!important;line-height:1.65!important}}`;document.head.appendChild(s);
})();
