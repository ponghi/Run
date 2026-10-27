'use strict';
const euro=c=>(c/100).toLocaleString('it-IT',{style:'currency',currency:'EUR'});
const select=s=>document.querySelector(s);
function calculateTerms(){
 const form=select('#terms-form');if(!form.reportValidity())return;
 try{const fee=Math.round(Number(select('#contribution').value)*100);const t=RunPartner.terms(fee,Number(select('#cohort').value));
 select('#terms-result').innerHTML=`<h3>Il tuo contributo, in chiaro.</h3><div class="line"><span>20% · servizio RUN</span><strong>${euro(t.ownService)}</strong></div><div class="line"><span>40% · voucher esclusivi da te</span><strong>${euro(t.dedicated)}</strong></div><div class="line"><span>40% · tua quota competitiva</span><strong>${euro(t.ownCompetitive)}</strong></div><div class="line"><span>Budget competitivo con ${t.cohort} partner</span><strong>${euro(t.competitive)}</strong></div><p>Il tuo cap complessivo di voucher</p><div class="stat">${euro(t.cap)}</div><p class="warn">Massimo utilizzabile, non incasso garantito.</p><p class="tiny">Include i ${euro(t.dedicated)} esclusivi, non si aggiunge a essi. La parte competitiva dipende da disponibilità e scelte dei runner. Ipotesi: ${t.cohort} partner da ${euro(t.contribution)} nello stesso Budget di area.</p>`;
 clearDraft();select('#budget').value=select('#contribution').value;select('#interest-market').value=select('#market').value;select('#interest-zone').value=select('#zone').value;
 }catch(e){select('#terms-result').textContent=e.message}
}
select('#terms-form').addEventListener('submit',event=>{event.preventDefault();calculateTerms()});
for(const id of ['market','zone'])select('#'+id).addEventListener('change',calculateTerms);
function interestPayload(){
 const form=select('#interest-form');if(!form.reportValidity())return null;
 const data=Object.fromEntries(new FormData(form));for(const key of Object.keys(data))data[key]=data[key].trim();
 if(!data.business){select('#interest-status').textContent='Inserisci il nome dell’attività.';return null}
 return {document:'RUN — manifestazione di interesse non vincolante',createdAt:new Date().toISOString(),status:'bozza locale non inviata',...data,budget:Number(data.budget),currency:'EUR',conditions:'Interesse non vincolante: nessuna iscrizione, pagamento o garanzia di ricavo. Regole e cap da concordare prima dell’adesione vincolante.'};
}
select('#interest-form').addEventListener('submit',event=>{
 event.preventDefault();const p=interestPayload();if(!p)return;
 const body=['Buongiorno Manuel,','vorrei approfondire la proposta RUN Partner.','',`Attività: ${p.business}`,`Referente: ${p.contact||'non indicato'}`,`Email: ${p.email}`,`Tipologia attività: ${p.market}`,`Territorio: ${p.zone}`,`Contributo indicativo: ${p.budget} EUR`,`Offerta possibile: ${p.offer||'da definire'}`,'',p.conditions].join('\n');
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
