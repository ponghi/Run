(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.RunPartner=api})(globalThis,()=>{
'use strict';
// Cents throughout. Proposed commercial terms; separate from the older voucher demo.
function terms(contribution,cohort=10){
if(!Number.isSafeInteger(contribution)||contribution<10000||contribution>1000000||!Number.isInteger(cohort)||cohort<2||cohort>100)throw Error('Scegli un contributo tra 100 e 10.000 € e da 2 a 100 partner.');
let left=contribution;let cap=0;for(const [width,multiplier] of [[50000,1.5],[50000,2],[100000,2.5],[Infinity,3]]){const part=Math.min(left,width);cap+=part*multiplier;left-=part;if(!left)break}
const gross=contribution*cohort,pool=Math.floor(gross*.75),protectedPool=Math.floor(pool*.5),protectedShare=Math.floor(protectedPool/cohort);
return {contribution,cohort,cap:Math.floor(cap),gross,pool,app:Math.floor(gross*.15),investment:gross-pool-Math.floor(gross*.15),protectedShare,protectedPool,competitive:pool-protectedPool};
}
function demand({active,eligible,interested,points,benefit,budget}){
if(![active,eligible,interested,points,budget].every(n=>Number.isSafeInteger(n)&&n>=0)||!Number.isSafeInteger(benefit)||benefit<=0||interested>eligible||eligible>active)throw Error('Dati domanda non validi.');
// One voucher per interested runner. Total points do not prove individual eligibility.
return {capacity:Math.floor(budget/benefit),potential:Math.min(interested,Math.floor(budget/benefit)),unfunded:Math.max(0,interested-Math.floor(budget/benefit))};
}
return {terms,demand};
});
