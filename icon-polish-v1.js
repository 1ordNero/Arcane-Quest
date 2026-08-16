(()=>{
function img(src,cls='ui-section-icon'){return `<img class="${cls}" src="${src}" alt="" aria-hidden="true">`}
function polish(){
  const tavern=document.querySelector('.tabs .nav-tavern .nav-art img');
  if(tavern)tavern.style.setProperty('transform','scale(1.04)','important');
  let screen=null;try{screen=typeof S!=='undefined'&&S?S.screen:null}catch{}
  if(['city','merchant','bank','forge'].includes(screen)){
    const cityTitle=document.querySelector('.cux-city-title>span');
    if(cityTitle&&!cityTitle.querySelector('img'))cityTitle.innerHTML=img('assets/icons/nav-stadt.webp');
    const crumb=document.querySelector('.cux-top button');
    if(crumb&&crumb.textContent.includes('Stadt')&&!crumb.querySelector('img'))crumb.innerHTML=`${img('assets/icons/nav-stadt.webp','ui-inline-icon')}<span>Stadt</span>`;
    const rawCity=document.querySelector('.cv2-head h1');
    if(rawCity&&rawCity.textContent.includes('Stadt')&&!rawCity.querySelector('img'))rawCity.innerHTML=`${img('assets/icons/nav-stadt.webp','ui-inline-icon')}<span>Die Stadt</span>`;
  }
  if(screen==='arena'){
    const h=document.querySelector('.av3-title h1');
    if(h&&!h.querySelector('img'))h.innerHTML=`${img('assets/icons/nav-arena.webp','ui-inline-icon')}<span>Arena</span>`;
  }
}
let scheduled=false;
function schedulePolish(){if(scheduled)return;scheduled=true;queueMicrotask(()=>{scheduled=false;polish()})}
new MutationObserver(schedulePolish).observe(document.documentElement,{childList:true,subtree:true});
const css=document.createElement('style');css.textContent=`
.tabs .nav-tavern .nav-art img{transform:scale(1.04)!important}.ui-section-icon{display:block;width:34px;height:34px;object-fit:contain}.ui-inline-icon{display:inline-block;width:24px;height:24px;object-fit:contain;vertical-align:middle;margin-right:6px}.cux-top button{display:inline-flex!important;align-items:center!important;gap:3px!important}.cux-top button .ui-inline-icon{width:22px;height:22px;margin-right:2px}.av3-title h1,.cv2-head h1{display:flex!important;align-items:center!important;gap:6px!important}.av3-title h1 .ui-inline-icon,.cv2-head h1 .ui-inline-icon{width:30px;height:30px;margin:0}
`;document.head.appendChild(css);polish();
})();