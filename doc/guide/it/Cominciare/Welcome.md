<!--DESC: {icon:{name:"explore",pkg:"mdi",type:"filled"},id:1} -->

<p align=center><svg width=8em src="/logo.svg" ></svg></p>

# Benvenuti nel mondo dei Web Components

WCEX è una libreria di estensioni che implementa rapidamente componenti Web e consente lo sviluppo rapido ed efficiente di pagine front-end Web

- **Modern Framework Features**: WCEX implementa anche molte delle funzionalità dei moderni framework front-end web, come l'associazione dati, gli aggiornamenti delle dipendenze, il routing, il caricamento a caldo dello sviluppo....
- **Caratteristiche uniche**: WCEX ha anche molte caratteristiche uniche, come l'associazione dinamica dello stile, nessuna confezione, la corrispondenza automatica dei colori, ecc
- **TypeScript**: WCEX supporta pienamente Typescript ed è completamente sviluppato utilizzando TypeScript
- Semantica intuitiva: WCEX implementa completamente la sintassi moderna tra cui "if", "for", "$ data binding", "event binding", ecc., Prende in prestito da *VUE* e la semplifica e ottimizza per un uso rapido
- **Real Dom**: veloce e intuitivo
- La parola **WCEX** è un po' difficile da leggere, semplifichiamola e leggiamola come **(/wɛks/)**.
- ... Fare riferimento alle sezioni successive per continuare l'apprendimento

## Semplice

La filosofia di design di WCEX è "** simple** " ** semplice ** " ** **
Fornire agli utenti un'esperienza efficiente e intuitiva può anche riflettersi nei vari punti funzione e metodi di utilizzo di WCEX.

> Pertanto, WCEX** ha svolto molto lavoro per semplificare lo sviluppo e la distribuzione, non utilizzando più ingombranti pacchetti, pubblicazione, separazione e taglio, ma automatizzando l'intero processo gestendo le dipendenze automatiche e il lazy loading in fase di runtime, rendendo lo sviluppo e la distribuzione dei progetti facili come i collegamenti alle pagine HTML originali. Allo stesso tempo, la tecnologia di caricamento dispendiosa in termini di tempo è ampiamente utilizzata in tutti gli aspetti delle applicazioni WCEX, inclusi componenti, Javascript, librerie di terze parti, CSS, icone, SVG, ecc. E migliora notevolmente l'avvio e la velocità di esecuzione delle applicazioni attraverso la memorizzazione nella cache interna e la pre-elaborazione.

### Completamente componentizzato

Grazie all'implementazione completa di WCEX di componenti Web nativi, ogni pagina, modello e componente nel nostro sistema è un WebComponent standardizzato, non solo, ma estendiamo anche il WebComponent nativo nell'implementazione e implementiamo molte nuove funzionalità, che possono aiutare notevolmente l'implementazione di WebComponent. Ecco alcune caratteristiche interessanti:

#### Analisi e caricamento dinamici dei tag

Quando si utilizzano tag personalizzati, basta usare i tag, non è necessario scaricare dipendenze e introdurre JS in anticipo, WCEX identificherà automaticamente i tag e caricherà automaticamente i file pertinenti su richiesta, questa funzione ci consente di ottenere un "caricamento che richiede tempo", i tag inutilizzati nella pagina non verranno letti e caricati e influiranno sulla velocità di avvio della pagina. Di seguito è riportato un semplice esempio e un componente funzionale del progetto mostrato in questo documento che puoi facilmente trovare, il codice di riferimento è il seguente:
- _/doc/doc.html_
- Implementare l'anteprima del documento markdown
```html
<template url="">
  <style>
    :host {
      display: flex;
      flex-direction: column;
    }
    .title{
      padding: 0.5em;
      background-color: "$$color.bgr.a9_";
    }
  </style>
  <div class="title" $>url</div>
  <wcex-ui.marked 
    style="padding: 1em;" 
    $src="($root.url)?$path('guide/cn/'+$root.url):''"
    >
  </wcex-ui.marked>
</template>
```

> possibile notare che _\<wcex-ui.marked\>_ è un componente della libreria dell'interfaccia utente a cui stiamo facendo riferimento e, quando si utilizza il componente, wcex recupera automaticamente il componente e le relative dipendenze nell'area del repository npm e lo carica su richiesta. Non è necessario installare pacchetti o librerie di terze parti da cui dipende il markdown (contrassegnati ed evidenziati sono usati qui) per utilizzare questo componente, e queste librerie associate vengono automaticamente caricate ed eseguite da npm su richiesta. Naturalmente, esiste anche un modo molto semplice per consentire a WCEX di caricare pacchetti dipendenti dalla directory locale pertinente. Per quanto riguarda l'altra sintassi, i capitoli seguenti saranno discussi uno dopo l'altro, molto concisi, non è vero, in modo che venga implementato un WebComponent con un'etichetta personalizzata denominata _\<doc-\>_, a cui si può fare riferimento direttamente nella pagina, o direttamente attraverso il nostro componente di routing, e si può vedere osservando la barra degli URL del browser.

#### Proprietà WebComponent estese
Nell'esempio precedente, è possibile vedere che il tag radice di questo componente è _\<template url=""\>_, in WCEX, tutti i componenti Web sono incapsulati in _\<template\>_ e forniscono anche un attributo esterno denominato _url_, che può essere utilizzato per passare parametri esterni quando viene utilizzato, proprio come un attributo di un normale tag di elemento HTML. All'interno del componente, è anche conveniente fare riferimento direttamente a questo parametro.


#### Associazione dati migliorata e modifiche alle dipendenze, nonché dati locali
All'interno di un componente, i dati possono essere definiti e utilizzati in molti modi, e i dati possono essere definiti e impostati in modo flessibile in varie parti di un componente: aree di proprietà, ambiti locali, elementi, script incorporati, script esterni, JSON esterni, librerie di terze parti, ecc., Al fine di definirli e utilizzarli nel luogo più adatto in base alla logica di business
> dati vengono utilizzati per controllare e gestire l'interfaccia, quindi i dati dovrebbero apparire più vicini all'elemento della logica di business, che può trovare intuitivamente l'oggetto necessario e facilmente fare riferimento e modificare, senza dover aprire un altro file per trovare dati e definizioni, il che è anche molto favorevole al nostro refactoring dei componenti. Il refactoring dei componenti è una cosa molto comune nel processo di sviluppo aziendale quotidiano, nel processo di sviluppo iterativo continuo, è inevitabile che con l'aumento delle funzioni e la necessità di suddividere i sottocomponenti, in questo momento l'uso dei dati locali può essere facilmente creato da un copia e incolla per creare nuovi componenti.

### Riferimenti dinamici
Vogliamo che tutte le librerie di riferimento, i dati CSS, i componenti, ecc. siano dinamici e possano essere referenziati direttamente da una CDN statica. In questo modo è possibile evitare alcuni processi complicati come l'installazione di pacchetti, l'aggiornamento delle versioni, ecc. Il vantaggio di questo è che i componenti e i progetti WCEX possono essere facilmente posizionati ovunque, ad esempio npm, github o qualsiasi server Web statico. Come puoi vedere ora, il framework di documentazione è stato sviluppato interamente in WCEX e l'ho appena affidato a Github senza ulteriore imballaggio e distribuzione. per vedere l'effetto in tempo reale. Qualsiasi pacchetto di componenti deve solo essere inviato a npm e altri progetti possono essere direttamente referenziati. Anche le librerie di terze parti necessarie fanno riferimento direttamente al sorgente npm senza doverlo installare separatamente.

> Lo sappiamo tutti. Il mondo di JavaScript e del front-end web è complesso e facciamo molto lavoro di compatibilità per questo. WCEX può ora fare riferimento direttamente ai moduli CommonJs, Amd, Umd, Es6, css, componente HTML, svg, font e librerie di icone direttamente nei progetti senza la necessità di installazione localizzata. Anche quando si utilizza Typescript, WCEX è in grado di gestire e riconoscere correttamente le importazioni di Servizi terminal e di convertirle in dipendenze dinamiche. Queste dipendenze sono lazy loaded. Ed essere in grado di gestire correttamente le dipendenze multilivello associate. Questo ci consente di staticizzare facilmente i progetti inviati a npm direttamente tramite CDN senza dover fare più lavoro. Allo stesso tempo, il supporto per il controllo delle versioni rende anche l'aggiornamento un gioco da ragazzi.

### Caricamento del runtime ed esecuzione delle dipendenze
La natura dinamica di WCEX si riflette in molti modi, non solo in fase di caricamento, ma anche in fase di esecuzione. Il DOM ridotto a icona incorpora modifiche per rendere il runtime estremamente reattivo e, insieme alla funzione di caricamento dinamico, viene caricato solo il contenuto necessario ridotto al minimo in fase di esecuzione, inclusi JS, CSS, font icona e altri componenti. Naturalmente, possiamo anche configurare manualmente determinati componenti o script per il precaricamento.

## Componenti statici caricati dinamicamente
Nella descrizione precedente sono disponibili alcune funzionalità di WCEX, che implementa essenzialmente il caricamento dinamico dei componenti e la distribuzione statica dei componenti. In questo modo, i nostri componenti possono essere sviluppati e utilizzati con la stessa facilità delle prime pagine HTML. E può essere molto facile da gestire staticamente e può essere facilmente utilizzato e distribuito in vari scenari, come CDN, NPM, dispositivi nativi e persino mobili.

## Intuitivo
Un'implementazione completa basata su componenti Web, nonché una combinazione di funzionalità di framework moderni come l'associazione dati, gli aggiornamenti delle dipendenze e un'implementazione completa basata su DOM reale, offre una grande praticità per lo sviluppo e il debug e la logica dell'intero progetto. Il DOM reale e il codice modificato corrispondono uno a uno e gli elementi rilevanti nel codice possono essere trovati direttamente nella console di debug e persino manipolati direttamente per il test e il debug. Questa caratteristica è molto più di. Altri framework richiedono l'installazione di plug-in del browser molto più potenti. Tramite la console di debug, è possibile inviare eventi direttamente per modificare i dati, osservare le modifiche nelle proprietà ed eseguire il drill-down nei componenti. Anche breakpoint e tracce. È tutto intuitivo.

## Velocità
WCEX funziona molto velocemente, abbiamo fatto molto lavoro per accelerarlo, oltre a ridurre al minimo il caricamento dinamico delle dipendenze, implementiamo anche la pre-elaborazione e la memorizzazione nella cache dei modelli, l'iniezione CSS e la memorizzazione nella cache, le icone dei caratteri, ecc.
> Vale la pena ricordare che WCEX non è come altri framework che utilizzano VDOM, è completamente basato sul vero albero DOM per le modifiche e l'elaborazione di unione, abbandoniamo l'algoritmo di confronto delle differenze dell'albero DOM e implementiamo invece un piccolo raccoglitore di modifiche per ottenere quando i dati cambiano, ottenere l'unità di modifica più piccola, unirla e infine aggiornare al DOM contemporaneamente, in modo che la velocità di risposta al sistema sia notevolmente migliorata.

## Sviluppo progressivo
A differenza di altri framework, WCEX non ha una forte preferenza di linguaggio, che si tratti di HTML, Javscript, Typescript, ecc., È una scelta di sviluppo che supportiamo e consigliamo, ma man mano che il progetto si evolve, è un processo di sviluppo graduale che va dal semplice al complesso e poi diviso e ricostruito. In questo processo, segui il concetto di **Good Cat**, implementazione rapida, logica semplificata e comodo aggiornamento iterativo.

> Di solito lo facciamo nei nostri progetti:
> - In primo luogo, pagine logicamente semplici, di solito in puro _HTML_, cercano di evitare l'uso di Javascript, perché questo porterà alla definizione di nomi di variabili e riferimenti separati, sembra stanco;
> - In secondo luogo, con l'aumentare della complessità del business, specialmente quando l'istruzione JS inline è lunga, migrare JS al _HTML tag_ di script inline e utilizzare la sintassi Javascript, in modo che ci possa essere un controllo della sintassi di base e una migliore formattazione;
> - In terzo luogo, man mano che l'attività aumenta ulteriormente e il numero di righe di codice aumenta, generalmente controlliamo _inlining JavaScript_ All'interno di 50 righe, Js viene suddiviso in file Typescript indipendenti e completa il tipo. Con il supporto di _WCEX_, questo lavoro sarebbe facile;
> - Infine, il componente è più grande, e questo è quando il componente viene diviso in modo indipendente



## Consegna a basso costo
Il ciclo di vita di un prodotto software è più complesso, WCEX considera come ottenere una semplificazione e un'ottimizzazione complessive nell'intero ciclo di vita del prodotto software, compresa la catena di sviluppo e debug. Testare le versioni di distribuzione e le modifiche successive. Iterazione della versione e molti altri collegamenti. Ottimizza e semplifica questi collegamenti. Può migliorare notevolmente l'efficienza del nostro sviluppo. Ciò riduce il costo dell'intero ciclo di sviluppo del software. Pertanto, molte delle funzionalità che progettiamo sono correlate a questi. Nei capitoli seguenti. Probabilmente vedrai alcune app interessanti in ogni passaggio.
> Ad esempio, in base alle caratteristiche delle dipendenze dinamiche e del caricamento, è possibile ottenere moduli multicomponente e aggiornamenti rapidi collaborativi di rete collaborativa multipersona nello sviluppo del team e questi aggiornamenti si basano su aggiornamenti locali. Le modifiche di tutti si riflettono nella tua anteprima live in tempo reale

> Attraverso la funzionalità dei componenti statici WCEX, puoi persino utilizzare direttamente npm e GitHub come blog personale, in modo che non ci sia bisogno di server e nessun costo di traffico, quanto buono.

> Questo documento fa proprio questo, con framework e componenti scritti in WCEX, fa riferimento ad alcuni pacchetti di terze parti già pronti su NPM e parte del contenuto è scritto in markdown. Alla fine è stato rilasciato direttamente su NPM, attraverso un CDN pubblico gratuito, che è ciò che può essere visto ora.

## Altro
C'è un piccolo pulsante nell'angolo in alto a destra, puoi sperimentare le caratteristiche di WCEX _Semantic Real-time Color Matching_, scegli il tuo colore preferito.

Inoltre, è possibile vedere che questo documento utilizza caratteri cinesi speciali e WCEX implementa anche il caricamento dispendioso in termini di tempo dei caratteri cinesi di grandi dimensioni. L'usabilità di utilizzare una varietà di caratteri cinesi nel browser è notevolmente migliorata e i dettagli del caricamento dei caratteri possono essere visualizzati nella console di debug e l'uso di questo carattere cinese non dipende da altri servizi API di terze parti sono anche completamente statici e supportano offline, e ci sarà un capitolo dedicato al supporto e all'ottimizzazione del caricamento dei caratteri cinesi Progetto di riferimento: [https://github.com/wc-ex/cn-fontsource]( https://github.com/wc-ex/cn-fontsource)
