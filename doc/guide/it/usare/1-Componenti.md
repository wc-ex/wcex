<!--DESC: {icon:{name:"explore"},id:1} -->

! [img] (@/@wcex/doc/assets/logo.svg{larghezza:16em; altezza:6em})

# Componenti e WebComponents

I componenti sono la funzionalità principale delle implementazioni WCEX, ogni componente è un file html standard e viene creato come WebComponent nativo standard.
- Il componente deve utilizzare il tag univoco **\<template\>** come tag radice.
- I componenti possono contenere contenuto HTML standard.
- Grazie al buon incapsulamento dei WebComponent standard, non devi preoccuparti di conflitti CSS, denominazione e globalizzazione delle variabili.

## Denominazione del componente
1. Il nome del componente è il nome del tag Web Components utilizzato nel codice html
2. In base ai requisiti della specifica WebComponents, il nome del tag del componente personalizzato deve contenere "-"
3. Tutti i nomi dei componenti utilizzano lettere minuscole, che possono supportare il cinese

Regole di conversione dei nomi dei tag dei componenti:
> - Il nome del file del componente deve essere denominato con la piccola gobba e il nome del tag corrispondente al componente è il carattere di sottolineatura ("_") per la parola divisa.
> - Il separatore di percorso "/" verrà convertito in "-".
> - Se il risultato convertito non contiene "-", aggiungere **"-"** alla fine del nome del componente.
> - Esistono due tipi di etichette per ogni componente, un nome breve a cui si fa riferimento all'interno di un progetto o di un progetto e un'etichetta completa che contiene il nome del pacchetto a cui si fa riferimento in un altro progetto.
> - Il formato del nome lungo è "Nome pacchetto. Nome composizione", dividere il nome del pacchetto e il nome del componente con "."
> - Se il nome del pacchetto contiene il formato del nome dell'organizzazione, ad esempio "@abc/def", il carattere "@" deve essere rimosso dal nome del tag convertito effettivo

### Formato del nome breve
Il formato del nome breve viene spesso utilizzato per richiamare i componenti all'interno di un progetto l'uno all'altro o per chiamare i componenti del progetto nel progetto dell'ingresso principale.
- Il nome breve del componente di solito inizia dalla directory principale e ogni livello di directory viene convertito in un separatore di directory standard, separato da un "-" nel tag corrispondente.
- Se aprite il file del portale principale del pacchetto corrente (di solito denominato index.html) nel browser, il percorso effettivo del componente inizia con la directory in cui si trova il file del portale principale come directory principale
- Tutti i percorsi dei componenti possono essere calcolati solo al ribasso, ovvero vengono calcolati solo i percorsi delle sottodirectory.

#### esempio
Si supponga che il progetto disponga della seguente struttura di file e che venga montata nella radice della porta localhost:8080:
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

Quando visiti: __http://localhost:8080/index.html__ nel tuo browser, i nomi dei tag corrispondenti sono i seguenti:

> **\<app-\>**, **\<component-com1\>**, **\<component-com2\>**, **\<test-hello_world\>**

Ad esempio, quando visiti: __http://localhost:8080/components/index.html__ nel tuo browser, il nome del tag corrispondente è il seguente:

> **\<com1-\>**, **\<com2\>**
> - Non è possibile accedere ai componenti nelle directory padre e di pari livello con nomi brevi oppure se è richiesto l'accesso, sono necessari formati di denominazione dei nomi lunghi.

### Nome completo (incluso il nome del pacchetto)
Il nome completo viene utilizzato per accedere ai componenti in altri pacchetti della libreria dei componenti del progetto.

#### esempio
Supponiamo di avere due progetti con nomi di pacchetto: abc e @pkg/ui, e che ogni pacchetto abbia due componenti, com1.html e com2.html. Il nome completo del tag è il seguente:

- Pacchetto: ABC
> **\<abc.com1-\>**, **\<abc.com2-\>**

- Pacchetto: @pkg/ui
> **\<pkg-ui.com1\>**, **\<pkg-ui.com2\>**

- Puoi vedere che nel 2° pacchetto non c'è bisogno di aggiungere un "-" alla fine poiché il nome è già incluso nel nome.

## Implementazione dei componenti
Il file di implementazione del componente è un file HTML standard e la struttura comune è la seguente:

<div><wcex-doc.com-playground files="['componente/indice.html','componente/app.html','componente/com.html','componente/com.ts']"></wcex-doc.com-playground></div>

### Proprietà del componente
- I componenti possono definire le proprie props, che possono essere utilizzate esternamente per passare i parametri quando il componente viene utilizzato
- Le proprietà dei componenti possono essere aggiunte con modificatori di tipo, i modificatori di tipo supportano: **bool**, **int**,**float**,**obj**,**array**, **stringa** tipo, l'impostazione predefinita è "stringa" 
- Quando un componente ha una proprietà value definita, si comporta in modo simile a un componente __input__ standard e può essere associato in modo bidirezionale tramite **$$**
- Le proprietà predefinite del componente vengono passate utilizzando String per la conversione e il modificatore $ può essere utilizzato per utilizzare la modalità di passaggio del valore, a quel punto il $props sarà in grado di utilizzare l'espressione per calcolare il valore predefinito iniziale

### Dati dei componenti
- Le variabili interne possono essere impostate tramite il tag \> \<meta name="scope", che supporta anche i modificatori di tipo
- È inoltre possibile utilizzare il tag script per introdurre classi per creare variabili e metodi componente
- Tutte le variabili o i metodi definiti in prop e meta[scope] e script possono essere utilizzati direttamente nell'associazione dati del componente
- La classe scope può essere importata con il tag script nel componente, quindi l'attributo src del tag è ".", il che significa che viene introdotto il js o ts con lo stesso nome del componente corrente
- Quando si utilizzano file TypeScript, è possibile ottenere suggerimenti completi sulla sintassi e altre informazioni ed è possibile importare direttamente librerie di terze parti, vedere la sezione seguente per regole specifiche
