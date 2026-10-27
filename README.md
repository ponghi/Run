# RUN — Alpha Roma

Prototipo e presentazione commerciale: chilometri → punti → voucher RUN per beni, servizi ed esperienze. Accesso gratuito proposto per gli atleti. Nessun voucher, pagamento o partner reale attivo.

## Pagine e avvio

- `cos-e-run.html`: progetto e benefici per runner e commercianti, con messaggi centrati sulla città.
- `partner.html`: proposta B2B, regole di equità del Budget di area, simulatore e richiesta d’interesse.
- `index.html`: precedente demo dell’app con corsa simulata, wallet e transazioni locali.

Dalla radice: `python -m http.server 8000`. Nessuna installazione o build per il sito. GitHub Pages serve il ramo `main`, cartella root. Usare il checkout esistente; non servono worktree.

## Regole commerciali correnti

Ogni Budget di area identifica territorio + tipologia di attività, per esempio Roma Sud / attrezzatura sportiva e outdoor. La fascia di partecipazione è comune al dominio: **A ≤ X ≤ B ≤ 3A**. Il pilota usa come esempio A=100 €, B=300 €, X=200 € e fee in euro interi. A non può scendere sotto 100 € con i tagli voucher attuali.

Per una fee X:

- **50% di X** finanzia voucher utilizzabili esclusivamente nell’attività del partner.
- Dopo aver riscattato la propria quota esclusiva, il partner può accedere al competitivo: fino a un ulteriore **150% di X**, secondo domanda e disponibilità del medesimo Budget di area.
- Il **cap totale è sempre 2X**, inclusa la quota esclusiva: è un limite ai voucher, non un rendimento o un incasso garantito.
- I voucher hanno valore minimo **5 €** e massimo **10% della quota esclusiva**, cioè **5% di X**. Esempio: X=200 €, esclusivo 100 €, tagli 5–10 €, competitivo potenziale fino a 300 €, cap totale 400 €.
- L’emissione richiede disponibilità verificata e riserva a tempo della quota. Voucher emessi o riservati non contano come riscattati per sbloccare il competitivo.
- L’esclusivo non utilizzato viene restituito o applicato come credito alla nuova fee, dopo scadenza e riconciliazione delle riserve attive. Nessuna redistribuzione automatica ad altri esercizi.

Il messaggio pubblico privilegia 50% esclusivo / fino a 150% aggiuntivo / 200% massimo. Internamente resta il riparto del pilota **10% servizio + 50% esclusivo + 40% competitivo**. Il 40% complessivamente raccolto alimenta il budget comune: non ogni partner potrà raggiungere il proprio cap.

`partner-model.js` contiene i calcoli; `partner.js` gestisce la presentazione e il modulo. Nessun dato del modulo viene inviato a un server: bozza email manuale a manuel.fumasonibiondi@gmail.com oppure download JSON locale. Nessuna iscrizione, pagamento o invio automatico.

[Piano aggiornato](docs/PILOTA-ROMA.md) · [Presentazione e acquisizione](docs/LANCIO-PARTNER.md) · [Esempi numerici](docs/scenari.csv).

## Limite della precedente app demo

`model.js` e la parte transazionale di `index.html` restano il precedente esperimento 75/15/10 con budget unico, senza il nuovo cap, fascia, priorità o segregazione. Non applicano le nuove regole del Budget di area. Prima di un pilota operativo occorre adeguare e verificare questo motore e sviluppare backend, autenticazione, prenotazioni atomiche, verifica degli acquisti e pagamenti. Non usare il localStorage della demo per denaro reale.

La vecchia demo simula emissione, verifica, liquidazione e reso, con conservazione locale di profilo e saldi. La posizione facoltativa non viene inviata a un backend. Non esiste sincronizzazione tra dispositivi e i recuperi dopo liquidazione sono simulati.

## Verifiche e materiali

- `node --test tests/partner-model.test.cjs`: fascia, cap 2X, quote, tagli voucher e vincoli del simulatore.
- `node tests/partner-browser.cjs`: presentazione iPad/mobile, simulatore, scheda, bozza email senza invio e PDF. Richiede Playwright e Chromium, disponibili nell’ambiente cloud; eseguibile alternativo con `CHROMIUM_PATH`.
- `node --test tests/model.test.cjs` e `node tests/browser.cjs`: precedente modello transazionale, non il nuovo Budget di area.
- `node scripts/generate-scenarios.cjs`: rigenera il CSV dei casi 100/150/200/250/300 € con fascia A=100 €, B=300 €.
- `python scripts/export.py`: HTML autonomi, ZIP e documenti in `/workspace/shared/downloads`.

Le pagine sono stampabili dal browser. Il sito non dichiara un bacino di utenti reale e non gestisce adesioni o raccolte vincolanti.
