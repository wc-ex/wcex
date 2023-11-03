<!--DESC: {icon:{name:"dashboard_customize",pkg:"mdi",type:"filled"},id:3} -->
# Développer et améliorer
> Dans le chapitre précédent, nous avons appris l’utilisation et les règles de base des composants, puis nous essaierons d’étendre d’autres fonctionnalités, telles que le référencement des données, la modularisation, les packages tiers, etc.

## Projet d’entrée principale
Ensuite, implémentez une application simple qui comprendra une barre de menu et une vue d’itinéraire. Il comprend également deux pages qui prennent en charge le routage, et montrera également les références croisées entre plusieurs modules et bibliothèques, ainsi que la façon de charger des bibliothèques tierces.
- Ce portail principal utilise certains des composants exportés de la bibliothèque de composants, tels que l’itinéraire et l’horloge
- Les routes d’URL standard sont utilisées pour la commutation de composants
- Chargez directement le paquet de NPM : lodash
- L’appel au code de la bibliothèque de composants se trouve à l’arrière-plan, car il y a deux projets différents. Après avoir modifié le code playground de la bibliothèque de composants, vous devez cliquer manuellement sur le bouton d’actualisation dans le coin supérieur droit pour mettre à jour l’affichage du projet

<div><wcex-doc.com-playground files="['ext/app/index.html','ext/app/app.html','ext/app/app.css','ext/app/title.html','ext/app/footer.html','ext/app/data.json','ext/app/ page1.html','ext/app/page2.html']"></wcex-doc.com-playground></div>


## Projet de bibliothèque de composants
- Ici, nous avons créé une bibliothèque de composants qui exporte deux composants ainsi que des composants de routage simples et des implémentations.
- Le « index.html » de ce projet peut être utilisé comme page de test et de développement pour la bibliothèque de composants actuelle.
- Modifiez le code du composant ici, cliquez sur Actualiser dans le **playground** ci-dessus pour voir l’effet

<div><wcex-doc.com-playground files="['ext/ui/index.html','ext/ui/menu.html','ext/ui/clock.html','ext/ui/clock.ts','ext/ui/clock.css','ext/ui/time.html','ext/ui/route.html']"></wcex-doc.com-playground></div>

> - Vous pouvez essayer de corriger certains bugs, ainsi que d’ajouter de nouvelles fonctionnalités et de le rendre plus beau.
> - Le référencement d’une bibliothèque de composants doit être défini avec une balise dans le composant ou dans l’entrée principale et l’index .html, et <meta> chargé par des balises de script, et il prend également en charge l’utilisation de méthodes d’importation standard dans TS pour l’importation.
