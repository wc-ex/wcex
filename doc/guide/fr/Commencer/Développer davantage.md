<!--DESC: {icon:{name:"dashboard_customize",pkg:"mdi",type:"filled"},id:3} -->
# Étendre et affiner
> Dans le chapitre précédent, nous avons appris l’utilisation et les règles de base des composants, puis nous allons essayer d’étendre plus de fonctionnalités, telles que la référence de données, la modularité, les packages tiers, etc.

## Projet d’entrée principale
Ensuite, implémentez une application simple qui comprendra une barre de menus ainsi qu’une vue d’itinéraire. Il comprend également deux pages compatibles avec le routage, des références croisées entre plusieurs modules et bibliothèques, et comment charger des bibliothèques tierces.
- Cette entrée principale utilise certains des composants exportés de la bibliothèque de composants, tels que l’itinéraire, l’horloge
- Le routage d’URL standard a été utilisé pour la commutation de composants
- Paquets qui chargent directement NPM : lodash
- Le code de la bibliothèque de composants appelée est en retard, car il y a deux projets différents. Après avoir modifié le code du playground de la bibliothèque de composants, vous devez cliquer manuellement sur le bouton d’actualisation dans le coin supérieur droit pour mettre à jour l’effet d’affichage de ce projet

<div><wcex-doc.com-playground files="['ext/app/index.html','ext/app/app.html','ext/app/app.css','ext/app/title.html','ext/app/footer.html','ext/app/data.json','ext/app/ page1.html','ext/app/page2.html']"></wcex-doc.com-playground></div>


## Projet de bibliothèque de composants
- Ici, nous avons créé une bibliothèque de composants qui exporte deux composants ainsi que des composants de routage simples et des implémentations.
- L’index .html » de ce projet peut être utilisé comme page de test et de développement pour la bibliothèque de composants actuelle.
- Modifiez le code du composant ici, cliquez sur actualiser dans le **playground** ci-dessus pour voir l’effet

<div><wcex-doc.com-playground files="['ext/ui/index.html','ext/ui/menu.html','ext/ui/clock.html','ext/ui/clock.ts','ext/ui/clock.css','ext/ui/time.html','ext/ui/route.html']"></wcex-doc.com-playground></div>

> - Vous pouvez essayer de corriger certains bugs, d’ajouter de nouvelles fonctionnalités et de le rendre plus beau.
> - Les bibliothèques de composants de référence doivent être définies dans le composant ou l’entrée principale et l’index.html et chargées <meta> via des balises de script, et prennent également en charge la méthode d’importation standard pour l’importation dans TS.
