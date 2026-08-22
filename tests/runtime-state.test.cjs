'use strict';
const assert=require('assert');
const fs=require('fs');
const path=require('path');
const vm=require('vm');

const root=path.resolve(__dirname,'..');
const source=file=>fs.readFileSync(path.join(root,file),'utf8');
const noop=()=>{};
const element=()=>({id:'',className:'',innerHTML:'',textContent:'',appendChild:noop,remove:noop,classList:{add:noop,remove:noop},querySelector:()=>null,querySelectorAll:()=>[],insertAdjacentHTML:noop});

function contextFor(state){
  const hooks={};
  const storage=new Map();
  const context={
    S:state,
    console,
    Math,
    Number,
    Object,
    String,
    Date,
    JSON,
    Set,
    Map,
    Array,
    queueMicrotask:noop,
    requestAnimationFrame:noop,
    clearTimeout:noop,
    setTimeout:noop,
    location:{reload:noop},
    addEventListener:noop,
    document:{readyState:'complete',addEventListener:noop,querySelector:()=>null,querySelectorAll:()=>[],getElementById:()=>null,createElement:element,head:{appendChild:noop},body:{appendChild:noop,classList:{add:noop,remove:noop}}},
    localStorage:{getItem:key=>storage.get(key)??null,setItem:(key,value)=>storage.set(key,String(value)),removeItem:key=>storage.delete(key)},
    Arcane:{state:{get:()=>state},on:(name,fn)=>{hooks[name]=fn},emit:noop},
    ARCANE_STORAGE:{
      keys:{save:'arcaneBeta',backup:'arcaneBetaBackup'},
      parse:raw=>{try{return JSON.parse(raw)}catch{return null}},
      read:key=>{try{return JSON.parse(storage.get(key)||'null')}catch{return null}},
      writeObject:(value,{key='arcaneBeta'}={})=>{storage.set(key,JSON.stringify(value));return true}
    },
    save:()=>true,
    render:noop,
    toast:noop,
    aqDialog:noop,
    getFinalStats:()=>({hp:120})
  };
  context.window=context;
  context.globalThis=context;
  vm.createContext(context);
  return{context,hooks,storage};
}

function run(file,context){vm.runInContext(source(file),context,{filename:file})}

{
  const state={bg:'Gefallener Adeliger',gold:100,lvl:12,screen:'home'};
  const {context,hooks}=contextFor(state);
  context.createLoot=()=>({rarity:'common',power:1});
  run('personal-story-passives-v1.js',context);
  assert.strictEqual(context.getPersonalStory().bonus,'+10% Gold aus allen Quellen');
  state.gold=200;
  hooks.beforeSave();
  assert.strictEqual(state.gold,210,'Gefallener Adeliger must add 10% of positive gold gains');
}

{
  const state={lvl:999,hp:-5,maxHp:0,al:500,maxAl:100,gold:-1,items:null,eq:null,log:null,skills:null,keys:-3};
  const {context}=contextFor(state);
  run('state-runtime-v1.js',context);
  context.ARCANE_STATE.normalize(state);
  assert.strictEqual(state.lvl,50);
  assert.strictEqual(state.hp,0);
  assert.strictEqual(state.maxHp,120);
  assert.strictEqual(state.al,100);
  assert.strictEqual(state.gold,0);
  assert.strictEqual(state.keys,0);
  assert.deepStrictEqual(Array.from(state.items),[]);
  assert.strictEqual(state.saveVersion,4);
}

{
  const legendary={id:'legend-1',name:'Ahnenklinge',slot:'Haupthand',power:50,rarity:'legendary'};
  const state={name:'Testheld',race:'Mensch',gender:'female',cls:'Magier',bg:'Runenschmied-Lehrling',lvl:50,xp:0,gold:999,al:10,maxAl:100,hp:400,maxHp:400,str:30,agi:30,int:30,items:[legendary,{id:'normal',name:'Stab',slot:'Haupthand',power:10,rarity:'rare'}],eq:{},bank:[],invCap:15,bankCap:100,forgeDust:100,essence:20,legendaryEssence:10,ancestorRelics:1,souls:0,keys:4,quests:40,wins:30,arena:500,arenaV2:{opponents:null,stance:'aggressive',fight:null,coins:17},reincarnation:{count:0,bestLevel:50,lifetimeSouls:0,spentSouls:0,legacy:{},history:[]}};
  const {context,storage}=contextFor(state);
  context.ARCANE_STATE={
    createRecoverySnapshot:()=>{storage.set('arcaneReincarnationBackup',JSON.stringify(state));return true},
    normalize:value=>value,
    restoreRecoverySnapshot:()=>true
  };
  run('reincarnation-v1.js',context);
  assert.strictEqual(context.REINCARNATION_SYSTEM.perform(state),true);
  assert.strictEqual(state.lvl,1);
  assert.strictEqual(state.keys,0);
  assert.strictEqual(state.souls,16);
  assert.strictEqual(state.reincarnation.count,1);
  assert.ok(state.items.some(item=>item.id==='legend-1'),'legendary item must survive reincarnation');
  assert.ok(!state.items.some(item=>item.id==='normal'),'normal item must not survive reincarnation');
  assert.ok(storage.has('arcaneReincarnationBackup'),'recovery snapshot must be written before reset');
}

const runtimeFiles=[...source('index.html').matchAll(/<script\s+src="([^"]+)"/g)].map(match=>match[1].split('?',1)[0]);
for(const file of runtimeFiles){
  assert.ok(!/window\.S(?:\W|$)/.test(source(file)),`${file} must not access lexical state as window.S`);
  if(file!=='state-runtime-v1.js')assert.ok(!/window\.save\s*=(?!=)/.test(source(file)),`${file} must not replace canonical window.save`);
}

console.log('Runtime state, passive, reincarnation and state-authority tests passed.');
