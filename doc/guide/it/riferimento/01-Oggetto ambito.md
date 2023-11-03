<!--DESC: {icon:{name:"explore",pkg:"mdi",type:"filled"},id:1} -->

## Ambito Oggetto Ambito
Gli ambiti contengono dati, oggetti e metodi che possono essere utilizzati direttamente nei modelli di associazione, negli script e negli eventi.


### I riferimenti all'ambito sono correlati agli elementi HTML

#### $root
Posizionare il puntatore del mouse sull'oggetto Scope radice WebComponent corrente

#### $rootElem
Posizionare il puntatore del mouse sull'elemento radice WebComponent corrente, di tipo HTMLElement object.

#### $rootParentElem
Puntare all'elemento padre dell'elemento radice **WebComponent** corrente, notare che se l'elemento radice del componente corrente non ha alcun elemento padre (ad esempio un tag di primo livello in un altro componente, quindi utilizzare parentElement in HTML per ottenere il risultato null, ma l'effettivo parentNode punta a shadowRoot), l'utilizzo di rootParentElem restituirà il componente padre del componente corrente effettivo, di tipo HTMLElement. L'utilizzo di questo oggetto semplifica l'ottenimento dei dati e dei metodi del componente padre.


#### $parent
Posiziona il puntatore del mouse sull'oggetto Scope padre dell'elemento corrente, tieni presente che il $parent qui non punta all'elemento padre, ma per ottenere l'ambito dell'elemento padre che ha il tag dinamico più vicino con l'ambito.

#### $id
  Fornire un riferimento diretto all'elemento id contenuto nel modello, di tipo HTMLElement object.
  Esempio:
  '''html
  <template>
    <div id="mydiv"></div>
  </template>
  <script scope=".">
    return class{

      onReady(){
        this.$id.mydiv.innerHTML = "Ciao Mondo";
      }
    }
  </script>
  ```

### Dipendenze di dati ed eventi

#### $emit
Inviare eventi personalizzati o standard
- $emit(nameOrEvent: stringa | Evento, dettaglioOrtoElem?: Elemento | qualsiasi, toElem?: Elemento): vuoto;
#### $watch
Monitorare le modifiche in una funzione o in un'espressione e attivare una funzione di callback quando si verificano modifiche

#### $noWatch
Impedire il monitoraggio delle modifiche di un oggetto, che viene spesso utilizzato per alcuni oggetti che non devono essere monitorati, ad esempio gli oggetti di sistema


### Relativo al routing

#### $go
Il reindirizzamento della route, che supporta più metodi, è un riferimento di scelta rapida al metodo $router.go().
area è una route di partizione e l'impostazione predefinita è default.

#### $router
Oggetti route, che forniscono metodi e proprietà correlati alle route, vedere Route
Metodi comuni:
- go(tag,arrts:{}) o go(area,tag,attrs:{})
- parseLocation() risolve il percorso corrente
- back() per tornare al livello precedente



### Oggetti di utilità
#### $log 
Il registro standard di output è uguale a quello del .log della console, ma il nome del componente colorato e il numero di riga verranno visualizzati nella console per facilitare il debug. Supporto per chiamate semplificate a $log (...) args), che equivale a $log.log(... argomenti)

#### $path()
Ottenere il percorso effettivo correlato al componente dinamico, ad esempio, se nel componente si fa riferimento a un'immagine, il percorso di questa immagine sarà relativo al percorso del componente, non al percorso della pagina corrente e il percorso corretto può essere ottenuto utilizzando $path.
- Supporto "./" relativo al percorso del componente corrente
- Supporto "@/" relativo ai percorsi dei pacchetti npm

#### $color
Oggetti di corrispondenza dei colori dinamici semantici, colori semantici comuni: $color.pri, $color.pria, $color.sec, $color.seca, $color.text, $color.textr, $color.bg, $color.bgr, $color.ok, $color.warn, $color.info, $color.error, ecc.
I modificatori di colore basati su HSL, come $color.pri.l3.s5.h2_.a6, possono essere richiamati continuamente, fare riferimento al capitolo sulla corrispondenza dei colori per i dettagli

#### $Colors
Gestisci e carica dinamicamente le tavolozze dei colori

#### $json
Formattare la visualizzazione dei dati $json, che è una chiamata semplificata a JSON.stringify e supporta il rilevamento dinamico delle modifiche

#### $delay
È possibile specificare il periodo successivo di implementazione, utilizzando setTimeout
> $delay(ms:numero):P romise<void>;

#### $next
Nel ciclo successivo, usare requestAnimationFrame
> $next():P romise<void>;

#### $step
Modificare dinamicamente i valori delle proprietà nei passaggi, spesso utilizzati negli effetti di animazione.
> $step(... argomenti:(qualsiasi|[ qualsiasi,numero])[]):qualsiasi;
