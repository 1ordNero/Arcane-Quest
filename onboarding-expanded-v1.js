(()=>{
'use strict';
const DETAILS={
'WILLKOMMEN':'Neue Systeme werden erst erklärt, wenn du sie freischaltest – so bleibt der Einstieg übersichtlich.',
'ABENTEUERLUST':'Abenteuerlust gilt nur für Tavernenaktivitäten; Mana, Wut und andere Klassenressourcen existieren ausschließlich im Kampf.',
'QUESTS':'Vergleiche neben XP auch Abenteuerlust-Kosten, Dauer, Gold, Beute und besondere Questregeln.',
'HELD':'Ein guter Build entsteht aus Ausrüstung, Attributen, Überleben und einer passenden Skillrotation – nicht aus nur einem hohen Wert.',
'AUSRÜSTUNG':'Seltenheit allein entscheidet nicht: Macht, Attribute und Affixe sollten zu deiner Klasse und Spielweise passen.',
'FERTIGKEITEN':'Die vier Plätze bilden deine aktive Rotation und werden von automatischen und taktischen Kämpfen verwendet.',
'KLASSENRESSOURCE':'Jeder Kampf beginnt mit einem frischen Vorrat; ist er leer, müssen schwächere Aktionen Ressource zurückgewinnen.',
'KATAKOMBEN':'Ein Run besteht aus mehreren zusammenhängenden Räumen, deren Entscheidungen und Risiken sich bis zum Ende auswirken.',
'SCHLÜSSEL':'Ein Schlüssel startet einen neuen Run und wird bei einer Reinkarnation zusammen mit allen übrigen Katakombenschlüsseln gelöscht.',
'RISIKO':'Ungesicherte Beute kann durch weiteres Vordringen wachsen, ist dabei aber auch stärker gefährdet.',
'NEU FREIGESCHALTET':'Dieser Bereich wird erst jetzt erklärt, weil dein Held die notwendige Stufe erreicht hat.',
'HALTUNG':'Passe Aggressiv, Defensiv oder Konter an den gegnerischen Archetyp an, statt immer dieselbe Haltung zu verwenden.',
'GEGNERWAHL':'Mehr Ruhm bedeutet meist mehr Risiko; der stärkste Gegner ist deshalb nicht automatisch die effizienteste Wahl.',
'AUFWERTEN':'Investiere knappe Schmiederessourcen bevorzugt in Gegenstände, die du voraussichtlich länger tragen wirst.',
'VERWERTEN':'Schwache Beute wird zu Materialien, hochwertige oder ungewöhnlich gut gerollte Items solltest du vorher prüfen.',
'VEREDELUNG & AHNENWERK':'Beide Systeme lohnen sich besonders für hochwertige Langzeitgegenstände statt für kurzfristige Übergangsausrüstung.',
'SEELENSTEINE':'Vermächtnisknoten bleiben dauerhaft bestehen und müssen innerhalb eines Zweiges in Reihenfolge freigeschaltet werden.',
'RESET':'Reinkarnation setzt den aktuellen Lebenszyklus zurück, während Vermächtnis und Reinkarnationshistorie dauerhaft erhalten bleiben.'};
function expand(){const layer=document.getElementById('aq-onboarding');if(!layer)return;const card=layer.querySelector('.aq-ob-card');if(!card||card.dataset.expanded==='1')return;const key=card.querySelector('.aq-ob-eyebrow')?.textContent?.trim();const extra=DETAILS[key];if(!extra)return;card.dataset.expanded='1';const p=card.querySelector('p');if(!p)return;const more=document.createElement('p');more.className='aq-ob-more';more.textContent=extra;p.insertAdjacentElement('afterend',more)}
new MutationObserver(expand).observe(document.documentElement,{subtree:true,childList:true});window.Arcane?.on?.('afterRenderSettled',()=>requestAnimationFrame(expand));
const css=document.createElement('style');css.textContent=`.aq-ob-card .aq-ob-more{margin-top:7px!important;padding-top:7px!important;border-top:1px solid #ffffff12!important;color:#cfc3d6!important;font-size:11px!important;line-height:1.45!important}.aq-ob-card>p:not(.aq-ob-more){font-size:11.5px!important;line-height:1.48!important}.aq-ob-card{max-height:min(62dvh,480px)!important;overflow-y:auto!important}`;document.head.appendChild(css);queueMicrotask(expand);
})();