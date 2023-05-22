<!--DESC: {icon:{name:"dashboard_customize",pkg:"mdi",type:"filled"},id:3} -->
# Estendi e perfeziona
> Nel capitolo precedente abbiamo appreso l'utilizzo e le regole di base dei componenti, quindi cercheremo di estendere più funzionalità, come riferimento ai dati, modularità, pacchetti di terze parti, ecc.

## Progetto di ingresso principale
Successivamente, implementa una semplice applicazione che includerà una barra dei menu e una vista del percorso. Include inoltre due pagine abilitate al routing, riferimenti incrociati tra più moduli e librerie e come caricare librerie di terze parti.
- Questa voce principale utilizza alcuni dei componenti esportati della libreria di componenti, come route, clock
- Il routing URL standard è stato utilizzato per la commutazione dei componenti
- Pacchetti che caricano direttamente NPM: lodash
- Il codice della libreria dei componenti chiamato è dietro, perché ci sono due progetti diversi. Dopo aver modificato il codice del parco giochi della libreria dei componenti, è necessario fare clic manualmente sul pulsante Aggiorna nell'angolo in alto a destra per aggiornare l'effetto di visualizzazione di questo progetto

<div><wcex-doc.com-playground files="['ext/app/index.html','ext/app/app.html','ext/app/app.css','ext/app/title.html','ext/app/footer.html','ext/app/data.json','ext/app/ page1.html','ext/app/page2.html']"></wcex-doc.com-playground></div>


## Progetto di libreria di componenti
- Qui abbiamo creato una libreria di componenti che esporta due componenti e semplici componenti di routing e implementazioni.
- L'"indice.html" di questo progetto può essere utilizzato come pagina di test e sviluppo per la libreria di componenti corrente.
- Modifica il codice del componente qui, fai clic su aggiorna nel ** parco giochi ** sopra per vedere l'effetto

<div><wcex-doc.com-playground files="['ext/ui/index.html','ext/ui/menu.html','ext/ui/clock.html','ext/ui/clock.css','ext/ui/time.html','ext/ui/route.html']"></wcex-doc.com-playground></div>

> - Puoi provare a correggere alcuni bug, aggiungere nuove funzionalità e renderlo più bello.
> - Le librerie di componenti di riferimento devono essere definite nella voce e nell'indice del componente o principale.html e caricate <meta> tramite tag di script, e supportano anche il metodo di importazione standard per l'importazione in TS.


