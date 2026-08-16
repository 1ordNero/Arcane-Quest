(()=>{
const css=document.createElement('style');
css.textContent=`
.dv7-choices{display:grid!important;gap:8px!important;margin-top:10px!important}
.dv7-choices>button{width:100%!important;min-height:86px!important;padding:10px 14px!important;display:grid!important;grid-template-columns:64px minmax(0,1fr) 58px!important;gap:10px!important;align-items:center!important;text-align:left!important;overflow:hidden!important}
.dv7-choices>button>span{width:58px!important;height:58px!important;display:grid!important;place-items:center!important;align-self:center!important;overflow:visible!important;font-size:0!important}
.dv7-choices>button>span .gai-choice,.dv7-choices>button>span>img{width:54px!important;height:54px!important;max-width:54px!important;max-height:54px!important;object-fit:contain!important;margin:0!important}
.dv7-choices>button>div{min-width:0!important;display:flex!important;flex-direction:column!important;justify-content:center!important;gap:2px!important;padding:0!important}
.dv7-choices>button>div>b{display:block!important;font-size:16px!important;line-height:1.1!important;margin:0!important;white-space:nowrap!important}
.dv7-choices>button>div>small{display:block!important;font-size:12px!important;line-height:1.25!important;color:var(--muted)!important;margin:0!important}
.dv7-choices>button>em{position:static!important;justify-self:end!important;align-self:center!important;min-width:52px!important;text-align:right!important;font-size:21px!important;line-height:1!important;font-style:normal!important;color:var(--gold)!important;white-space:nowrap!important;margin:0!important}
@media(max-width:520px){
.dv7-choices{gap:7px!important;margin-top:8px!important}
.dv7-choices>button{min-height:78px!important;padding:8px 11px!important;grid-template-columns:56px minmax(0,1fr) 52px!important;gap:8px!important;border-radius:14px!important}
.dv7-choices>button>span{width:52px!important;height:52px!important}
.dv7-choices>button>span .gai-choice,.dv7-choices>button>span>img{width:48px!important;height:48px!important;max-width:48px!important;max-height:48px!important}
.dv7-choices>button>div>b{font-size:15px!important}
.dv7-choices>button>div>small{font-size:11px!important;line-height:1.2!important}
.dv7-choices>button>em{min-width:48px!important;font-size:19px!important}
}
@media(max-width:380px){
.dv7-choices>button{grid-template-columns:50px minmax(0,1fr) 46px!important;padding-inline:9px!important;gap:6px!important}
.dv7-choices>button>span{width:46px!important;height:46px!important}
.dv7-choices>button>span .gai-choice,.dv7-choices>button>span>img{width:44px!important;height:44px!important;max-width:44px!important;max-height:44px!important}
.dv7-choices>button>div>b{font-size:14px!important}
.dv7-choices>button>div>small{font-size:10px!important}
.dv7-choices>button>em{font-size:18px!important;min-width:44px!important}
}`;
document.head.appendChild(css);
})();