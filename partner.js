'use strict';
const euro=c=>(c/100).toLocaleString('it-IT',{style:'currency',currency:'EUR'});
const select=s=>document.querySelector(s);
let currentTerms=null;
function rangeConfig(){return {minimum:Math.round(Number(select('#minimum').value)*100),maximum:Math.round(Number(select('#maximum').value)*100),otherContribution:Math.round(Number(select('#other-contribution').value)*100)}}
function syncRange(){
 const a=Number(select('#minimum').value),b=Number(select('#maximum').value);
 select('#maximum').min=String(a);select('#maximum').max=String(3*a);
 select('#maximum').setCustomValidity(b<a||b>3*a?'La fascia deve rispettare A ≤ B ≤ 3 × A.':'');
 for(const id of ['contribution','other-contribution','budget']){select('#'+id).min=String(a);select('#'+id).max=String(b)}
 select('#range-help').textContent=Number.isFinite(a)&&a>=100?'In questo dominio B può essere al massimo '+euro(3*a*100)+'.':'A deve essere almeno 100 € per consentire voucher da 5 €.';
}
function calculateTerms(){
 syncRange();const form=select('#terms-form');if(!form.reportValidity()){currentTerms=null;select('#terms-result').textContent='Completa una fascia valida e scegli la fee al suo interno.';return}
 try{const fee=Math.round(Number(select('#contribution').value)*100);const t=RunPartner.terms(fee,Number(select('#cohort').value),rangeConfig());currentTerms=t;
 select('#terms-result').innerHTML=`<h3>La tua partecipazione</h3><div class="line"><span>Fee X nel dominio</span><strong>${euro(t.contribution)}</strong></div><div class="line"><span>50% esclusivo per la tua attività</span><strong>${euro(t.dedicated)}</strong></div><div class="line"><span>Competitivo massimo aggiuntivo</span><strong>Fino a ${euro(t.competitiveAllowance)}</strong></div><p>Cap complessivo: 2 × X</p><div class="stat">${euro(t.cap)}</div><p class="warn">Include l’esclusivo. Non è un utilizzo garantito.</p><div class="line"><span>Taglio minimo</span><strong>${euro(t.minVoucher)}</strong></div><div class="line"><span>Taglio massimo: 10% dell’esclusivo</span><strong>${euro(t.maxVoucher)}</strong></div><p class="tiny">Fascia ${euro(t.minimum)}–${euro(t.maximum)}. Ipotesi: ${t.cohort} partner, altri contributi medi ${euro(t.otherContribution)}. Gli importi collettivi non sono adesioni reali.</p>${t.actualTheoreticalMax<t.cap?`<p class="capacity-note">In questa simulazione il budget iniziale può sostenere al massimo teorico ${euro(t.actualTheoreticalMax)} per te, prima delle scelte degli altri. Il cap ${euro(t.cap)} non è interamente coperto da questa dotazione.</p>`:'<p class="tiny">Il cap è teoricamente raggiungibile con questa dotazione iniziale, se esiste domanda e la disponibilità competitiva resta sufficiente.</p>'}<div class="access-state"><h3>Simula il passaggio al competitivo</h3><label for="exclusive-state">Stato della tua quota esclusiva</label><select id="exclusive-state"><option value="available">Ancora da riscattare</option><option value="reserved">Interamente prenotata, non riscattata</option><option value="redeemed">Interamente riscattata</option></select><p id="access-result" aria-live="polite"></p><label for="voucher-face">Taglio voucher da verificare (€)</label><input id="voucher-face" type="number" min="5" max="${t.maxVoucher/100}" step="0.01" value="${t.maxVoucher/100}"><button id="preview-voucher" type="button" class="btn outline" style="margin-top:12px">Verifica disponibilità simulata</button><p id="voucher-result" class="tiny" aria-live="polite"></p><p class="tiny">Solo anteprima delle regole: nessun codice o movimento di denaro viene generato qui.</p></div>`;
 select('#exclusive-state').addEventListener('change',updateAccess);
 select('#preview-voucher').addEventListener('click',previewVoucher);
 updateAccess();clearDraft();select('#budget').value=select('#contribution').value;select('#interest-market').value=select('#market').value;select('#interest-zone').value=select('#zone').value;
 }catch(e){currentTerms=null;select('#terms-result').textContent=e.message}
}
function previewState(){const mode=select('#exclusive-state').value;return {exclusiveRedeemed:mode==='redeemed'?currentTerms.dedicated:0,exclusiveReserved:mode==='reserved'?currentTerms.dedicated:0}}
function updateAccess(){const t=currentTerms;if(!t)return;const status=RunPartner.access(t,previewState());select('#access-result').textContent=status.unlocked?'Competitivo sbloccato: fino a '+euro(status.competitiveRemaining)+' disponibili in questa simulazione, entro cap e budget.':'Competitivo non ancora sbloccato: serve il riscatto completo della tua quota esclusiva.';select('#voucher-result').textContent=''}
function previewVoucher(){if(!currentTerms||!select('#voucher-face').reportValidity())return;try{const result=RunPartner.voucherPreview(currentTerms,Math.round(Number(select('#voucher-face').value)*100),previewState());select('#voucher-result').textContent='Verifica preliminare positiva sulla quota '+(result.bucket==='exclusive'?'esclusiva':'competitiva')+'. L’emissione reale richiederà una verifica aggiornata e una riserva a tempo prima di generare il codice.'}catch(e){select('#voucher-result').textContent=e.message}}
select('#terms-form').addEventListener('submit',event=>{event.preventDefault();calculateTerms()});
select('#terms-form').addEventListener('invalid',()=>{currentTerms=null;select('#terms-result').textContent='Completa una fascia valida e scegli la fee al suo interno.'},true);
select('#terms-form').addEventListener('input',()=>{syncRange();currentTerms=null;select('#terms-result').textContent='Premi “Calcola la proposta” per aggiornare importi e limiti.';clearDraft()});
for(const id of ['market','zone'])select('#'+id).addEventListener('change',calculateTerms);
function interestPayload(){
 const form=select('#interest-form');if(!form.reportValidity())return null;
 const data=Object.fromEntries(new FormData(form));for(const key of Object.keys(data))data[key]=data[key].trim();
 if(!data.business){select('#interest-status').textContent='Inserisci il nome dell’attività.';return null}
 let t;try{t=RunPartner.terms(Math.round(Number(data.budget)*100),2,{...rangeConfig(),otherContribution:rangeConfig().minimum})}catch(e){select('#interest-status').textContent=e.message;return null}
 return {feeMinimum:t.minimum/100,feeMaximum:t.maximum/100,exclusiveVoucherQuota:t.dedicated/100,voucherCap:t.cap/100,voucherMinimum:t.minVoucher/100,voucherMaximum:t.maxVoucher/100,document:'RUN — manifestazione di interesse non vincolante',createdAt:new Date().toISOString(),status:'bozza locale non inviata',...data,budget:Number(data.budget),currency:'EUR',conditions:'Interesse non vincolante: nessuna iscrizione, pagamento o garanzia di ricavo. Regole e cap da concordare prima dell’adesione vincolante.'};
}
select('#interest-form').addEventListener('submit',event=>{
 event.preventDefault();const p=interestPayload();if(!p)return;
 const body=['Buongiorno Manuel,','vorrei approfondire la proposta RUN Partner.','',`Attività: ${p.business}`,`Referente: ${p.contact||'non indicato'}`,`Email: ${p.email}`,`Tipologia attività: ${p.market}`,`Territorio: ${p.zone}`,`Fee indicativa X: ${p.budget} EUR`,`Fascia del dominio: ${p.feeMinimum}–${p.feeMaximum} EUR`,`Quota esclusiva: ${p.exclusiveVoucherQuota} EUR`,`Cap complessivo: ${p.voucherCap} EUR`,`Tagli voucher: ${p.voucherMinimum}–${p.voucherMaximum} EUR`,`Offerta possibile: ${p.offer||'da definire'}`,'',p.conditions].join('\n');
 select('#email-draft').href='mailto:manuel.fumasonibiondi@gmail.com?subject='+encodeURIComponent('RUN Partner — interesse: '+p.business)+'&body='+encodeURIComponent(body);
 select('#email-draft').classList.remove('hide');select('#interest-status').textContent='Bozza preparata, non inviata. Aprila nel tuo programma email, controlla i dati e scegli se inviarla. L’invio non attiva un’iscrizione.';
});
select('#download-interest').addEventListener('click',()=>{
 const payload=interestPayload();if(!payload)return;
 const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='RUN-interesse-partner.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
 select('#interest-status').textContent='Download avviato. La scheda resta sul tuo dispositivo: non è stata inviata e nessuna iscrizione è stata attivata.';
});
function clearDraft(){if(!select('#email-draft').classList.contains('hide'))select('#interest-status').textContent='Dati modificati: prepara una nuova bozza prima di inviare.';select('#email-draft').classList.add('hide');select('#email-draft').href='#'}
select('#interest-form').addEventListener('input',clearDraft);
select('#interest-form').addEventListener('reset',()=>{clearDraft();select('#interest-status').textContent='Modulo cancellato. Eventuali file scaricati o email già preparate nel tuo programma restano fuori da questa pagina.'});
select('#print-page').addEventListener('click',()=>window.print());
calculateTerms();
select('#download-interest').disabled=false;
select('#prepare-interest').disabled=false;
