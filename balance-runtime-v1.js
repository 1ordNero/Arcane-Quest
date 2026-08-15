(()=>{
const VERSION=1;
const XP_CURVE=l=>{const x=Math.max(0,(Number(l)||1)-1);return Math.round(80+18*x+1.8*Math.pow(x,1.28))};
const RESULT_GOLD_FACTOR={raid:.015,event:.018,risk:.024,bounty:.022,mini:.008};
const RESULT_GOLD_CAP={raid:2.5,event:2.8,risk:3.4,bounty:3.2,mini:1.8};
const MERCHANT_RARITY={common:1,magic:1.25,rare:1.55,mythic:2.25,epic:1.85,legendary:2.5};
const baseGainXP=window.gainXP;
const baseSave=window.save;
let pendingXP=null;

function source(){
 if(S.autoMiniBattle)return'mini';
 if(S.bountyCombat4)return'bounty';
 if(S.quest?.id==='risk')return'risk';
 if(S.quest?.id==='event')return'event';
 if(S.quest?.id==='raid')return'raid';
 if(S.dungeonV1||S.dungeonV7)return'dungeon';
 return'other';
}
function xpAward(reported,src=source()){
 const lvl=Math.max(1,Number(S.lvl)||1),n=Math.max(1,Number(reported)||1);
 let out=n;
 if(src==='raid')out=28+lvl*1.6;
 else if(src==='event')out=38+lvl*2.2;
 else if(src==='risk')out=70+lvl*3.4;
 else if(src==='bounty')out=(60+lvl*2.8)*Math.max(.8,Math.min(1.45,n/72));
 else if(src==='mini')out=24+lvl*1.3;
 else if(src==='dungeon')out=n*Math.min(1.8,1+lvl*.008);
 else out=n*Math.min(1.45,1+Math.max(0,lvl-1)*.0045);
 if(S.race==='Mensch')out*=1.10;
 return Math.max(1,Math.round(out));
}
function resultSource(r){const t=`${r?.cat||''} ${r?.name||''}`;if(/Knochenwache|MINIBOSS/i.test(t))return'mini';if(/KOPFGELD|Knochenhauer/i.test(t))return'bounty';if(/RISIKO|Krypta/i.test(t))return'risk';if(/EREIGNIS|Siegel/i.test(t))return'event';return'raid'}
function scaleResultGold(r){const src=resultSource(r),lvl=Math.max(1,Number(S.lvl)||1),reported=Math.max(0,Number(r.gold)||0);if(!reported)return;const factor=Math.min(RESULT_GOLD_CAP[src],1+Math.max(0,lvl-1)*RESULT_GOLD_FACTOR[src]);const actual=Math.max(reported,Math.round(reported*factor));if(actual!==reported){S.gold=Math.max(0,(Number(S.gold)||0)+(actual-reported));r.gold=actual;replaceLogNumber('Gold',reported,actual)}}
function replaceLogNumber(label,from,to){if(!Array.isArray(S.log)||from===to)return;const re=new RegExp(`\\+${from} ${label}`);for(let i=0;i<Math.min(3,S.log.length);i++){if(re.test(S.log[i])){S.log[i]=S.log[i].replace(re,`+${to} ${label}`);break}}}
function normalizeMerchant(){const stock=S.city?.stock;if(!Array.isArray(stock))return;stock.forEach(it=>{if(!it)return;const il=Math.max(1,Number(it.itemLevel)||Number(S.lvl)||1),power=Math.max(1,Number(it.power)||1),rar=MERCHANT_RARITY[it.rarity]||1;it.price=Math.max(35,Math.round((40+il*6+power*3.5)*rar))})}
function enforceLegendaryRule(r){if(!r||resultSource(r)!=='bounty'||r.itemRarity!=='legendary')return;const candidates=(S.items||[]).filter(it=>it?.rarity==='legendary'&&(it.name===r.item||!r.item));const it=candidates[candidates.length-1];if(it){it.rarity='mythic';delete it.legendary;delete it.goldFind}r.itemRarity='mythic'}
function applyResultBalance(){const r=S.questResult;if(!r||r.balanceVersion>=VERSION)return;scaleResultGold(r);if(pendingXP&&Number(r.xp)===pendingXP.reported){r.xp=pendingXP.actual;replaceLogNumber('XP',pendingXP.reported,pendingXP.actual)}enforceLegendaryRule(r);r.balanceVersion=VERSION;pendingXP=null}

window.xpNeed=()=>XP_CURVE(S.lvl);
if(typeof baseGainXP==='function')window.gainXP=function(n){const src=source(),actual=xpAward(n,src);pendingXP={reported:Number(n)||0,actual,src,at:Date.now()};return baseGainXP(actual)};
if(typeof baseSave==='function')window.save=function(){applyResultBalance();normalizeMerchant();return baseSave.apply(this,arguments)};

const oldRefresh=window.merchantRefresh;
if(typeof oldRefresh==='function')window.merchantRefresh=function(){const stamp=Number(S.city?.stamp)||0;if(stamp&&Date.now()-stamp<20*60*1000)return toast?.('Das Händlersortiment wechselt höchstens alle 20 Minuten.');return oldRefresh.apply(this,arguments)};

normalizeMerchant();
window.ARCANE_BALANCE=Object.freeze({version:VERSION,xpNeed:XP_CURVE,xpAward,merchantRefreshMinutes:20});
})();