# RUN — Alpha Roma

Prototipo e presentazione commerciale: chilometri → punti → voucher RUN per beni, servizi ed esperienze. Accesso gratuito proposto per gli atleti. Nessun voucher, pagamento o partner reale attivo.

## Pagine

- `cos-e-run.html`: che cos’è RUN e benefici per runner e commercianti, con messaggi centrati sulla città.
- `partner.html`: proposta B2B, Budget di area, infografica, simulatore e richiesta d’interesse.
- `index.html`: precedente demo dell’app con corsa simulata, wallet e transazioni locali.

Avvio dalla radice: `python -m http.server 8000`. Nessuna installazione/build per il sito. GitHub Pages serve il ramo `main`, cartella root. Usare il checkout esistente; non servono worktree.

## Modello commerciale corrente

Ogni Budget di area è definito da territorio + tipologia di attività, per esempio Roma Sud / attrezzatura sportiva e outdoor. Il contributo si divide in **20% servizio + 40% voucher esclusivi del partner + 40% componente competitiva dell’area**. L’80% è destinato ai voucher, ma soltanto metà di esso è contendibile.

Esempio: 1.000 € → 200/400/400 €. Cap totale 1.500 € (150% del contributo, non +150%). Le quote esclusive sono incluse nel cap, non si sommano a esso. Il massimale è un limite, non un ricavo garantito. Gli scaglioni superiori sono proposte progressive, da concordare. Il simulatore assume partner con uguale contributo nello stesso Budget di area.

`partner-model.js` contiene questi calcoli; `partner.js` gestisce il simulatore e la manifestazione d’interesse. Nessun dato del modulo viene inviato a un server: bozza email manuale a manuel.fumasonibiondi@gmail.com oppure download JSON locale. Nessuna iscrizione, pagamento o invio automatico.

[Piano aggiornato](docs/PILOTA-ROMA.md) · [Presentazione e acquisizione](docs/LANCIO-PARTNER.md) · [Esempi numerici](docs/scenari.csv).

## Limite della precedente app demo

`model.js` e la parte transazionale di `index.html` restano il precedente esperimento 75/15/10 con budget unico, senza cap o segregazione. Non applicano il nuovo Budget di area. Prima di un pilota operativo occorre adeguare e verificare questo motore e sviluppare backend, autenticazione, prenotazioni atomiche, verifiche d’acquisto e pagamenti. Non usare il localStorage della demo per denaro reale.

La vecchia demo permette di simulare corsa, emissione, verifica, liquidazione e reso, con conservazione locale di profilo e saldi. Posizione facoltativa per la ricerca, mai inviata a un backend. La demo non è sincronizzata tra dispositivi. Resi e recuperi dopo liquidazione sono soltanto simulati.

## Verifiche e materiali

- `node --test tests/partner-model.test.cjs`: nuovo riparto, cap e riconciliazione delle quote in centesimi.
- `node tests/partner-browser.cjs`: presentazione iPad/mobile, simulatore, scheda, bozza email senza invio e PDF. Richiede Playwright e Chromium, disponibili nell’ambiente cloud; eseguibile alternativo con `CHROMIUM_PATH`.
- `node --test tests/model.test.cjs` e `node tests/browser.cjs`: precedente modello transazionale, non il nuovo Budget di area.
- `node scripts/generate-scenarios.cjs`: rigenera il CSV delle condizioni commerciali correnti.
- `python scripts/export.py`: HTML autonomi, ZIP e documenti in `/workspace/shared/downloads`.

Le pagine sono stampabili dal browser. Il sito non dichiara un bacino di utenti reale e non gestisce adesioni o raccolte vincolanti.
