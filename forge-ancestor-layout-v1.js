(()=>{
'use strict';
const css=document.createElement('style');
css.id='forge-ancestor-layout-v1-css';
css.textContent=`
/* Keep the ancestral workbench readable on narrow mobile screens. */
.fv4 .fv4-ancestor-workbench{padding:12px!important;text-align:left!important;overflow:hidden!important}
.fv4 .fv4-ancestor-workbench .fv4-eyebrow{margin:0 0 10px!important;font-size:8px!important;letter-spacing:.13em!important;color:#e2b86b!important}
.fv4 .fv4-ancestor-main{display:grid!important;grid-template-columns:112px minmax(0,1fr)!important;gap:12px!important;align-items:center!important;width:100%!important;min-width:0!important}
.fv4 .fv4-ancestor-main .fv4-focus-art{position:relative!important;width:112px!important;height:112px!important;min-width:0!important;margin:0!important;border-radius:15px!important;overflow:hidden!important}
.fv4 .fv4-ancestor-main .fv4-focus-img{display:block!important;width:100%!important;height:100%!important;max-width:100%!important;object-fit:contain!important}
.fv4 .fv4-ancestor-level{position:absolute!important;right:7px!important;bottom:7px!important;z-index:2!important;padding:3px 6px!important;border-radius:999px!important;background:#110b16e8!important;color:#f0bd58!important;font-size:9px!important;font-weight:900!important}
.fv4 .fv4-ancestor-copy{min-width:0!important;overflow:hidden!important}
.fv4 .fv4-ancestor-copy h2{margin:0!important;font-size:15px!important;line-height:1.15!important;overflow-wrap:anywhere!important;word-break:normal!important;color:#f08061!important}
.fv4 .fv4-ancestor-copy p{margin:5px 0 0!important;font-size:8px!important;line-height:1.3!important;color:#b8a9c4!important}
.fv4 .fv4-ancestor-status{display:inline-flex!important;max-width:100%!important;margin-top:8px!important;padding:5px 8px!important;border-radius:999px!important;font-size:7px!important;line-height:1.2!important;white-space:normal!important}
.fv4 .fv4-ancestor-cost-title{margin:13px 0 7px!important;text-align:center!important;font-size:8px!important;letter-spacing:.12em!important}
.fv4 .fv4-ancestor-costs{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:6px!important;width:100%!important}
.fv4 .fv4-ancestor-costs span{min-width:0!important;padding:8px 4px!important;text-align:center!important}
.fv4 .fv4-ancestor-costs b{display:block!important;font-size:10px!important}
.fv4 .fv4-ancestor-costs small{display:block!important;margin-top:2px!important;font-size:6px!important;line-height:1.2!important;overflow-wrap:anywhere!important}
.fv4 .fv4-ancestor-action{width:100%!important;margin-top:9px!important;min-height:52px!important}
@media(max-width:420px){
 .fv4 .fv4-ancestor-main{grid-template-columns:96px minmax(0,1fr)!important;gap:10px!important}
 .fv4 .fv4-ancestor-main .fv4-focus-art{width:96px!important;height:96px!important}
 .fv4 .fv4-ancestor-copy h2{font-size:13px!important}
}
@media(max-width:350px){
 .fv4 .fv4-ancestor-main{grid-template-columns:82px minmax(0,1fr)!important}
 .fv4 .fv4-ancestor-main .fv4-focus-art{width:82px!important;height:82px!important}
 .fv4 .fv4-ancestor-costs{gap:4px!important}
}
`;
document.head.appendChild(css);
})();