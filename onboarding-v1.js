(()=>{
'use strict';
const Arcane=window.Arcane=window.Arcane||{};
const VERSION=1;
const STORAGE_KEY='onboarding';
const ELIGIBILITY={home:()=>true,char:()=>true,dungeon:()=>true,merchant:()=>level()>=3,forge:()=>level()>=5,arena:()=>level()>=5,shrine:()=>level()>=50};
const CHAPTERS={
  home:{title:'Dein erstes Abenteuer',freshOnly:true,steps:[
    {eyebrow:'WILLKOMMEN',title:'Deine Legende beginnt',text:'In der Taverne findest du Abenteuer, verdienst Erfahrung und baust deinen Helden Schritt für Schritt aus. Du lernst neue Systeme genau dann kennen, wenn sie relevant werden.',target:null},
    {eyebrow:'ABENTEUERLUST',title:'Jede Reise kostet Kraft',text:'Abenteuerlust begrenzt deine täglichen Quests. Sie wird erst beim Start einer Quest abgezogen und täglich zurückgesetzt.',target:['.tv-al','.ds-res .ds-chip:last-child']},
    {eyebrow:'QUESTS',title:'Wähle dein erstes Abenteuer',text:'Öffne eine Quest, um Dauer, Kosten und Belohnungen zu sehen. Schwierige Aktivitäten kosten mehr Abenteuerlust, bieten dafür aber bessere Chancen auf Beute.',target:['.quest-list','.quest-card']}
  ]},
  char:{title:'Dein Held',steps:[
    {eyebrow:'HELD',title:'Ausrüstung formt deinen Build',text:'Hier siehst du deine Ausrüstung, Werte und Fertigkeiten. Neue Gegenstände können deine Macht und Spielweise deutlich verändern.',target:['.hero-equipment','.hero-v7','.hero-layout','main']},
    {eyebrow:'AUSRÜSTUNG',title:'Vergleichen statt nur sammeln',text:'Prüfe Macht, Attribute, Affixe und Seltenheit. Ein höherer Machtwert ist hilfreich, aber starke Synergien können wertvoller sein.',target:['.equipment-grid','.hv7-eq','.he4-grid','.item-grid']},
    {eyebrow:'FERTIGKEITEN',title:'Deine Klasse entscheidet den Rhythmus',text:'Fertigkeiten verwenden im Kampf die Ressource deiner Klasse. Sie wird zu Kampfbeginn aufgefüllt und verhindert, dass starke Skills unbegrenzt eingesetzt werden.',target:['.skills','.skill-grid','.sp1-skills','.skill-section']}
  ]},
  dungeon:{title:'Katakomben',steps:[
    {eyebrow:'KATAKOMBEN',title:'Eine Expedition mit Konsequenzen',text:'Katakomben bestehen aus mehreren Räumen. Kämpfe, Ereignisse und Beute bauen aufeinander auf, bis du den Run abschließt oder scheiterst.',target:['.dungeon-v7','.dungeon','.catacomb-shell','main']},
    {eyebrow:'SCHLÜSSEL',title:'Schlüssel öffnen den Weg',text:'Für einen neuen Run benötigst du einen Katakombenschlüssel. Schlüssel sind Teil deiner aktuellen Lebensreise und gehen bei einer Reinkarnation verloren.',target:['.dungeon-key','.key-card','.cat-key','.ds-res']},
    {eyebrow:'RISIKO',title:'Beute wird erst am Ende sicher',text:'Je tiefer du gehst, desto wertvoller kann die Beute werden. Aktive Kämpfe können nicht verlassen werden, um eine Niederlage zu umgehen.',target:['.dungeon-room','.room-card','.catacomb-room','.dungeon-actions']}
  ]},
  merchant:{title:'Händler',steps:[
    {eyebrow:'NEU FREIGESCHALTET',title:'Der Händler',text:'Ab Stufe 3 kannst du Ausrüstung kaufen und Fundstücke verkaufen. Das Sortiment skaliert mit deiner Stufe.',target:['.mb2-tabs','.mb2-list']},
    {eyebrow:'KAUFEN & VERKAUFEN',title:'Investiere gezielt',text:'Öffne ein Item für Details und den direkten Vergleich. Verkaufe veraltete Ausrüstung, um Gold für bessere Upgrades freizumachen.',target:['.mb2-item','.mb2-list']},
    {eyebrow:'SORTIMENT',title:'Angebote wechseln',text:'Das Händlersortiment kann erneuert werden. Nutze Gold bevorzugt für echte Verbesserungen statt für kleine Seitwärts-Upgrades.',target:['.mb2-sectionbar button','.mb2-sectionbar']}
  ]},
  forge:{title:'Ahnenschmiede',steps:[
    {eyebrow:'NEU FREIGESCHALTET',title:'Die Ahnenschmiede',text:'Ab Stufe 5 wird Ausrüstung zu einem langfristigen Progressionssystem. Aufwerten, Verwerten, Ahnenwerk und Veredeln haben jeweils eine eigene Aufgabe.',target:['.fv4-tabs']},
    {eyebrow:'AUFWERTEN',title:'Stärke bewährte Ausrüstung',text:'Aufwertungen steigern die Macht eines Items. Höhere Stufen werden teurer und können eine geringere Erfolgschance besitzen.',target:['.fv4-main','.fv4-focus','.forge-upgrade']},
    {eyebrow:'VERWERTEN',title:'Alte Beute bleibt wertvoll',text:'Nicht benötigte Gegenstände liefern Schmiedematerialien. So fließt selbst schwächere Beute zurück in deine Progression.',target:['.fv4-tabs','.forge-salvage']},
    {eyebrow:'VEREDLUNG & AHNENWERK',title:'Optimiere erst deine besten Items',text:'Veredelung verbessert Affixe und Ahnenwerk ist für besonders wertvolle Langzeitobjekte gedacht. Investiere seltene Materialien gezielt.',target:['.fv4-tabs','.fa1','.fv4-ancestor']}
  ]},
  arena:{title:'Arena',steps:[
    {eyebrow:'NEU FREIGESCHALTET',title:'Die Arena',text:'Ab Stufe 5 trittst du gegen skalierende Gegner an. Arena-Kämpfe belohnen passende Builds und eine kluge Haltung.',target:['.arena-v2','.arena2','.arena-shell','main']},
    {eyebrow:'HALTUNG',title:'Lies deinen Gegner',text:'Aggressiv, defensiv und Konter erzeugen unterschiedliche Matchups. Die richtige Haltung kann einen ebenbürtigen Kampf deutlich zu deinen Gunsten drehen.',target:['.stance-grid','.arena-stances','.av2-stances']},
    {eyebrow:'KAMPFRESSOURCE',title:'Skills sind nicht kostenlos',text:'Deine Klassenressource startet jeden Kampf voll. Starke Skills verbrauchen sie; Basisaktionen helfen, Ressourcen wieder aufzubauen.',target:['.combat-resource','.class-resource','.arena-resource']}
  ]},
  shrine:{title:'Reinkarnation',steps:[
    {eyebrow:'STUFE 50',title:'Ein Leben endet. Ein Vermächtnis beginnt.',text:'Mit Stufe 50 kannst du reinkarnieren. Dein normaler Fortschritt beginnt neu, während permanente Vermächtnisboni über Lebenszyklen hinweg wachsen.',target:['.sv3-tabs','.shrine-tabs']},
    {eyebrow:'SEELENSTEINE',title:'Permanente Progression',text:'Seelensteine kaufst du im Vermächtnisbaum ein. Knoten müssen der Reihe nach freigeschaltet werden und wirken auf zukünftige Lebenszyklen.',target:['.legacy-tree','.sv3-legacy','.legacy-node']},
    {eyebrow:'RESET',title:'Was du zurücklässt',text:'Level, normale Ausrüstung, Gold, laufende Aktivitäten und alle Katakombenschlüssel werden zurückgesetzt. Dein Reinkarnationsrang und Vermächtnis bleiben erhalten.',target:['.reincarnation-card','.sv3-rebirth','.reincarnation']}
  ]}
};
function level(){return Number(window.S?.lvl||1)}
function state(){const s=window.S;if(!s)return null;if(!s[STORAGE_KEY]||typeof s[STORAGE_KEY]!=='object')s[STORAGE_KEY]={version:VERSION,completed:{},progress:{},dismissed:{},startedAt:Date.now()};const o=s[STORAGE_KEY];o.version=VERSION;o.completed=o.completed||{};o.progress=o.progress||{};o.dismissed=o.dismissed||{};if(!o.startedAt)o.startedAt=Date.now();return o}
function save(){if(typeof Arcane.state?.scheduleSave==='function')Arcane.state.scheduleSave();else window.save?.()}
function eligible(id){const chapter=CHAPTERS[id];if(!chapter)return false;if(chapter.freshOnly&&(level()>2||Number(S?.quests||0)>0))return false;return (ELIGIBILITY[id]||(()=>true))()}
function isDone(id){const o=state();return !!(o?.completed?.[id]||o?.dismissed?.[id])}
function isVisible(el){const r=el.getBoundingClientRect();return r.width>0&&r.height>0&&r.bottom>0&&r.top<innerHeight}
function targetFor(step){for(const selector of step.target||[]){const el=document.querySelector(selector);if(el&&isVisible(el))return el}return null}
function currentChapter(){const screen=S?.screen||'home';return CHAPTERS[screen]&&eligible(screen)&&!isDone(screen)?screen:null}
function clear(){document.querySelector('#aq-onboarding')?.remove();document.querySelectorAll('.aq-ob-target').forEach(el=>el.classList.remove('aq-ob-target'))}
function stepIndex(id){return Math.max(0,Number(state()?.progress?.[id]||0))}
function positionCard(card,target){if(!target){card.classList.add('aq-ob-center');return}target.classList.add('aq-ob-target');target.scrollIntoView?.({block:'center',behavior:'auto'});requestAnimationFrame(()=>{const r=target.getBoundingClientRect(),cw=Math.min(430,innerWidth-24),gap=14;let top=r.bottom+gap;if(top+260>innerHeight-96)top=Math.max(12,r.top-274);card.style.width=`${cw}px`;card.style.left=`${Math.max(12,Math.min(innerWidth-cw-12,r.left+r.width/2-cw/2))}px`;card.style.top=`${Math.max(12,top)}px`})}
function renderChapter(id){clear();const chapter=CHAPTERS[id],o=state();if(!chapter||!o||isDone(id)||!eligible(id))return;const index=stepIndex(id);if(index>=chapter.steps.length){complete(id);return}const step=chapter.steps[index],target=targetFor(step),overlay=document.createElement('div');overlay.id='aq-onboarding';overlay.className='aq-ob-layer';overlay.innerHTML=`<div class="aq-ob-shade"></div><section class="aq-ob-card" role="dialog" aria-modal="true" aria-label="Tutorial"><div class="aq-ob-progress"><span>${chapter.title}</span><b>${index+1}/${chapter.steps.length}</b></div><div class="aq-ob-eyebrow">${step.eyebrow}</div><h2>${step.title}</h2><p>${step.text}</p><div class="aq-ob-actions"><button class="aq-ob-skip" data-ob-skip>Überspringen</button><button class="aq-ob-next" data-ob-next>${index===chapter.steps.length-1?'Verstanden':'Weiter'}</button></div></section>`;document.body.appendChild(overlay);const card=overlay.querySelector('.aq-ob-card');positionCard(card,target);overlay.querySelector('[data-ob-next]').onclick=()=>advance(id);overlay.querySelector('[data-ob-skip]').onclick=()=>dismiss(id)}
function advance(id){const o=state(),chapter=CHAPTERS[id];if(!o||!chapter)return;o.progress[id]=stepIndex(id)+1;save();if(o.progress[id]>=chapter.steps.length)complete(id);else renderChapter(id)}
function complete(id){const o=state();if(!o)return;o.completed[id]=Date.now();delete o.progress[id];save();clear();toast?.(`${CHAPTERS[id]?.title||'Tutorial'} abgeschlossen.`)}
function dismiss(id){const o=state();if(!o)return;o.dismissed[id]=Date.now();delete o.progress[id];save();clear()}
function modalFlowActive(){return !!document.querySelector('#character-gate,.reward-overlay,.aq-dialog,.mb2-modal,.reward-card-overlay,.upgrade-success-overlay')}
let scheduled=false;function evaluate(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;if(modalFlowActive()){clear();return}const id=currentChapter();if(id)renderChapter(id);else clear()})}
function reset(id){const o=state();if(!o)return false;if(id){delete o.completed[id];delete o.dismissed[id];delete o.progress[id]}else{o.completed={};o.dismissed={};o.progress={}}save();evaluate();return true}
function chapterStatus(){const o=state();return Object.fromEntries(Object.keys(CHAPTERS).map(id=>[id,{eligible:eligible(id),completed:!!o?.completed?.[id],dismissed:!!o?.dismissed?.[id],progress:Number(o?.progress?.[id]||0)}]))}
Arcane.onboarding={version:VERSION,chapters:CHAPTERS,evaluate,reset,status:chapterStatus,open:id=>{if(!CHAPTERS[id]||!eligible(id))return false;const o=state();delete o.completed[id];delete o.dismissed[id];o.progress[id]=0;save();renderChapter(id);return true}};
Arcane.on?.('afterRenderSettled',evaluate);Arcane.on?.('screenChange',evaluate);Arcane.on?.('bootReady',evaluate);document.addEventListener('visibilitychange',()=>{if(!document.hidden)evaluate()});
const style=document.createElement('style');style.id='aq-onboarding-css';style.textContent=`.aq-ob-layer{position:fixed;inset:0;z-index:2147483646;pointer-events:none}.aq-ob-shade{position:absolute;inset:0;background:#050309a8;backdrop-filter:blur(2px);pointer-events:auto}.aq-ob-card{position:fixed;z-index:2;padding:18px;border:1px solid #b881ff70;border-radius:20px;background:linear-gradient(150deg,#281b36 0%,#15101d 72%);box-shadow:0 24px 80px #000c,0 0 35px #9d5cff25;color:var(--text);pointer-events:auto}.aq-ob-center{left:50%!important;top:50%!important;width:min(430px,calc(100vw - 24px))!important;transform:translate(-50%,-50%)}.aq-ob-progress{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:12px;color:#cdb9d9;font-size:9px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.aq-ob-progress b{color:var(--gold)}.aq-ob-eyebrow{color:#c38cff;font-size:9px;font-weight:900;letter-spacing:.14em}.aq-ob-card h2{margin:5px 0 8px;font-size:22px;line-height:1.08}.aq-ob-card p{margin:0;color:#d0c4d7;font-size:12px;line-height:1.55}.aq-ob-actions{display:grid;grid-template-columns:auto 1fr;gap:8px;margin-top:16px}.aq-ob-actions button{min-height:44px}.aq-ob-skip{background:#ffffff09!important;color:#b9abc4!important}.aq-ob-next{background:linear-gradient(135deg,#8d58e8,#b271ff)!important}.aq-ob-target{position:relative!important;z-index:2147483647!important;outline:2px solid #b97cff!important;outline-offset:5px!important;box-shadow:0 0 0 8px #9c5cff20,0 0 32px #a664ff88!important;border-radius:14px!important;animation:aqObPulse 1.8s ease-in-out infinite}.aq-ob-target,.aq-ob-target *{pointer-events:none!important}@keyframes aqObPulse{0%,100%{filter:brightness(1)}50%{filter:brightness(1.12)}}@media(max-width:520px){.aq-ob-card{padding:16px}.aq-ob-card h2{font-size:20px}.aq-ob-card p{font-size:11.5px}.aq-ob-actions{grid-template-columns:1fr 1.45fr}}`;document.head.appendChild(style);
})();