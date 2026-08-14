(()=>{
const RACE_ART_SRC='assets/art/race-selection.webp';
const RACE_ORDER=['Mensch','Elf','Zwerg','Ork','Nachtläufer','Drachengeborener'];

function raceSelectionMarkup(){
  return `<div class="race-art-selector" aria-label="Volk auswählen">
    <img src="${RACE_ART_SRC}" alt="Auswahl der sechs Völker: Mensch, Elf, Zwerg, Ork, Nachtläufer und Drachengeborener" draggable="false">
    <div class="race-art-hotspots">
      ${RACE_ORDER.map((race,i)=>`<button type="button" class="race-art-hotspot race-${i} ${S.race===race?'selected':''}" onclick="chooseRace('${race}')" aria-label="${race} auswählen" aria-pressed="${S.race===race?'true':'false'}"><span>${race}</span></button>`).join('')}
    </div>
  </div>`;
}

function applyRaceArt(){
  if(typeof S==='undefined'||S.screen!=='char')return;
  const main=document.querySelector('main');
  if(!main)return;
  const raceHeading=[...main.querySelectorAll('h2')].find(el=>el.textContent.trim().startsWith('1 · Volk'));
  if(!raceHeading)return;
  const oldGrid=raceHeading.nextElementSibling;
  if(!oldGrid||!oldGrid.classList.contains('choice-grid'))return;
  const holder=document.createElement('div');
  holder.innerHTML=raceSelectionMarkup();
  oldGrid.replaceWith(holder.firstElementChild);
}

const css=document.createElement('style');
css.textContent=`
.race-art-selector{position:relative;width:min(100%,520px);margin:10px auto 18px;border-radius:18px;overflow:hidden;background:#0d0a12;box-shadow:0 14px 34px #0008;border:1px solid #f4c15d22;isolation:isolate;touch-action:manipulation}
.race-art-selector>img{display:block;width:100%;height:auto;aspect-ratio:9/16;object-fit:cover;user-select:none;-webkit-user-select:none;pointer-events:none}
.race-art-hotspots{position:absolute;inset:0;z-index:2}
.race-art-hotspot{position:absolute;left:1.5%;right:1.5%;height:13.45%;padding:0!important;margin:0!important;border:2px solid transparent!important;border-radius:10px!important;background:transparent!important;box-shadow:none!important;color:transparent!important;overflow:hidden!important;transition:border-color .18s ease,background .18s ease,box-shadow .18s ease,transform .12s ease}
.race-art-hotspot span{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.race-art-hotspot:active{transform:scale(.992)}
.race-art-hotspot.selected{border-color:#f4c15d!important;background:linear-gradient(90deg,#f4c15d18,#a875ff12,#f4c15d18)!important;box-shadow:inset 0 0 18px #f4c15d20,0 0 12px #f4c15d88!important}
.race-art-hotspot:focus-visible{outline:3px solid #fff!important;outline-offset:-4px}
.race-art-hotspot.race-0{top:8.5%}
.race-art-hotspot.race-1{top:21.95%}
.race-art-hotspot.race-2{top:35.40%}
.race-art-hotspot.race-3{top:48.85%}
.race-art-hotspot.race-4{top:62.30%}
.race-art-hotspot.race-5{top:75.75%}
@media(max-width:520px){.race-art-selector{width:100%;border-radius:14px;margin-top:8px}.race-art-hotspot{left:1%;right:1%;border-radius:8px!important}.race-art-hotspot.selected{border-width:2px!important}}
`;
document.head.appendChild(css);

const previousRender=window.render;
if(typeof previousRender==='function'){
  window.render=function(){
    const result=previousRender.apply(this,arguments);
    applyRaceArt();
    return result;
  };
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',applyRaceArt,{once:true});
else applyRaceArt();
})();
