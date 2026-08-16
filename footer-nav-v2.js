(()=>{
const NAV=[
{screen:'home',label:'Taverne',icon:'assets/icons/nav-tavern.webp'},
{screen:'dungeon',label:'Katakomben',icon:'assets/icons/nav-catacombs.webp'},
{screen:'char',label:'Held',hero:true},
{screen:'city',label:'Stadt',icon:'assets/icons/nav-stadt.webp'},
{screen:'arena',label:'Arena',icon:'assets/icons/nav-arena.webp'}
];
function activeScreen(){const s=S?.screen||'home';return ['merchant','bank','forge'].includes(s)?'city':s}
function heroPortrait(){try{return window.getHeroPortrait?getHeroPortrait({cls:S.cls,gender:S.gender}):'assets/icons/nav-held.webp'}catch(e){return 'assets/icons/nav-held.webp'}}
function footerHTML(){const active=activeScreen();return NAV.map(n=>{const src=n.hero?heroPortrait():n.icon;const blocked=n.screen==='dungeon'&&!!S?.quest;return `<button class="aq-nav ${n.hero?'aq-hero':''} ${active===n.screen?'active':''}" ${blocked?'disabled aria-disabled="true" title="Während einer aktiven Quest nicht verfügbar"':''} onclick="aqNav('${n.screen}')"><span class="aq-nav-art"><img ${n.hero?'data-hero-portrait="1"':''} src="${src}" alt="${n.label}"></span><span class="aq-nav-label">${n.label}</span></button>`}).join('')}
function rebuildFooter(){const nav=document.querySelector('.tabs');if(!nav)return;nav.className='tabs aq-footer';nav.innerHTML=footerHTML()}
window.aqNav=function(screen){if(screen==='dungeon'&&S?.quest){toast?.('Die Katakomben können während einer aktiven Quest nicht betreten werden.');return}tab?.(screen)};
window.aqFooterHTML=footerHTML;
function apply(){rebuildFooter()}
if(window.Arcane?.on)Arcane.on('afterRenderSettled',apply);
const css=document.createElement('style');css.textContent=`
.tabs.aq-footer{position:fixed!important;left:0!important;right:0!important;bottom:0!important;z-index:50!important;display:grid!important;grid-template-columns:repeat(5,1fr)!important;align-items:stretch!important;height:72px!important;padding:0 max(6px,env(safe-area-inset-left)) max(4px,env(safe-area-inset-bottom))!important;background:#15101df5!important;border-top:1px solid #ffffff12!important;backdrop-filter:blur(14px)!important;overflow:visible!important}.tabs.aq-footer .aq-nav{position:relative!important;min-width:0!important;width:100%!important;height:68px!important;min-height:68px!important;margin:0!important;padding:5px 2px 4px!important;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:flex-end!important;color:var(--muted)!important;overflow:visible!important}.tabs.aq-footer .aq-nav:disabled{opacity:.35!important}.tabs.aq-footer .aq-nav-art{width:48px!important;height:48px!important;display:grid!important;place-items:center!important;margin:0 auto -1px!important;pointer-events:none!important}.tabs.aq-footer .aq-nav-art img{display:block!important;width:100%!important;height:100%!important;object-fit:contain!important;filter:drop-shadow(0 3px 5px #0009)!important}.tabs.aq-footer .aq-hero .aq-nav-art{width:54px!important;height:54px!important;margin-bottom:-4px!important}.tabs.aq-footer .aq-nav-label{font-size:10px!important;line-height:1!important;font-weight:800!important;color:inherit!important;white-space:nowrap!important}.tabs.aq-footer .aq-nav.active{color:var(--text)!important}.tabs.aq-footer .aq-nav.active:after{content:'';position:absolute;left:34%;right:34%;bottom:0;height:3px;border-radius:99px;background:linear-gradient(90deg,var(--accent),var(--gold))}.tabs.aq-footer .aq-nav.active .aq-nav-art img{filter:drop-shadow(0 3px 5px #0009) drop-shadow(0 0 5px #a875ff66)!important}main{padding-bottom:92px!important}
@media(max-width:380px){.tabs.aq-footer .aq-nav-art{width:44px!important;height:44px!important}.tabs.aq-footer .aq-hero .aq-nav-art{width:50px!important;height:50px!important}.tabs.aq-footer .aq-nav-label{font-size:9px!important}}
`;document.head.appendChild(css);apply();
})();