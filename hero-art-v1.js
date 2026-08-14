(()=>{
const css=document.createElement('style');
css.textContent=`
body[data-screen="char"]{position:relative;background:#0e0b13!important}
body[data-screen="char"]::before{content:"";position:fixed;inset:58px 0 72px;z-index:-2;background-image:linear-gradient(180deg,rgba(10,7,14,.42) 0%,rgba(10,7,14,.68) 42%,rgba(10,7,14,.92) 100%),url('assets/held-background.png');background-size:cover;background-position:center 38%;background-repeat:no-repeat;filter:saturate(.92) contrast(1.03)}
body[data-screen="char"]::after{content:"";position:fixed;inset:58px 0 72px;z-index:-1;pointer-events:none;background:radial-gradient(circle at 50% 26%,transparent 0,rgba(10,7,14,.1) 38%,rgba(10,7,14,.55) 100%)}
body[data-screen="char"] main{position:relative;background:transparent!important}
body[data-screen="char"] .hv3-head{background:linear-gradient(135deg,rgba(31,22,43,.86),rgba(18,13,25,.9))!important;border:1px solid rgba(255,255,255,.1)!important;backdrop-filter:blur(10px)}
body[data-screen="char"] .hv3-core span,body[data-screen="char"] .hv3-stats span,body[data-screen="char"] .hv3-tabs button{background:rgba(24,17,34,.82)!important;backdrop-filter:blur(8px)}
body[data-screen="char"] .hv3-tabs button.on{background:rgba(87,53,137,.9)!important}
body[data-screen="char"] .hv3-panel{background:linear-gradient(180deg,rgba(27,19,38,.9),rgba(17,12,24,.94))!important;border:1px solid rgba(255,255,255,.1)!important;backdrop-filter:blur(10px);box-shadow:0 12px 30px rgba(0,0,0,.28)!important}
body[data-screen="char"] .hv3-slot,body[data-screen="char"] .hv3-item,body[data-screen="char"] .hv3-rotation button{background:rgba(31,23,43,.82)!important;backdrop-filter:blur(6px)}
@media(max-width:430px){body[data-screen="char"]::before{background-position:center 30%;inset:58px 0 70px;background-size:auto 118vh}body[data-screen="char"]::after{inset:58px 0 70px}}
`;
document.head.appendChild(css);
})();