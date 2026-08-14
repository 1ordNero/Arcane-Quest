(()=>{
function footer(){return `<nav class="tabs city-tabs">
<button class="${S.screen==='home'?'active':''}" onclick="tab('home')"><span>🍺</span><small>Taverne</small></button>
<button class="${S.screen==='dungeon'?'active':''}" onclick="tab('dungeon')"><span>🏰</span><small>Katakomben</small></button>
<button class="${S.screen==='merchant'||S.screen==='bank'?'active':''}" onclick="tab('merchant')"><span>🏘️</span><small>Stadt</small></button>
<button class="hero-tab ${S.screen==='char'?'active':''}" onclick="tab('char')"><span>🧙</span><small>Held</small></button>
<button class="${S.screen==='forge'?'active':''}" onclick="tab('forge')"><span>🔨</span><small>Schmiede</small></button>
<button class="${S.screen==='arena'?'active':''}" onclick="tab('arena')"><span>⚔️</span><small>Arena</small></button>
</nav>`}
function patchCity(){
 if(S.screen!=='merchant'&&S.screen!=='bank')return;
 const app=document.getElementById('app'); if(!app)return;
 const main=app.querySelector('main');
 if(main&&!main.querySelector('.city-back')) main.insertAdjacentHTML('afterbegin',`<div class="city-back"><button onclick="tab('home')">‹ Zur Taverne</button></div>`);
 let nav=app.querySelector('nav.tabs');
 if(nav)nav.outerHTML=footer(); else app.insertAdjacentHTML('beforeend',footer());
}
const oldRender=window.render;
window.render=function(){oldRender();patchCity()};
const st=document.createElement('style');
st.textContent=`
.city-back{margin:0 auto 8px;max-width:760px}.city-back button{background:#ffffff0b;border:1px solid #ffffff14;box-shadow:none;padding:8px 11px;font-size:9px;color:var(--text)}
.city-tabs{height:70px;align-items:flex-end;overflow:visible!important;padding-top:5px!important}.city-tabs button{flex:1;min-width:0!important;height:52px;padding:5px 1px!important;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;overflow:visible;background:transparent;box-shadow:none;color:var(--muted)}.city-tabs button span{font-size:19px;line-height:20px}.city-tabs button small{font-size:8px;white-space:nowrap}.city-tabs button.active{background:#ffffff10;color:white}.city-tabs .hero-tab{position:relative;transform:translateY(-14px);height:70px;max-width:72px;border-radius:50%!important;background:linear-gradient(145deg,#8f62df,#5f399f)!important;border:3px solid #2a2038;box-shadow:0 7px 20px #0009,0 0 0 2px #f4c15d33!important;color:white!important}.city-tabs .hero-tab span{font-size:28px;line-height:28px}.city-tabs .hero-tab small{font-size:10px;font-weight:800}@media(max-width:370px){.city-tabs button small{font-size:7px}.city-tabs button span{font-size:17px}.city-tabs .hero-tab{max-width:62px}}
`;
document.head.appendChild(st);
patchCity();
})();