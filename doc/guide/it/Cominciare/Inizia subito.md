<!--DESC: {icon:{name:"sports_score",pkg:"mdi",type:"filled"},id:2} -->

## Inizia subito

Partiamo rapidamente da un progetto più semplice e perfezioniamolo passo dopo passo. Ok, ora crea una nuova directory sul disco.

### Ingresso principale: index.html

Per prima cosa, scrivi un file di entrata, che di solito chiamiamo _index.html_:

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <title>WCEX Doocument</title>
    <meta name="viewport" content="initial-scale=1.0,width=device-width" />
    <meta charset="utf-8" />

    <meta name="npm" content="https://cdn.jsdelivr.net/npm/" />

    <style>
      html,
      body {
        width: 100%;
        height: 100%;
        overflow: hidden;
        margin: 0;
        padding: 0;
        font-size: 18px;
      }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/wcex@1.8.104/index.js"></script>
  </head>

  <body>
    <app-></app->
  </body>
</html>
```

Rispetto al normale HTML, dobbiamo solo fare tre semplici passaggi:

1. Aggiungi la definizione del tag **npm** \<meta\> al progetto in modo che WCEX sappia dove trovare i pacchetti di terze parti di cui hai bisogno, in questo caso jsdelivr, puoi usare qualsiasi CDN che ti piace o installare NPM nel tuo percorso locale.

```html
<meta name="npm" content="https://cdn.jsdelivr.net/npm/" />
```

2. Utilizzare il primo componente, che di solito chiamiamo **app**, ma qui è etichettato \<app-\>, perché la specifica standard del componente Web richiede che tutti i componenti personalizzati abbiano almeno un carattere '-', quindi è necessario aggiungere un '-' alla fine.

```html
<app-></app->
```

3. Infine, dobbiamo importare il pacchetto WCEX, qui direttamente tramite il cdn pubblico, e importare l'ultima versione. WCEX è molto piccolo, non ha dipendenze di terze parti, si carica molto velocemente e di solito mette questa riga nell'ultimo elemento del tag \<head\>, perché wcex ha bisogno di alcune informazioni predefinite durante l'inizializzazione, come l'indirizzo del repository NPM descritto nel primo articolo e, naturalmente, ci sono alcune altre configurazioni, che vedremo più avanti. Un altro punto è che è possibile ottimizzare l'inizializzazione iniziale della schermata bianca HTML.

```html
<script src="https://cdn.jsdelivr.net/npm/wcex@1.8.104/index.js"></script>
```

### Primo componente: **\<app-\>**

Nella sezione precedente abbiamo visto che il primo componente Web che abbiamo definito è stato caricato in index.html, ora creiamolo, che è un classico Hello World.

- Crea un nuovo file in questa directory chiamato **app.html** con il seguente contenuto:

```html
<template>
  <h1>Hello World!</h1>
</template>
```

Come puoi vedere, questo è un normale file HTML e l'unico requisito è che deve avere \<template\> come tag radice.

> Per ulteriori informazioni sul modello, è possibile fare riferimento a: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template, Questa è una specifica standard W3C, WCEX utilizza una specifica Web Component nativa standardizzata per l'implementazione e molti punti tecnici potrebbero essere utilizzati in futuro, che appartengono tutti alla specifica standard. Quindi puoi dare un'occhiata in anticipo alle specifiche pertinenti e la maggior parte di esse può essere trovata qui: https://developer.mozilla.org/en-US/docs/Web/Web_Components

Ok, ora che abbiamo fatto tutto ciò di cui abbiamo bisogno, mettiamolo in funzione.

### Apri nel tuo browser

Come accennato nel capitolo precedente, una delle cose principali che WCEX fa è che viene caricato dinamicamente e odiamo le complicate configurazioni di pacchetti e ambienti. Quindi il resto è semplice. Ci sono molti modi. Puoi metterlo in funzione. Basta mettere i due file di cui sopra in qualsiasi WEB statico, anche Github o NPM. Ecco come farlo:

#### Avvia il servizio HTTP locale

- Il modo più semplice per farlo è installare uno strumento server HTTP veloce con npm

```shell
npm install -g http-server
```

- Quindi inizia nella directory che hai appena desiderato e, nella riga di comando, vai alla tua directory ed esegui il seguente comando.

```shell
http-server
```

- Puoi vedere che il tuo server HTTP è già attivo sulla porta 8080, ora apri il browser e digita nella barra degli indirizzi:

```
http://localhost:8080
```

Ora puoi vedere **Hello World**, ovviamente, puoi usare qualsiasi server HTTP che ti piace, nginx, lighttpd...

> Ok, il prossimo. È possibile aprire la finestra di debug del browser. Dai un'occhiata al tuo componente nel DOM, che è l'interno di un componente Web standardizzato. Qui potresti essere in grado di vedere la seconda caratteristica principale di WCEX: Intuitivo. Abbandonando il VDOM e il motore del modello, utilizzando l'implementazione nativa e seguendo un'implementazione standardizzata, scoprirai che la struttura del DOM che vedi nella finestra di debug è fondamentalmente la stessa della struttura nel modello, il che è molto utile per noi per osservare ed eseguire il debug dei problemi, e attraverso la finestra di debug, puoi fare quasi tutto ciò che vuoi, guardare i dati cambiare, inviare eventi, modificare i dati e così via. Al fine di raggiungere questo obiettivo il più possibile. Ci sono anche molti dettagli nell'implementazione di WCEX, come l'implementazione del DOM nella struttura **if** e **for** di WCEX, invece di aggiungere un altro livello di elementi wrapper, che è molto favorevole alla coerenza e all'intuitività degli elementi a cui accedono i CSS e le strutture di dati.

#### Anteprima direttamente sul web

Se invii i file di cui sopra a github o pubblichi il pacchetto tramite npm, puoi accedervi direttamente tramite il CDN e abbiamo creato un widget per aiutarti a visualizzarlo direttamente in anteprima, questo strumento utilizza jsdelivr come CDN.
Per ulteriori informazioni sul formato e sulla descrizione dell'accesso, fare riferimento a: https://www.jsdelivr.com/

- Per l'accesso a NPM, sostituire il nome del pacchetto.

```
https://wc-ex.com/go?npm/@wcex/example-basic/index.html

https://wc-ex.com/go?npm/[YOUT PACKAGE NAME][@VERSION]/index.html

```

- Accesso a GitHub, sostituisci il nome e il percorso del repository

```
https://wc-ex.com/go?gh/wc-ex/wcex/example/basic/index.html
https://wc-ex.com/go?gh/[YOU REPOS]@[COMMIT ID]/[YOU DIR]/index.html
```

> Naturalmente, oltre ai metodi di cui sopra, abbiamo anche creato un toolkit CLI. È molto piccolo, ha una dimensione di poche decine di kilobyte e non si basa su strumenti di packaging complessi come webpack e rollup. Può aiutarci a fare più lavoro, come aggiornamenti a caldo, compilazione, rilascio, ecc. Un altro punto importante è il supporto di TypeScript. È possibile installare **@wcex/cli** tramite npm, i dettagli saranno spiegati nei capitoli seguenti.

### Provalo ora
- Questo è un terreno di esercitazione che puoi modificare direttamente nell'editor per vedere l'effetto in tempo reale.
- Ci sono due piccoli pulsanti nell'angolo in alto a destra, __reload__ per aggiornare la visualizzazione e __reset__ per ripristinare il contenuto al suo stato originale

<div>
<wcex-doc.com-playground files="['primo/indice.html','primo/app.html','primo/com/tempo.html']"></wcex-doc.com-playground>
</div>

- In questo progetto di inizializzazione, abbiamo tre file, il portale principale _index.html_ e due componenti
- È possibile visualizzare le regole per il riferimento e la denominazione dei componenti, nonché il modo in cui viene gestita l'associazione dati
> Denominazione del componente: Con l'html principale come nodo radice e *"-"* come separatore di directory, il nome del componente può utilizzare una piccola regola di gobba, come "helloWorld", tale nome del componente sarà "hello_world", a causa dei requisiti delle specifiche HTML, se il nome finale non contiene il carattere "-", è necessario aggiungere un carattere "-" alla fine. Se si desidera fare riferimento a un pacchetto esterno, è necessario utilizzare il carattere "." per dividere il nome del pacchetto e il nome del componente.  
- Familiarizziamo prima con esso e puoi provare a sperimentare un'attività.
  - Aggiunto l'attributo name per _\<app\>_ in _index.html_ 
  - Modificare l'associazione di valori _$_ in _:_ associazione di modelli di stringa in _com/time.html 
  - Regolare l'intervallo di tempo per _@time_ ogni 2 secondi nel com/time.html 
  - La sintassi principale utilizzata: _"$$"_ è un'associazione bidirezionale, _"$"_ è un'associazione di calcolo, _":"_ è un'associazione di stringhe di modello e _'@'_ è un'associazione di eventi
  - La sintassi in CSS è leggermente cambiata, le associazioni di variabili devono essere circondate da _"_ o _'_ e il primo carattere _$_ o _:_ rappresenta il metodo di associazione, che è lo stesso delle regole precedenti
- Quando si modifica _com/time.html_, si può vedere che l'aggiornamento del codice del componente è parziale e non influisce sullo stato corrente del componente _app.html_, che è lo stesso del meccanismo di implementazione del nostro strumento lato client _@wcex/cli_, che chiamiamo **local hot update**, che può essere molto utile durante il debug e lo sviluppo.
- Infine, apri la finestra di debug e osserva la struttura del documento e vedrai che la struttura del DOM è coerente con il file sorgente del modello, che è un'altra caratteristica di WCEX: *Intuitivo*


### Prossima estensione

Molto semplicemente, nel prossimo capitolo, cercheremo di aggiungere altre funzionalità, ad esempio. Aggiungere proprietà personalizzate per aggiungere associazioni dati. Gestire gli eventi e aggiungere altri componenti.
e l'elaborazione di script.
- Non dimenticare, puoi scegliere il tuo colore preferito nell'angolo in alto a destra.

