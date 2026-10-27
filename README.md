# RUN — Alpha Roma

Prototipo per runner e commercianti locali: punti ottenuti correndo, premi geolocalizzati e rimborsi da un fondo condiviso. Tutti i dati e i pagamenti sono simulati. Non utilizzabile per denaro reale.

## Avvio

Dalla radice: `python -m http.server 8000`, poi aprire la pagina servita nel browser. Nessuna installazione o build per l’app. GitHub Pages pubblica `index.html` e `model.js` da `main`, cartella root. Usare il checkout esistente: non servono worktree.

## Cosa provare

1. **Corri**: corsa simulata, 100 punti/km, nessuna registrazione GPS reale.
2. **Premi**: attività inventate a Monteverde, Flaminio/Ponte Milvio ed EUR; distanza in linea d’aria dal quartiere o dalla posizione facoltativa. Sedi e offerte non corrispondono ad accordi reali.
3. **Wallet**: punti e codici; emettere un codice riserva il contributo del fondo. Annullamento/scadenza restituiscono punti e disponibilità.
4. **Partner**: scegliere lo stesso partner del voucher, inserire codice, riferimento acquisto e totale prima del voucher; confermare condizioni e verificare. Simulare liquidazione o reso totale.
5. **Fondo** (dall’area Partner): ripartizione 75/15/10, riserve, rimborsi e rifinanziamento demo. Simulatore economico indipendente dai saldi, con margine, incrementalità, concentrazione e costi RUN modificabili.

Ipotesi iniziale: 10 partner × 1.000 €, fondo di 7.500 €, quota app 1.500 €, investimenti 1.000 €. Durata campagna 90 giorni dalla prima apertura. Nessun tetto per singolo partner: nessun ritorno individuale garantito. I nuovi contributi seguono lo stesso split e non prolungano la campagna. Sei partner hanno offerte; quattro sono soltanto parte del finanziamento ipotetico.

I voucher scadono dopo massimo 30 giorni, comunque entro fine campagna. I punti non garantiscono la disponibilità dei premi. Una richiesta per offerta, salvo annullamento o scadenza. L’area partner è aperta senza login solo per dimostrare il percorso. Nessuna scansione o prova d’acquisto reale viene verificata.

I dati restano nel localStorage del browser; niente sincronizzazione tra amici, dispositivi o schede. La posizione è usata solo in memoria e non inviata a un backend. Un reset elimina i dati della demo. I profili e i punti precedenti sono conservati; i vecchi voucher vengono archiviati senza impegnare il nuovo fondo.

## Validazione e documenti

- `node --test tests/model.test.cjs`: contabilità in centesimi, ciclo del voucher, budget, scadenze, duplicati, rimborsi, simulazione economica.
- `node tests/browser.cjs`: richiede Playwright e Chromium (già presenti nell’ambiente cloud); prova il percorso completo, i filtri, la migrazione e le viste mobili/desktop. `CHROMIUM_PATH` può indicare un altro eseguibile. Screenshot diagnostico in `/tmp/run-fund-mobile.png`.
- `node scripts/generate-scenarios.cjs`: rigenera `docs/scenari.csv` dal modello.
- `python scripts/export.py`: esporta un HTML autonomo, ZIP e documenti in `/workspace/shared/downloads`.

[Piano commerciale e operativo del pilota](docs/PILOTA-ROMA.md) · [Scenari economici](docs/scenari.csv).

## Limiti

Il modello locale non offre protezioni finanziarie o antifrode reali: lo stato è modificabile dall’utente e non gestisce accessi concorrenti. Validazione e liquidazione sono dimostrazioni. Il reso dopo liquidazione simula il recupero immediato del contributo: nella realtà il budget deve restare impegnato fino al recupero confermato. IVA, imposte e trattamento giuridico/fiscale non sono modellati.

Prima del lancio con denaro reale servono definizione contrattuale e fiscale dei flussi, regole sui residui, backend con prenotazioni atomiche, identità verificate, prove d’acquisto, pagamenti e riconciliazione. Vedere il piano pilota per requisiti e metriche.

## Presentazione commerciale per iPad

Aprire `partner.html` sullo stesso sito (RUN Partner), raggiungibile anche dalla home dell’app. Landing responsive e stampabile con spiegazione, esempi di domanda esplicitamente non reali, simulatore di cap progressivo e quota protetta, scheda d’interesse scaricabile e bozza email al referente, senza pagamenti o invii automatici. L’invio è manuale nel client email, non una registrazione server. `partner-model.js` calcola le condizioni proposte e `partner.js` gestisce la pagina.

La landing propone il nuovo modello equo; il precedente motore transazionale `model.js` resta senza cap/segmentazione. Non usare la vecchia demo come prova dell’applicazione delle nuove regole. [Percorso di acquisizione con capitale ridotto](docs/LANCIO-PARTNER.md).

Test della presentazione: `node --test tests/partner-model.test.cjs` e `node tests/partner-browser.cjs` (Playwright/Chromium dell’ambiente cloud). Verificano cap, quota protetta, domanda limitata dal budget, viste iPad/mobile, scheda locale e preparazione email senza invio.

## Cos’è RUN

`cos-e-run.html` presenta bisogni, benefici e percorso per runner e commercianti, con collegamenti alla demo e alla proposta partner. Pagina statica autonoma, leggibile su telefono e iPad e stampabile in PDF. Distingue visione, prototipo e circuito commerciale ancora da attivare. Inclusa nello ZIP e nell’esportazione `RUN-Cos-e.html`.
