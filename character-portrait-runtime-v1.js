(()=>{
function state(){try{return S||{}}catch(e){return JSON.parse(localStorage.getItem('arcaneBeta')||'null')||{}}}
function patch(){const s=state(),src=window.getHeroPortrait?getHeroPortrait({cls:s.cls,gender:s.gender}):'assets/icons/nav-held.webp';document.querySelectorAll('img[src*="nav-held.webp"],img[data-hero-portrait]').forEach(img=>{if(img.getAttribute('src')!==src)img.setAttribute('src',src);img.dataset.heroPortrait='1'});const av=document.querySelector('.hv3-avatar');if(av&&!av.querySelector('img')){av.innerHTML=`<img data-hero-portrait="1" src="${src}" alt="${s.name||'Held'}">`}}
const css=document.createElement('style');css.textContent=`.hv3-avatar{overflow:visible!important;background:transparent!important;border:0!important}.hv3-avatar img{display:block;width:52px;height:52px;object-fit:contain;filter:drop-shadow(0 3px 5px #0008)}.hero-tab .hero-nav-art img[data-hero-portrait]{transform:scale(1.08)!important}`;document.head.appendChild(css);
const prev=window.render;if(typeof prev==='function')window.render=function(){const r=prev.apply(this,arguments);patch();return r};
patch();
})();