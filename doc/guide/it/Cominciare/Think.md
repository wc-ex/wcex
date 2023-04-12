<!--DESC: {"icon":"assistant",id:4} -->
<p align=center><svg width=8em src="@/@wcex/doc/assets/jobs.svg" ></svg></p>

#### Omaggio e nostalgia al più grande uomo del nostro tempo ---- **Steve Jobs**

#### Semplice è meglio

Sembra sempre che alcuni sistemi e strutture tecniche spesso rendano le cose più complicate e inventino sempre molti concetti e termini.

Al fine di risolvere problemi complessi, vengono elaborate cose più complesse da affrontare @\_ @

_Jobs_ Può rendere computer complessi adatti a tutte le età, dovremmo provarlo anche noi? Quindi _WCEX_.

#### Origine e processo

Tutto è iniziato due anni fa, nella noiosa vita di essere isolati dal virus, abbiamo iniziato a provare, e presto, circa una settimana circa, abbiamo praticamente implementato la prima versione iniziale, comprese le modifiche alle dipendenze e le implementazioni WebComponent. Ma......

Sono passati due anni, facendo quello che vogliamo. Non è davvero facile, varie gestione della compatibilità, revisioni e miglioramenti della sintassi e bug. La cosa buona è che ormai, _WCEX_ può essere utilizzato per implementare lo sviluppo front-end di un prodotto di medie dimensioni, e diversi progetti interni sono già in uso, e l'efficienza e l'effetto sono abbastanza buoni.

#### Riflessioni sull'associazione bidirezionale, dati immutabili, flusso di dati unidirezionale

Ci sono molti quadri ora, e di queste cose si parla in molti luoghi. Ma se ci pensate, questi concetti e concetti sono cose molto, molto buone. Ma nel nostro progetto attuale. È necessario usarlo universalmente?
Nello sviluppo front-end, la maggior parte del lavoro, inclusa quella che chiamiamo associazione dati, è essenzialmente una cosa _making la visualizzazione dell'interfaccia e i dati e i componenti internal_ e la maggior parte degli scenari reali non utilizza data_ immutabili.
Questo è il motivo per cui in seguito abbiamo deprecato _VUEX_ nel progetto, senza il quale sarebbe stato troppo ingombrante da usare. I dati immutabili e il flusso di dati unidirezionale sono in realtà la logica della modifica dei documenti e dell'elaborazione di aziende complesse, ma questi possono essere considerati solo come una piccola parte della funzionalità del progetto in fase di sviluppo e, se il progetto ha davvero bisogno di un flusso di dati unidirezionale durante l'implementazione, è semplice fare riferimento a librerie di terze parti. È possibile accedervi e ci sono molte di queste librerie.

Quindi WCEX ha finalmente abbandonato questi concetti nell'implementazione finale, e quello che dobbiamo fare è in realtà molto semplice, basta fare in modo che i dati o gli elementi dell'interfaccia che devono essere coerenti diventino gli stessi, quindi non c'è bisogno di affrontare questi concetti nel framework, questa è la cosa del livello applicativo.

#### Pensieri su SCSS LESS

Sono anche cose buone, nei giorni in cui non c'era CSS3. L'elaborazione degli stili sarà infatti molto semplificata.
Ma. Scopriremo che il CSS generato è così gonfio e brutto. C'è un modo migliore?
Ora CSS3 è già molto potente in termini di potenza e prestazioni, specialmente attraverso l'associazione di stile _WCEX_, dando ai dati e agli stili la possibilità di interagire direttamente e usando CSS3 semplice e intuitivo, il che non è migliore.

Pertanto, si consiglia di utilizzare direttamente CSS3 invece di continuare a utilizzare la pre-elaborazione di SCSS. Allo stesso tempo, la buona funzione di blocco CSS di Web Components può anche aiutarci a evitare molto bene i conflitti di denominazione.

Ancora una volta, il principio è che il contenuto e la struttura del codice e essenzialmente ciò che si vede nell'albero DOM e nella console di debug sono il più coerenti possibile.

#### Riflessioni su prestazioni e velocità

Le prestazioni e la velocità sono le più importanti? Sono importanti. Ma non è uno degli obiettivi più importanti che consideriamo, anche se _WCEX_ ha fatto molte ottimizzazioni in questo settore.

Ora la potenza e le prestazioni di computer, telefoni e browser sono già molto potenti, con una differenza di pochi millisecondi. Non è un problema per le persone o i computer. Se ci sono davvero applicazioni e requisiti con requisiti di prestazioni elevate, possono anche essere ottimizzati ed elaborati da alcune tecnologie mature, come WebAssembly.

Secondo noi. Migliorare le prestazioni e la velocità, dipende principalmente dall'implementazione dell'applicazione, il più possibile per gestire il codice gonfio, il caricamento non necessario dei contenuti, questi miglioramenti delle prestazioni sono enormi.

E la velocità e le prestazioni dell'iterazione durante lo sviluppo, a nostro avviso, il significato. È anche un po' più importante.

Quindi vedremo che i componenti implementati da _WCEX_ sono relativamente piccoli e semplificati, riducendo la quantità di codice JS, CSS, HTML e riducendo il carico sul motore del browser, che è il modo migliore per ottimizzare. Quindi ci siamo impegnati molto per modificare e ottimizzare il caricamento dinamico delle dipendenze e la sintassi compatta.

#### Riflessioni su piattaforme low-code, programmazione AI, ChatGPT

La tecnologia e la tecnologia si stanno sviluppando rapidamente, e mi sono state spesso poste queste domande di recente, piattaforme low-code, programmazione AI, ChatGPT, queste cose sostituiranno i programmatori? Pensiamoci.

Prima di tutto, dobbiamo renderci conto che queste cose sono in realtà strumenti. Non sono diversi dalle asce di pietra e dalle mazze che i nostri antenati tenevano nelle loro mani diecimila anni fa. Non sostituirà il ruolo dei programmatori, ma eliminerà le persone inefficienti che non usano strumenti avanzati. Questo è il motivo per cui il nostro antenato Homo sapiens alla fine ha trionfato. ChatGPT è essenzialmente un motore di ricerca più intelligente che ci aiuta a ottenere risposte alle domande meglio e più velocemente. Ma in un altro aspetto, richiede anche un miglioramento delle nostre capacità e competenze, che possono corrispondere a questi nuovi strumenti.

Dobbiamo padroneggiare la vera tecnologia, e non si tratta solo dell'uso di determinati framework, è solo semplice roba a livello di applicazione. Di fronte a questo mondo complesso, i nostri programmi devono occuparsi di tutti i tipi di cose, dobbiamo padroneggiare e combinare rapidamente competenze reali, queste abilità includono il sistema tecnico del browser stesso, front-end, back-end, database, dispositivi mobili, dispositivi incorporati, comunicazione di rete, servizi di messaggistica, ecc., Che sono necessari e utilizzati in progetti reali. Ora lo sviluppo della tecnologia ci fa. È facile accedere a conoscenze e soluzioni e queste tecnologie sono un grande dizionario. La vera tecnologia non è quante cose già sai e padroneggi, perché la tecnologia si sviluppa troppo rapidamente e ciò che padroneggi è spesso obsoleto. La vera tecnologia dovrebbe essere: cogliere i principi di queste cose, in modo da trovare e valutare rapidamente la combinazione tecnologica più adatta attraverso gli strumenti efficienti di cui sopra, e implementarla rapidamente, nonché promuovere l'evoluzione della tecnologia stessa.

Nuovi e più intelligenti strumenti continueranno ad apparire, e anche questa è una normale legge di sviluppo. La natura e l'universo aumentano di entropia e tendono a rendere le cose disordinate e complesse, mentre l'essenza della vita è entropica e tende a rendere le cose ordinate e semplificate. Gli strumenti intelligenti ci aiutano a trovare rapidamente le risposte e semplificano molti lavori noiosi e ripetitivi, dandoci l'opportunità di pensare e studiare più cose. Questa è una buona cosa.
