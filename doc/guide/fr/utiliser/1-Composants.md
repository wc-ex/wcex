<!--DESC: {icon:{name:"explore"},id:1} -->

! [img] (@/@wcex/doc/assets/logo.svg{largeur :16em ; hauteur :6em})

# Composants et WebComponents

Les composants sont la fonctionnalité principale des implémentations WCEX, chaque composant est un fichier html standard et est créé en tant que WebComponent natif standard.
- Le composant doit utiliser la balise unique **\<template\>** comme balise racine.
- Les composants peuvent contenir du contenu HTML standard.
- Grâce à la bonne encapsulation des WebComponents standard, vous n’avez pas à vous soucier des conflits CSS, de nommage et de globalisation des variables.

## Nommage du composant
1. Le nom du composant est le nom de la balise Web Components utilisée dans le code html
2. Selon les exigences de la spécification WebComponents, le nom de balise du composant personnalisé doit contenir « - »
3. Tous les noms de composants utilisent des lettres minuscules, ce qui peut prendre en charge le chinois

Règles de conversion du nom de la balise de composant :
> - Le nom du fichier du composant doit être nommé avec la petite bosse et le nom de la balise correspondant au composant est le trait de soulignement (« _ ») pour le mot divisé.
> - Le séparateur de chemin « / » sera converti en « -« .
> - Si le résultat converti ne contient pas « -« , ajoutez ** »-« ** à la toute fin du nom du composant.
> : il existe deux types d’étiquettes pour chaque composant, un nom abrégé référencé dans un projet ou un projet et une étiquette complète qui contient le nom du package référencé dans un autre projet.
> - Le format du nom long est « Nom du paquet. Nom de la composition », divisez le nom du package et le nom du composant par « . »
> - Si le nom du package contient le format du nom de l’organisation, tel que « @abc/def », le caractère « @ » doit être supprimé du nom de la balise convertie

### Format de nom court
Le format de nom abrégé est souvent utilisé pour appeler les composants d’un projet entre eux, ou pour appeler des composants du projet dans le projet d’entrée principale.
- Le nom abrégé du composant commence généralement dans le répertoire racine, et chaque niveau de répertoire est converti en un séparateur de répertoire standard, séparé par un « - » dans la balise correspondante.
- Si vous ouvrez le fichier du portail principal du package actuel (généralement nommé index.html) dans le navigateur, le chemin d’accès réel du composant commence par le répertoire où se trouve le fichier principal du portail en tant que répertoire racine
- Tous les chemins d’accès aux composants ne peuvent être calculés que vers le bas, c’est-à-dire que seuls les chemins d’accès des sous-répertoires sont calculés.

#### exemple
Supposons que votre projet ait la structure de fichiers suivante et qu’il la monte sur la racine du port local localhost :8080 :
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

Lorsque vous visitez : __http://localhost:8080/index.html__ dans votre navigateur, les noms de balises correspondants sont les suivants :

> **\<app-\>**, **\<component-com1\>**, **\<component-com2\>**, **\<test-hello_world\>**

Par exemple, lorsque vous visitez : __http://localhost:8080/components/index.html__ dans votre navigateur, le nom de la balise correspondante est le suivant :

> **\<com1-\>**, **\<com2\>**
> : il n’est pas possible d’accéder aux composants de leurs répertoires parent et frère avec des noms courts, ou des formats de dénomination de noms longs sont requis si un accès est requis.

### Nom complet (y compris le nom du paquet)
Le nom complet est utilisé pour accéder aux composants d’autres packages de bibliothèque de composants de projet.

#### exemple
Supposons que vous ayez deux projets avec des noms de package : abc et @pkg/ui, et que chaque package ait deux composants, com1.html et com2.html. Le nom complet de la balise est le suivant :

- Paquet : ABC
> **\<abc.com1-\>**, **\<abc.com2-\>**

- Paquet : @pkg/ui
> **\<pkg-ui.com1\>**, **\<pkg-ui.com2\>**

- Vous pouvez voir que dans le 2ème paquet, il n’est pas nécessaire d’ajouter un « - » à la fin puisque le nom est déjà inclus dans le nom.

## Mise en place des composants
Le fichier d’implémentation du composant est un fichier HTML standard et sa structure commune est la suivante :

<div><wcex-doc.com-playground files="['component/index.html','component/app.html','component/com.html','component/com.ts']"></wcex-doc.com-playground></div>

### Propriétés des composants
- Les composants peuvent définir leurs propres props, qui peuvent être utilisés en externe pour passer des paramètres lorsque le composant est utilisé
- Les propriétés des composants peuvent être ajoutées avec des modificateurs de type, les modificateurs de type prennent en charge : **bool**, **int**,**float**,**obj**,**array**, **string** type, la valeur par défaut est « string » 
- Lorsqu’un composant a une propriété value définie, il se comporte de la même manière qu’un composant __input__ standard et peut être lié de manière bidirectionnelle via **$$**
- Les propriétés du composant par défaut sont transmises à l’aide de String pour la conversion, et le modificateur $ peut être utilisé pour utiliser le mode de passage de valeur, auquel cas le $props pourra utiliser l’expression pour calculer la valeur par défaut initiale

### Données des composants
- Les variables internes peuvent être définies via la balise \<meta name="scope » \>, qui prend également en charge les modificateurs de type
- Vous pouvez également utiliser la balise script pour introduire des classes afin de créer des variables et des méthodes de composant
- Toutes les variables ou méthodes définies dans prop et meta[scope] et script peuvent être utilisées directement dans la liaison de données de composant
- La classe scope peut être importée avec la balise script dans le composant, de sorte que l’attribut src de la balise est « . », ce qui signifie que le js ou le ts portant le même nom que le composant courant est introduit
- Lorsque vous utilisez des fichiers TypeScript, vous pouvez obtenir des conseils de syntaxe complets et d’autres informations, et vous pouvez importer directement des bibliothèques tierces, veuillez consulter la section suivante pour des règles spécifiques
