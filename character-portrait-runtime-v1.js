(()=>{
function state(){try{return typeof S!=='undefined'&&S?S:{}}catch{return {}}}
function patch(){
 const s=state(),src=window.getHeroPortrait?getHeroPortrait({cls:s.cls,gender:s.gender}):'assets/icons/nav-held.webp';
 document.querySelectorAll('img[src*="nav-held.webp"],img[data-hero-portrait]').forEach(img=>{
   if(img.getAttribute('src')!==src)img.setAttribute('src',src);
   img.dataset.heroPortrait='1';
   if(!img.alt)img.alt=s.name||'Held';
 });
}
const css=document.createElement('style');css.textContent=`.hero-tab .hero-nav-art img[data-hero-portrait]{transform:scale(1.08)!important}`;document.head.appendChild(css);
if(window.Arcane?.on)Arcane.on('afterRenderSettled',patch);
patch();
})();