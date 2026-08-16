(()=>{
'use strict';
const css=document.createElement('style');
css.textContent=`
/* Global readability pass for small gameplay/UI icons */
.gai-inline-img{width:1.7em!important;height:1.7em!important}
.gai-stat{width:1.8em!important;height:1.8em!important}
.ik1-icon{width:20px!important;height:20px!important}
.ik1-detail-icon{width:30px!important;height:30px!important}
.dr1-mini,.dd1-mini,.dres-icon{width:24px!important;height:24px!important}
.fa1-icon{width:20px!important;height:20px!important}
.fa1-title-icon{width:34px!important;height:34px!important}
.ib1-build>span{font-size:23px!important;min-width:30px!important}
.ib1-aff img,.ib1-detail img{width:18px!important;height:18px!important;object-fit:contain!important;vertical-align:middle!important}
.aq-version{font-size:10px!important}
/* Keep larger selection icons comfortably readable on mobile */
.gai-choice{width:58px!important;height:58px!important}
.gai-stance{width:54px!important;height:54px!important}
.gai-city{width:48px!important;height:48px!important}
.gai-location-title{width:44px!important;height:44px!important}
/* Slot hint art should remain visible without competing with equipped item art */
.he4-slot img[src*="slot_"]{width:36px!important;height:36px!important;object-fit:contain!important}
@media(max-width:520px){
 .gai-inline-img{width:1.8em!important;height:1.8em!important}
 .gai-stat{width:1.9em!important;height:1.9em!important}
 .ik1-icon{width:21px!important;height:21px!important}
 .dr1-mini,.dd1-mini,.dres-icon{width:25px!important;height:25px!important}
 .fa1-icon{width:21px!important;height:21px!important}
 .gai-choice{width:56px!important;height:56px!important}
 .gai-stance{width:52px!important;height:52px!important}
 .gai-city{width:46px!important;height:46px!important}
}
`;
document.head.appendChild(css);
})();