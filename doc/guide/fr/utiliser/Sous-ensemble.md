<!--DESC: {icon:{name:"explore"},id:1} -->

! [img] (@/@wcex/doc/assets/logo.svg{width:16em; hauteur:6em})

# Composants et WebComponents

Les composants sont la principale caractéristique de l’implémentation WCEX, chaque composant est un fichier html standard et est créé en tant que composant Web natif standard.
- Les composants doivent utiliser une balise **\<template\>** unique comme étiquette racine.
- Les composants peuvent contenir du contenu HTML standard.
- Grâce à la bonne encapsulation des composants Web standard, vous n’avez pas à vous soucier des conflits CSS, de nommage et de globalisation des variables.

## Dénomination du composant
1. Le nom du composant, qui est le nom de la balise **Web Components** utilisée dans le code HTML.
2. Selon les exigences de la spécification WebComponents, le nom d’étiquette d’un composant personnalisé doit contenir « -« , de sorte que les règles pour définir la convention de dénomination du composant sont les suivantes:

- Le nom du fichier du composant doit être nommé avec **Little Hump**, et le nom d’étiquette correspondant au composant est **Underscore (« _ »)** comme un mot fractionné.
- Le séparateur de chemin « / » sera converti en « -« .
- Si le résultat converti ne contient pas « -« , ajoutez ** »-« ** à la fin du nom du composant.
- Il existe deux types d’étiquettes pour chaque composant, les noms courts référencés dans le projet ou le projet, et les étiquettes complètes contenant les noms de package référencés dans d’autres projets.
- Le format de nom long est « nom du paquet. Nom du composant », en séparant le nom du package et le nom du composant par « ».
- Si le nom du package contient le format du nom de l’organisation, tel que « @abc/def », le caractère « @ » doit être supprimé du nom de l’étiquette convertie réelle

### format de nom court
Le format de nom abrégé est souvent utilisé pour s’appeler entre les composants d’un projet ou pour appeler les composants du projet dans le projet d’entrée principal.
- Le nom court du composant commence généralement par le répertoire racine, et chaque niveau de répertoire sera converti en un séparateur de répertoire standard, séparé par « - » dans l’étiquette correspondante.
- Si vous ouvrez le fichier d’entrée principal du paquet actuel (généralement nommé index.html dans votre navigateur), le chemin réel du composant commence par le répertoire où se trouve le fichier d’entrée principal en tant que répertoire racine
- Tous les chemins de composants ne peuvent être évalués que vers le bas, c’est-à-dire uniquement les noms de chemins de sous-répertoire.

#### exemple
Supposons que votre projet a la structure de fichiers suivante et est monté sur la racine du port localhost:8080 local :
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

Lorsque vous visitez __http://localhost:8080/index.html__ dans votre navigateur, le nom de balise correspondant est le suivant :

> **\<app-\>**, **\<component-com1\>**, **\<component-com2\>**, **\<test-hello_world\>**

Par exemple, lorsque vous accédez à __http://localhost:8080/components/index.html__ dans un navigateur, le nom de balise correspondant est le suivant :

> **\<com1-\>**, **\<com2\>**
> - Les composants de leurs répertoires parent et frère ne sont pas accessibles à l’aide de noms courts, et les formats de dénomination de noms longs sont requis s’ils le doivent.

### Nom complet (y compris le nom du paquet)
Le nom complet est utilisé pour accéder aux composants dans d’autres packages de bibliothèque de composants de projet.

#### exemple
Supposons que vous ayez deux projets avec des noms de package : abc et @pkg/ui, chacun avec deux composants, com1.html et com2.html. Ensuite, son nom complet d’étiquette est le suivant:

- Forfait : ABC
> **\<abc.com1-\>**, **\<abc.com2-\>**

- Paquet : @pkg/UI
> **\<pkg-ui.com1\>**, **\<pkg-ui.com2\>**

- Vous pouvez voir que dans le 2ème paquet, puisque le nom contient déjà « -« , il n’est pas nécessaire d’ajouter « - » à la fin.


