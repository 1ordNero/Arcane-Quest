(()=>{
const p=new URLSearchParams(location.search);
if(p.get('newCharacter')!=='1')return;
window.__ARCANE_INTENTIONAL_RESET=true;
window.__ARCANE_FORCE_CHARACTER_CREATE=true;
try{localStorage.clear();sessionStorage.clear()}catch(e){console.warn('[Reset boot] storage',e)}
try{
 const u=new URL(location.href);
 u.searchParams.delete('newCharacter');
 u.searchParams.delete('reset');
 u.searchParams.delete('ts');
 u.searchParams.delete('fresh');
 history.replaceState(null,'',u.pathname+(u.searchParams.toString()?`?${u.searchParams}`:'')+u.hash);
}catch(e){console.warn('[Reset boot] url',e)}
})();