# RUN — proposta operativa del pilota Roma

Documento di lavoro: ipotesi da validare, non un’offerta già sottoscritta, una previsione o un contratto. Nessun partner reale è stato acquisito e nessun capitale è stato raccolto.

## Aggiornamento: proposta fondatori con regole di equità

La presentazione più recente è `../partner.html`. Propone fondi per città/mercato (zona solo con sufficiente densità), 50% protetto proporzionale ai contributi, 50% competitivo e cap a scaglioni progressivi: 1,5× primi 500 €, 2× successivi 500 €, 2,5× successivi 1.000 €, 3× oltre 2.000 €. Esempio: contributo 1.000 €, cap 1.750 €. Il massimale include quota protetta e utilizzo competitivo e non è un rendimento.

Queste sono regole proposte per la futura coorte. Il motore transazionale di `index.html` e gli scenari CSV descritti sotto restano la precedente simulazione con fondo unico senza cap: non dimostrano la nuova equità. Prima di una campagna vincolante occorre allineare motore, regolamento e contabilità per singolo fondo. Per il percorso a capitale ridotto e le metriche di domanda vedere `LANCIO-PARTNER.md`.

## Proposta commerciale precedente (simulazione di riferimento)

«Porta nel tuo negozio i runner del quartiere. Contribuisci a un fondo comune che finanzia vantaggi sugli acquisti: il cliente usa i chilometri, tu ricevi il pagamento del cliente e il contributo previsto dal voucher.»

Dieci commercianti versano 1.000 € ciascuno: 7.500 € al fondo, 1.500 € quota piattaforma, 1.000 € allocazione investimenti. Il fondo è unico: nessuno dispone individualmente di 7.500 € e non è garantito il recupero del contributo. La quota annuale è l’ipotesi di partenza del modello commerciale; il test iniziale dura 90 giorni. Le simulazioni imputano conservativamente tutto il contributo al test, senza proiettare automaticamente i risultati su un anno.

Per gli atleti l’accesso è gratuito. I punti non sono denaro, non sono prelevabili e non danno diritto a premi illimitati: i voucher dipendono da disponibilità e condizioni della campagna. Regola dimostrativa 100 punti/km; nessun cambio universale punti/euro.

## Ambito e reclutamento

Proposta: partire da Monteverde/Villa Doria Pamphilj, con 10 attività entro una distanza utile dai percorsi di corsa. Flaminio/Ponte Milvio ed EUR restano aree da esplorare nel mockup, non quartieri già attivati.

Mix da verificare sul campo: 2 bar/forni, 2 negozi sportivi, 2 attività benessere/fitness, 2 alimentari/ristoro e 2 servizi locali pertinenti. Evitare di concentrare tutte le offerte in una categoria. La scelta deve dipendere da interesse effettivo, orari, capacità di servire i clienti e margini sostenibili.

Prima di raccogliere fondi: intervistare i 10 candidati su scontrino, margine, afflusso, nuovi clienti e budget commerciale; presentare anche lo scenario di rimborso nullo. Raccogliere adesioni condizionate e definire cosa accade se non si raggiunge il numero previsto. Non incassare sulla base di un rendimento promesso.

## Regole proposte per il fondo

- Fondo competitivo, senza tetto individuale nel prototipo, coerentemente con il modello proposto. Ogni partner deve conoscere il rischio di concentrazione. Un eventuale limite futuro richiede accordo preventivo e una nuova simulazione.
- Fondi riservati all’emissione: disponibile = fondo − codici attivi − rimborsi dovuti − rimborsi liquidati.
- Ogni voucher indica importo fisso finanziato, spesa minima, negozio, eventuali esclusioni e scadenza. Validità massima 30 giorni e comunque entro fine campagna.
- All’emissione si scalano i punti. Annullamento prima dell’utilizzo e scadenza ripristinano i punti e liberano la riserva. Una richiesta attiva o già utilizzata per offerta; annullati/scaduti possono essere riemessi se c’è budget.
- Verifica dell’acquisto: codice monouso, partner corretto, scadenza, importo e condizioni, riferimento acquisto non duplicato. Questi controlli nel mockup non provano la genuinità dell’acquisto.
- Rimborso al partner solo dopo controlli e riconciliazione. Per il pilota reale si propone una liquidazione settimanale, con tempi di contestazione e gestione resi da concordare.
- Reso totale: stornare il contributo e restituire punti. Se il contributo è già pagato, il budget torna disponibile soltanto dopo conferma del recupero effettivo. Nel mockup il recupero è simulato come immediato. I resi parziali richiedono una regola dedicata prima del lancio reale.
- Rifinanziamento: nella simulazione ogni nuovo contributo mantiene il 75/15/10 e non prolunga la campagna. Anche il nuovo budget è contendibile da tutti; chi rifinanzia non riceve una disponibilità esclusiva.
- A fine campagna si completano le riconciliazioni. Il residuo non diventa automaticamente ricavo RUN: rimborso o riporto al periodo successivo devono essere disciplinati prima della raccolta. Nessun rinnovo automatico nel mockup.

## Sostenibilità economica

Ipotesi comuni: 10 partner × 1.000 €, voucher medio 10 €, scontrino 80 €, margine merce 40%, quota riscatti partner campione 10%. Costi RUN puramente illustrativi: 1.000 € fissi + 0,50 € per utilizzo, pagati dalla quota app del 15%. Non sono preventivi verificati.

| Scenario | Budget utilizzato | Acquisti davvero aggiuntivi | Acquisti associati | Vendite associate | Margine incrementale circuito meno 10.000 € | Margine partner campione meno 1.000 € | Quota app meno costi ipotizzati |
|---|---:|---:|---:|---:|---:|---:|---:|
| Prudente | 60% | 25% | 450 | 36.000 € | −6.400 € | −640 € | 275 € |
| Centrale | 80% | 50% | 600 | 48.000 € | −400 € | −40 € | 200 € |
| Favorevole | 100% | 75% | 750 | 60.000 € | +8.000 € | +800 € | 125 € |

Il rimborso completa l’incasso del negoziante: NON va aggiunto di nuovo al margine sullo scontrino. Il margine incrementale stimato è vendite × margine percentuale × quota acquisti aggiuntivi. La sottrazione dei contributi è una vista economica semplificata, non un bilancio o un rendimento promesso.

Nel caso centrale il partner campione riceve 600 € di rimborsi ma resta a −40 € sul margine incrementale meno contributo. Il pareggio richiede circa 63 acquisti attribuiti alle condizioni ipotizzate. Con il 5% dei riscatti avrebbe 30 acquisti e −520 €; con il 25%, 150 acquisti e +1.400 €. Nel caso estremo un solo partner può assorbire tutto il budget: gli altri potrebbero ricevere zero.

Capienza: 7.500 € sostengono 750 voucher da 10 €. Mille runner con punti sufficienti NON possono ricevere tutti un voucher da 10 € nello stesso fondo. Ridurre l’importo medio aumenta la capienza, ma può ridurre l’attrattiva.

La quota app del 15% è modesta: i margini operativi ipotizzati di 125–275 € per coorte non includono costi imprevisti. Prima del lancio vanno preventivati sviluppo, acquisizione partner, assistenza, verifiche, contabilità, infrastruttura, commissioni e gestione frodi. Il 10% investimenti è una destinazione separata da definire, non un costo già sostenuto o un rendimento per i partner. Importi del modello al netto di una definizione fiscale ancora da stabilire; IVA e imposte non sono simulate.

CSV riproducibile: `scenari.csv`. Il simulatore nell’app consente di modificare ipotesi e concentrazione senza cambiare i saldi del fondo dimostrativo.

## Misure del pilota e decisione di rinnovo

Misurare per partner, categoria e quartiere: runner attivi, codici emessi/utilizzati/scaduti, clienti unici, nuovi clienti dichiarati, scontrino prima del voucher, margine stimato, riacquisti, tempo al primo utilizzo, concentrazione dei rimborsi, costo di acquisizione, carico di assistenza, contestazioni e irregolarità.

Un codice attribuisce la transazione, non ne dimostra l’incrementalità. Stimarla con storico del negozio, domanda alla prima visita e confronto con periodi/gruppi comparabili; dichiarare l’incertezza, evitare di contare tutte le vendite come aggiuntive.

Proposta di percorso: preparazione e interviste; lancio della coorte solo dopo adesioni e requisiti operativi; verifiche settimanali e confronto a 30/60/90 giorni. Non aumentare la coorte se esistono saldi non riconciliati o irregolarità irrisolte. Per il rinnovo usare distribuzione dei risultati, sostenibilità operativa e disponibilità effettiva dei partner a pagare; non solo il numero totale di voucher.

## Prerequisiti prima di gestire denaro reale

Il modello comporta raccolta e gestione di contributi destinati a rimborsi. Far definire a professionisti la natura contrattuale e fiscale delle quote, l’eventuale disciplina applicabile ai flussi/voucher e il ruolo di un prestatore di pagamenti. Non assumere che il termine “fondo” o “quota annuale” risolva questi aspetti.

Servono contratti e regolamento: beneficiari, limiti, disponibilità, residui, rifinanziamenti, recesso, interruzione del servizio, contestazioni, resi, pagamenti e nessuna garanzia di ritorno. Servono informativa e scelte sulla posizione, minimizzazione dei dati e protezione dei percorsi che possono rivelare l’abitazione.

Sul prodotto reale: backend come unica fonte autorevole, contabilità in centesimi, prenotazioni atomiche, identificazione dei partner, controlli attività sportive, acquisti verificabili, audit, richieste idempotenti e conciliazione con pagamenti reali. Vietare auto-riscatti e acquisti fittizi; valutare anomalie e prove prima di liquidare. Un acquisto genuino da parte di un cliente già acquisito può comunque non essere incrementale.

Il mockup non implementa autenticazione, verifiche documentali, pagamenti, prevenzione frodi efficace, sincronizzazione o concorrenza tra browser. Non usarlo per denaro o voucher reali.
