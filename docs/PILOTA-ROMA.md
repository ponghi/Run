# RUN — regole del pilota e del Budget di area

Proposta alpha, non un contratto o una raccolta già attiva. Il materiale pubblico è `cos-e-run.html` e `partner.html`.

## Il valore per runner e commercianti

Per i runner: corri → accumuli punti → ottieni voucher RUN → li riscatti per beni, servizi ed esperienze presso i partner della città. L’accesso è gratuito. Un voucher può richiedere una spesa minima o il pagamento della differenza. Il percorso informativo runner non deve entrare nei meccanismi di finanziamento.

Per i commercianti: una ragione per farsi scegliere da persone con punti disponibili e occasioni d’acquisto da misurare. Il valore economico dipende da margini, acquisti davvero aggiuntivi e ritorni. Il rimborso del voucher completa l’incasso della vendita, non è profitto da aggiungere una seconda volta.

## Territorio, mercato e fascia di partecipazione

Il Budget di area è definito da territorio + tipologia di attività, per esempio **Roma Sud / attrezzatura sportiva e outdoor**. Nessun trasferimento automatico fra mercati o territori. Partecipare a più budget richiede scelte e contributi separati.

I partner del medesimo dominio hanno una fascia comune **A ≤ X ≤ B**, con **B ≤ 3A**. Limita la distanza fra contributi e l’influenza del singolo esercizio sul budget rispetto agli altri. La fascia non elimina ogni concentrazione della domanda.

Esempio del pilota: A=100 €, B=300 €, fee selezionata X=200 €. Il simulatore usa euro interi. A deve essere almeno 100 €: sotto tale valore il taglio massimo del voucher sarebbe inferiore al minimo di 5 €.

## Quota esclusiva e massimale

Il messaggio commerciale è semplice:

| Fee X | Voucher esclusivi: 50% X | Competitivo potenziale aggiuntivo: fino a 150% X | Cap totale: 200% X |
|---|---:|---:|---:|
| 100 € | 50 € | 150 € | 200 € |
| 150 € | 75 € | 225 € | 300 € |
| 200 € | 100 € | 300 € | 400 € |
| 250 € | 125 € | 375 € | 500 € |
| 300 € | 150 € | 450 € | 600 € |

La quota esclusiva è destinata soltanto ai voucher dell’attività che ha versato la fee. Garantisce una disponibilità dedicata, non clienti o riscatti automatici. Il cap è sempre 2X e comprende questa quota: non è un rendimento garantito e non si somma al 50%.

La priorità è individuale: **ogni partner può utilizzare il competitivo soltanto dopo aver effettivamente riscattato il proprio 50% esclusivo**. Non basta aver emesso o riservato voucher. Non si introducono finestre o scaglioni temporali ulteriori.

Per i controlli di cap contano insieme voucher attivi, rimborsi dovuti e rimborsi già liquidati. La disponibilità competitiva deve esistere anche quando il partner è idoneo ad accedervi.

## Copertura interna e conservazione del budget

La ripartizione interna del pilota è 10% servizio RUN, 50% esclusivo, 40% competitivo. Non occorre aprire la presentazione commerciale con il dettaglio della quota di servizio, ma destinazioni e condizioni devono essere esplicite nell’accordo.

Dieci partner da 200 € generano 2.000 € di contributi: 200 € servizio, 1.000 € esclusivi (100 € ciascuno), 800 € competitivi. I voucher finanziabili sono complessivamente 1.800 €, mentre i dieci cap sommano 4.000 €. Non tutti possono raggiungere il 2X contemporaneamente.

Per un partner con fee X e contributi totali d’area S, il massimo teorico prima degli utilizzi concorrenti è `min(2X, 0,5X + 0,4S)`. Il 2X è potenzialmente raggiungibile solo quando S ≥ 3,75X. Con quattro fee uguali può esserlo per un partner; con fascia massima B=3A e un solo partner a B mentre tutti gli altri pagano A, servono almeno dieci partecipanti. La fascia da sola non garantisce capienza né domanda.

Ogni emissione deve basarsi su denaro già disponibile: nessun ingresso futuro copre voucher già promessi.

## Tagli voucher

Valore minimo 5 €. Valore massimo = 10% del 50% di X = **5% di X**:

| Fee | Esclusivo | Tagli consentiti |
|---|---:|---|
| 100 € | 50 € | 5 € |
| 150 € | 75 € | 5–7,50 € |
| 200 € | 100 € | 5–10 € |
| 250 € | 125 € | 5–12,50 € |
| 300 € | 150 € | 5–15 € |

Il maggiore contributo aumenta il cap e il taglio massimo, ma limita l’assorbimento in una singola transazione. L’implementazione deve evitare residui esclusivi non spendibili: un’emissione non può lasciare un importo che non sia componibile nei tagli consentiti. Con minimo m, massimo M e residuo R, occorre R=0 oppure `ceil(R/M) ≤ floor(R/m)`, usando centesimi interi. Non coprire residui esclusivi con competitivo prima dello sblocco.

## Riserva, utilizzo, scadenza e recupero

1. Verificare saldo punti, importo, dominio, stato del partner e condizioni dell’offerta.
2. Controllare la disponibilità della quota esclusiva oppure l’idoneità al competitivo e il cap residuo.
3. Riservare atomicamente importo e capacità del partner per un tempo limitato; generare il codice soltanto dopo il successo della verifica e della riserva. Scadenza del codice e durata della copertura devono essere coerenti.
4. All’acquisto, verificare voucher, partner, condizioni e prova d’acquisto; registrare il riscatto. Solo il riscatto esclusivo fa avanzare verso lo sblocco del competitivo.
5. Liquidare secondo calendario e riconciliazione concordati. Alla scadenza di una riserva inutilizzata liberare la stessa quota d’origine, senza renderla una disponibilità diversa.
6. Per resi o annullamenti ripristinare quote e punti secondo regole complete; attendere il recupero effettivo dei contributi già liquidati prima di ricreare disponibilità. Gestire anche resi parziali.

## Esclusivo inutilizzato: restituzione o credito

Dopo scadenza e riconciliazione dei voucher ancora attivi, la quota esclusiva non riscattata viene **restituita all’esercente oppure applicata come credito su una nuova fee**, secondo la scelta e le modalità concordate.

Il credito deve essere trasferito una sola volta e rimosso dalla disponibilità della vecchia campagna. Non può sostenere contemporaneamente vecchi e nuovi voucher o essere contato due volte nel calcolo del cap. Non è un trasferimento automatico al competitivo. Modalità, tempi, nuova fascia e trattamento della nuova fee devono essere espliciti prima dell’adesione.

## Stato tecnico e attivazione

`partner-model.js` e il simulatore presentano il modello corrente. `docs/scenari.csv` è generato dai relativi calcoli e non è una previsione di ricavi o riscatti.

Il precedente motore transazionale `model.js` resta la simulazione storica 75/15/10: non applica fascia, cap 2X, tagli, priorità o segregazione del nuovo Budget di area. Non gestisce voucher o denaro reali. Prima di un circuito operativo occorre adeguare il motore e implementare backend autorevole, autenticazione, contabilità in centesimi, prenotazioni atomiche, idempotenza, verifiche e pagamenti riconciliati.

L’accordo deve definire durata e perimetro, A e B, quota di servizio, tagli, scadenze, calendario di liquidazione, restituzioni/crediti, residui competitivi, rifinanziamenti e interruzione. Verificare con professionisti contratti, fiscalità e gestione dei flussi. Misurare domanda autentica, margine incrementale, rinnovi, concentrazione, contestazioni e costi, senza equiparare download o codici emessi a vendite.
