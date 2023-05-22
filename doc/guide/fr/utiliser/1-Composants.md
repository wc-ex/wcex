<!--DESC: {icon:{name:"explore"},id:1} -->

! [img] (@/@wcex/doc/assets/logo.svg{width:16em; hauteur:6em})

# Composants et WebComponents

Les composants sont la principale caractéristique de l’implémentation WCEX, chaque composant est un fichier html standard et est créé en tant que composant Web natif standard.
- Les composants doivent utiliser une balise **\<template\>** unique comme étiquette racine.
- Les composants peuvent contenir du contenu HTML standard.
- Grâce à la bonne encapsulation des composants Web standard, vous n’avez pas à vous soucier des conflits CSS, de nommage et de globalisation des variables.

## Dénomination du composant
1. Le nom du composant, qui est le nom de la balise **Web Components** utilisée dans le code HTML
2. Selon la spécification WebComponents, le nom d’étiquette du composant personnalisé doit contenir « - »
3. Tous les noms de composants utilisent des lettres minuscules et peuvent prendre en charge le chinois

Règles de conversion des noms d’étiquettes de composant :
> - Le nom du fichier du composant doit être nommé avec **Little Hump**, et l’étiquette correspondant au composant est **Underscore (« _ »)** en tant que mot fractionné.
> - Le séparateur de chemin « / » sera converti en « -« .
> - Si le résultat converti ne contient pas « -« , ajoutez ** »-« ** à la fin du nom du composant.
> : il existe deux types d’étiquettes pour chaque composant : les noms courts référencés dans le projet ou le projet et les étiquettes complètes contenant les noms de package référencés dans d’autres projets.
> - Format de nom long « nom du paquet. Nom du composant », en séparant le nom du package et le nom du composant par « ».
> - Si le nom du package contient le format du nom de l’organisation, tel que « @abc/def », le caractère « @ » doit être supprimé du nom de l’étiquette convertie réelle

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

## Mise en place des composants
Le fichier d’implémentation du composant est un fichier HTML standard avec la structure commune suivante :

<div><wcex-doc.com-playground files="['component/index.html','component/app.html','component/com.html','component/com.ts']"></wcex-doc.com-playground></div>

### Propriétés du composant
- Les composants peuvent définir leurs propres accessoires, et les propriétés définies peuvent être utilisées pour passer des paramètres lors de l’utilisation externe du composant
- Les propriétés des composants peuvent être ajoutées avec des modificateurs de type, les modificateurs de type prennent en charge: **bool**, **int**, **float**, **obj**, **array**, **string** types, par défaut « string » 
- Lorsqu’un composant définit l’attribut value, il se comporte de la même manière que les composants __input__ standard et peut être lié dans les deux sens via **$$**
- Les propriétés du composant par défaut sont transmises à l’aide d’une chaîne pour les conversions et d’un modèle de transmission de valeur à l’aide du modificateur $**, auquel cas $props pourrez calculer la valeur par défaut initiale à l’aide de l’expression

### Données des composants
- Les variables internes peuvent être définies via la balise \<meta name="scope » \>, et les modificateurs de type sont également pris en charge
- Vous pouvez également utiliser la balise script pour introduire des classes, créer des variables de composant et des méthodes
- Toutes les variables ou méthodes définies en mode **prop** et **meta[scope]** et **script** peuvent être utilisées directement lorsque les données du composant sont liées
- Utilisez la balise script dans le composant pour importer une classe étendue, telle que l’attribut de balise **src** est « . », ce qui signifie que le js ou ts du même nom que le composant actuel est introduit
- Lorsque vous utilisez des fichiers TypeScript, vous pouvez obtenir des conseils de syntaxe complets et d’autres informations, et vous pouvez importer directement dans des bibliothèques tierces, veuillez vous référer aux sections suivantes pour des règles spécifiques
