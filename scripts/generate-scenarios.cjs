const fs=require('node:fs');const path=require('node:path');const P=require('../partner-model.js');
const rows=['fee_minima_area_eur;fee_massima_area_eur;fee_partner_eur;partner_stessa_area;voucher_esclusivi_partner_eur;competitivo_aggiuntivo_massimo_partner_eur;cap_totale_partner_eur;taglio_minimo_voucher_eur;taglio_massimo_voucher_eur;massimo_teorico_prima_della_domanda_eur;totale_voucher_area_eur;competitivo_area_eur;servizio_totale_interno_eur'];
for(const amount of [100,150,200,250,300]){
 const t=P.terms(amount*100,10,{minimum:10000,maximum:30000});
 rows.push([t.minimum/100,t.maximum/100,t.contribution/100,t.cohort,t.dedicated/100,t.competitiveAllowance/100,t.cap/100,t.minVoucher/100,t.maxVoucher/100,t.actualTheoreticalMax/100,t.voucherBudget/100,t.competitive/100,t.service/100].join(';'));
}
fs.writeFileSync(path.join(__dirname,'../docs/scenari.csv'),rows.join('\n')+'\n');console.log('Scenari fascia 100–300 €, quota esclusiva 50%, cap 2X e tagli voucher rigenerati.');
