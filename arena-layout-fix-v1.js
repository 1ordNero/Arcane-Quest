(()=>{
const css=document.createElement('style');
css.textContent=`
/* Arena: keep stance art, label and effect in separate visual columns. */
.av2-stances button{overflow:hidden!important}
.av2-stances button>b{min-width:0!important}
.av2-stances button>small{min-width:0!important;overflow-wrap:anywhere}
.av2-stances .gai-stance{flex:0 0 auto!important}

/* Challenger portraits are 55-61px; reserve enough room so they never overlap text. */
.av3-ophead{grid-template-columns:64px minmax(0,1fr) auto!important;gap:10px!important;align-items:center!important}
.av3-ophead>span{width:60px!important;height:60px!important;display:grid!important;place-items:center!important;background:transparent!important;overflow:visible!important}
.av3-ophead>span .gai-challenger{width:58px!important;height:58px!important}
.av3-ophead>div{min-width:0!important}
.av3-ophead b,.av3-ophead small{overflow-wrap:anywhere}
.av2-ops>button{min-height:0!important;padding:10px 12px!important}
.av3-reward{margin-top:7px!important}
.av3-reward>span{padding:5px 7px!important}
.av3-start{margin-top:5px!important}

@media(max-width:520px){
  .av2-stances{gap:7px!important}
  .av2-stances button{
    display:grid!important;
    grid-template-columns:88px minmax(0,1fr)!important;
    align-items:center!important;
    column-gap:10px!important;
    min-height:78px!important;
    padding:8px 10px!important;
    text-align:left!important;
  }
  .av2-stances button>b{
    grid-column:1!important;
    display:flex!important;
    flex-direction:column!important;
    align-items:center!important;
    justify-content:center!important;
    gap:2px!important;
    width:88px!important;
    font-size:12px!important;
    line-height:1.1!important;
    white-space:normal!important;
    text-align:center!important;
  }
  .av2-stances button>b .gai-stance{
    display:block!important;
    width:46px!important;
    height:46px!important;
    margin:0!important;
  }
  .av2-stances button>small{
    grid-column:2!important;
    display:block!important;
    margin:0!important;
    font-size:11px!important;
    line-height:1.3!important;
  }
  .av3-ophead{
    grid-template-columns:58px minmax(0,1fr) auto!important;
    gap:8px!important;
  }
  .av3-ophead>span{
    grid-row:1!important;
    width:56px!important;
    height:56px!important;
  }
  .av3-ophead>span .gai-challenger{width:54px!important;height:54px!important}
  .av3-ophead>em{grid-column:3!important;grid-row:1!important;align-self:center!important;justify-self:end!important}
  .av3-ophead b{font-size:13px!important;line-height:1.15!important}
  .av3-ophead small{font-size:10px!important;line-height:1.25!important;margin-top:2px!important}
  .av2-ops{gap:7px!important}
  .av2-ops>button{padding:9px 10px!important;min-height:0!important}
  .av3-reward{grid-template-columns:1fr 1fr!important;gap:5px!important;margin-top:6px!important}
  .av3-reward>span{padding:5px 7px!important}
  .av3-reward small{font-size:8px!important}
  .av3-reward b{font-size:11px!important}
  .av3-start{font-size:10px!important;margin-top:5px!important}
}
`;
document.head.appendChild(css);
})();