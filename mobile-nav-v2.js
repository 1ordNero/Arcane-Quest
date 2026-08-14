(()=>{
function nav(){
 const app=document.getElementById('app'); if(!app)return;
 const old=app.querySelector('nav.tabs'); if(!old)return;
 old.innerHTML=`
 <button class="${S.screen==='home'?'active':''}" onclick="tab('home')"><span>🍺</span><small>Taverne</small></button>
 <button class="${S.screen==='dungeon'?'active':''}" onclick="tab('dungeon')"><span>🏰</span><small>Katakomben</small></button>
 <button class="hero-tab ${S.screen==='char'?'active':''}" onclick="tab('char')"><span>🧙</span><small>Held</small></button>
 <button class="${S.screen==='forge'?'active':''}" onclick="tab('forge')"><span>🔨</span><small>Schmiede</small></button>
 <button class="${S.screen==='arena'?'active':''}" onclick="tab('arena')"><span>⚔️</span><small>Arena</small></button>`;
}
const baseRender=window.render;
window.render=function(){baseRender();nav()};
const baseTab=window.tab;
window.tab=function(name){
 if(name==='dungeon'){
   S.screen='dungeon';save();render();return;
 }
 baseTab(name);
};
const style=document.createElement('style');
style.textContent=`
main{padding-bottom:112px!important}
.tabs{height:70px;align-items:flex-end;overflow:visible!important;padding-top:5px!important}
.tabs button{flex:1;min-width:0!important;height:52px;padding:5px 2px!important;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;overflow:visible}
.tabs button span{font-size:20px;line-height:20px}.tabs button small{font-size:9px;white-space:nowrap}
.tabs .hero-tab{position:relative;transform:translateY(-14px);height:70px;max-width:74px;border-radius:50%!important;background:linear-gradient(145deg,#8f62df,#5f399f)!important;border:3px solid #2a2038;box-shadow:0 7px 20px #0009,0 0 0 2px #f4c15d33!important;color:white!important}
.tabs .hero-tab span{font-size:28px;line-height:28px}.tabs .hero-tab small{font-size:10px;font-weight:800}.tabs .hero-tab.active{box-shadow:0 7px 22px #0009,0 0 0 2px var(--gold),0 0 18px #f4c15d55!important}
@media(max-width:370px){.tabs button small{font-size:8px}.tabs .hero-tab{max-width:66px}}
`;
document.head.appendChild(style);
nav();
})();