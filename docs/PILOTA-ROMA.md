# RUN — modello commerciale aggiornato

Proposta alpha, non un contratto o una raccolta già attiva. Il materiale pubblico è `cos-e-run.html` e `partner.html`.

## Runner: messaggio semplice

Corri → accumuli punti → converti i punti in voucher RUN → li riscatti per beni, servizi ed esperienze presso i partner della città. L’accesso per gli atleti è gratuito: solo sudore e impegno. Un voucher può richiedere una spesa minima o il pagamento della differenza. Non descrivere budget e ripartizioni nel percorso informativo runner. Non promettere denaro prelevabile, premi illimitati o funzionalità GPS già operative.

## Perché un commerciante partecipa

Visibilità pertinente nella città, una ragione per farsi scegliere da runner con punti disponibili e risultati osservabili tramite utilizzi e acquisti. La convenienza dipende da contributo, margini, acquisti aggiuntivi e ritorni: non basta il valore dei rimborsi.

Il modello RUN sostiene economicamente i voucher e struttura la partecipazione tra mercati e territori comparabili.

## Budget di area

Ogni budget è identificato da territorio + tipologia di attività, per esempio **Roma Sud / attrezzatura sportiva e outdoor**. Nessun trasferimento automatico tra altri territori o mercati. La partecipazione a più budget è esplicita e separata.

Ogni contributo viene ripartito sul suo valore totale:

| Destinazione | Percentuale | Su 1.000 € |
|---|---:|---:|
| Costi di servizio RUN | 20% | 200 € |
| Voucher esclusivi del partner | 40% | 400 € |
| Quota competitiva del Budget di area | 40% | 400 € |

Il totale destinato ai voucher è l’80%: non tutto è competitivo. Dieci partner da 1.000 € nello stesso Budget di area producono 4.000 € esclusivi (400 € per partner), 4.000 € competitivi e 2.000 € servizio.

I voucher dedicati possono essere utilizzati esclusivamente nel partner che ha versato la relativa quota. La componente competitiva può essere utilizzata presso i partner che contribuiscono al medesimo Budget di area, subordinatamente alla disponibilità e ai cap. La quota esclusiva non viene redistribuita automaticamente: durata, residui e riporto devono essere concordati prima della partecipazione.

## Cap

La regola confermata dall’esempio è **1.000 € → massimo 1.500 € di voucher**, cioè il 150% complessivo (incremento potenziale del 50%), non X + 150%.

Proposta illustrativa per contributi superiori: 150% sui primi 1.000 €, 200% sui successivi 1.000 €, 250% sui successivi 3.000 €, 300% sulla parte oltre 5.000 €. Gli scaglioni successivi al primo sono da concordare. Cap di esempio: 500 € → 750 €; 1.000 € → 1.500 €; 2.000 € → 3.500 €; 5.000 € → 11.000 €.

Il cap comprende voucher esclusivi e competitivi. I 400 € esclusivi non si sommano al massimale di 1.500 €. Per non emettere titoli scoperti occorre conteggiare codici attivi, rimborsi dovuti e liquidati. I cap cumulati possono superare il budget: nessun partner ha diritto a raggiungerli. Il cap limita la concentrazione; la quota esclusiva conserva accesso a capacità dedicata, non assicura incassi.

## Ciclo operativo da implementare

1. Identificare Budget di area e partner e attribuire il contributo alle tre destinazioni.
2. Identificare il tipo di voucher (esclusivo o competitivo), controllare saldo punti, disponibilità della rispettiva quota e cap residuo; riservare atomicamente importo e capacità del partner.
3. All’acquisto, verificare voucher, condizioni, identità del partner e prova d’acquisto. Il contributo completa il pagamento del runner.
4. Riconciliare e liquidare il rimborso secondo il calendario concordato. Non conteggiare il rimborso una seconda volta come profitto.
5. Per annullamenti/scadenze ripristinare punti e la stessa quota d’origine; non convertire automaticamente quota esclusiva in competitiva. Per resi, attendere il recupero effettivo dei contributi già liquidati prima di ripristinare disponibilità. Gestire anche resi parziali con una regola dedicata.

La priorità di utilizzo tra quota esclusiva e competitiva, la forma dei voucher e le condizioni di riemissione devono essere definite prima dell’attivazione, senza alterare il perimetro del budget.

## Stato del prototipo

`partner-model.js` e il simulatore pubblico applicano la ripartizione 20/40/40 e il nuovo cap proposto. `scenari.csv` è generato da questi calcoli e non è una previsione di ricavi.

Il precedente motore transazionale `model.js` nell’app è ancora una simulazione storica 75/15/10 con budget unico, senza cap o segregazione. Non dimostra né gestisce le nuove regole. Le pagine commerciali non promettono voucher reali: prima di un circuito operativo il motore deve essere adeguato e validato.

## Attivazione

Prima di pagamenti reali servono condizioni complete: durata, quota di servizio, importi e scaglioni, perimetri territoriali e merceologici, disponibilità dedicate, residui, rifinanziamenti, liquidazioni, prove d’acquisto, resi e interruzione. Definire con professionisti contratti, fiscalità e gestione dei flussi. Costruire backend autorevole, autenticazione, verifiche e conciliazione: il localStorage della demo non è contabilità.

Misurare runner attivi e interessati, utilizzi, clienti nuovi, acquisti aggiuntivi, margini, ritorni, concentrazione dei voucher, contestazioni e costi operativi. Download e punti da soli non dimostrano vendite o sostenibilità.
