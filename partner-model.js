(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.RunPartner=api})(globalThis,()=>{
'use strict';
// Cents throughout. Proposed commercial terms; separate from the older voucher demo.
function terms(contribution,cohort=10){
if(!Number.isSafeInteger(contribution)||contribution<10000||contribution>1000000||!Number.isInteger(cohort)||cohort<2||cohort>100)throw Error('Scegli un contributo tra 100 e 10.000 € e da 2 a 100 partner.');
// The 1,000 -> 1,500 example fixes the minimum multiplier at 150% total.
// Higher marginal tiers are illustrative proposals, not subscribed pricing.
let left=contribution;let cap=0;for(const [width,multiplier] of [[100000,1.5],[100000,2],[300000,2.5],[Infinity,3]]){const part=Math.min(left,width);cap+=part*multiplier;left-=part;if(!left)break}
const ownService=Math.floor(contribution*.2),dedicated=Math.floor(contribution*.4),ownCompetitive=contribution-ownService-dedicated;
const gross=contribution*cohort,service=ownService*cohort,dedicatedTotal=dedicated*cohort,competitive=ownCompetitive*cohort;
return {contribution,cohort,cap:Math.floor(cap),gross,service,dedicated,dedicatedTotal,competitive,voucherBudget:dedicatedTotal+competitive,ownService,ownCompetitive};
}
function demand({active,eligible,interested,points,benefit,budget}){
if(![active,eligible,interested,points,budget].every(n=>Number.isSafeInteger(n)&&n>=0)||!Number.isSafeInteger(benefit)||benefit<=0||interested>eligible||eligible>active)throw Error('Dati domanda non validi.');
// One voucher per interested runner. Total points do not prove individual eligibility.
return {capacity:Math.floor(budget/benefit),potential:Math.min(interested,Math.floor(budget/benefit)),unfunded:Math.max(0,interested-Math.floor(budget/benefit))};
}
return {terms,demand};
});
