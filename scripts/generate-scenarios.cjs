const fs=require('node:fs');const path=require('node:path');const P=require('../partner-model.js');
const rows=['contributo_partner_eur;partner_stessa_area;servizio_partner_eur;voucher_esclusivi_partner_eur;quota_competitiva_partner_eur;cap_partner_eur;totale_voucher_area_eur;competitivo_area_eur;servizio_totale_eur'];
for(const amount of [500,1000,2000,3000,5000]){const t=P.terms(amount*100,10);rows.push([amount,t.cohort,t.ownService/100,t.dedicated/100,t.ownCompetitive/100,t.cap/100,t.voucherBudget/100,t.competitive/100,t.service/100].join(';'))}
fs.writeFileSync(path.join(__dirname,'../docs/scenari.csv'),rows.join('\n')+'\n');console.log('Scenari 20/40/40 e cap proposto rigenerati.');
