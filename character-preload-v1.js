(()=>{
const portraits=['human-warrior-male.webp','human-warrior-female.webp','human-mage-male.webp','human-mage-female.webp','human-warlock-male.webp','human-warlock-female.webp','human-druid-male.webp','human-druid-female.webp'].map(n=>`assets/characters/${n}`);
const preload=()=>portraits.forEach(src=>{const img=new Image();img.decoding='async';img.src=src});
if('requestIdleCallback'in window)requestIdleCallback(preload,{timeout:2500});else setTimeout(preload,800);
})();