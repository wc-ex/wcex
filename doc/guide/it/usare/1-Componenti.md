<!--DESC: {icon:{name:"explore"},id:1} -->

! [img] (@/@wcex/doc/assets/logo.svg{width:16em; altezza:6em})

# Componenti e WebComponents

I componenti sono la caratteristica principale dell'implementazione WCEX, ogni componente è un file html standard e viene creato come WebComponent nativo standard.
- I componenti devono utilizzare un tag **\<template\>** univoco come etichetta radice.
- I componenti possono contenere contenuti HTML standard.
- Grazie al buon incapsulamento dei WebComponents standard, non devi preoccuparti dei conflitti CSS e di denominazione e globalizzazione delle variabili.

## Denominazione del componente
1. Il nome del componente, ovvero il nome del tag **Web Components** utilizzato nel codice html.
2. In base ai requisiti della specifica WebComponents, il nome dell'etichetta di un componente personalizzato deve contenere "-", pertanto le regole per definire la convenzione di denominazione del componente sono le seguenti:

- Il nome del file del componente deve essere denominato con **Little Hump** e il nome dell'etichetta corrispondente al componente è **Underscore ("_")** come parola divisa.
- Il separatore di percorso "/" verrà convertito in "-".
- Se il risultato convertito non contiene "-", aggiungere **"-"** alla fine del nome del componente.
- Esistono due tipi di etichette per ogni componente, nomi brevi a cui si fa riferimento all'interno del progetto o del progetto e etichette complete contenenti nomi di pacchetti a cui si fa riferimento in altri progetti.
- Il formato del nome lungo è "nome pacchetto. Nome componente", dividendo il nome del pacchetto e il nome del componente con "."
- Se il nome del pacchetto contiene il formato del nome dell'organizzazione, ad esempio "@abc/def", il carattere "@" deve essere rimosso dal nome dell'etichetta convertita effettiva

### formato nome breve
Il formato del nome breve viene spesso utilizzato per chiamarsi reciprocamente tra i componenti all'interno di un progetto o per chiamare i componenti del progetto nel progetto di voce principale.
- Il nome breve del componente di solito inizia con la directory principale e ogni livello di directory verrà convertito in un separatore di directory standard, separato da "-" nell'etichetta corrispondente.
- Se si apre il file di voce principale del pacchetto corrente (di solito chiamato index.html nel browser), il percorso effettivo del componente inizia con la directory in cui si trova il file di voce principale come directory principale
- Tutti i percorsi dei componenti possono essere valutati solo verso il basso, cioè solo i nomi dei percorsi delle sottodirectory.

#### esempio
Si supponga che il progetto ha la seguente struttura di file ed è montato nella radice della porta localhost:8080 locale:
```text
/-
 |-- index.html
 |-- app.html
 |-- component \
 |-------------|-- com1.html
 |-------------|-- com2.html
 |-------------|-- index.html
 |-- test \
 |--------|-- helloWorld.html 
```

Quando visiti __http://localhost:8080/index.html__ nel tuo browser, il nome del tag corrispondente è il seguente:

> **\<app-\>**, **\<component-com1\>**, **\<component-com2\>**, **\<test-hello_world\>**

Ad esempio, quando si accede a __http://localhost:8080/components/index.html__ in un browser, il nome del tag corrispondente è il seguente:

> **\<com1-\>**, **\<com2\>**
> - Non è possibile accedere ai componenti nelle rispettive directory padre e secondaria utilizzando nomi brevi e, se necessario, sono necessari formati di denominazione dei nomi lunghi.

### Nome completo (incluso il nome del pacchetto)
Il nome completo viene utilizzato per accedere ai componenti in altri pacchetti di librerie di componenti del progetto.

#### esempio
Si supponga di avere due progetti con nomi di pacchetto: abc e @pkg/ui, ciascuno con due componenti, com1.html e com2.html. Quindi il nome completo dell'etichetta è il seguente:

- Pacchetto: ABC
> **\<abc.com1-\>**, **\<abc.com2-\>**

- Pacchetto: @pkg/UI
> **\<pkg-ui.com1\>**, **\<pkg-ui.com2\>**

- Puoi vedere che nel 2 ° pacchetto, poiché il nome contiene già "-", non è necessario aggiungere "-" alla fine.

