<!--DESC: {icon:{name:"lightbulb_circle",pkg:"mdi",type:"filled"},id:5} -->
<p align=center><svg width=8em src="@/@wcex/doc/assets/jobs.svg" ></svg></p>

#### Omaggio e nostalgia per il più grande uomo del nostro tempo ---- **Steve Jobs**

#### La semplicità è la cosa migliore

Ho sempre la sensazione che lo sviluppo stia diventando sempre più complesso e che ci siano sempre molti nuovi concetti e cose ingombranti. Al fine di risolvere problemi complessi, è stato creato qualcosa di più complesso per affrontare @\_@.
_Jobs_ Si possono fare computer complessi per tutte le età, dovremmo provarci anche noi?

#### Origine e processo

Tutto è iniziato due anni fa, nel bel mezzo della noia di essere isolati dal virus, e abbiamo iniziato a sperimentare, e molto rapidamente, circa una settimana o giù di lì, abbiamo praticamente implementato la prima versione iniziale, comprese le modifiche alle dipendenze e le implementazioni di WebComponent. Ma......

Sono passati due anni, facendo quello che volevamo. Non è davvero facile, tutti i tipi di gestione della compatibilità, revisioni e miglioramenti della sintassi e bug. La buona notizia è che ormai WCEX può essere utilizzato per sviluppare il front-end di un prodotto di medie dimensioni, e diversi progetti interni sono già in uso, e l'efficienza e l'efficacia sono abbastanza buone.

#### Riflessioni sull'associazione bidirezionale, sui dati immutabili e sui flussi di dati unidirezionali

Ci sono molti quadri ora, e di queste cose si parla in molti posti. Ma se ci pensate, questi concetti e queste idee sono cose molto, molto buone. Ma nel nostro progetto attuale. È necessario utilizzarlo universalmente?
Nello sviluppo del front-end, la maggior parte del lavoro, incluso quello che chiamiamo data binding, consiste essenzialmente nel rendere uguali la visualizzazione dell'interfaccia e i dati e l'interno del componente e, infatti, la maggior parte degli scenari non utilizza dati immutabili.
Questo è il motivo per cui abbiamo deprecato _VUEX_ più avanti nel progetto, perché era troppo ingombrante da usare senza di esso. I dati immutabili e il flusso di dati unidirezionale sono più adatti per la modifica dei documenti e l'elaborazione di logiche di business complesse, ma queste sono solo una piccola parte delle funzionalità del progetto in fase di sviluppo e, se il progetto ha davvero bisogno di un flusso di dati unidirezionale durante l'implementazione, è sufficiente fare riferimento a una libreria di terze parti. È possibile accedervi e ci sono molte librerie di questo tipo.

Quindi WCEX alla fine ha eliminato questi concetti nell'implementazione, e quello che abbiamo dovuto fare era in realtà molto semplice, semplicemente rendere uguali i dati o gli elementi dell'interfaccia che devono essere coerenti, quindi non c'è bisogno di occuparsi di questi concetti nel framework, questa è la cosa a livello di applicazione.

#### Pensieri su SCSS LESS

Sono anche tutte cose buone, nei giorni senza CSS3. La gestione degli stili è infatti molto più semplice.
Ma. Scopriremo che il CSS generato è così gonfio e brutto. C'è un modo migliore?
Ora CSS3 è molto potente in termini di funzionalità e prestazioni, soprattutto attraverso lo style binding di WCEX, che dà la possibilità di interagire direttamente con dati e stili, e non è meglio usare direttamente CSS3 semplice e intuitivo.

Si consiglia quindi di utilizzare direttamente CSS3, piuttosto che continuare a utilizzare la pre-elaborazione di SCSS. Allo stesso tempo, la buona chiusura CSS del componente Web è anche un ottimo modo per aiutarci a evitare conflitti di denominazione.

Anche in questo caso, il principio è **intuitivo**, il contenuto e la struttura del codice sono il più possibile coerenti con ciò che si vede nell'albero del DOM e nella console di debug.

#### Riflessioni su prestazioni e velocità

Le prestazioni e la velocità sono le più importanti? Sono importanti. Ma non è uno degli obiettivi più importanti che stiamo considerando, anche se WCEX ha fatto molte ottimizzazioni in questo settore.

Al giorno d'oggi, le funzioni e le prestazioni di computer, telefoni cellulari e browser sono state molto potenti, con una differenza di pochi millisecondi. Non è un problema per le persone o i computer. Se si dispone davvero di applicazioni e requisiti che richiedono prestazioni elevate, è possibile ottimizzarli e gestirli anche attraverso alcune tecnologie mature, come WebAssembly.

A nostro avviso. Il miglioramento delle prestazioni e della velocità dipende dall'implementazione dell'applicazione e la gestione del codice gonfio e del caricamento di contenuti non necessari il più possibile può essere un enorme miglioramento delle prestazioni.

E la velocità e le prestazioni delle iterazioni al momento dello sviluppo, ciò che pensiamo significhi. È anche un po' più importante.

Quindi vedremo che i componenti implementati da WCEX sono relativamente piccoli e snelli, riducendo la quantità di codice JS, CSS, HTML e riducendo il carico sul motore del browser, che è il modo migliore per ottimizzare. Quindi ci siamo impegnati molto per modificare e ottimizzare il caricamento dinamico delle dipendenze e la sintassi semplificata.

#### Riflessioni su piattaforme low-code, programmazione AI, ChatGPT

La tecnologia e la tecnologia si stanno sviluppando rapidamente e le persone mi hanno spesso posto queste domande di recente, piattaforme low-code, programmazione AI, ChatGPT, queste cose sostituiranno i programmatori? Pensiamoci.

Prima di tutto, dobbiamo renderci conto che queste cose sono in realtà strumenti. Non sono diversi dalle asce e dalle mazze di pietra che i nostri antenati tenevano in mano 10.000 anni fa. Non sostituirà il ruolo dei programmatori, ma eliminerà le persone inefficienti che non utilizzano strumenti avanzati. Questo è il motivo per cui i nostri antenati, l'Homo sapiens, alla fine hanno trionfato. ChatGPT è essenzialmente un motore di ricerca più intelligente che ci aiuta a ottenere risposte migliori e più rapide alle nostre domande. Ma d'altra parte, richiede anche un miglioramento delle nostre capacità e competenze per essere all'altezza di questi nuovi strumenti.

Dobbiamo fare i conti con la tecnologia reale, e non si tratta solo di utilizzare determinati framework, ma solo qualcosa a livello di applicazione. Di fronte a questo mondo complesso, i nostri programmi devono occuparsi di tutti i tipi di cose e dobbiamo padroneggiare e combinare rapidamente competenze reali, tra cui il sistema tecnico del browser stesso, front-end, back-end, database, terminale mobile, dispositivi embedded, comunicazione di rete, servizio di messaggistica, ecc., che sono necessari e utilizzati in progetti pratici. Ora lo sviluppo della tecnologia ci ha fatto. Acquisire conoscenze e soluzioni è diventato molto facile e le tecnologie di cui sopra sono in realtà un grande dizionario. La vera tecnologia non riguarda quante cose hai imparato e padroneggiato, perché la tecnologia si sta sviluppando troppo rapidamente e ciò che padroneggi è spesso obsoleto. La vera tecnologia dovrebbe essere quella di cogliere i principi di queste cose, in modo da trovare e valutare rapidamente la combinazione tecnologica più adatta attraverso gli strumenti efficienti di cui sopra, e implementare e promuovere rapidamente l'evoluzione della tecnologia stessa.

Continueranno ad apparire strumenti nuovi e più intelligenti, e anche questa è una normale legge dello sviluppo. La natura e l'universo sono entropicamente crescenti e tendono sempre a rendere le cose disordinate e complesse, mentre l'essenza della vita è l'entropia e tende a rendere le cose ordinate e semplificate. Gli strumenti intelligenti ci aiutano a trovare rapidamente le risposte e a semplificare molte attività noiose e ripetitive, dandoci l'opportunità di pensare e fare ricerche di più. Questa è una buona cosa.
