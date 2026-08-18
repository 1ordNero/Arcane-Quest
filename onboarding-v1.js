(()=>{
'use strict';
const Arcane=window.Arcane=window.Arcane||{};
const VERSION=4;
const STORAGE_KEY='onboarding';
const PENDING_KEY='arcaneOnboardingPending';
const getGameState=()=>Arcane.state?.get?.()||(typeof S!=='undefined'?S:null);
const level=()=>Number(getGameState()?.lvl||1);
const ELIGIBILITY={home:()=>true,char:()=>true,dungeon:()=>true,merchant:()=>level()>=3,forge:()=>level()>=5,arena:()=>level()>=5,shrine:()=>level()>=50};
const CHAPTERS={
 home:{title:'Dein erstes Abenteuer',freshOnly:true,steps:[
  {eyebrow:'WILLKOMMEN',title:'Deine Legende beginnt',text:'In der Taverne findest du Abenteuer, verdienst Erfahrung und baust deinen Helden Schritt für Schritt aus. Neue Systeme lernst du erst kennen, wenn du sie freischaltest.'},
  {eyebrow:'ABENTEUERLUST',title:'Jede Reise kostet Kraft',text:'Abenteuerlust begrenzt deine Aktivitäten. Sie wird erst beim Start einer Quest abgezogen.',target:['.tv-al','.ds-res .ds-chip:last-child']},
  {eyebrow:'QUESTS',title:'Wähle dein erstes Abenteuer',text:'Öffne eine Quest, um Dauer, Kosten und Belohnungen zu sehen. Anspruchsvollere Aktivitäten kosten mehr Abenteuerlust, können aber bessere Beute bieten.',target:['.quest-list','.quest-card','main']}
 ]},
 char:{title:'Dein Held',steps:[
  {eyebrow:'HELD',title:'Ausrüstung formt deinen Build',text:'Hier siehst du Ausrüstung, Werte und Fertigkeiten deines Helden.',target:['.hero-equipment','.hero-v7','.hero-layout','main']},
  {eyebrow:'AUSRÜSTUNG',title:'Vergleichen statt nur sammeln',text:'Prüfe Macht, Attribute, Affixe und Seltenheit. Synergien können wertvoller sein als ein einzelner höherer Wert.',target:['.equipment-grid','.hv7-eq','.he4-grid','.item-grid']},
  {eyebrow:'FERTIGKEITEN',title:'Deine Klasse entscheidet den Rhythmus',text:'Fertigkeiten verbrauchen im Kampf die Ressource deiner Klasse. Diese wird zu Beginn jedes Kampfes neu aufgefüllt.',target:['.skills','.skill-grid','.sp1-skills','.skill-section']}
 ]},
 dungeon:{title:'Katakomben',steps:[
  {eyebrow:'KATAKOMBEN',title:'Eine Expedition mit Konsequenzen',text:'Kämpfe, Ereignisse und Beute bauen Raum für Raum aufeinander auf.',target:['.dungeon-v7','.dungeon','.catacomb-shell','main']},
  {eyebrow:'SCHLÜSSEL',title:'Schlüssel öffnen den Weg',text:'Für einen neuen Run benötigst du einen Katakombenschlüssel. Bei einer Reinkarnation gehen alle Schlüssel verloren.',target:['.dungeon-key','.key-card','.cat-key','.ds-res']},
  {eyebrow:'RISIKO',title:'Beute wird erst am Ende sicher',text:'Je tiefer du gehst, desto größer werden Risiko und mögliche Belohnung. Aktive Kämpfe können nicht verlassen werden.',target:['.dungeon-room','.room-card','.catacomb-room','.dungeon-actions']}
 ]},
 merchant:{title:'Händler',steps:[
  {eyebrow:'NEU FREIGESCHALTET',title:'Der Händler',text:'Ab Stufe 3 kannst du Ausrüstung kaufen und Fundstücke verkaufen.',target:['.mb2-tabs','.mb2-list']},
  {eyebrow:'KAUFEN & VERKAUFEN',title:'Investiere gezielt',text:'Öffne ein Item für Details und Vergleich. Verkaufe veraltete Ausrüstung für neue Investitionen.',target:['.mb2-item','.mb2-list']},
  {eyebrow:'SORTIMENT',title:'Angebote wechseln',text:'Das Sortiment kann erneuert werden und skaliert mit deiner Stufe.',target:['.mb2-sectionbar button','.mb2-sectionbar']}
 ]},
 forge:{title:'Ahnenschmiede',steps:[
  {eyebrow:'NEU FREIGESCHALTET',title:'Die Ahnenschmiede',text:'Ab Stufe 5 kannst du Ausrüstung langfristig verbessern.',target:['.fv4-tabs']},
  {eyebrow:'AUFWERTEN',title:'Stärke bewährte Ausrüstung',text:'Aufwertungen steigern Itemmacht, werden aber zunehmend kostspieliger.',target:['.fv4-main','.fv4-focus','.forge-upgrade']},
  {eyebrow:'VERWERTEN',title:'Alte Beute bleibt wertvoll',text:'Nicht benötigte Gegenstände liefern Materialien für weitere Progression.',target:['.fv4-tabs','.forge-salvage']},
  {eyebrow:'VEREDLUNG & AHNENWERK',title:'Optimiere deine besten Items',text:'Veredelung verbessert Affixe; Ahnenwerk ist für besonders wertvolle Langzeitobjekte gedacht.',target:['.fv4-tabs','.fa1','.fv4-ancestor']}
 ]},
 arena:{title:'Arena',steps:[
  {eyebrow:'NEU FREIGESCHALTET',title:'Die Arena',text:'Ab Stufe 5 trittst du gegen skalierende Gegner an.',target:['.arena-v2','.arena2','.arena-shell','main']},
  {eyebrow:'HALTUNG',title:'Lies deinen Gegner',text:'Aggressiv, defensiv und Konter erzeugen unterschiedliche Matchups.',target:['.stance-grid','.arena-stances','.av2-stances']},
  {eyebrow:'KAMPFRESSOURCE',title:'Skills sind nicht kostenlos',text:'Deine Klassenressource startet jeden Kampf voll. Starke Skills verbrauchen sie.',target:['.combat-resource','.class-resource','.arena-resource']}
 ]},
 shrine:{title:'Reinkarnation',steps:[
  {eyebrow:'STUFE 50',title:'Ein Leben endet. Ein Vermächtnis beginnt.',text:'Mit Stufe 50 kannst du reinkarnieren und permanente Progression aufbauen.',target:['.sv3-tabs','.shrine-tabs']},
  {eyebrow:'SEELENSTEINE',title:'Permanente Progression',text:'Seelensteine werden im Vermächtnisbaum investiert. Knoten werden je Zweig der Reihe nach freigeschaltet.',target:['.legacy-tree','.sv3-legacy','.legacy-node']},
  {eyebrow:'RESET',title:'Was du zurücklässt',text:'Level, normale Ausrüstung, Gold, laufende Aktivitäten und Katakombenschlüssel werden zurückgesetzt. Vermächtnis und Reinkarnationsrang bleiben.',target:['.reincarnation-card','.sv3-rebirth','.reincarnation']}
 ]}
};
function state(){const game=getGameState();if(!game)return null;if(!game[STORAGE_KEY]||typeof game[STORAGE_KEY]!=='object')game[STORAGE_KEY]={version:VERSION,completed:{},progress:{},dismissed:{},startedAt:Date.now()};const data=game[STORAGE_KEY];data.version=VERSION;data.completed=data.completed||{};data.progress=data.progress||{};data.dismissed=data.dismissed||{};data.startedAt=data.startedAt||Date.now();return data}
function persist(){if(typeof Arcane.state?.scheduleSave==='function')Arcane.state.scheduleSave();else if(typeof window.save==='function')window.save()}
function eligible(id){const chapter=CHAPTERS[id],game=getGameState();if(!chapter||!game)return false;const pending=localStorage.getItem(PENDING_KEY)===id;if(chapter.freshOnly&&!pending&&(level()>2||Number(game.quests||0)>0))return false;return (ELIGIBILITY[id]||(()=>true))()}
function isDone(id){const data=state();return !!(data?.completed?.[id]||data?.dismissed?.[id])}
function progress(id){return Math.max(0,Number(state()?.progress?.[id]||0))}
function findTarget(step){for(const selector of step.target||[]){const element=document.querySelector(selector);if(element&&element.getClientRects().length)return element}return null}
function clearOverlay(){document.getElementById('aq-onboarding')?.remove();document.body.classList.remove('aq-onboarding-active')}
function clamp(value,min,max){return Math.max(min,Math.min(max,value))}
function targetRect(target){const margin=8,r=target.getBoundingClientRect();return{top:clamp(r.top-margin,8,innerHeight-8),left:clamp(r.left-margin,8,innerWidth-8),right:clamp(r.right+margin,8,innerWidth-8),bottom:clamp(r.bottom+margin,8,innerHeight-8)}}
function setRect(element,{top,left,width,height}){element.style.top=`${top}px`;element.style.left=`${left}px`;element.style.width=`${Math.max(0,width)}px`;element.style.height=`${Math.max(0,height)}px`}
function layoutSpotlight(layer,card,target){const shades=[...layer.querySelectorAll('.aq-ob-shade')],focus=layer.querySelector('.aq-ob-focus');if(!target){shades[0].classList.add('aq-ob-shade-full');for(let i=1;i<shades.length;i++)shades[i].hidden=true;focus.hidden=true;card.classList.add('aq-ob-center');return}target.scrollIntoView?.({block:'center',behavior:'auto'});requestAnimationFrame(()=>{const r=targetRect(target),w=innerWidth,h=innerHeight;setRect(shades[0],{top:0,left:0,width:w,height:r.top});setRect(shades[1],{top:r.top,left:0,width:r.left,height:r.bottom-r.top});setRect(shades[2],{top:r.top,left:r.right,width:w-r.right,height:r.bottom-r.top});setRect(shades[3],{top:r.bottom,left:0,width:w,height:h-r.bottom});focus.hidden=false;setRect(focus,{top:r.top,left:r.left,width:r.right-r.left,height:r.bottom-r.top});const cardWidth=Math.min(430,w-24),cardHeight=Math.min(card.offsetHeight||240,h-24),gap=14;let top=r.bottom+gap;if(top+cardHeight>h-12)top=r.top-cardHeight-gap;if(top<12)top=clamp((h-cardHeight)/2,12,h-cardHeight-12);let left=clamp((r.left+r.right-cardWidth)/2,12,w-cardWidth-12);card.style.width=`${cardWidth}px`;card.style.left=`${left}px`;card.style.top=`${top}px`})}
function renderChapter(id){clearOverlay();const chapter=CHAPTERS[id],data=state();if(!chapter||!data||isDone(id)||!eligible(id))return;const index=progress(id);if(index>=chapter.steps.length){complete(id);return}const step=chapter.steps[index],target=findTarget(step),layer=document.createElement('div');layer.id='aq-onboarding';layer.className='aq-ob-layer';layer.innerHTML=`<div class="aq-ob-shade"></div><div class="aq-ob-shade"></div><div class="aq-ob-shade"></div><div class="aq-ob-shade"></div><div class="aq-ob-focus" aria-hidden="true"></div><section class="aq-ob-card" role="dialog" aria-modal="true" aria-label="Tutorial"><div class="aq-ob-progress"><span>${chapter.title}</span><b>${index+1}/${chapter.steps.length}</b></div><div class="aq-ob-eyebrow">${step.eyebrow}</div><h2>${step.title}</h2><p>${step.text}</p><div class="aq-ob-actions"><button class="aq-ob-skip" type="button">Überspringen</button><button class="aq-ob-next" type="button">${index===chapter.steps.length-1?'Verstanden':'Weiter'}</button></div></section>`;document.body.appendChild(layer);document.body.classList.add('aq-onboarding-active');const card=layer.querySelector('.aq-ob-card');layoutSpotlight(layer,card,target);layer.querySelector('.aq-ob-next').onclick=()=>advance(id);layer.querySelector('.aq-ob-skip').onclick=()=>dismiss(id)}
function advance(id){const data=state(),chapter=CHAPTERS[id];if(!data||!chapter)return;data.progress[id]=progress(id)+1;persist();data.progress[id]>=chapter.steps.length?complete(id):renderChapter(id)}
function finish(id,bucket){const data=state();if(!data)return;data[bucket][id]=Date.now();delete data.progress[id];if(localStorage.getItem(PENDING_KEY)===id)localStorage.removeItem(PENDING_KEY);persist();clearOverlay()}
function complete(id){finish(id,'completed');window.toast?.(`${CHAPTERS[id]?.title||'Tutorial'} abgeschlossen.`)}
function dismiss(id){finish(id,'dismissed')}
function blockingModalOpen(){return !!document.querySelector('#character-gate,.reward-overlay,.aq-dialog,.mb2-modal,.reward-card-overlay,.upgrade-success-overlay')}
function currentChapter(){const game=getGameState();if(!game)return null;const pending=localStorage.getItem(PENDING_KEY);if(pending&&CHAPTERS[pending]&&eligible(pending)&&!isDone(pending))return pending;const screen=game.screen||'home';return CHAPTERS[screen]&&eligible(screen)&&!isDone(screen)?screen:null}
let scheduled=false;function evaluate(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;if(blockingModalOpen()){clearOverlay();return}const id=currentChapter();id?renderChapter(id):clearOverlay()})}
function reset(id){const data=state();if(!data)return false;if(id){delete data.completed[id];delete data.dismissed[id];delete data.progress[id]}else{data.completed={};data.dismissed={};data.progress={}}persist();evaluate();return true}
Arcane.onboarding={version:VERSION,chapters:CHAPTERS,evaluate,reset,status:()=>{const data=state();return Object.fromEntries(Object.keys(CHAPTERS).map(id=>[id,{eligible:eligible(id),completed:!!data?.completed?.[id],dismissed:!!data?.dismissed?.[id],progress:Number(data?.progress?.[id]||0)}]))},open:id=>{if(!CHAPTERS[id]||!eligible(id))return false;const data=state();delete data.completed[id];delete data.dismissed[id];data.progress[id]=0;persist();renderChapter(id);return true}};
Arcane.on?.('afterRenderSettled',evaluate);Arcane.on?.('screenChange',evaluate);Arcane.on?.('bootReady',evaluate);document.addEventListener('visibilitychange',()=>{if(!document.hidden)evaluate()});window.addEventListener('resize',()=>{if(document.getElementById('aq-onboarding'))evaluate()});setTimeout(evaluate,300);setTimeout(evaluate,900);
const style=document.createElement('style');style.id='aq-onboarding-css';style.textContent=`body.aq-onboarding-active{overflow:hidden!important}.aq-ob-layer{position:fixed;inset:0;z-index:2147483647;pointer-events:none;isolation:isolate}.aq-ob-shade{position:fixed;z-index:1;background:#050309c7;pointer-events:auto}.aq-ob-shade-full{inset:0!important;width:auto!important;height:auto!important;backdrop-filter:blur(2px)}.aq-ob-focus{position:fixed;z-index:2;border:2px solid #b97cff;border-radius:16px;box-shadow:0 0 0 1px #ffffff18,0 0 30px #a664ff99,inset 0 0 24px #a664ff20;pointer-events:none}.aq-ob-card{position:fixed;z-index:4;padding:18px;border:1px solid #b881ff88;border-radius:20px;background:linear-gradient(150deg,#281b36,#15101d 72%);box-shadow:0 24px 80px #000e,0 0 35px #9d5cff30;color:var(--text);pointer-events:auto}.aq-ob-center{left:50%!important;top:50%!important;width:min(430px,calc(100vw - 24px))!important;transform:translate(-50%,-50%)}.aq-ob-progress{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px;color:#cdb9d9;font-size:9px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.aq-ob-progress b{color:var(--gold)}.aq-ob-eyebrow{color:#c38cff;font-size:9px;font-weight:900;letter-spacing:.14em}.aq-ob-card h2{margin:5px 0 8px;font-size:22px;line-height:1.08}.aq-ob-card p{margin:0;color:#d0c4d7;font-size:12px;line-height:1.55}.aq-ob-actions{display:grid;grid-template-columns:auto 1fr;gap:8px;margin-top:16px}.aq-ob-actions button{min-height:44px}.aq-ob-skip{background:#ffffff09!important;color:#b9abc4!important}.aq-ob-next{background:linear-gradient(135deg,#8d58e8,#b271ff)!important}@media(max-width:520px){.aq-ob-card{padding:16px}.aq-ob-card h2{font-size:20px}.aq-ob-card p{font-size:11.5px}.aq-ob-actions{grid-template-columns:1fr 1.45fr}}`;
document.head.appendChild(style);
})();