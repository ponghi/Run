# RUN — Alpha Roma

Prototipo navigabile, gratuito per gli atleti, di un programma premi per runner. Un solo file `index.html`, senza dipendenze o build. Aprirlo nel browser oppure servirlo con `python -m http.server 8000` dalla radice del repository. GitHub Pages pubblica il ramo `main`, cartella root.

## Esperienza dimostrativa

- Profilo di Manuel, modificabile; città pilota Roma.
- Zone iniziali: Monteverde, Flaminio/Ponte Milvio, EUR. Sono ipotesi per il mockup, non una copertura commerciale già disponibile.
- Corsa simulata, senza registrazione GPS, e conversione dimostrativa di 100 punti/km. I punti non sono denaro.
- Premi di commercianti inventati, ordinati per distanza in linea d'aria. Centro del quartiere come riferimento predefinito; posizione reale facoltativa su richiesta (richiede HTTPS o localhost).
- Filtri per raggio e fascia punti, condizioni visibili prima dell'emissione del codice.
- Il codice scala i punti, scade dopo 30 giorni e resta nel wallet. Una richiesta per premio per profilo locale. Non esiste ancora la convalida del commerciante e nessun voucher ha valore commerciale.
- Profilo, saldo e voucher restano nel localStorage del browser. La posizione non viene salvata né inviata a un backend. Nessun account o sincronizzazione tra dispositivi. Il reset cancella i dati demo.

## Ipotesi di business da validare

Lancio concentrato su quartieri e percorsi di corsa, con commercianti nelle vicinanze. Premi finanziati dai partner e con disponibilità e condizioni controllate. Ricavo principale proposto: quota annuale B2B; prezzi e accordi non ancora definiti. Eventuali commissioni future vanno legate all'utilizzo verificato del voucher, non alla sola emissione.

Prima di un pilota reale servono partner effettivi, autenticazione, backend per saldo e voucher, verifica monouso lato server da parte del commerciante, regole di disponibilità e scadenza, controlli delle attività e tracciamento GPS affidabile. Il mockup non dimostra l'efficacia antifrode o la sostenibilità economica.
