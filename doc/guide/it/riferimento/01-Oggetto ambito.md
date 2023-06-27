<!--DESC: {icon:{name:"explore",pkg:"mdi",type:"filled"},id:1} -->

## Oggetto ambito ambito
Gli ambiti di ambito contengono dati, oggetti e metodi che possono essere utilizzati direttamente negli script e negli eventi del modello di associazione.


### I riferimenti all'ambito sono correlati agli elementi HTML

#### $root
Punta all'oggetto ambito radice WebComponent corrente

#### $rootElem
Punta all'elemento radice WebComponent corrente, digitare oggetto HTMLElement.

#### rootParentElem
Puntare all'elemento padre dell'elemento radice **WebComponent** corrente, va notato che se l'elemento radice del componente corrente non ha un elemento padre (ad esempio un tag di primo livello situato in un altro componente, quindi utilizzare parentElement in HTML, ottenere null, ma il parentNode effettivo punta a shadowRoot), quindi utilizzando rootParentElem restituirà il componente padre del componente corrente effettivo, digitare Oggetto HTMLElement. L'utilizzo di questo oggetto semplifica il recupero dei dati e dei metodi del componente padre.


#### $parent
Posizionare il puntatore del mouse sull'oggetto ambito padre dell'elemento corrente, si noti che il $parent qui non punta all'elemento padre, ma ottiene l'ambito dell'elemento padre che dispone del tag dinamico più recente con ambito.

#### $id
  Fornisce un riferimento diretto a un elemento id nel modello di tipo un oggetto HTMLElement.
  Esempio:
  '''html
  <template>
    <div id="mydiv"></div>
  </template>
  <script scope=".">
    return class{

      onReady(){
        this.$id.mydiv.innerHTML = "Hello World";
      }
    }
  </script>
  ```

### I dati sono correlati agli eventi

#### $emit
Inviare eventi personalizzati o standard
- $emit(nameOrEvent: stringa | Evento, dettaglioOrtoElem?: Elemento | qualsiasi, toElem?: Elemento): void;
#### $watch
Monitorare le modifiche in una funzione o espressione e attivare callback quando cambiano

#### $noWatch
Impedire il monitoraggio delle modifiche di un oggetto, che viene spesso utilizzato per alcuni oggetti che non devono essere monitorati, ad esempio gli oggetti di sistema


### Percorso correlato

#### $go
Il salto del percorso, che supporta diversi modi, è un riferimento di scelta rapida al metodo $router.go().
Area è una route di partizione e l'impostazione predefinita è "default"

#### $router
Gli oggetti di route, che forniscono metodi e attributi correlati al percorso, fanno riferimento al capitolo Routing
Metodi comuni:
- go(tag,arrts:{}) or go(area,tag,attrs:{})
- parseLocation() risolve il percorso corrente
- back() ritorna al livello precedente



### Oggetto classe utensile
#### $log 
Registro standard di output, utilizzato nello stesso modo della console .log, ma con nomi di componenti colorati e numeri di riga nella console per facilitare il debug. Supporto per chiamate semplificate $log(...) args), equivalenti a $log.log(...) args)

#### $path()
Ottenere il percorso effettivo correlato al componente dinamico, se nel componente viene fatto riferimento a un'immagine, il percorso di questa immagine sarà relativo al percorso del componente, non al percorso della pagina corrente, e il percorso corretto può essere ottenuto utilizzando $path.
- Supporto per "./" relativo al percorso corrente del componente
- Supporto "@/" relativo percorso del pacchetto npm

#### $color
Oggetti semantici dinamici di corrispondenza dei colori, colori semantici comuni: $color.pri, $color.pria, $color.sec, $color.seca, $color.text, $color.textr, $color.bg, $color.bgr, $color.ok, $color.warn, $color.info, $color.error, ecc.
Supporto I decoratori di colore basati su HSL, come $color.pri.l3.s5.h2_.a6, ecc., Possono essere chiamati continuamente, fare riferimento al capitolo sulla corrispondenza dei colori per i dettagli

#### $Colors
Gestire e caricare dinamicamente le tabelle colori

#### $json
La formattazione visualizza $json dati, una chiamata semplificata a JSON.stringify e supporta il rilevamento dinamico delle modifiche

#### $delay
È possibile specificare il ciclo successivo dell'implementazione, utilizzando l'implementazione setTimeout
> $delay(ms:numero):P romise<void>;

#### $next
Il ciclo successivo viene implementato utilizzando requestAnimationFrame
> $next():P romise<void>;

#### $step
Modifica dinamica dei valori delle proprietà passo dopo passo, spesso utilizzati per gli effetti di animazione.
> $step(... args:(qualsiasi|[qualsiasi,numero]) []):qualsiasi;
