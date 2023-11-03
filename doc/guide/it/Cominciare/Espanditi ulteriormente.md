<!--DESC: {icon:{name:"dashboard_customize",pkg:"mdi",type:"filled"},id:3} -->
# Espandi e migliora
> Nel capitolo precedente, abbiamo imparato l'utilizzo e le regole di base dei componenti, quindi cercheremo di estendere più funzionalità, come il riferimento ai dati, la modularizzazione, i pacchetti di terze parti, ecc.

## Progetto Ingresso Principale
Successivamente, implementa una semplice applicazione che includerà una barra dei menu e una visualizzazione del percorso. Include anche due pagine che supportano il routing e illustrerà anche i riferimenti incrociati tra più moduli e librerie, nonché come caricare librerie di terze parti.
- Questo portale principale utilizza alcuni dei componenti esportati della libreria dei componenti, come il percorso e l'orologio
- Le route URL standard vengono utilizzate per il cambio di componente
- Caricare direttamente il pacchetto di NPM: lodash
- La chiamata al codice della libreria dei componenti si trova in fondo, poiché ci sono due progetti diversi. Dopo aver modificato il codice playground della libreria dei componenti, è necessario fare clic manualmente sul pulsante Aggiorna nell'angolo in alto a destra per aggiornare la visualizzazione del progetto

<div><wcex-doc.com-playground files="['ext/app/index.html','ext/app/app.html','ext/app/app.css','ext/app/title.html','ext/app/footer.html','ext/app/data.json','ext/app/ page1.html','ext/app/page2.html']"></wcex-doc.com-playground></div>


## Progetto libreria di componenti
- Qui abbiamo creato una libreria di componenti che esporta due componenti, oltre a semplici componenti di routing e implementazioni.
- Il "index.html" di questo progetto può essere utilizzato come pagina di test e sviluppo per la libreria di componenti corrente.
- Modifica il codice del componente qui, fai clic su Aggiorna nel **playground** qui sopra per vedere l'effetto

<div><wcex-doc.com-playground files="['ext/ui/index.html','ext/ui/menu.html','ext/ui/clock.html','ext/ui/clock.ts','ext/ui/clock.css','ext/ui/time.html','ext/ui/route.html']"></wcex-doc.com-playground></div>

> - Puoi provare a correggere alcuni bug, oltre ad aggiungere alcune nuove funzionalità e renderlo più bello.
> - Il riferimento a una libreria di componenti deve essere definito con un tag nel componente o nella voce principale e nell'indice .html e <meta> caricato dai tag di script e supporta anche l'uso di metodi di importazione standard in TS per l'importazione.
