(()=>{
const SRC='assets/art/race-selection.webp';
const RACES=['Mensch','Elf','Zwerg','Ork','Nachtläufer','Drachengeborener'];
let applying=false;
function apply(){
  if(applying)return;
  const gate=document.getElementById('character-gate');
  if(!gate)return;
  const step=gate.querySelector('.cg-step');
  if(!step||!step.textContent.includes('CHARAKTEREDITOR · 1/3'))return;
  const grid=gate.querySelector('.cg-icons');
  if(!grid||grid.dataset.raceArt==='1')return;
  applying=true;
  const selected=[...grid.querySelectorAll('.cg-iconbtn.sel b')][0]?.textContent?.trim()||'Mensch';
  const wrap=document.createElement('div');
  wrap.className='cg-race-art';
  wrap.dataset.raceArt='1';
  wrap.innerHTML=`<img src="${SRC}" alt="Sechs spielbare Völker: Mensch, Elf, Zwerg, Ork, Nachtläufer und Drachengeborener" draggable="false">${RACES.map((r,i)=>`<button type="button" class="cg-race-hit r${i} ${selected===r?'sel':''}" onclick="cgPick('race','${r}')" aria-label="${r} auswählen" aria-pressed="${selected===r?'true':'false'}"><span>${r}</span></button>`).join('')}`;
  grid.replaceWith(wrap);
  const hint=[...gate.querySelectorAll('.cg-step')].find(x=>x.textContent.includes('VOLK ·'));
  if(hint)hint.textContent='VOLK · FIGUR ANTIPpen';
  applying=false;
}
const css=document.createElement('style');css.textContent=`
.cg-race-art{position:relative;width:min(100%,430px);margin:4px auto 0;border-radius:16px;overflow:hidden;border:1px solid #f4c15d26;background:#0b0910;box-shadow:0 14px 32px #0008;isolation:isolate}.cg-race-art>img{display:block;width:100%;height:auto;aspect-ratio:9/16;object-fit:cover;pointer-events:none;user-select:none;-webkit-user-select:none}.cg-race-hit{position:absolute!important;left:1.2%!important;right:1.2%!important;height:13.35%!important;padding:0!important;margin:0!important;border:2px solid transparent!important;border-radius:10px!important;background:transparent!important;box-shadow:none!important;color:transparent!important;min-height:0!important}.cg-race-hit span{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}.cg-race-hit.sel{border-color:#f4c15d!important;background:linear-gradient(90deg,#f4c15d12,#a875ff0e,#f4c15d12)!important;box-shadow:inset 0 0 20px #f4c15d18,0 0 12px #f4c15d88!important}.cg-race-hit:focus-visible{outline:3px solid #fff!important;outline-offset:-4px}.cg-race-hit.r0{top:8.8%}.cg-race-hit.r1{top:22.2%}.cg-race-hit.r2{top:35.6%}.cg-race-hit.r3{top:49.0%}.cg-race-hit.r4{top:62.4%}.cg-race-hit.r5{top:75.8%}@media(max-width:430px){.cg-race-art{width:100%;border-radius:13px}.cg-race-hit{left:.8%!important;right:.8%!important;border-radius:8px!important}}
`;document.head.appendChild(css);
const observer=new MutationObserver(()=>apply());
observer.observe(document.documentElement,{childList:true,subtree:true});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
})();