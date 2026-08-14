(()=>{
const ACTIONS={
 str:{icon:'🛡️',label:'Kraft',desc:'Du setzt rohe Kraft ein: stemmst den Mechanismus auf, räumst Hindernisse beiseite oder zwingst einen versperrten Weg auf.'},
 agi:{icon:'🌑',label:'Geschick',desc:'Du gehst vorsichtig und präzise vor: umgehst Fallen, bewegst dich lautlos oder manipulierst den Mechanismus mit ruhiger Hand.'},
 int:{icon:'🔮',label:'Wissen',desc:'Du untersuchst Runen und Hinweise: entschlüsselst Magie, erkennst Muster und versuchst die Gefahr zu verstehen, bevor du handelst.'}
};
function stats(){return window.getFinalStats?getFinalStats():{str:S.str||8,agi:S.agi||8,int:S.int||8}}
function chance(stat){return Math.max(28,Math.min(88,Math.round(52+(Number(stats()[stat]||8)-8)*2)))}
function risk(p){return p>=75?'Sehr günstig':p>=60?'Günstig':p>=45?'Ausgeglichen':'Riskant'}
function choices(){const s=stats();return `<div class="df3-intro">Wähle, <b>wie dein Held die Situation löst</b>. Deine Charakterwerte bestimmen die Erfolgschance.</div><div class="df3-choices">${['str','agi','int'].map(k=>{const a=ACTIONS[k],p=chance(k);return `<button onclick="d1Event('${k}')"><div class="df3-head"><span>${a.icon}</span><div><b>${a.label}</b><small>${k.toUpperCase()} ${s[k]}</small></div><em>${p}%</em></div><p>${a.desc}</p><div class="df3-meter"><i style="width:${p}%"></i></div><small class="df3-result">${risk(p)} · Erfolg: Gold/Beute · Fehlschlag: HP-Verlust</small></button>`}).join('')}</div>`}
function specialRoom(d){if(!d)return '';
 if(d.state==='v2rest')return `<div class="d1-room df3-special"><div class="d1-icon">🕯️</div><div class="small">RUHERAUM · RAUM 6</div><h2>Schrein der Stille</h2><p>Zwischen kalten Grabsteinen brennt eine einzelne ruhige Flamme. Ihre Wärme drängt die Müdigkeit zurück. Du kannst hier kurz rasten und dich auf die tieferen Gewölbe vorbereiten.</p><div class="df3-effect">❤️ Stellt 25 % deiner maximalen Lebenspunkte wieder her.</div><button onclick="d1V2Rest()">Am Schrein rasten</button></div>`;
 if(d.state==='v2treasure')return `<div class="d1-room df3-special"><div class="d1-icon">💎</div><div class="small">SCHATZRAUM · RAUM 9</div><h2>Schatzkammer</h2><p>Zwischen zerbrochenen Sarkophagen liegt die gehortete Beute der Katakomben. Du kannst sie bergen – danach trennt dich nur noch eine Kammer vom Hüter.</p><div class="df3-effect">🎁 Garantierte Zwischenbelohnung vor dem Endboss.</div><button onclick="d1V2Treasure()">Schatz bergen</button></div>`;
 return '';
}
const oldView=window.dungeonV1;
window.dungeonV1=function(){let h=oldView();const d=S.dungeonV1;if(!d)return h;
 if(d.state==='event'){
   const marker=/<div class="d2-decisions">[\s\S]*?<\/div><\/div>/;
   if(marker.test(h))h=h.replace(marker,`${choices()}</div>`);
   else h=h.replace(/<div class="d1-actions">[\s\S]*?<\/div><\/div>/,`${choices()}</div>`);
 }
 const sp=specialRoom(d);
 if(sp){
   // Previous wrappers sometimes fail because the base v1 renderer has no body for v2-only states.
   // Inject the room explicitly after the bank/loot/risk blocks, so room 6/9 can never render blank.
   const sectionEnd=h.lastIndexOf('</section>');
   if(sectionEnd>=0)h=h.slice(0,sectionEnd)+sp+h.slice(sectionEnd);
 }
 return h;
};
const style=document.createElement('style');style.textContent=`
.df3-intro{margin:10px 0 7px;padding:9px 10px;border-radius:10px;background:#ffffff07;color:var(--muted);font-size:9px;line-height:1.45;text-align:left}.df3-intro b{color:var(--text)}.df3-choices{display:grid;gap:8px;margin-top:8px}.df3-choices>button{width:100%;padding:11px;background:#ffffff08;border:1px solid #ffffff12;box-shadow:none;text-align:left}.df3-head{display:grid;grid-template-columns:34px 1fr auto;gap:8px;align-items:center}.df3-head>span{font-size:22px;text-align:center}.df3-head b,.df3-head small{display:block}.df3-head b{font-size:12px}.df3-head small{font-size:8px;color:var(--muted)}.df3-head em{font-style:normal;font-size:13px;font-weight:900;color:var(--ok)}.df3-choices p{font-size:9px!important;line-height:1.45!important;margin:7px 0!important;color:#d7cadd!important}.df3-meter{height:5px;background:#ffffff0b;border-radius:99px;overflow:hidden;margin:7px 0 5px}.df3-meter i{display:block;height:100%;background:linear-gradient(90deg,var(--accent),var(--gold))}.df3-result{font-size:8px;color:var(--muted)}.df3-special{margin-top:10px}.df3-special p{font-size:10px!important}.df3-effect{margin:10px 0;padding:9px;border-radius:9px;background:#71d59a0d;border:1px solid #71d59a22;color:#bce8cc;font-size:9px}.df3-special button{width:100%}
`;
document.head.appendChild(style);
})();