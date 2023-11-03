<!--DESC: {icon:{name:"explore"},id:2} -->



## Dati e ambito di applicazione
La prima cosa che dobbiamo capire è che ogni componente WCEX è un WebComponent standard e ogni istanza del tag del componente ha il proprio oggetto dati, che chiamiamo ambito, che puoi comprendere come un'istanza di una classe di dati associata al tag.
Ogni **ambito** può contenere più dati personalizzati, metodi, proprietà, funzioni di risposta agli eventi, ecc., questo oggetto dati è associato al _WebComponent_ corrente, lo chiamiamo anche **rootScope**, **ambito** può essere localizzato ed ereditabile, all'interno del componente, ogni elemento HTML dell'entità che supporta l'associazione dei dati ha un ambito locale che eredita dal componente **rootScope**, che chiamiamo ** localScope, che eredita fino a rootScope in base alla gerarchia DOM corrente e ha accesso all'ambito dell'elemento corrente, nonché a tutte le proprietà dell'elemento padre e di rootScope. Fare riferimento al seguente esempio:

Gli attributi, i dati, i metodi, ecc. nell'ambito dell'ambito > possono provenire da più posizioni, come le proprietà dei componenti, le definizioni dei meta ambiti, JavaScript in linea, JavaScript esterno, Typescript, pacchetti npm, ecc., che possono essere implementati in modo flessibile in base alle preferenze e alle esigenze effettive

<div><wcex-doc.com-playground files="['ext/app1/index.html','ext/app1/app.html','ext/app1/data.js']"></wcex-doc.com-playground></div>


## Associazione di valori

## Associazioni di stringhe di modelli


## Rilegatura


## Rilegatura a scelta singola


## Associazioni a selezione multipla

