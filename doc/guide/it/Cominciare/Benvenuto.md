<!--DESC: {icon:{name:"explore",pkg:"mdi",type:"filled"},id:1} -->

<p align=center><svg width=8em src="/logo.svg" ></svg></p>

# Benvenuti nel mondo dei Web Components

WCEX è una libreria di estensioni che implementa rapidamente i componenti Web per lo sviluppo rapido ed efficiente di pagine front-end Web

- Funzionalità del framework moderno: WCEX implementa anche molte delle funzionalità dei moderni framework front-end web, come l'associazione dati, gli aggiornamenti delle dipendenze, il routing, il caricamento a caldo dello sviluppo e altro ancora.
- **CARATTERISTICHE UNICHE**: WCEX ha anche una serie di caratteristiche uniche, come l'associazione dinamica dello stile, l'assenza di packaging, la corrispondenza automatica dei colori, ecc
- TypeScript: WCEX supporta completamente Typescript ed è sviluppato interamente in TypeScript
- **Semantica intuitiva**: WCEX implementa completamente la sintassi moderna tra cui "if", "for", "$ data binding", "event binding", ecc., prende in prestito da *VUE* ed è stato semplificato e ottimizzato, in modo da poter iniziare rapidamente
- Real DOM: veloce e intuitivo
- La parola **WCEX** è un po' difficile da pronunciare, quindi semplifichiamola e leggiamola come **(/wɛks/)**.
- ... Fare riferimento alle sezioni seguenti per continuare a imparare

## Semplice

Il concetto di progettazione di WCEX è "**semplice**", "**conciso**" e "**semplificato**", semplificando tutti gli aspetti dello sviluppo del prodotto, inclusi sviluppo, debug, test, rilascio, ecc., nonché successivi aggiornamenti e iterazioni della versione.
L'idea di fornire agli utenti un'esperienza efficiente e intuitiva si riflette anche nelle varie funzionalità e metodi di utilizzo di WCEX.

> Di conseguenza, WCEX ha svolto molto lavoro per semplificare lo sviluppo e l'implementazione, allontanandosi dalla noiosa creazione di pacchetti, pubblicazioni, divisioni e tagli, per automatizzare l'intero processo gestendo le dipendenze automatiche e il caricamento lento in fase di esecuzione, rendendo lo sviluppo e la distribuzione di un progetto facile come un collegamento a una pagina HTML. Allo stesso tempo, la tecnologia del "time-to-load" è ampiamente utilizzata in tutti gli aspetti delle applicazioni WCEX, inclusi "componenti", "Javascript", "librerie di terze parti", "CSS", "icone", "SVG", ecc. e migliora notevolmente la velocità dell'applicazione attraverso la memorizzazione nella cache interna e la pre-elaborazione.

### Completamente componentizzato

Grazie all'implementazione completa di WebComponent nativi da parte di WCEX, ogni pagina, modello e componente del nostro sistema è un WebComponent standardizzato, e non solo, ma abbiamo anche esteso il WebComponent nativo nell'implementazione, implementando molte nuove funzionalità che possono aiutare notevolmente l'implementazione di WebComponent. Ecco alcune caratteristiche interessanti:

#### Analisi e caricamento dinamico dei tag

Quando si utilizzano tag personalizzati, è sufficiente utilizzare i tag, non è necessario scaricare le dipendenze e introdurre JS in anticipo, WCEX riconoscerà automaticamente i tag e caricherà automaticamente i file pertinenti su richiesta, questa funzione ci consente di ottenere il "time-to-load" e i tag che non vengono utilizzati nella pagina non verranno letti e caricati e influiranno sulla velocità di avvio della pagina. Di seguito è riportato un semplice esempio di componente feature nel progetto illustrato in questo documento, che è possibile trovare facilmente, con il seguente codice di riferimento:
- _/doc/doc.html_
- Implementa le anteprime dei documenti markdown
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

> è possibile notare che _\<wcex-ui.marked\>_ è un componente della libreria dell'interfaccia utente a cui si fa riferimento e, quando si utilizza il componente, wcex passerà automaticamente al repository npm per ottenere il componente e le relative dipendenze e caricarlo su richiesta. Non è necessario installare pacchetti per utilizzare questo componente e non è necessario installare librerie di terze parti da cui dipende Markdown (contrassegnate ed evidenziate sono usate qui) e queste librerie associate vengono caricate ed eseguite automaticamente da npm su richiesta. Naturalmente, c'è anche un modo molto semplice per fare in modo che WCEX carichi le dipendenze da una directory locale correlata. Per quanto riguarda l'altra sintassi, se ne parlerà nei capitoli seguenti, il che è molto conciso, non è vero, in modo che venga implementata un'etichetta WebComponent personalizzata con un'etichetta denominata _\<doc-\>_, a cui si può fare riferimento direttamente nella pagina, o direttamente tramite il nostro componente di routing, e lo si può vedere osservando la barra degli URL del browser.

#### Proprietà WebComponent estesa
Nell'esempio precedente, è possibile vedere che il tag radice di questo componente è _\<template url=""\>_ e in WCEX, tutti i componenti Web sono incapsulati in _\<template\>_, insieme a un attributo esterno denominato _url_, che può essere utilizzato come parametro esterno quando viene utilizzato, proprio come un normale tag di elemento HTML. Questo parametro può anche essere facilmente referenziato direttamente all'interno del componente.


#### Modifiche avanzate all'associazione dati e alle dipendenze, nonché ai dati locali
I dati possono essere definiti e utilizzati in molti modi all'interno di un componente e possono essere definiti e impostati in modo flessibile in varie parti di un componente: aree di proprietà, ambiti locali, elementi, script incorporati, script esterni, JSON esterni, librerie di terze parti, ecc., in modo che possano essere definiti e utilizzati dove più appropriato in base alla logica di business
> dati vengono utilizzati per controllare e manipolare l'interfaccia, quindi i dati dovrebbero apparire nel punto più vicino agli elementi della logica di business, in modo da poter trovare in modo intuitivo gli oggetti necessari e consultarli e modificarli facilmente, senza dover aprire un altro file per trovare dati e definizioni, il che è anche molto favorevole al refactoring dei componenti. Il refactoring dei componenti è una cosa molto comune nel processo quotidiano di sviluppo aziendale, nel processo di iterazione continua, è inevitabile che i sottocomponenti debbano essere divisi con l'aumento delle funzioni e, in questo momento, è facile utilizzare i dati locali per creare nuovi componenti copiando e incollando.

### Riferimenti dinamici
Vogliamo che tutte le librerie di riferimento, i CSS, i componenti e gli altri dati siano dinamici e possano essere referenziati direttamente dalla CDN statica. In questo modo, è possibile evitare alcuni processi complicati come l'installazione di pacchetti, l'aggiornamento di versioni, ecc. Il vantaggio di questo è che i componenti e i progetti WCEX possono essere facilmente posizionati ovunque, ad esempio npm, github o qualsiasi server Web statico. Come si può vedere ora, questo framework di documentazione è completamente sviluppato utilizzando WCEX, e ho solo bisogno di inviarlo a Github senza la necessità di ulteriori processi di pacchettizzazione e rilascio. per vedere i risultati in tempo reale. Qualsiasi pacchetto di componenti deve solo essere inviato a npm e altri progetti possono essere referenziati direttamente. Anche le librerie di terze parti di cui hai bisogno fanno riferimento direttamente dal sorgente npm, quindi non è necessario installarle separatamente.

> Lo sappiamo tutti. Il mondo di JavaScript e del front-end web è complesso e abbiamo fatto molto lavoro di compatibilità per farlo. WCEX ora ha riferimenti diretti ai moduli CommonJs, Amd, Umd, Es6, css, HTML dei componenti, svg, font e librerie di icone direttamente nei progetti senza la necessità di installazioni localizzate. Anche quando si utilizza Typescript, WCEX è in grado di gestire e riconoscere correttamente le importazioni di Servizi terminal e di convertirle in dipendenze dinamiche. Queste dipendenze sono caricate in modo lento. e la capacità di gestire correttamente le dipendenze multilivello associate. In questo modo è facile eseguire i progetti inviati a npm direttamente e staticamente tramite la CDN senza dover eseguire altro lavoro. Allo stesso tempo, il supporto per il controllo delle versioni semplifica anche l'aggiornamento.

### Tempo di caricamento ed esecuzione delle dipendenze
La natura dinamica di WCEX si riflette in molti modi, non solo in fase di caricamento, ma anche in fase di esecuzione. Le modifiche ridotte al minimo per l'unione dei DOM rendono l'esecuzione estremamente reattiva e, insieme alla funzione di caricamento dinamico, in fase di esecuzione viene caricato solo il contenuto necessario ridotto a icona, inclusi JS, CSS, caratteri di icone e altri componenti. Naturalmente, possiamo anche configurare manualmente alcuni componenti o script per precaricarli in anticipo.

## Componenti statici caricati dinamicamente
Nella descrizione precedente, potresti aver trovato alcune funzionalità di WCEX, che essenzialmente implementa il caricamento dinamico dei componenti e la distribuzione statica dei componenti. In questo modo, i nostri componenti possono essere facilmente sviluppati e utilizzati proprio come le prime pagine HTML. E può essere facilmente gestito staticamente e può essere facilmente utilizzato e distribuito in vari scenari, come CDN, NPM, dispositivi nativi e persino mobili.

## Intuitivo
L'implementazione completa basata su Web Components, così come la combinazione di funzionalità di framework moderni come l'associazione dei dati e gli aggiornamenti delle dipendenze, nonché l'implementazione basata sul DOM reale completo, offrono una grande comodità per lo sviluppo e il debug nonché la logica dell'intero progetto. Il DOM reale corrisponde al codice modificato e gli elementi rilevanti nel codice possono essere trovati direttamente nella console di debug e persino manipolati direttamente per il test e il debug. Questa funzione è molto più di. Altri framework richiedono l'installazione di plug-in del browser molto più potenti. Con la console di debug, è possibile modificare direttamente gli eventi di invio dei dati, osservare le modifiche alle proprietà ed eseguire il drill-down dei componenti internamente. Anche i punti di interruzione e le tracce. È tutto intuitivo.

## Velocità
WCEX è molto veloce e abbiamo fatto molto lavoro per velocizzarlo, oltre a ridurre al minimo il caricamento dinamico delle dipendenze, abbiamo anche implementato la pre-elaborazione e la memorizzazione nella cache dei modelli, l'iniezione CSS e la pre-elaborazione di tutti gli aspetti della memorizzazione nella cache, delle icone dei caratteri e così via.
> Vale la pena ricordare che WCEX non è come altri framework che utilizzano VDOM, è completamente basato sull'albero DOM reale per l'unione delle modifiche e l'elaborazione, abbiamo abbandonato l'algoritmo di confronto delle differenze dell'albero DOM e abbiamo invece implementato un piccolo raccoglitore di modifiche per ottenere quando i dati cambiano, ottenere l'unità di modifica più piccola, unirla e infine aggiornare il DOM contemporaneamente, in modo che la velocità di risposta del sistema sia notevolmente migliorata.

## Sviluppo progressivo
A differenza di altri framework, WCEX non ha una forte preferenza linguistica, che si tratti di HTML, Javscript, Typescript, ecc., è una scelta di sviluppo che supportiamo e consigliamo, ma è un processo di sviluppo graduale che si evolve da semplice a complesso per poi essere diviso e rifattorizzato. In questo processo, segui il concetto di **buon gatto**, implementazione rapida, logica semplificata e comodo aggiornamento iterativo.

> Di solito utilizziamo questo approccio nei nostri progetti:
> - Innanzitutto, le pagine con logica semplice, di solito in modo puramente _HTML_, cercano di evitare Javascript, perché questo porterà alla separazione della definizione e del riferimento del nome della variabile, che sembra stancante;
> - In secondo luogo, con l'aumentare della complessità del business, soprattutto quando le istruzioni JS incorporate negli elementi sono lunghe, migrare il JS al _HTML script in linea tag_ e utilizzare la sintassi Javascript, in modo che ci possa essere un controllo della sintassi di base e una migliore formattazione;
> - In terzo luogo, man mano che l'attività aumenta ulteriormente e il numero di righe di codice aumenta, in genere controlliamo _inline JavaScript_ entro 50 righe, dividiamo Js in un file dattiloscritto separato e completiamo il tipo. Con il supporto di _WCEX_, questo sarà facile;
> - Infine, quando il componente diventa più grande, il componente deve essere diviso in modo indipendente



## Consegna a basso costo
Il ciclo di vita di un prodotto software è complesso e WCEX considera come semplificare e ottimizzare l'intero ciclo di vita del prodotto software, compresa la catena di sviluppo e debug. Testare la distribuzione e il rilascio e le modifiche successive più e più volte. iterazione della versione e molti altri collegamenti. Ottimizza e semplifica questi passaggi. Può migliorare notevolmente l'efficienza del nostro sviluppo. In questo modo si riduce il costo dell'intero ciclo di sviluppo del software. Di conseguenza, molte delle funzionalità che progettiamo sono correlate a queste. Nei capitoli seguenti. Potresti vedere alcune applicazioni interessanti in ogni sezione.
> Ad esempio, in base alle funzionalità di dipendenza dinamica e caricamento, è possibile ottenere moduli multicomponente nello sviluppo in team, aggiornamenti a caldo collaborativi di rete collaborativa con più persone e questi aggiornamenti sono basati su aggiornamenti locali. Le modifiche apportate da tutti si riflettono nell'anteprima in tempo reale

> Con le funzionalità dei componenti statici WCEX, puoi persino utilizzare npm e GitHub come blog personale, quindi non hai bisogno di un server o di una tariffa per il traffico.

> Questo documento fa proprio questo, il framework e i componenti del documento sono scritti in WCEX, fanno riferimento ad alcuni dei pacchetti di terze parti disponibili su NPM e parte del contenuto è scritto in markdown. Alla fine, è stato pubblicato direttamente su NPM, attraverso il CDN pubblico gratuito, che è quello che puoi vedere ora.

## Varie
Nell'angolo in alto a destra, c'è un piccolo pulsante dove puoi provare le funzionalità di WCEX Semantic Real-Time Color Matching e scegliere il colore che ti piace.

Inoltre, è possibile notare che questo documento utilizza un carattere cinese speciale e WCEX implementa anche il caricamento temporale dei caratteri cinesi di grandi dimensioni. L'usabilità dell'utilizzo di una varietà di caratteri cinesi nel browser è stata notevolmente migliorata e i dettagli del caricamento dei caratteri possono essere visualizzati nella console di debug e l'uso di questo carattere cinese non dipende da altri servizi API di terze parti sono anche completamente statici e supportano offline, e ci sarà un capitolo dedicato al supporto e all'ottimizzazione del caricamento dei caratteri cinesi Elementi di riferimento: [https://github.com/wc-ex/cn-fontsource]( https://github.com/wc-ex/cn-fontsource)
