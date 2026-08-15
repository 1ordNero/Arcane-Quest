(()=>{
const ROOT='assets/items/';
const ASSETS=[
'weapon-sword-knight.webp','weapon-axe-warrior.webp','weapon-staff-mage.webp','weapon-staff-warlock.webp','weapon-staff-druid.webp','shield-knight.webp','armor-knight.webp','robe-mage.webp','armor-druid.webp','armor-warlock.webp','armor-paladin.webp','helmet-warlock.webp','helmet-knight.webp','helmet-demon.webp','helmet-druid.webp','helmet-shadow.webp','helmet-paladin.webp','gauntlets-knight.webp','gloves-druid.webp','boots-knight.webp','boots-druid.webp','belt-knight.webp','belt-druid.webp','amulet-arcane.webp','ring-arcane.webp'];
const path=n=>ROOT+n;
const norm=s=>s==='Schultern'?'Schulter':s==='Nebenhand'?'Zweithand':s;
function clsAsset(slot){
 const c=S.cls||'Krieger';slot=norm(slot);
 if(slot==='Haupthand')return c==='Magier'?'weapon-staff-mage.webp':c==='Hexenmeister'?'weapon-staff-warlock.webp':c==='Druide'?'weapon-staff-druid.webp':'weapon-sword-knight.webp';
 if(slot==='Zweithand')return c==='Krieger'?'shield-knight.webp':c==='Magier'?'weapon-staff-mage.webp':c==='Hexenmeister'?'weapon-staff-warlock.webp':c==='Druide'?'weapon-staff-druid.webp':'shield-knight.webp';
 if(slot==='Brust')return c==='Magier'?'robe-mage.webp':c==='Hexenmeister'?'armor-warlock.webp':c==='Druide'?'armor-druid.webp':'armor-knight.webp';
 if(slot==='Kopf')return c==='Magier'?'helmet-shadow.webp':c==='Hexenmeister'?'helmet-warlock.webp':c==='Druide'?'helmet-druid.webp':'helmet-knight.webp';
 if(slot==='Handschuhe')return c==='Druide'?'gloves-druid.webp':'gauntlets-knight.webp';
 if(slot==='Stiefel')return c==='Druide'?'boots-druid.webp':'boots-knight.webp';
 if(slot==='Gürtel')return c==='Druide'?'belt-druid.webp':'belt-knight.webp';
 if(slot==='Amulett')return 'amulet-arcane.webp';
 if(slot==='Ring'||slot==='Ring 1'||slot==='Ring 2')return 'ring-arcane.webp';
 return null;
}
function assetFor(it,slot){
 const n=(it?.name||'').toLowerCase();slot=norm(slot||it?.slot||'');
 if(/ring/.test(n))return path('ring-arcane.webp');
 if(/amulett|siegelamulett/.test(n))return path('amulet-arcane.webp');
 if(/schild/.test(n))return path('shield-knight.webp');
 if(/klinge|schwert/.test(n))return path('weapon-sword-knight.webp');
 if(/axt|spalt/.test(n)&&slot==='Haupthand')return path('weapon-axe-warrior.webp');
 if(/stiefel/.test(n))return path((S.cls==='Druide'||/wald|leder/.test(n))?'boots-druid.webp':'boots-knight.webp');
 if(/gürtel/.test(n))return path(S.cls==='Druide'?'belt-druid.webp':'belt-knight.webp');
 if(/panzer|rüstung|reiseleder/.test(n))return path(clsAsset('Brust'));
 const a=clsAsset(slot);return a?path(a):null;
}
window.getItemAsset=assetFor;
function imgTag(src,alt=''){return `<img class="ia1-img" src="${src}" alt="${String(alt).replace(/"/g,'&quot;')}">`}
function findByName(name){name=(name||'').replace(/\s+\+\d+$/,'').trim();return [...(S.items||[]),...Object.values(S.eq||{}).filter(Boolean)].find(x=>x.name===name)}
function decorate(html){
 const box=document.createElement('div');box.innerHTML=html;
 box.querySelectorAll('.he4-slot').forEach(btn=>{
   const slot=btn.querySelector('small')?.textContent.trim();if(!slot)return;
   const eq=S.eq?.[slot]||S.eq?.[slot==='Schulter'?'Schultern':slot==='Zweithand'?'Nebenhand':slot];
   if(!eq)return;
   const src=assetFor(eq,slot),target=btn.querySelector(':scope > span');if(src&&target)target.innerHTML=imgTag(src,eq.name);
 });
 box.querySelectorAll('.he4-item').forEach(btn=>{
   const name=btn.querySelector('b')?.textContent.trim(),it=findByName(name),target=btn.querySelector('.he4-itemicon');if(!it||!target)return;
   const src=assetFor(it);if(src)target.innerHTML=imgTag(src,it.name);
 });
 box.querySelectorAll('.he4-detail').forEach(d=>{
   const name=d.querySelector('h2')?.textContent.trim(),it=findByName(name),target=d.querySelector('.he4-icon');if(!it||!target)return;
   const src=assetFor(it);if(src)target.innerHTML=imgTag(src,it.name);
 });
 return box.innerHTML;
}
const baseChar=window.char;if(baseChar)window.char=function(){return decorate(baseChar.apply(this,arguments))};
// Preload once so equipment icons appear immediately when opening Hero/Inventory.
ASSETS.forEach(f=>{const i=new Image();i.decoding='async';i.src=path(f)});
const css=document.createElement('style');css.textContent=`.ia1-img{width:100%;height:100%;object-fit:contain;display:block;pointer-events:none}.he4-slot.has>span{width:40px!important;height:40px!important;display:block!important}.he4-itemicon{overflow:hidden;padding:2px}.he4-itemicon .ia1-img{width:34px;height:34px}.he4-icon{overflow:hidden}.he4-icon .ia1-img{width:54px;height:54px}.he4-slot.has{background:radial-gradient(circle at 50% 42%,#ffffff0c,#ffffff03)!important}`;document.head.appendChild(css);
})();