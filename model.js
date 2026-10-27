/* Financial simulation only. All amounts are integer euro cents. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.RunFund=api})(globalThis,()=>{
'use strict';
const assert=(ok,message)=>{if(!ok)throw new Error(message)};
const cents=n=>Number.isSafeInteger(n)&&n>0;
function create(){return {endsAt:Date.now()+90*86400000,contributions:[{amount:1000000,label:'10 partner × 1.000 €',at:Date.now()}],vouchers:[]}}
function totals(fund){const gross=fund.contributions.reduce((s,c)=>s+c.amount,0);const pool=Math.floor(gross*75/100),app=Math.floor(gross*15/100),investment=gross-pool-app;const reserved=fund.vouchers.filter(v=>v.status==='issued').reduce((s,v)=>s+v.value,0);const payable=fund.vouchers.filter(v=>v.status==='validated').reduce((s,v)=>s+v.value,0);const paid=fund.vouchers.filter(v=>v.status==='paid').reduce((s,v)=>s+v.value,0);return {gross,pool,app,investment,reserved,payable,paid,available:pool-reserved-payable-paid}}
function expire(fund,now=Date.now()){const expired=[];for(const v of fund.vouchers)if(v.status==='issued'&&v.expiresAt<=now){v.status='expired';expired.push(v)}return expired}
function issue(fund,reward,points,code,now=Date.now()){
assert(now<fund.endsAt,'Campagna terminata');assert(cents(reward.value)&&cents(reward.cost),'Premio non valido');assert(points>=reward.cost,'Punti insufficienti');assert(!fund.vouchers.some(v=>v.id===reward.id&&!['expired','cancelled'].includes(v.status)),'Premio già richiesto');assert(totals(fund).available>=reward.value,'Fondo insufficiente: attendi un rifinanziamento');assert(!fund.vouchers.some(v=>v.code===code),'Codice già presente');
const v={...reward,code,status:'issued',createdAt:now,expiresAt:Math.min(now+30*86400000,fund.endsAt)};fund.vouchers.unshift(v);return v}
function get(fund,code){const v=fund.vouchers.find(v=>v.code===code);assert(v,'Codice non trovato');return v}
function cancel(fund,code){const v=get(fund,code);assert(v.status==='issued','Puoi annullare solo un codice non utilizzato');v.status='cancelled';return v}
function validate(fund,{code,partner,receipt,total},now=Date.now()){
const v=get(fund,code);assert(v.status==='issued','Codice già utilizzato o non attivo');assert(v.expiresAt>now,'Codice scaduto');assert(v.partner===partner,'Codice destinato a un altro partner');assert(cents(total)&&total>=Math.max(v.minimum,v.value),'Importo sotto la spesa minima');assert(typeof receipt==='string'&&receipt.trim().length>=3,'Inserisci un riferimento acquisto di almeno 3 caratteri');assert(!fund.vouchers.some(x=>x.partner===partner&&x.receipt===receipt.trim()),'Riferimento acquisto già utilizzato');
v.status='validated';v.receipt=receipt.trim();v.total=total;v.customerPaid=total-v.value;v.validatedAt=now;return v}
function settle(fund,code){const v=get(fund,code);assert(v.status==='validated','Rimborso non liquidabile');v.status='paid';return v}
function refund(fund,code){const v=get(fund,code);assert(['validated','paid'].includes(v.status),'Acquisto non rimborsabile');const recovered=v.status==='paid';v.status='refunded';v.recovered=recovered;return v}
function topUp(fund,amount,now=Date.now()){assert(cents(amount)&&amount<=100000000,'Contributo non valido (massimo demo 1.000.000 €)');fund.contributions.push({amount,label:'Rifinanziamento demo',at:now})}
function scenario({partners,fee,benefit,ticket,margin,incrementality,utilization,share,fixedCost=1000,claimCost=0.5}){
assert([partners,fee,benefit,ticket].every(n=>Number.isFinite(n)&&n>0)&&Number.isInteger(partners),'Valori economici non validi');assert([fixedCost,claimCost].every(n=>Number.isFinite(n)&&n>=0),'Costi non validi');assert(ticket>=benefit,'Il vantaggio non può superare lo scontrino');assert([margin,incrementality,utilization,share].every(n=>Number.isFinite(n)&&n>=0&&n<=100),'Percentuali non valide');
const gross=partners*fee,pool=gross*.75,capacity=Math.floor(pool/benefit),claims=Math.floor(capacity*utilization/100),sales=claims*ticket,incrementalMargin=sales*margin/100*incrementality/100;const targetClaims=Math.floor(claims*share/100),targetMargin=targetClaims*ticket*margin/100*incrementality/100;
return {operatingCost:fixedCost+claims*claimCost,platformNet:gross*.15-fixedCost-claims*claimCost,gross,pool,app:gross*.15,investment:gross*.1,capacity,claims,sales,incrementalMargin,net:incrementalMargin-gross,targetClaims,targetPayout:targetClaims*benefit,targetNet:targetMargin-fee,breakEven:margin*incrementality>0?Math.ceil(fee/(ticket*margin/100*incrementality/100)):null,unused:pool-claims*benefit}}
return {create,totals,expire,issue,cancel,validate,settle,refund,topUp,scenario};
});
