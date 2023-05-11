<!--DESC: {icon:{name:"explore"},id:2} -->



## Dati e ambito di applicazione
La prima cosa che dobbiamo capire è che ogni componente **WCEX** è un _WebComponent_ standard e ogni istanza dell'etichetta del componente ha il proprio oggetto dati, che chiamiamo **ambito**, che è possibile comprendere come un'istanza di una classe di dati associata all'etichetta.
Ogni **ambito** può contenere più dati personalizzati, metodi, proprietà, funzioni di risposta agli eventi, ecc., Questo oggetto dati è associato al _WebComponent_corrente, lo chiamiamo anche **rootScope**, **scope** può essere localizzato ed ereditabile, all'interno del componente, ogni elemento HTML dell'entità che supporta l'associazione dei dati ha un ambito locale ereditato dal componente **rootScope**, che chiamiamo ** localScope, che eredita verso l'alto fino a rootScope, in base alla gerarchia DOM corrente, consente di accedere all'ambito dell'elemento corrente, nonché a tutti gli attributi dell'elemento padre e rootScope. Fare riferimento al seguente esempio:

> proprietà, dati, metodi e così via nell'ambito possono provenire da più posizioni, come proprietà dei componenti, definizioni di meta ambiti, JavaScript inline, JavaScript esterno, Typescript, pacchetti npm, ecc., Che possono essere implementati in modo flessibile in base alle preferenze e alle esigenze effettive

<div><wcex-doc.com-playground files="['ext/app1/index.html','ext/app1/app.html','ext/app1/data.js']"></wcex-doc.com-playground></div>


## Binding di valore

## Binding stringa modello


## Rilegatura bidirezionale


## Rilegatura radio


## Binding a selezione multipla

