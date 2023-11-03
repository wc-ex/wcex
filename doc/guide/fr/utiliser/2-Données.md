<!--DESC: {icon:{name:"explore"},id:2} -->



## Données et périmètre
La première chose que nous devons comprendre est que chaque composant WCEX est un WebComponent standard et que chaque instance de balise de composant possède son propre objet de données, que nous appelons la portée, que vous pouvez comprendre comme une instance d’une classe de données liée à la balise.
Chaque **scope** peut contenir plusieurs données personnalisées, méthodes, propriétés, fonctions de réponse aux événements, etc., cet objet de données est lié au _WebComponent_ actuel, nous l’appelons également **rootScope**, **scope** peut être localisé et héritable, à l’intérieur du composant, chaque élément HTML d’entité qui prend en charge les données de liaison a une portée locale qui hérite du composant **rootScope**, que nous appelons ** localScope, qui hérite jusqu’à rootScope en fonction de la hiérarchie DOM actuelle, et a accès à la portée de l’élément actuel, ainsi qu’à toutes les propriétés de son élément parent et rootScope. Reportez-vous à l’exemple suivant :

Les attributs, les données, les méthodes, etc. dans la portée de la portée > peuvent provenir de plusieurs endroits, tels que les propriétés des composants, les définitions de méta-portée, le JavaScript en ligne, le JavaScript externe, le Typescript, les packages npm, etc., qui peuvent être implémentés de manière flexible en fonction de vos préférences et de vos besoins réels

<div><wcex-doc.com-playground files="['ext/app1/index.html','ext/app1/app.html','ext/app1/data.js']"></wcex-doc.com-playground></div>


## Liaison de valeur

## Modèles de liaisons de chaînes


## Reliure


## Reliure à choix unique


## Fixations multi-sélection

