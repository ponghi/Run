(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.RunPartner=api})(globalThis,()=>{
'use strict';
// Commercial preview only. Integer euro cents; independent from the legacy app ledger.
const validMoney=n=>Number.isSafeInteger(n)&&n>0;
function terms(contribution,cohort=10,{minimum=10000,maximum=30000,otherContribution=contribution}={}){
 if(!validMoney(minimum)||minimum<10000)throw Error('La fee A deve essere almeno 100 € per consentire voucher da 5 €.');
 if(!validMoney(maximum)||maximum<minimum||maximum>3*minimum)throw Error('La fascia deve rispettare A ≤ B ≤ 3 × A.');
 if(!validMoney(contribution)||contribution<minimum||contribution>maximum)throw Error('La fee X deve essere compresa tra A e B.');
 if(!Number.isInteger(cohort)||cohort<2||cohort>100)throw Error('Simula da 2 a 100 partner nello stesso Budget di area.');
 if(!validMoney(otherContribution)||otherContribution<minimum||otherContribution>maximum)throw Error('Anche la fee degli altri partner deve essere nella fascia A–B.');
 const ownService=Math.floor(contribution/10),dedicated=Math.floor(contribution/2),ownCompetitive=contribution-ownService-dedicated;
 const gross=contribution+(cohort-1)*otherContribution;
 if(!Number.isSafeInteger(gross)||!Number.isSafeInteger(2*contribution))throw Error('Importo troppo elevato.');
 const service=ownService+(cohort-1)*Math.floor(otherContribution/10),dedicatedTotal=dedicated+(cohort-1)*Math.floor(otherContribution/2),competitive=gross-service-dedicatedTotal;
 const cap=2*contribution,minVoucher=500,maxVoucher=Math.floor(dedicated/10);
 return {contribution,cohort,otherContribution,minimum,maximum,cap,dedicated,competitiveAllowance:cap-dedicated,minVoucher,maxVoucher,gross,service,ownService,ownCompetitive,dedicatedTotal,competitive,voucherBudget:dedicatedTotal+competitive,actualTheoreticalMax:Math.min(cap,dedicated+competitive)};
}
function access(t,{exclusiveRedeemed=0,exclusiveReserved=0,competitiveCommitted=0,competitiveAvailable=t.competitive}={}){
 if(![exclusiveRedeemed,exclusiveReserved,competitiveCommitted,competitiveAvailable].every(n=>Number.isSafeInteger(n)&&n>=0)||exclusiveRedeemed+exclusiveReserved>t.dedicated||exclusiveRedeemed+exclusiveReserved+competitiveCommitted>t.cap)throw Error('Stato dei voucher non valido.');
 const unlocked=exclusiveRedeemed===t.dedicated;
 if(!unlocked&&competitiveCommitted>0)throw Error('Il competitivo richiede prima il riscatto completo della quota esclusiva.');
 return {unlocked,exclusiveRemaining:t.dedicated-exclusiveRedeemed-exclusiveReserved,competitiveRemaining:unlocked?Math.min(t.cap-exclusiveRedeemed-competitiveCommitted,competitiveAvailable):0};
}
function canSplit(amount,min,max){return amount===0||(amount>0&&Math.ceil(amount/max)<=Math.floor(amount/min))}
function voucherPreview(t,amount,state={}){
 if(!Number.isSafeInteger(amount)||amount<t.minVoucher||amount>t.maxVoucher)throw Error('Taglio voucher fuori dai limiti della fee.');
 const available=access(t,state),bucket=available.unlocked?'competitive':'exclusive';const remaining=available.unlocked?available.competitiveRemaining:available.exclusiveRemaining;
 if(amount>remaining)throw Error('Budget o capacità disponibili insufficienti.');
 if(bucket==='exclusive'&&!canSplit(remaining-amount,t.minVoucher,t.maxVoucher))throw Error('Questo taglio lascerebbe un residuo esclusivo non utilizzabile: scegli un altro importo.');
 return {bucket,amount,reservationRequired:true};
}
function demand({active,eligible,interested,points,benefit,budget}){
 if(![active,eligible,interested,points,budget].every(n=>Number.isSafeInteger(n)&&n>=0)||!Number.isSafeInteger(benefit)||benefit<=0||interested>eligible||eligible>active)throw Error('Dati domanda non validi.');
 return {capacity:Math.floor(budget/benefit),potential:Math.min(interested,Math.floor(budget/benefit)),unfunded:Math.max(0,interested-Math.floor(budget/benefit))};
}
return {terms,access,canSplit,voucherPreview,demand};
});
