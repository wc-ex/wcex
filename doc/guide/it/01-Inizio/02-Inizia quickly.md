<!--DESC: {"icon":"sports_score"} -->

## Inizia subito

Iniziamo rapidamente un semplice progetto e poi perfezioniamolo passo dopo passo. Ok, ora crea una nuova directory sul disco e andiamo.

### Voce principale: indice.html

Innanzitutto, scrivi un file di ingresso, che generalmente chiamiamo _index.html_ :

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

Rispetto al normale HTML, abbiamo solo bisogno di tre semplici passaggi:

1. Aggiungi la definizione del tag **npm** \<meta\> al progetto per far sapere a WCEX dove trovare i pacchetti di terze parti richiesti, qui viene utilizzato jsdelivr, puoi usare qualsiasi CDN che ti piace o installare NPM sul tuo percorso locale.

```html
<meta name="npm" content="https://cdn.jsdelivr.net/npm/" />
```

2. Con il tuo primo componente, di solito lo chiamiamo **app**, tuttavia, qui il suo nome dell'etichetta è \<app-\>, la ragione di ciò è che a causa dei requisiti della specifica standard del componente Web, tutti i componenti personalizzati richiedono almeno un carattere '-', quindi dobbiamo aggiungere un '-' alla fine.

```html
<app-></app->
```

3. Infine, dobbiamo introdurre il pacchetto WCEX, qui direttamente attraverso il cdn pubblico, e importare l'ultima versione. WCEX è molto piccolo, senza dipendenze di terze parti, il caricamento è molto veloce, generalmente metti questa riga nell'ultimo elemento del tag \<head\>, la ragione di ciò è che l'inizializzazione di wcex richiede alcune informazioni predefinite, come l'indirizzo del repository NPM descritto nel primo articolo, ovviamente, ci sono alcune altre configurazioni, che vedremo più avanti. Un altro punto è che è possibile ottimizzare la schermata bianca di inizializzazione iniziale di HTML.

```html
<script src="https://cdn.jsdelivr.net/npm/wcex@1.8.104/index.js"></script>
```

### Primo componente: **\<app-\>**

Nella sezione precedente abbiamo visto che il primo Web Component che abbiamo definito è stato caricato in index.html, ora creiamolo, che è un classico Hello World.

- Creare un nuovo file in questa directory, denominato **app.html che recita come segue:

```html
<template>
  <h1>Hello World!</h1>
</template>
```

Come puoi vedere, questo è un normale file HTML e il suo unico requisito è che deve usare \<template\> come tag radice.

> Per informazioni su _template_, puoi fare riferimento a: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template, Questa è la specifica standard W3C, WCEX utilizza la specifica nativa standardizzata del componente Web per implementare e molti punti tecnici potrebbero essere utilizzati in futuro, che appartengono tutti alla specifica standard. Quindi puoi dare un'occhiata alle specifiche in anticipo, la maggior parte delle quali può essere trovata qui: https://developer.mozilla.org/en-US/docs/Web/Web_Components

Ok, ora che tutto ciò di cui abbiamo bisogno è fatto, mettiamoci davvero in moto.

### Apri in un browser

Come abbiamo spiegato nel capitolo precedente, una delle cose principali che WCEX fa è il caricamento dinamico, che odiamo per la complessa configurazione di packaging e ambiente. Quindi la prossima cosa è semplice. Hai molti modi. Puoi farlo funzionare. Basta inserire i due file precedenti in qualsiasi WEB statico o anche Github o NPM. Questi metodi sono descritti di seguito:

#### Avviare il servizio HTTP locale

- Il modo più semplice è installare uno strumento server HTTP veloce con npm

```shell
npm install -g http-server
```

- Quindi inizia nella directory proprio ora, sulla riga di comando, vai alla tua directory ed esegui il seguente comando.

```shell
http-server
```

- Puoi vedere che il tuo server HTTP è stato avviato sulla porta 8080, ora apri un browser e digita nella barra degli indirizzi:

```
http://localhost:8080
```

Ora puoi vedere Hello World, ovviamente, puoi usare qualsiasi tipo di server HTTP che ti piace, nginx, lighttpd ....

> Ok, avanti. È possibile aprire la finestra di debug del browser. Esaminando il componente nel DOM, questa è la struttura interna di un componente Web standardizzato. Qui potresti essere in grado di vedere la seconda caratteristica principale di WCEX: ** Intuitivo **. A causa dell'abbandono di VDOM e del motore del modello, dell'implementazione nativa e dell'implementazione standardizzata, scoprirai che la struttura DOM che vedi nella finestra di debug è fondamentalmente la stessa della struttura nel modello, il che è molto favorevole per noi per osservare ed eseguire il debug dei problemi, attraverso la finestra di debug, puoi fare quasi tutto ciò che vuoi, osservare le modifiche dei dati, inviare eventi, modificare i dati e così via. Al fine di raggiungere questo obiettivo il più possibile. L'implementazione di WCEX ha anche fatto molti dettagli, come nella struttura **if** e **for** di WCEX, il DOM implementato è siblico, piuttosto che aggiungere un altro livello di elementi wrapper, il che è molto favorevole alla nostra coerenza e **intuitivo** di CSS e agli elementi di accesso alla struttura dati.

#### Anteprima diretta via web

Se invii i file di cui sopra a **github** o pubblichi il pacchetto tramite npm, puoi accedervi direttamente tramite il CDN e abbiamo creato un widget per aiutarti a visualizzare direttamente l'anteprima, questo strumento utilizza **jsdelivr** come CDN.
Per i formati e le descrizioni di accesso specifici, vedere https://www.jsdelivr.com/

- Accesso NPM, si prega di sostituire il proprio nome del pacchetto.

```
https://wc-ex.com/go?npm/@wcex/example-basic/index.html

https://wc-ex.com/go?npm/[YOUT PACKAGE NAME][@VERSION]/index.html

```

- Per l'accesso a GitHub, sostituire il nome e il percorso del repository

```
https://wc-ex.com/go?gh/wc-ex/wcex/example/basic/index.html
https://wc-ex.com/go?gh/[YOU REPOS]@[COMMIT ID]/[YOU DIR]/index.html
```

> Naturalmente, oltre ai metodi di cui sopra, abbiamo anche creato un toolkit CLI. Molto piccolo, anche solo decine di K di dimensioni, non si basa su webpack, rollup e altri strumenti di imballaggio complessi. Può aiutarci a fare più lavoro, come la compilazione e il rilascio di aggiornamenti a caldo, ecc. Un altro punto importante è supportare TypeScript. È possibile installare **@wcex/CLI** tramite npm, i cui dettagli saranno trattati nelle sezioni successive.

### Primo esempio

<div>
<wcex-doc.com-playground files="['first/index.html','first/app.html']"></wcex-doc.com-playground>
</div>




### Ulteriore perfezionamento

Molto semplicemente, nel prossimo capitolo, cercheremo di aggiungere altre funzionalità ad esso, per esempio. Aggiungere proprietà personalizzate per aggiungere l'associazione dati. Gestire gli eventi e aggiungere altri componenti.
