<!--DESC: {icon:{name:"explore"},id:3} -->



## Données et portée
La première chose que nous devons comprendre est que chaque composant **WCEX** est un _WebComponent_ standard, et chaque instance d’étiquette de composant a son propre objet de données, que nous appelons **scope**, que vous pouvez comprendre comme une instance d’une classe de données liée à l’étiquette.
Chaque **scope** peut contenir plusieurs données personnalisées, méthodes, propriétés, fonctions de réponse aux événements, etc., cet objet de données est lié au _WebComponent_ actuel, nous l’appelons également **rootScope**, **scope** peut être localisé et héritable, à l’intérieur du composant, chaque élément HTML d’entité qui prend en charge la liaison de données a une portée locale héritée du composant **rootScope**, que nous appelons ** localScope, qui hérite vers le haut de rootScope, selon la hiérarchie DOM actuelle, donne accès à l’étendue de l’élément actuel, ainsi qu’à tous les attributs de son élément parent et rootScope. Veuillez vous référer à l’exemple suivant :

> propriétés, données, méthodes, etc. dans la portée peuvent provenir de plusieurs emplacements, tels que les propriétés de composant, les définitions de méta-portée, JavaScript en ligne, JavaScript externe, Typescript, paquets npm, etc., qui peuvent être implémentés de manière flexible en fonction de vos préférences et de vos besoins réels

<div><wcex-doc.com-playground files="['ext/app1/index.html','ext/app1/app.html','ext/app1/data.js']"></wcex-doc.com-playground></div>


## Liaison de valeur

## Liaison de chaîne de modèle

## Liaison bidirectionnelle

## Sélectionnez la liaison

## Liaison de style

